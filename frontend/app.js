// Configuration
// const STORAGE_KEY = 'weightEntries';
const API_BASE = '';

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

    document.getElementById('save-btn').addEventListener('click', saveWeight);
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
 * Save weight entry to backend
 */
async function saveWeight() {
    const weight = document.getElementById('weight').value;
    const date = document.getElementById('date').value;
    
    // Validation
    if (!weight || !date) {
        alert('Please enter both weight and date');
        return;
    }
    
    try {
        // Send to backend
        const response = await fetch(`${API_BASE}/api/weights`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                weight: parseFloat(weight),
                date: date
            })
        });
        
        if (!response.ok) {
            throw new Error('Failed to save weight');
        }
        
        const result = await response.json();
        console.log('Saved to backend:', result);
        
        // Show success feedback
        showSaveSuccess();
        
        // Clear weight input (keep date for convenience)
        document.getElementById('weight').value = '';
        
        // Refresh display
        await displayEntries();
        
    } catch (error) {
        console.error('Error saving weight:', error);
        alert('Failed to save weight. Check console for details.');
    }
}

/**
 * Display all entries from backend
 */
async function displayEntries() {
    const container = document.getElementById('entries');
    
    try {
        // Fetch from backend
        const response = await fetch(`${API_BASE}/api/weights`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch weights');
        }
        
        const data = await response.json();
        const entries = data.weights;
        
        console.log('Fetched from backend:', entries);
        
        if (entries.length === 0) {
            container.innerHTML = '<p style="color: #999;">No entries yet</p>';
            return;
        }
        
        // Sort by date (newest first)
        entries.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        container.innerHTML = entries.map(entry => 
            `<div class="entry">
                <strong>${formatDate(entry.date)}</strong>: ${entry.weight} lbs
            </div>`
        ).join('');
        
    } catch (error) {
        console.error('Error fetching weights:', error);
        container.innerHTML = '<p style="color: red;">Failed to load weights</p>';
    }
}

function showSaveSuccess() {
    const button = document.querySelector('button');
    const originalText = button.textContent;

    button.textContent = '✓ Saved!';
    button.style.background = '#34C759';

    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '#007AFF';
    }, 1000);
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