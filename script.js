// Get DOM elements
const textInput = document.getElementById('textInput');
const uppercaseBtn = document.getElementById('uppercaseBtn');
const lowercaseBtn = document.getElementById('lowercaseBtn');
const titlecaseBtn = document.getElementById('titlecaseBtn');
const clearBtn = document.getElementById('clearBtn');
const copyBtn = document.getElementById('copyBtn');
const charCount = document.getElementById('charCount');
const wordCount = document.getElementById('wordCount');
const toast = document.getElementById('toast');

// Function to update character and word counts in real-time
function updateCounts() {
    const text = textInput.value;
    charCount.textContent = `Characters: ${text.length}`;
    // Split text into words, handling multiple spaces and trimming
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    wordCount.textContent = `Words: ${words.length}`;
}

// Function to convert text to uppercase
function toUppercase() {
    textInput.value = textInput.value.toUpperCase();
    updateCounts();
}

// Function to convert text to lowercase
function toLowercase() {
    textInput.value = textInput.value.toLowerCase();
    updateCounts();
}

// Function to convert text to title case
function toTitleCase() {
    // First, convert entire text to lowercase
    let text = textInput.value.toLowerCase();
    // Split into words, handling extra spaces
    const words = text.split(/\s+/);
    // Capitalize first letter of each word
    const titleCased = words.map(word => {
        if (word.length > 0) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word;
    }).join(' ');
    textInput.value = titleCased;
    updateCounts();
}

// Function to clear the text input
function clearText() {
    textInput.value = '';
    updateCounts();
}

// Function to copy text to clipboard and show toast
function copyToClipboard() {
    // Select the text
    textInput.select();
    textInput.setSelectionRange(0, 99999); // For mobile devices
    // Copy to clipboard
    document.execCommand('copy');
    // Show success toast
    showToast();
}

// Function to show toast message
function showToast() {
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Event listeners for buttons
uppercaseBtn.addEventListener('click', toUppercase);
lowercaseBtn.addEventListener('click', toLowercase);
titlecaseBtn.addEventListener('click', toTitleCase);
clearBtn.addEventListener('click', clearText);
copyBtn.addEventListener('click', copyToClipboard);

// Event listener for real-time count updates
textInput.addEventListener('input', updateCounts);

// Optional keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey) {
        switch (e.key) {
            case 'u':
                e.preventDefault();
                toUppercase();
                break;
            case 'l':
                e.preventDefault();
                toLowercase();
                break;
            case 't':
                e.preventDefault();
                toTitleCase();
                break;
            case 'c':
                e.preventDefault();
                clearText();
                break;
        }
    }
});

// Initialize counts on page load
updateCounts();
