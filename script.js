let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");

function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    return parsedTodoList === null ? [] : parsedTodoList;
}

let todoList = getTodoListFromLocalStorage();
let todoCount = todoList.length;

saveTodoButton.onclick = function () {
    localStorage.setItem("todoList", JSON.stringify(todoList));
};

function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    let todoItemIndex = todoList.findIndex(function (eachTodo) {
        return "todo" + eachTodo.uniqueNo === todoId;
    });
    let todoObject = todoList[todoItemIndex];
    todoObject.isChecked = !todoObject.isChecked;
}

function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);

    let deleteItemIndex = todoList.findIndex(function (eachTodo) {
        return "todo" + eachTodo.uniqueNo === todoId;
    });
    todoList.splice(deleteItemIndex, 1);
}

function createAndAppendTodo(todo) {
    let todoId = "todo" + todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row", "align-items-center");
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;
    inputElement.onclick = function () {
        onTodoStatusChange(checkboxId, labelId, todoId);
    };
    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "justify-content-between", "align-items-center", "flex-grow-1");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    if (todo.isChecked) labelElement.classList.add("checked");
    labelContainer.appendChild(labelElement);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fas", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function () {
        onDeleteTodo(todoId);
    };
    labelContainer.appendChild(deleteIcon);
}

for (let todo of todoList) {
    createAndAppendTodo(todo);
}

function onAddTodo() {
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value.trim();

    if (userInputValue === "") {
        alert("Enter a valid task.");
        return;
    }

    todoCount += 1;
    let newTodo = {
        text: userInputValue,
        uniqueNo: todoCount,
        isChecked: false
    };
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputElement.value = "";
}

addTodoButton.onclick = onAddTodo;
