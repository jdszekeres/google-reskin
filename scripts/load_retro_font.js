function loadFont() {
    var font = document.createElement('style');
        font.type = 'text/css';
        font.textContent = '@font-face { font-family: "IBM BIOS"; src: url("'
            + browser.runtime.getURL('assets/Ac437_IBM_BIOS-2y.ttf')
            + '"); }';
    document.head.appendChild(font);
}

loadFont();
document.addEventListener('DOMContentLoaded', loadFont);
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(loadFont, 1000);
})