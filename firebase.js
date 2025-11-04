// Firebase configuration
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import {
    getAuth
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import {
    getFirestore
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyC--ILDtW-8IDjIaMC4dk2YhzhCLDL0-wA",
    authDomain: "personal-task-manager-f34de.firebaseapp.com",
    projectId: "personal-task-manager-f34de",
    storageBucket: "personal-task-manager-f34de.firebasestorage.app",
    messagingSenderId: "503304629561",
    appId: "1:503304629561:web:a85b9a3c790dd0c68d4ce8",
    measurementId: "G-6MSJ0CWZGM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export for use in other modules
export { auth, db };
