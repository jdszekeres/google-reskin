function hideElements() {
    chrome.storage.local.get('isEnabled', (result) => {
        if (result.isEnabled) {
            

            document.querySelectorAll('span').forEach(span => {
                if (span.textContent && span.textContent.trim() === 'People also searched for' || span.textContent.trim() === 'People also ask' || span.textContent.trim() === 'People also search for') {
                    const parentDiv = span.closest('div');
                    const grandparentDiv = parentDiv ? parentDiv.parentElement : null;
                    if (grandparentDiv) {
                        grandparentDiv.style.display = 'none';
                    }
                }
            })

            // Hide search gradient as well
            document.querySelectorAll('form[role="search"] div[jsname]').forEach(div => {
                if (div.style.background && div.style.background.includes('linear-gradient')) {
                    div.style.backgroundImage = 'none';
                }
            })
    }
})
}

hideElements();
document.addEventListener('DOMContentLoaded', hideElements);

document.addEventListener('scroll', hideElements); // Hide elements on scroll to catch dynamically loaded content