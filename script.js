
const sampleText = "The quick brown fox jumps over the lazy dog. Programming is both an art and a science, requiring creativity and logical thinking. Technology continues to shape our world in unprecedented ways.";

let currentInput = '';
let startTime = null;
let mistakes = 0;
let isActive = false;
let results = null;

// DOM Elements
const inputArea = document.getElementById('input-area');
const sampleTextElement = document.getElementById('sample-text');
const statsElement = document.getElementById('stats');
const resultsElement = document.getElementById('results');
const progressBar = document.querySelector('.progress-bar');
const retryButton = document.getElementById('retry-button');

// Initialize
function init() {
    // Display sample text with spans
    sampleTextElement.innerHTML = sampleText.split('').map((char, index) => 
        `<span id="char-${index}">${char}</span>`
    ).join('');

    // Focus input
    inputArea.focus();
}

// Calculate statistics
function calculateStats() {
    const timeInMinutes = (Date.now() - startTime) / 60000;
    const wordsTyped = currentInput.trim().split(/\s+/).length;
    const wpm = Math.round(wordsTyped / timeInMinutes);
    const accuracyPercentage = Math.max(0, Math.min(100, 
        Math.round(((currentInput.length - mistakes) / currentInput.length) * 100)
    ));

    return {
        wpm,
        accuracy: accuracyPercentage,
        mistakes,
        time: Math.round(timeInMinutes * 60)
    };
}

// Update stats display
function updateStats() {
    const stats = calculateStats();
    document.getElementById('wpm').textContent = stats.wpm;
    document.getElementById('accuracy').textContent = `${stats.accuracy}%`;
    document.getElementById('mistakes').textContent = stats.mistakes;
}

// Show results
function showResults(stats) {
    resultsElement.classList.remove('hidden');
    resultsElement.classList.add('visible');
    
    document.getElementById('final-wpm').textContent = stats.wpm;
    document.getElementById('final-accuracy').textContent = `${stats.accuracy}%`;
    document.getElementById('final-time').textContent = `${stats.time}s`;
    
    showToast('Test Complete!', `You typed at ${stats.wpm} WPM with ${stats.accuracy}% accuracy.`);
}

// Handle input
function handleInput(e) {
    currentInput = e.target.value;
    
    if (!isActive && currentInput.length > 0) {
        isActive = true;
        startTime = Date.now();
        statsElement.classList.remove('hidden');
        statsElement.classList.add('visible');
    }

    // Update progress bar
    const progress = (currentInput.length / sampleText.length) * 100;
    progressBar.style.width = `${progress}%`;

    // Check each character
    for (let i = 0; i < sampleText.length; i++) {
        const charElement = document.getElementById(`char-${i}`);
        charElement.className = ''; // Reset classes

        if (i < currentInput.length) {
            if (currentInput[i] === sampleText[i]) {
                charElement.classList.add('correct');
            } else {
                charElement.classList.add('incorrect');
                if (i === currentInput.length - 1) {
                    mistakes++;
                }
            }
        } else if (i === currentInput.length) {
            charElement.classList.add('current');
        }
    }

    // Update stats
    if (isActive) {
        updateStats();
    }

    // Check if test is complete
    if (currentInput.length >= sampleText.length) {
        const finalStats = calculateStats();
        showResults(finalStats);
        inputArea.disabled = true;
    }
}

// Show toast notification
function showToast(title, message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <div>
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
    `;
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('visible'), 100);
    
    // Remove toast after 5 seconds
    setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

// Reset test
function resetTest() {
    currentInput = '';
    startTime = null;
    mistakes = 0;
    isActive = false;
    results = null;
    
    inputArea.value = '';
    inputArea.disabled = false;
    progressBar.style.width = '0';
    
    statsElement.classList.remove('visible');
    statsElement.classList.add('hidden');
    resultsElement.classList.remove('visible');
    resultsElement.classList.add('hidden');
    
    init();
}

// Event listeners
inputArea.addEventListener('input', handleInput);
retryButton.addEventListener('click', resetTest);
window.addEventListener('load', init);

// Handle focus
document.addEventListener('click', () => {
    if (!inputArea.disabled) {
        inputArea.focus();
    }
});
