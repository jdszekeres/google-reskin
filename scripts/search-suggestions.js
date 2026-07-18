const url = "https://www.google.com/complete/s?q={query}&cp=1&client=gws-wiz&xssi=t&gs_pcrt=undefined&hl=en&authuser=0&psi=OdhbatHKMKXnkPIP0Ni5yQo.1784404026462&dpr=2.0000000596046448&pq=google%20text%20suggestions%20api";

function getSearchSuggestions(query) {
    const requestUrl = url.replace("{query}", encodeURIComponent(query));
    return fetch(requestUrl)
        .then(response => response.text())
        .then(data => {
            const jsonData = JSON.parse(data.substring(5));
            return jsonData[0];
        })
        .catch(error => {
            console.error("Error fetching search suggestions:", error);
            return [];
        });
}

const suggestionsContainer = document.getElementById('suggestions-container');

const decodeHTMLEncoding = (str) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = str;
    return textarea.value;
}

function displaySuggestions(suggestions) {
    suggestionsContainer.innerHTML = '';
    suggestions.forEach(suggestion => {
        console.log(typeof suggestion, suggestion);
        const suggestionData = suggestion[0].replace(/<[^>]*>/g, '');
        const suggestionElement = document.createElement('div');
        suggestionElement.textContent = decodeHTMLEncoding(suggestionData);

        suggestionElement.addEventListener('click', () => {
            const searchInput = document.getElementById('searchInput');
            searchInput.value = suggestionData;
            clearSuggestions();
        });
        suggestionsContainer.appendChild(suggestionElement);
    });
}

function clearSuggestions() {
    suggestionsContainer.innerHTML = '<div>&nbsp;</div>'.repeat(10); //Keep the spacing
}

clearSuggestions(); // Clear suggestions on page load

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', async (event) => {
    const query = event.target.value;
    if (query.length > 0) {
        const suggestions = await getSearchSuggestions(query);
        displaySuggestions(suggestions);
    } else {
        clearSuggestions();
    }
});


const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', () => {
    const query = searchInput.value;
    if (query.length > 0) {
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        window.location.href = searchUrl;
    }
});