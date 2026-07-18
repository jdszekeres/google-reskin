const elementsToHide = [
    'div.olrp5b',
    'a.XVMlrc[href*="udm=50"]',
    'a[href*="udm=50"]',
    'button.plR5qb',
    'button[jsname="B6rgad"]',
    '[data-streaming-container]',
    '[data-mcpr]'
];

function hideElements() {
    console.log('Hiding elements...');
    elementsToHide.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.style.display = 'none';
        });
    });
}

hideElements();
document.addEventListener('DOMContentLoaded', hideElements);
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(hideElements, 1000);
});