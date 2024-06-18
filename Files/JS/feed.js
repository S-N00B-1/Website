const rssFeedURL = 'https://s-n00b-1.github.io/Website/Files/feed.xml';
            
async function displayRSSFeed() {
    try {
        const response = await fetch(rssFeedURL);
        const xmlData = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
        const items = xmlDoc.getElementsByTagName('item');
        
        const rssFeedList = document.getElementById('rssFeed');
        rssFeedList.dataset.sort = "newest";

        const sortButton = document.getElementsByClassName('sortButton');
        sortButton.title = "Sort by: Oldest";
    
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

async function RSSFeedSortOldest() {
    try {
        const response = await fetch(rssFeedURL);
        const xmlData = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
        const items = xmlDoc.getElementsByTagName('item');
        
        const rssFeedList = document.getElementById('rssFeed');
        rssFeedList.dataset.sort = "oldest";

        const liElements = rssFeedList.querySelectorAll('li');
        for (let i = 0; i < liElements.length; i++) {
            const liItem = liElements[i];
            liItem.remove();
        }
        for (let i = items.length - 1; i >= 0; i--) {
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
        console.error('Error sorting RSS feed:', error);
    }
}

async function RSSFeedSortNewest() {
    try {
        const response = await fetch(rssFeedURL);
        const xmlData = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
        const items = xmlDoc.getElementsByTagName('item');
        
        const rssFeedList = document.getElementById('rssFeed');
        rssFeedList.dataset.sort = "newest";

        const liElements = rssFeedList.querySelectorAll('li');
        for (let i = 0; i < liElements.length; i++) {
            const liItem = liElements[i];
            liItem.remove();
        }
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
        console.error('Error sorting RSS feed:', error);
    }
}

function changeSort() {
    try {
        const rssFeedList = document.getElementById('rssFeed');
        const sortButton = document.getElementsByClassName('sortButton');
        if (rssFeedList.dataset.sort == "newest") {
            RSSFeedSortOldest();
            sortButton.title = "Sort by: Newest";
        } else {
            RSSFeedSortNewest();
            sortButton.title = "Sort by: Oldest";
        }
    } catch (error) {
        console.error('Unable to change sort:', error)
    }
}