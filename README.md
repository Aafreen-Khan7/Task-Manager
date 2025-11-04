# TaskMaster - Firebase Task Manager

A modern, responsive task management web application built with Firebase Authentication and Firestore for real-time data synchronization. Features user authentication, CRUD operations, task categorization, and filtering.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Usage](#usage)
   - [Testing](#testing)

## 🚀 Overview

**TaskMaster** is a full-stack web application that provides a seamless task management experience with real-time synchronization across devices. Built with modern web technologies, it offers a clean, intuitive interface for managing personal tasks with categories, due dates, and completion tracking.

### Key Features:
- ✅ **User Authentication** - Secure signup/login with Firebase Auth
- 📝 **Task Management** - Create, read, update, and delete tasks
- 🏷️ **Categorization** - Organize tasks by Personal, Work, Shopping, Health
- 📅 **Due Dates** - Set and track task deadlines
- 🔍 **Smart Filtering** - View All, Active, or Completed tasks
- 📱 **Responsive Design** - Works perfectly on desktop and mobile
- 🔄 **Real-time Sync** - Instant updates across all devices
- 🌙 **Modern UI** - Clean, gradient-based design with smooth animations

### Tech Stack:
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Backend**: Firebase (Authentication & Firestore)
- **Styling**: Custom CSS with Flexbox/Grid layouts
- **Architecture**: Modular JavaScript with Firebase SDK

## 🛠️ Getting Started

### Prerequisites

Before running this project, ensure you have the following installed:

- **A modern web browser** (Chrome, Firefox, Safari, Edge)
- **A code editor** (VS Code recommended)
- **Node.js** (v14 or higher) - for local development server (optional)
- **Git** - for version control

### Firebase Setup Requirements:
1. **Firebase Account** - Create at [Firebase Console](https://console.firebase.google.com)
2. **Firebase Project** - Set up a new project in Firebase Console
3. **Firestore Database** - Enable Firestore in test mode
4. **Authentication** - Enable Email/Password authentication

### Installation

#### Method 1: Simple File Setup (Recommended for Beginners)

1. **Download the project files:**
   ```bash
   # Clone or download all provided files to a single folder
   # Folder structure should look like:
   # project-folder/
   # ├── index.html
   # ├── css/
   # │   └── style.css
   # ├── js/
   # │   ├── firebase.js
   # │   ├── app.js
   # │   ├── auth.js
   # │   └── tasks.js
   ```

2. **Configure Firebase:**
   - Open `js/firebase.js`
   - Replace the `firebaseConfig` object with your Firebase project settings:
   ```javascript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "your-sender-id",
     appId: "your-app-id"
   };
   ```

3. **Run the application:**
   - Open `index.html` in a web browser
   - Or use a local server for better functionality

#### Method 2: Using Local Server (Advanced)

1. **Set up local development server:**
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Node.js http-server
   npx http-server

   # Using Live Server (VS Code extension)
   # Install Live Server extension and right-click index.html
   ```

2. **Access the application:**
   - Open `http://localhost:8000` in your browser

#### Method 3: Deploy to Web Hosting

1. **Deploy to Firebase Hosting:**
   ```bash
   # Install Firebase CLI
   npm install -g firebase-tools

   # Login and initialize
   firebase login
   firebase init hosting

   # Deploy
   firebase deploy
   ```

2. **Deploy to Netlify:**
   - Drag and drop your project folder to Netlify dashboard
   - Or connect your GitHub repository

### Usage

#### First-Time Setup:

1. **Create an Account:**
   - Open the application in your browser
   - Click "Sign up" on the login form
   - Enter your full name, email, and password
   - Click "Create Account"

2. **Add Your First Task:**
   - After logging in, you'll see the task management interface
   - Use the "Add New Task" form at the top
   - Enter task title, select category, and set due date (optional)
   - Click "Add Task"

#### Managing Tasks:

- **Mark Complete**: Click the checkbox next to any task
- **Edit Task**: Click the ✏️ (edit) button to modify task title
- **Delete Task**: Click the 🗑️ (delete) button to remove tasks
- **Filter Tasks**: Use the filter buttons (All, Active, Completed)

#### Categories Available:
- **Personal** - Daily personal tasks and reminders
- **Work** - Professional and job-related tasks
- **Shopping** - Shopping lists and store reminders
- **Health** - Fitness, medical, and wellness tasks

#### Keyboard Shortcuts:
- **Enter** - Submit forms
- **Tab** - Navigate between form fields

### Testing

#### Manual Testing Checklist:

1. **Authentication Testing:**
   - [ ] User registration with valid credentials
   - [ ] User login with correct credentials
   - [ ] Login failure with wrong credentials
   - [ ] User logout functionality
   - [ ] Session persistence on page refresh

2. **Task Management Testing:**
   - [ ] Add new task with all fields
   - [ ] Add task with only required fields
   - [ ] Mark task as complete/incomplete
   - [ ] Edit existing task title
   - [ ] Delete task with confirmation
   - [ ] Filter tasks (All/Active/Completed)

3. **UI/UX Testing:**
   - [ ] Responsive design on mobile devices
   - [ ] Form validation messages
   - [ ] Loading states and error handling
   - [ ] Smooth animations and transitions

#### Browser Compatibility Testing:

Test the application on:
- ✅ Chrome (90+)
- ✅ Firefox (88+)
- ✅ Safari (14+)
- ✅ Edge (90+)

#### Firebase Console Monitoring:

1. **Check Authentication Users:**
   - Go to Firebase Console → Authentication → Users
   - Verify user accounts are being created

2. **Monitor Firestore Database:**
   - Go to Firebase Console → Firestore Database
   - Check data structure under `users/{userId}/tasks/`
   - Verify real-time updates

#### Common Issues and Solutions:

**Issue**: "Firebase configuration error"
- **Solution**: Ensure correct Firebase config in `firebase.js`

**Issue**: "Permission denied for Firestore"
- **Solution**: Update Firestore rules to allow read/write:
  ```javascript
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /users/{userId}/tasks/{task} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
  ```

**Issue**: "CORS errors"
- **Solution**: Use a local server instead of opening HTML file directly

**Issue**: "Tasks not loading"
- **Solution**: Check browser console for errors and verify Firebase configuration

#### Performance Testing:
- Page load time should be under 3 seconds
- Task operations should feel instantaneous
- Real-time updates should sync within 1 second

---

## 📞 Support

For issues and questions:
1. Check browser console for error messages
2. Verify Firebase project configuration
3. Ensure all files are in correct directory structure
4. Test with different browsers

## 🚀 Future Enhancements

- [ ] Push notifications for due tasks
- [ ] Task sharing and collaboration
- [ ] File attachments for tasks
- [ ] Dark/light theme toggle
- [ ] Task priorities and labels
- [ ] Calendar integration
- [ ] Offline functionality with PWA

---

**⭐ If you find this project helpful, don't forget to give it a star!**
