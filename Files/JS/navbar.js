const navbar = 'https://s-n00b-1.github.io/Website/Files/HTML/navbar.html';
            
async function displayNavbar() {
    try {
        const response = await fetch(navbar);
        const htmlData = await response.text();
        document.body.insertAdjacentHTML('afterbegin', htmlData);
    } catch (error) {
        console.error('Error fetching Navbar:', error);
    }
}
displayNavbar();