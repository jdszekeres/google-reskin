const elementsToHide = [
    'div.olrp5b',
    'a.XVMlrc[href*="udm=50"]',
    'a[href*="udm=50"]',
    'button.plR5qb',
    'button[jsname="B6rgad"]',
    '[data-streaming-container]',
    '[data-mcpr]',
    'div[data-local-shopping-subvertical="LOCAL_SHOPPING_SUBVERTICAL_GENERIC"]'
];

function hideElements() {
    chrome.storage.local.get('isEnabled', (result) => {
        if (result.isEnabled) {
            elementsToHide.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(element => {
                    element.style.display = 'none';
                });
            });
    }})
}

hideElements();
document.addEventListener('DOMContentLoaded', hideElements);
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(hideElements, 1000);
});