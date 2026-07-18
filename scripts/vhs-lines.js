function tagVHSImages() {

    chrome.storage.local.get('isEnabled', (result) => {
        if (result.isEnabled) {
            const images = document.querySelectorAll(`
                div[role="button"]:not([aria-hidden="true"]) div:has(img[data-atf]), 
                a[data-ctpacw] div:has(img[data-deferred]),
                div[data-lpage] div:has(img)`);
            images.forEach((image, index) => {
                image.id = image.id = `vhs-image-${index}`;
            });
        }
    })
}

tagVHSImages();
document.addEventListener('DOMContentLoaded', tagVHSImages);

const observer_vhs = new MutationObserver(tagVHSImages);
observer_vhs.observe(document.body, {
    childList: true,
    subtree: true
});