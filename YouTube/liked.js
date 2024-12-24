
// Checks if the extension is enabled for YouTube at the time of loading the page
chrome.storage.local.get(['YouTube']).then((data) => {
    
    // If the extension is enabled, user is redirected to the "Videos" tab in the liked videos page
    if (data.YouTube)
        redirectToVideos();
});

// Listens for changes in the extension's settings
chrome.storage.onChanged.addListener((changes, area) => {

    // If the changes are not in the local storage or the YouTube setting hasn't changed, nothing happens
    if (area !== 'local' || !changes['YouTube'])
        return;

    // Redirects the user to the "Videos" tab in the liked videos page
    if (changes['YouTube'].newValue === true) {
        
        // So because this snippet works only after the page has loaded, we need to check seperately if the buttons have loaded
        // Directly selects the "Videos" button and clicks it
        const videoBtn = document.querySelectorAll('yt-chip-cloud-chip-renderer')[1];
        videoBtn.click();
    }
});

// Redirects the user to the "Videos" tab in the liked videos page
function redirectToVideos() {

    // Waits for the page to load
    window.addEventListener("load", () => {
    
        // Interval for if the buttons are not loaded
        const interval = setInterval(() => {
            
            // Gets the three buttons, "All", "Videos" and "Shorts"
            const buttons = document.querySelectorAll('yt-chip-cloud-chip-renderer');
            

            // If the buttons haven't loaded yet, nothing happens
            if (!buttons)
                return;
            
            // Corresponds to the "Videos" button and clicks it, thus redirecting the user to the "Videos" tab
            const videoBtn = buttons[1];
            videoBtn.click();
    
            // Clears the interval
            clearInterval(interval);
        }, 500);
    });
}