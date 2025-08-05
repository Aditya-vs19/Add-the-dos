// Selectors
const toDoInput = document.querySelector('.todo-input');
const toDoBtn = document.querySelector('.todo-btn');
const toDoList = document.querySelector('.todo-list');
const standardTheme = document.querySelector('.standard-theme');

// Event Listeners
toDoBtn.addEventListener('click', addToDo);
toDoList.addEventListener('click', deletecheck);
document.addEventListener("DOMContentLoaded", getTodos);
standardTheme.addEventListener('click', () => changeTheme('standard'));

// Functions
function addToDo(event) {
    event.preventDefault();
    
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add('todo');

    const newToDo = document.createElement('li');
    if (toDoInput.value === '') {
        alert("You must write something!");
    } else {
        newToDo.innerText = toDoInput.value;
        newToDo.classList.add('todo-item');
        toDoDiv.appendChild(newToDo);

        
        saveToXML(toDoInput.value);

        const checked = document.createElement('button');
        checked.innerHTML = '<i class="fas fa-check"></i>';
        checked.classList.add('check-btn');
        toDoDiv.appendChild(checked);

        const deleted = document.createElement('button');
        deleted.innerHTML = '<i class="fas fa-trash"></i>';
        deleted.classList.add('delete-btn');
        toDoDiv.appendChild(deleted);

        toDoList.appendChild(toDoDiv);
        toDoInput.value = '';
    }
}

function deletecheck(event) {
    const item = event.target;

    // delete th task
    if (item.classList[0] === 'delete-btn') {
        item.parentElement.classList.add("fall");
        removeFromXML(item.parentElement);
        item.parentElement.addEventListener('transitionend', function() {
            item.parentElement.remove();
        });
    }

    //check task
    if (item.classList[0] === 'check-btn') {
        item.parentElement.classList.toggle("completed");
    }
}

// Saving to xml
function saveToXML(todo) {
    let todos;
    const parser = new DOMParser();
    const xmlString = localStorage.getItem('todosXML') || '<todos></todos>';
    const xmlDoc = parser.parseFromString(xmlString, "application/xml");

    todos = xmlDoc.getElementsByTagName("todo");
    const newTodo = xmlDoc.createElement("todo");
    newTodo.textContent = todo;
    xmlDoc.documentElement.appendChild(newTodo);

    localStorage.setItem('todosXML', new XMLSerializer().serializeToString(xmlDoc));
}

function getTodos() {
    const xmlString = localStorage.getItem('todosXML');
    if (!xmlString) return;

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "application/xml");
    const todos = xmlDoc.getElementsByTagName("todo");

    for (let i = 0; i < todos.length; i++) {
        const toDoDiv = document.createElement("div");
        toDoDiv.classList.add("todo");

        const newToDo = document.createElement('li');
        newToDo.innerText = todos[i].textContent;
        newToDo.classList.add('todo-item');
        toDoDiv.appendChild(newToDo);

        const checked = document.createElement('button');
        checked.innerHTML = '<i class="fas fa-check"></i>';
        checked.classList.add("check-btn");
        toDoDiv.appendChild(checked);

        const deleted = document.createElement('button');
        deleted.innerHTML = '<i class="fas fa-trash"></i>';
        deleted.classList.add("delete-btn");
        toDoDiv.appendChild(deleted);

        toDoList.appendChild(toDoDiv);
    }
}

function removeFromXML(todo) {
    const xmlString = localStorage.getItem('todosXML');
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "application/xml");

    const todos = xmlDoc.getElementsByTagName("todo");
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].textContent === todo.children[0].innerText) {
            xmlDoc.documentElement.removeChild(todos[i]);
            break;
        }
    }

    localStorage.setItem('todosXML', new XMLSerializer().serializeToString(xmlDoc));


}

