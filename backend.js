chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url.includes("gp/video/detail")) {
        chrome.storage.sync.get('extensionEnabled', function (data) {
            const extensionEnabled = data.extensionEnabled !== false;

            if (extensionEnabled) {
                chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    files: ['remover.js']
                });
            }
        });
    }
});

// Listen for toggle messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.extensionEnabled !== undefined) {
        chrome.storage.sync.set({ extensionEnabled: message.extensionEnabled });
    }
});
