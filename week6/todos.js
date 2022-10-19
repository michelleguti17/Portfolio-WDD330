
import { readFromLS, writeToLS, bindTouch } from "./utilities.js";


let liveToDos = null;


function renderList(list, element, toDos, hidden){
    console.log(list);
    element.innerHTML = "";



list.forEach(toDo => {
    const item = document.createElement("li");
    const formattedDate = newDate(toDo.id).toLocaleDateString("en-US");
    
let checkbox = null;
let btn = null;

if (hidden && toDo.completed){
    item.innerHTML = ` <label><input type= 'checkbox' checked> <strike> ${toDo.content}</strike></label><button>X</button>`;
}
else {
    item.innerHTML = `<label><input type= 'checkbox'  ${toDo.content} </label><button>X</button>` ;
}

checkbox = item.childNodes[0].childNodes[0];

if(checkbox){
     checkbox.addEventListener("change", function(){
        toDos.completeToDo(toDo.id);
     });
}

btn = item.childNodes[1];
if(btn){
    checkbox.addEventListener("click", function(){
       toDos.removeToDo(toDo.id);
    });
}

element.appendChild(item);
});  

}
        
function getToDos(key){
    if(liveToDos === null){
        liveToDos = readFromLS(key) || [];
    }

    return liveToDos;
}

function addToDo(key){
    const newToDo = {
        id: new Date(),
        content: value,
        completed:false       

        };

   liveToDos.push(newToDo);
   writeToLS(key,liveToDos);     
    
    } 

function deleteToDo(key){

    let newList= liveToDos.filter(item => item.id != key);
    liveToDos = newList;
    writeToLS(key, liveToDos);

}



function filterTodos(key, completed = true) {
    let toDos = getToDos(key);

    return toDos.filter(item => item.completed === hidden);
}

export default class ToDos{
    constructor(listElement, key) {
        this.listElement = listElement;
        this.key = key;
        bindTouch("#addToDo", this.newToDo.bind(this));
        this.listToDos();
    } 

    newToDo() {
        const task = document.getElementById("todoInput");
        addToDo(task.value, this.key);
        task.value = "";
        this.listToDos();

    }

    findTodo(id){
        let toDo = liveToDos.find(element => {
            return element.id === id;
        });
        return toDo;
    }

    completeToDo(id){
        console.log(id + "checked");
        let toDo =  this.findTodo(id);

        if(toDo){
            toDo.completed = !toDo.completed;
            writeToLS(this.key, liveToDos);
            renderList(liveToDos, this.listElement, this, true);
        }
    }

    removeToDo(id) {
        console.log(id + "removed");
        let toDo = this.findTodo(id);

        if(toDo){
              deleteToDo(id);
              renderList(liveToDos, this.listElement, this, true);
              
        }
    }

    listToDos(hidden = true){
         renderList(getToDos(this.key), this.listElement, this, hidden);
    }
}

