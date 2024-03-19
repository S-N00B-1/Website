const rssFeedURL = 'https://s-n00b-1.github.io/Website/Files/feed.xml';
            
async function displayContent() {
    try {
        const response = await fetch(rssFeedURL);
        const xmlData = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
        const items = xmlDoc.getElementsByTagName('item');
        
        const contentList = document.getElementById('content');
        
        let entryExists = false; 
        
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const tag = item.getElementsByTagName('description')[0].textContent.trim();
            const title = item.getElementsByTagName('title')[0].textContent;
            const id = item.getElementsByTagName('id')[0].textContent;
            const link = item.getElementsByTagName('link')[0].textContent;
            const image = item.getElementsByTagName('image')[0].textContent;
            const description = item.getElementsByTagName('text')[0].textContent;
            
            if (window.location.href.includes(id)) {
                document.title = `S_N00B | ${title}`;

                const spanElement = document.createElement('span');
                const lineBreak = document.createElement('br');
                spanElement.textContent = `${title}`;
                contentList.appendChild(spanElement);
                contentList.appendChild(lineBreak);
                contentList.appendChild(lineBreak);

                const listItemImage = document.createElement('li');
                const previewImage = document.createElement('img');
                
                previewImage.src = image;
                previewImage.className = 'logo';
                
                listItemImage.appendChild(previewImage);
                contentList.appendChild(listItemImage)

                if (tag === '[VIDEO]') {
                    const listItem = document.createElement('li');
                    const videoId = link.split('/').pop();
                    const embedElement = document.createElement('iframe');
                    embedElement.src = `https://www.youtube.com/embed/${videoId}`;
                    embedElement.width = "100%";
                    embedElement.style.aspectRatio = "16/9";
                    embedElement.style.border = "0";
                    embedElement.allowFullscreen = true;
                    embedElement.title = title;
                    
                    listItem.appendChild(embedElement);
                    contentList.appendChild(listItem);
                } else if (tag === '[DOWNLOAD]') {
                    const listItem = document.createElement('li');
                    const downloadLink = document.createElement('a');

                    downloadLink.href = link;
                    downloadLink.textContent = 'DOWNLOAD';

                    listItem.appendChild(downloadLink);
                    contentList.appendChild(listItem);
                }

                try {
                    const descriptionSpanItem = document.createElement('span');
                    const descriptionTextHolder = document.createElement('pre');

                    descriptionTextHolder.textContent = `${description}`;

                    descriptionSpanItem.appendChild(descriptionTextHolder);
                    contentList.appendChild(descriptionSpanItem);
                } catch (error) {
                    console.error('Error fetching entry Description:', error);
                }
                
                entryExists = true;
                break;
            }
        }
        
        if (!entryExists) {
            document.title = `S_N00B | 404`;
            const listItem = document.createElement('li');
            const errortext = document.createElement('span');

            errortext.textContent = ' 404 | Either the URL is wrong, or I deleted it. Either way, not here.';

            listItem.appendChild(errortext);
            contentList.appendChild(listItem);
        }
    } catch (error) {
        console.error('Error fetching RSS feed:', error);
    }
}

displayContent();
