chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.create({ url: browser.runtime.getURL('pages/index.html') });
})