// Model
class TodoModel {
    constructor() {
        this.tasks = [];
    }

    addTask(taskText) {
        this.tasks.push(taskText);
    }

    deleteTask(index) {
        this.tasks.splice(index, 1);
    }

    getTasks() {
        return this.tasks;
    }
}

// View
class TodoView {
    constructor() {
        this.taskInput = document.getElementById('taskInput');
        this.addTaskBtn = document.getElementById('addTaskBtn');
        this.taskList = document.getElementById('taskList');
    }

    bindAddTask(handler) {
        this.addTaskBtn.addEventListener('click', () => {
            const taskText = this.taskInput.value.trim();
            if (taskText !== '') {
                handler(taskText);
                this.taskInput.value = '';
            }
        });
    }

    bindDeleteTask(handler) {
        this.taskList.addEventListener('click', event => {
            if (event.target.tagName === 'BUTTON') {
                const index = event.target.parentNode.dataset.index;
                handler(index);
            }
        });
    }

    render(tasks) {
        this.taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.textContent = task;
            taskItem.dataset.index = index;
            taskItem.classList.add('border-gray-300', 'border-b', 'py-2', 'flex', 'justify-between', 'items-center');

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '❌';
            deleteBtn.classList.add('text-red-500', 'font-bold', 'hover:text-red-600', 'focus:outline-none');

            taskItem.appendChild(deleteBtn);
            this.taskList.appendChild(taskItem);
        });
    }
}

// Controller
class TodoController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Bind events
        this.view.bindAddTask(this.handleAddTask);
        this.view.bindDeleteTask(this.handleDeleteTask);

        // Initial render
        this.render();
    }

    handleAddTask = taskText => {
        this.model.addTask(taskText);
        this.render();
    };

    handleDeleteTask = index => {
        this.model.deleteTask(index);
        this.render();
    };

    render() {
        const tasks = this.model.getTasks();
        this.view.render(tasks);
    }
}

// Initialize the application
const model = new TodoModel();
const view = new TodoView();
const controller = new TodoController(model, view);
