// Configuration
const STORAGE_KEY = 'weightEntries';

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

/**
 * Main initialization function
 */
function initializeApp() {
    // Handle URL parameters from iOS Shortcut
    handleURLParameters();
    
    // Display existing entries
    displayEntries();
    
    // Set default date if empty
    setDefaultDate();
}

/**
 * Read and process URL parameters (for iOS Shortcuts)
 */
function handleURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const weight = urlParams.get('weight');
    const date = urlParams.get('date');
    
    if (weight) {
        document.getElementById('weight').value = weight;
    }
    
    if (date) {
        document.getElementById('date').value = date;
    }
    
    // Auto-save if both parameters are present
    if (weight && date) {
        saveWeight();
        // Clear URL parameters after saving to prevent duplicate saves
        window.history.replaceState({}, '', window.location.pathname);
    }
}

/**
 * Set today's date as default if date field is empty
 */
function setDefaultDate() {
    const dateInput = document.getElementById('date');
    if (!dateInput.value) {
        dateInput.value = new Date().toISOString().split('T')[0];
    }
}

/**
 * Save weight entry to localStorage
 */
function saveWeight() {
    const weight = document.getElementById('weight').value;
    const date = document.getElementById('date').value;
    
    // Validation
    if (!weight || !date) {
        alert('Please enter both weight and date');
        return;
    }
    
    // Get existing entries
    const entries = getEntries();
    
    // Add new entry
    entries.push({
        weight: parseFloat(weight),
        date: date,
        timestamp: new Date().toISOString()
    });
    
    // Sort by date (newest first)
    entries.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Save to localStorage
    saveEntries(entries);
    
    // Clear weight input (keep date for convenience)
    document.getElementById('weight').value = '';
    
    // Refresh display
    displayEntries();
}

/**
 * Display all entries from localStorage
 */
function displayEntries() {
    const entries = getEntries();
    const container = document.getElementById('entries');
    
    if (entries.length === 0) {
        container.innerHTML = '<p style="color: #999;">No entries yet</p>';
        return;
    }
    
    container.innerHTML = entries.map(entry => 
        `<div class="entry">
            <strong>${formatDate(entry.date)}</strong>: ${entry.weight} lbs
        </div>`
    ).join('');
}

/**
 * Get entries from localStorage
 */
function getEntries() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

/**
 * Save entries to localStorage
 */
function saveEntries(entries) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

/**
 * Format date for display (optional - makes dates look nicer)
 */
function formatDate(dateString) {
    const date = new Date(dateString + 'T00:00:00'); // Prevent timezone issues
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}