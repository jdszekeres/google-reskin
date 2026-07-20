
const suggestionsContainer = document.getElementById('suggestions-container');
const searchButton = document.getElementById('searchButton');
const enabledCheckbox = document.getElementById('enable');
const searchInput = document.getElementById('searchInput');

const greenButton = document.getElementById('green-button');
const blueButton = document.getElementById('blue-button');
const greyButton = document.getElementById('grey-button');



const url = "https://www.google.com/complete/s?q={query}&cp=1&client=gws-wiz&xssi=t&gs_pcrt=undefined&hl=en&authuser=0&psi=OdhbatHKMKXnkPIP0Ni5yQo.1784404026462&dpr=2.0000000596046448&pq=google%20text%20suggestions%20api";

let searchIndex = -1;



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



searchButton.addEventListener('click', () => {
    const query = searchInput.value;
    if (query.length > 0) {
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        window.location.href = searchUrl;
    }
});


const decodeHTMLEncoding = (str) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = str;
    return textarea.value;
}

function displaySuggestions(suggestions) {
    suggestionsContainer.innerHTML = '';
    suggestions.forEach(suggestion => {
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

searchInput.addEventListener('input', async (event) => {
    const query = event.target.value;
    if (query.length > 0) {
        const suggestions = await getSearchSuggestions(query);
        displaySuggestions(suggestions);
    } else {
        clearSuggestions();
    }
});

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') {
        event.preventDefault();
        searchIndex = Math.min(searchIndex + 1, suggestionsContainer.children.length - 1);
    } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        searchIndex = Math.max(searchIndex - 1, 0);
    } else if (event.key === 'Enter') {
        event.preventDefault();
        if (searchIndex >= 0 && searchIndex < suggestionsContainer.children.length) {
            const selectedSuggestion = suggestionsContainer.children[searchIndex];
            selectedSuggestion.click();
            searchIndex = -1; // Reset the index after selection
        } else {
            searchButton.click(); // Trigger the search button click if no suggestion is selected
        }
    } else if (event.key === 'Tab') {
        event.preventDefault();
        enabledCheckbox.focus(); // Move focus to the enable checkbox
    }

    // Update the visual highlight for the selected suggestion
    Array.from(suggestionsContainer.children).forEach((child, index) => {
        if (index === searchIndex) {
            child.style.backgroundColor = '#00ff00'; // Highlight color
            child.style.color = '#000000'; // Text color for better visibility
        } else {
            child.style.backgroundColor = ''; // Reset color
            child.style.color = ''; // Reset text color
        }

    });
})

enabledCheckbox.addEventListener('change', (event) => {
    const isEnabled = event.target.checked;
    chrome.storage.local.set({ isEnabled: isEnabled }, () => {
        console.log(`Extension is now ${isEnabled ? 'enabled' : 'disabled'}.`);
    })
});

enabledCheckbox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        enabledCheckbox.click(); // Toggle the checkbox on Enter key press
    } else if (event.key === 'Tab') {
        event.preventDefault();
        greenButton.focus(); // Move focus back to the search input
    }
});


function setColorCSS(newColor) {
    console.log('Setting color CSS to:', newColor);
    const styleElement = document.getElementById('theme-color-style');
    if (styleElement) {
        styleElement.remove();
    }
    const newStyleElement = document.createElement('style');
    newStyleElement.id = 'theme-color-style';
    newStyleElement.textContent = `
        :root {
            --retro-theme-color: ${newColor};
        }
    `;
    document.head.appendChild(newStyleElement);
}

function registerColorButtonHandlers(button,hex, nextButton) {
    button.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            button.click(); // Trigger the click event on Enter key press
        }
        else if (event.key === 'Tab') {
            event.preventDefault();
            nextButton.focus(); // Move focus to the next button
        }
    });
    button.addEventListener("click", () => {
        chrome.storage.local.set({ themeColor: hex }, () => {
            console.log(`Theme color set to ${hex}.`);
            updateSelectedColor(button);
            setColorCSS(hex);
        });
    });
}


registerColorButtonHandlers(greenButton, '#00ff00', blueButton);
registerColorButtonHandlers(blueButton, '#0080ff', greyButton);
registerColorButtonHandlers(greyButton, '#aaaaaa', searchInput);


function updateSelectedColor(selectedButton) {
    [greenButton, blueButton, greyButton].forEach(button => {
        if (button === selectedButton) {
            button.checked = true;
        } else {
            button.checked = false;
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    setColorCSS('#00ff00'); // Set default color on page load
    const searchInput = document.getElementById('searchInput');
    searchInput.focus();

    chrome.storage.local.get('isEnabled', (result) => {
        enabledCheckbox.checked = result.isEnabled === true;
    });

    chrome.storage.local.get('themeColor', (result) => {
        console.log('Theme color from storage:', result.themeColor);
        const themeColor = result.themeColor || '#00ff00';
        if (themeColor === '#00ff00') {
            greenButton.checked = true;
        } else if (themeColor === '#0080ff') {
            blueButton.checked = true;
        } else if (themeColor === '#aaaaaa') {
            greyButton.checked = true;
        }

        setColorCSS(themeColor);
        
    });
});