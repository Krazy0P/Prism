


// Checks if the extension is enabled for YouTube at the time of loading the page
chrome.storage.local.get(['YouTube']).then((data) => {

    // If the extension is enabled, the user is redirected to the YouTube homepage
    if (data.YouTube)
        redirect();
});

// Listens for changes in the extension's settings
chrome.storage.onChanged.addListener((changes, area) => {

    // If the changes are not in the local storage or the YouTube setting hasn't changed, nothing happens
    if (area !== 'local' || !changes['YouTube'])
        return;
    
    // Redirects to the YouTube homepage according to the new value of the YouTube variable
    if (changes['YouTube'].newValue === true)
        redirect();
});

// Redirects to the YouTube homepage in the current tab
function redirect() {
    window.open('https://www.youtube.com/', '_self');
}