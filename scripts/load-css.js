function loadCSS() {
    chrome.storage.local.get('isEnabled', (result) => {
        if (result.isEnabled) {
            

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = browser.runtime.getURL('styles/search-result.css');
            document.head.appendChild(link);


            chrome.storage.local.get('themeColor', (result) => {
                const themeColor = result.themeColor || '#00ff00';
                const style = document.createElement('style');
                style.textContent = `
                    :root {
                        --retro-theme-color: ${themeColor};
                    } 
                        
                `;
                document.head.appendChild(style);
            });
        }
    


    })
}

loadCSS();
document.addEventListener('DOMContentLoaded', loadCSS);
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(loadCSS, 1000);
})

