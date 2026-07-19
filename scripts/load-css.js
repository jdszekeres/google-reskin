function loadCSS() {
    chrome.storage.local.get('isEnabled', (result) => {
        if (result.isEnabled) {
            

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = browser.runtime.getURL('styles/search-result.css');
            document.head.appendChild(link);

        }


    })
}

loadCSS();
document.addEventListener('DOMContentLoaded', loadCSS);
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(loadCSS, 1000);
})