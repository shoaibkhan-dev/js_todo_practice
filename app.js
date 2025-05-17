const userNAme = document.getElementById("userName");
const logoutBtn =document.getElementById("logout-btn");
const taskForm = document.getElementById("taskForm");

const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
userNAme.innerHTML = currentUser.fullNAme;

logoutBtn.addEventListener("click", function(){
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
});

function creatLi(item){
    const task = `<li class= "lisy-group-item"> ${item.task}</li>`;
    return task;
}


function showTasks(){
    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    const filteredTodos = todos.filter(
        (item) => item.creareBY.email === currentUser.email
    );

    const ul = document.creareElement("ul");
    ul.className = "list-group";
    ul.id = "todo-list";

    filteredTodos.forEach((item) => {
    const li = creatLi(item);
    ul.innerHTML += li;
    });

    const listContainer = document.getElementById("list-container");
    listContainer.appendChild(ul);
}

taskForm.addEventListener("submit", function(event){
    event.preventDefault();
    const task = event.target.task.value;

    const todo = {
        task: task,
        isCompleted: false,
        creareBY:{
            fullNAme: currentUser.fullNAme,
            email: currentUser.email,
        },
    };
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    alert("task created successfully!");
    event.target.reset();

    const todoList = document.getElementById("todo-list");
    todoList.innerHTML += creatLi(todo);
});

ssgags