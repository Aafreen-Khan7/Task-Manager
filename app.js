// Import Firebase configuration
import { auth, db } from './firebase.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

// Import other modules
import './auth.js';
import './tasks.js';
import { handleLogout } from './auth.js';
import { initializeTasks } from './tasks.js';

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check auth state
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in
            showTasksSection();
            initializeTasks();
        } else {
            // User is signed out
            showAuthSection();
        }
    });
});

function showAuthSection() {
    document.getElementById('authSection').classList.remove('hidden');
    document.getElementById('tasksSection').classList.add('hidden');
    updateAuthButtons(false);
}

function showTasksSection() {
    document.getElementById('authSection').classList.add('hidden');
    document.getElementById('tasksSection').classList.remove('hidden');
    updateAuthButtons(true);
}

function updateAuthButtons(isLoggedIn) {
    const navAuth = document.getElementById('navAuth');
    if (isLoggedIn) {
        navAuth.innerHTML = `
            <button class="auth-btn logout-btn" id="logoutBtn">Logout</button>
        `;
        document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    } else {
        navAuth.innerHTML = `
            <button class="auth-btn login-btn" id="loginNavBtn">Login</button>
        `;
        // Add event listener for login button in nav
        document.getElementById('loginNavBtn').addEventListener('click', () => {
            showAuthSection();
        });
    }
}
