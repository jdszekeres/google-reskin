function loadSettings() {
    const isEnabled = chrome.storage.local.get('isEnabled', (result) => {
        if (result.isEnabled === undefined) {
            chrome.storage.local.set({ isEnabled: true }).then(() => {
                location.reload();
            });
        }
    });
}

loadSettings();