
// Checks if the extension is enabled for YouTube at the time of loading the page
chrome.storage.local.get(['YouTube']).then((data) => {

    // If the extension is enabled, the user is redirected to the channel homepage
    if (data.YouTube)
        redirect();
});

// Listens for changes in the extension's settings
chrome.storage.onChanged.addListener((changes, area) => {

    // If the changes are not in the local storage or the YouTube setting hasn't changed, nothing happens
    if (area !== 'local' || !changes['YouTube'])
        return;
    
    // Redirects to the channel homepage according to the new value of the YouTube variable
    if (changes['YouTube'].newValue === true)
        redirect();
});

// Redirects to the YouTube homepage in the current tab
function redirect() {
    // Grabs the url of the current page and removes the "/shorts" part
    let url = window.location.href;
    let newUrl = url.substring(0, url.indexOf("/shorts"));

    // Redirects to the new URL in the same tab
    window.open(newUrl, '_self');
}