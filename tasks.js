import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    where,
    orderBy,
    serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { auth, db } from './firebase.js';

let tasks = [];
let currentFilter = 'all';
let tasksUnsubscribe = null;

// DOM Elements
const addTaskForm = document.getElementById('addTaskForm');
const tasksList = document.getElementById('tasksList');
const filterButtons = document.querySelectorAll('.filter-btn');

// Initialize tasks functionality
export function initializeTasks() {
    if (addTaskForm) {
        addTaskForm.addEventListener('submit', handleAddTask);
    }
    
    if (filterButtons) {
        filterButtons.forEach(button => {
            button.addEventListener('click', handleFilterChange);
        });
    }
    
    setupTasksListener();
}

// Set up real-time listener for tasks
function setupTasksListener() {
    const user = auth.currentUser;
    if (!user) return;
    
    // Unsubscribe from previous listener if exists
    if (tasksUnsubscribe) {
        tasksUnsubscribe();
    }
    
    const tasksQuery = query(
        collection(db, 'users', user.uid, 'tasks'),
        orderBy('createdAt', 'desc')
    );
    
    tasksUnsubscribe = onSnapshot(tasksQuery, (snapshot) => {
        tasks = [];
        snapshot.forEach((doc) => {
            tasks.push({
                id: doc.id,
                ...doc.data()
            });
        });
        renderTasks();
    }, (error) => {
        console.error('Tasks listener error:', error);
    });
}

// Handle adding new task
async function handleAddTask(e) {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
        alert('Please log in first');
        return;
    }

    const title = document.getElementById('taskTitle').value.trim();
    const category = document.getElementById('taskCategory').value;
    const dueDate = document.getElementById('taskDueDate').value;

    if (!title) {
        alert('Please enter a task title');
        return;
    }

    try {
        console.log('Adding task for user:', user.uid);
        const docRef = await addDoc(collection(db, 'users', user.uid, 'tasks'), {
            title: title,
            category: category,
            dueDate: dueDate || null,
            completed: false,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        console.log('Task added with ID:', docRef.id);

        // Reset form
        addTaskForm.reset();
        document.getElementById('taskDueDate').value = '';

        // Show success message
        showMessage('Task added successfully!', 'success');

    } catch (error) {
        console.error('Error adding task:', error);
        showMessage('Error adding task: ' + error.message, 'error');
    }
}

// Handle filter change
function handleFilterChange(e) {
    // Update active filter button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    currentFilter = e.target.dataset.filter;
    renderTasks();
}

// Render tasks based on current filter
function renderTasks() {
    let filteredTasks = tasks;
    
    switch (currentFilter) {
        case 'active':
            filteredTasks = tasks.filter(task => !task.completed);
            break;
        case 'completed':
            filteredTasks = tasks.filter(task => task.completed);
            break;
        default:
            filteredTasks = tasks;
    }
    
    if (filteredTasks.length === 0) {
        tasksList.innerHTML = `
            <div class="no-tasks">
                <p>No tasks found. Add your first task above!</p>
            </div>
        `;
        return;
    }
    
    tasksList.innerHTML = filteredTasks.map(task => `
        <div class="task-item ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} 
                   onchange="toggleTaskCompletion('${task.id}', this.checked)">
            
            <div class="task-content">
                <div class="task-title ${task.completed ? 'completed' : ''}">${task.title}</div>
                <div class="task-meta">
                    <span class="task-category ${task.category}">${task.category}</span>
                    ${task.dueDate ? `<span class="task-due-date">Due: ${formatDate(task.dueDate)}</span>` : ''}
                    ${task.createdAt ? `<span class="task-created">Added: ${formatTimestamp(task.createdAt)}</span>` : ''}
                </div>
            </div>
            
            <div class="task-actions">
                <button class="edit-btn" onclick="editTask('${task.id}')">✏️</button>
                <button class="delete-btn" onclick="deleteTask('${task.id}')">🗑️</button>
            </div>
        </div>
    `).join('');
}

// Toggle task completion
window.toggleTaskCompletion = async function(taskId, completed) {
    const user = auth.currentUser;
    if (!user) return;
    
    try {
        const taskRef = doc(db, 'users', user.uid, 'tasks', taskId);
        await updateDoc(taskRef, {
            completed: completed,
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error('Error updating task:', error);
        alert('Error updating task: ' + error.message);
    }
}

// Edit task
window.editTask = async function(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    const newTitle = prompt('Edit task:', task.title);
    if (newTitle && newTitle !== task.title) {
        const user = auth.currentUser;
        if (!user) return;
        
        try {
            const taskRef = doc(db, 'users', user.uid, 'tasks', taskId);
            await updateDoc(taskRef, {
                title: newTitle,
                updatedAt: serverTimestamp()
            });
        } catch (error) {
            console.error('Error updating task:', error);
            alert('Error updating task: ' + error.message);
        }
    }
}

// Delete task
window.deleteTask = async function(taskId) {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    const user = auth.currentUser;
    if (!user) return;
    
    try {
        const taskRef = doc(db, 'users', user.uid, 'tasks', taskId);
        await deleteDoc(taskRef);
    } catch (error) {
        console.error('Error deleting task:', error);
        alert('Error deleting task: ' + error.message);
    }
}

// Utility functions
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
}

function formatTimestamp(timestamp) {
    if (!timestamp) return 'Unknown';

    const date = timestamp.toDate();
    return date.toLocaleDateString();
}

// Utility function to show messages
function showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.error-message, .success-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'error' ? 'error-message' : 'success-message';
    messageDiv.textContent = message;

    // Insert message after the form
    const currentForm = document.querySelector('#addTaskForm');
    if (currentForm) {
        currentForm.appendChild(messageDiv);
    }

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}
