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

        rssFeedList.dataset.filter = "all";

        const sortButton = document.getElementById('sortButton');
        sortButton.title = "Sort by: Oldest";

        const filterButton = document.getElementById('filterButton');
        filterButton.title = "Filter by: Videos";
    
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
        const sortButton = document.getElementById('sortButton');
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

function changeFilter() {
    try {
        const rssFeedList = document.getElementById('rssFeed');
        const filterButton = document.getElementById('filterButton');
        if (rssFeedList.dataset.filter == "all") {
            filterButton.title = "Filter by: Downloads";
            rssFeedList.dataset.filter = "videos"; 
            filterVideosOnly();
        } else if (rssFeedList.dataset.filter == "videos") {
            filterButton.title = "Filter by: All";
            rssFeedList.dataset.filter = "downloads";
            filterDownloadsOnly();
        } else { // rssFeedList.dataset.filter == "downloads"
            filterButton.title = "Filter by: Videos";
            rssFeedList.dataset.filter = "all";
            filterReset();
        }
    } catch (error) {
        console.error('Unable to change filter:', error)
    }
}

function filterReset() {
    const rssFeedList = document.getElementById('rssFeed');
    const liElements = rssFeedList.querySelectorAll('li');
    for (let i = 0; i < liElements.length; i++) {
        const liItem = liElements[i];
        liItem.style.display = '';
    }
}

function filterVideosOnly() {
    filterReset();
    const rssFeedList = document.getElementById('rssFeed');
    const liElements = rssFeedList.querySelectorAll('li');
    for (let i = 0; i < liElements.length; i++) {
        const liItem = liElements[i];
        if (!(liItem.textContent.includes('[VIDEO]'))) {
            liItem.style.display = 'none';
        }
    }
}

function filterDownloadsOnly() {
    filterReset();
    const rssFeedList = document.getElementById('rssFeed');
    const liElements = rssFeedList.querySelectorAll('li');
    for (let i = 0; i < liElements.length; i++) {
        const liItem = liElements[i];
        if (!(liItem.textContent.includes('[DOWNLOAD]'))) {
            liItem.style.display = 'none';
        }
    }
}

function filterBlogOnly() {
    filterReset();
    const rssFeedList = document.getElementById('rssFeed');
    const liElements = rssFeedList.querySelectorAll('li');
    for (let i = 0; i < liElements.length; i++) {
        const liItem = liElements[i];
        if (!(liItem.textContent.includes('[BLOG]'))) {
            liItem.style.display = 'none';
        }
    }
}