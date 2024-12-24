

// Corresponds to the "YouTube" and "Instagram" checkboxes
let youTube = document.getElementById('YouTube');
let instagram = document.getElementById('Instagram');

// Checks the current value of the checkboxes and reflects them accordingly in the popup
// Wrapped in a function so that it does not throw an error
function checked() {

    chrome.storage.local.get(['YouTube'], (data) => {
        youTube.checked = data.YouTube;
    });

    chrome.storage.local.get(['Instagram'], (data) => {
        instagram.checked = data.Instagram;
    });
}

// listens for changes in the checkboxes and sets the value in the local storage accordingly
youTube.addEventListener('change', (event) => {
    let value = event.target.checked;

    chrome.storage.local.set({YouTube: value});
});

instagram.addEventListener('change', (event) => {
    let value = event.target.checked;

    chrome.storage.local.set({Instagram: value});
});

// Calls the function at the end
checked();