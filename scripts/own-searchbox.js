function getSearchQueryFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('q');
}

function createSearchBox() {
    const form = document.querySelector('header');
    const searchBox = document.createElement('section');
    searchBox.id = 'custom-search-box';
    searchBox.style.display = 'flex';
    searchBox.style.alignItems = 'center';
    searchBox.style.justifyContent = 'center';
    searchBox.style.marginTop = '10px';
    searchBox.style.width = 'calc(100vw - 20px)';
    searchBox.style.caretShape = 'block';
    searchBox.style.padding = '10px';


    const input = document.createElement('span');
    input.contentEditable = 'true';
    input.id = 'searchInput';
    input.placeholder = 'Search Google...';
    input.style.flex = '1';
    input.style.padding = '10px 0px 10px 10px';
    input.style.fontSize = '16px';
    input.style.borderRadius = '0px';
    input.style.border = '1px solid #0f0';
    input.style.width = '50vw';

    input.textContent = getSearchQueryFromURL() || '';

    const button = document.createElement('button');
    button.id = 'searchButton';
    button.textContent = 'Search';
    button.style.marginLeft = '10px';
    button.style.padding = '10px 20px';
    button.style.fontSize = '16px';
    button.style.borderRadius = '0px';
    button.style.border = 'none';
    button.style.backgroundColor = 'transparent';
    button.style.border = '1px solid #0f0';
    button.style.color = '#0f0';
    button.style.cursor = 'pointer';

    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const query = input.textContent.trim();
            if (query) {
                button.click(); // Trigger the search button click
            }
        }
    });
    

    button.addEventListener('click', () => {
        const query = input.textContent.trim();
        if (query) {
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            window.location.replace(searchUrl);            
        }
    });

    searchBox.appendChild(input);
    searchBox.appendChild(button);
    document.body.insertBefore(searchBox, document.body.firstChild);

    setTimeout(() => {
        const searchInput = document.getElementById('searchInput');
        searchInput.onclick = (e) => {e.preventDefault(); e.stopImmediatePropagation(); searchInput.focus();};
        searchInput.onfocus = () => {};
    }, 100);
}

createSearchBox();
document.addEventListener('DOMContentLoaded', createSearchBox);
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(createSearchBox, 1000);
})