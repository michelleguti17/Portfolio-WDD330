import ToDos from './todos.js';

const list = document.getElementById('todoList');
const myToDos = new ToDos(list, 'todo');



/*const addItems = document.querySelector(".add-items");
const taskList = document.querySelector(".task-list");
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];


function addItem(event){
    event.preventDefault();
    const text = (this.querySelector('[name=task]')).value;
    const task = {
        text,
        done: false
    };

    tasks.push(task);
    populateList(tasks, taskList);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    this.reset;

    

}*/

