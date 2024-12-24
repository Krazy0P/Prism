
// This function is executed only when the extension is installed or updated
// It's purpose here is only for the initial setup of the extension
chrome.runtime.onInstalled.addListener(() => {
    
    
    // If the settings are not already set, they are set to true, hence enabling the extension for YouTube and Instagram
    chrome.storage.local.get(['YouTube', 'Instagram'], (data) => {

        if (data.YouTube === undefined)
            chrome.storage.local.set({YouTube: true});

        if (data.Instagram === undefined)
            chrome.storage.local.set({Instagram: true});
    });
});