
// CSS script to put into the page
// Yeah, pretty long class names, but I can't do anything about it
const cssOBJ = `
    /* Reels in side panel */
    span[class="x4k7w5x x1h91t0o x1h9r5lt x1jfb8zj xv2umb2 x1beo9mf xaigb6o x12ejxvf x3igimt xarpa2k xedcshv x1lytzrv x1t2pt76 x7ja8zs x1qrby5j"]:has(a[href^="/reels/"]),

    /* Explore in side panel */
    span[class="x4k7w5x x1h91t0o x1h9r5lt x1jfb8zj xv2umb2 x1beo9mf xaigb6o x12ejxvf x3igimt xarpa2k xedcshv x1lytzrv x1t2pt76 x7ja8zs x1qrby5j"]:has(a[href="/explore/"]),

    /* Reels in instagram homepage */
    article[class=""]:has(video),

    a[href*='/reels/'][role="tab"]

    /* div[class*="x1qjc9v5 x972fbf xcfux6l x1qhh985 xm0m39n x9f619 x1lliihq xdt5ytf x2lah0s"]:has(svg[aria-label="Reel"]) /* Reels in explore section */
    {
        width: 0;
        max-width: 0;
        height: 0;
        max-height: 0;
        visibility: hidden;
        display: none;
    }
`;

// Variable to store the style element
let styleElement = null;

// Checks if the extension is enabled for Instagram at the time of loading the page
chrome.storage.local.get(['Instagram']).then((data) => {

    // If the extension is enabled, the features are enabled
    if (data.Instagram)
        enablePrismForInstagram();
});

// Listens for changes in the extension's settings
chrome.storage.onChanged.addListener((changes, area) => {
    // If the changes are not in the local storage or the Instagram setting hasn't changed, nothing happens
    if (area !== 'local' || !changes['Instagram'])
        return;

    // Applies or Removes CSS according to the new value of the Instagram variable
    if (changes['Instagram'].newValue === true) {
        enablePrismForInstagram()
    } else {
        removeCSS();
    }
});

window.addEventListener("popstate", enablePrismForInstagram);


// Applies the CSS to the page
function applyCSS() { 
    // If the style element already exists, nothing happens
    if (styleElement)
        return;

    // Creates a new style element and appends it to the head
    styleElement = document.createElement('style');
    styleElement.id = 'PrismInstagramCSS';
    styleElement.textContent = cssOBJ;
    document.head.appendChild(styleElement);
}

// Removes the CSS from the page
function removeCSS() {
    // If the style element doesn't exist, nothing happens
    if (styleElement === null)
        return;

    // Removes the style element from the head
    styleElement.parentNode.removeChild(styleElement);
    styleElement = null;
}

// Enables all the features of the extension for Instagram
function enablePrismForInstagram() {
    applyCSS();

    if (window.location.href === 'https://www.instagram.com/explore/' || window.location.href.includes('https://www.instagram.com/reels/')) {
        redirectToHomePage();
    }

    else if (window.location.href.endsWith('/reels/')) {
        redirectToUserpage();
    }
}

// Redirects to the Instagram homepage in the current tab
function redirectToHomePage() {
    window.open('https://www.instagram.com/', '_self');
}

// Redirects to the account page in the current tab
function redirectToUserpage() {
    let currentLocation = window.location.href;
    currentLocation = currentLocation.substring(0, currentLocation.indexOf('reels'));
    
    // Redirects the user to the account page in the current tab
    window.open(currentLocation, '_self');
}