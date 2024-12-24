
// CSS script to put into the page
const cssOBJ = `
    ytd-mini-guide-entry-renderer[aria-label='Shorts'], /* Small button in collapsed side panel */
    ytd-guide-entry-renderer:has(a[title='Shorts']), /* Big button in active side panel  */
    ytd-rich-section-renderer:has(ytd-rich-shelf-renderer[is-shorts]), /* Shorts panel in main page */
    ytd-reel-shelf-renderer:has(yt-horizontal-list-renderer), /* Shorts panel in searched results */
    ytd-video-renderer:has(a[href^="/shorts/"]), /* Shorts in normal feed */
    yt-tab-shape[tab-title="Shorts"], /* Shorts button in channel page */
    yt-chip-cloud-chip-renderer:has(yt-formatted-string[title="Shorts"]), /* Shorts in liked videos page */
    yt-chip-cloud-chip-renderer[chip-style='STYLE_DEFAULT']:has(yt-formatted-string[title="All"]) /* "All" in liked videos page */
    {
        visibility: hidden;
        display: none;
    }
`;

// Variable to store the style element
let styleElement = null;

function applyCSS() {
    // If the style element already exists, nothing happens
    if (styleElement)
        return;

    // Creates a new style element and appends it to the head
    styleElement = document.createElement('style');
    styleElement.id = 'PrismYouTubeCSS';
    styleElement.textContent = cssOBJ;
    document.head.appendChild(styleElement);
}

function removeCSS() {
    // If the style element doesn't exist, nothing happens
    if (styleElement === null)
        return;

    // Removes the style element from the head
    styleElement.parentNode.removeChild(styleElement);
    styleElement = null;
}

// Checks if the extension is enabled for YouTube at the time of loading the page
chrome.storage.local.get(['YouTube']).then((data) => {

    // If the extension is enabled, the CSS is applied
    if (data.YouTube)
        applyCSS();
});

// Listens for changes in the extension's settings
chrome.storage.onChanged.addListener((changes, area) => {

    // If the changes are not in the local storage or the YouTube setting hasn't changed, nothing happens
    if (area !== 'local' || !changes['YouTube'])
        return;

    // Applies or Removes CSS according to the new value of the YouTube variable
    if (changes['YouTube'].newValue === true) {
        applyCSS();
    } else {
        removeCSS();
    }
});