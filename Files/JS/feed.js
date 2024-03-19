const rssFeedURL = 'https://s-n00b-1.github.io/Website/Files/feed.xml';
            
async function displayRSSFeed() {
    try {
        const response = await fetch(rssFeedURL);
        const xmlData = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
        const items = xmlDoc.getElementsByTagName('item');
        
        const rssFeedList = document.getElementById('rssFeed');
    
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const tag = item.getElementsByTagName('description')[0].textContent;
            const title = item.getElementsByTagName('title')[0].textContent;
            const id = item.getElementsByTagName('id')[0].textContent;
        
            const listItem = document.createElement('li');
            const linkElement = document.createElement('a');
            linkElement.href = `https://s-n00b-1.github.io/Website/content?id=${id}`;
            linkElement.textContent = `${tag} ${title}`;
            listItem.appendChild(linkElement);
            rssFeedList.appendChild(listItem);
        }
    } catch (error) {
        console.error('Error fetching RSS feed:', error);
    }
}
displayRSSFeed();