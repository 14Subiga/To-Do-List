// var submitbutton=document.getElementById("submit");
// var x=7;
// submitbutton.addEventListener("click",()=>
// {
//     document.getElementById("submit").innerHTML=x;
// });


document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addButton = document.getElementById("addButton");
    const taskList = document.getElementById("taskList");
    const errorElement = document.getElementById("error");

    // Function to load tasks from localStorage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        // Clear existing task list
        taskList.innerHTML = "";

        // Re-populate task list from localStorage
        tasks.forEach(taskText => {
            createTaskElement(taskText);
        });
    };

    // Function to save tasks to localStorage
    const saveTasks = tasks => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    // Function to create a task element
    const createTaskElement = taskText => {
        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item");

        const taskSpan = document.createElement("span");
        taskSpan.textContent = taskText;
        taskItem.appendChild(taskSpan);

        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.classList.add("edit-input");
        editInput.value = taskText;
        editInput.style.display = "none";
        taskItem.appendChild(editInput);

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => {
            taskSpan.style.display = "none";
            editInput.style.display = "inline-block";
            editInput.focus();
        });
        taskItem.appendChild(editButton);

        const saveButton = document.createElement("button");
        saveButton.textContent = "Save";
        saveButton.style.display = "none";
        saveButton.addEventListener("click", () => {
            saveEditedTask(taskSpan, editInput);
        });
        taskItem.appendChild(saveButton);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            taskItem.remove();
            updateLocalStorage();
        });
        taskItem.appendChild(deleteButton);

        // Handle 'Enter' key press in edit input field
        editInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                saveEditedTask(taskSpan, editInput);
            }
        });

        taskList.appendChild(taskItem);
    };

    // Function to save edited task
    const saveEditedTask = (taskSpan, editInput) => {
        const newTaskText = editInput.value.trim();
        if (newTaskText === "") {
            return; // Do not save empty task
        }
        taskSpan.textContent = newTaskText;
        taskSpan.style.display = "inline-block";
        editInput.style.display = "none";
        updateLocalStorage();
    };

    // Update localStorage with current tasks
    const updateLocalStorage = () => {
        const tasks = [];
        document.querySelectorAll(".task-item span").forEach(task => {
            tasks.push(task.textContent);
        });
        saveTasks(tasks);
    };

    addButton.addEventListener("click", () => {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            window.alert("Please enter a task.");
            return;
        }

        // Check if the task already exists
        const existingTasks = document.querySelectorAll(".task-item span");
        for (let i = 0; i < existingTasks.length; i++) {
            if (existingTasks[i].textContent === taskText) {
                errorElement.textContent = "Task already exists.";
                return;
            }
        }

        errorElement.textContent = "";

        // Create task element and add to list
        createTaskElement(taskText);

        // Clear input field
        taskInput.value = "";

        // Update localStorage with current tasks
        updateLocalStorage();
    });

    // Load tasks from localStorage on page load
    loadTasks();
});


