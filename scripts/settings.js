function loadSettings() {
    chrome.storage.local.get('isEnabled', (result) => {
        if (result.isEnabled === undefined) {
            chrome.storage.local.set({ isEnabled: true }).then(() => {
                location.reload();
            });
        }
    });

    chrome.storage.local.get('themeColor', (result) => {
        if (result.themeColor === undefined) {
            chrome.storage.local.set({ themeColor: '#00ff00' }).then(() => {
                location.reload();
            });
        }
    });
}

loadSettings();