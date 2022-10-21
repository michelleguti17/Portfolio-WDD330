
import { readFromLS , writeToLS } from "./ls.js";

import { onTouch } from "./utilities.js";


let liveToDos = null;


function renderList(list, element, toDos, hidden) {
        console.log(list);
        element.innerHTML = "";


    list.forEach(toDo => {
        const item = document.createElement("li");
        const formattedDate = new Date(toDo.id).toLocaleDateString("en-US");
        
    let checkbox = null;
    let btn = null;

    if (hidden && toDo.completed){
        item.innerHTML = `<label><input type= 'checkbox' checked><strike id= "strike"> ${toDo.content}</strike></label><button class="x">X</button>`;
    }
    else  if(hidden && !toDo.completed ) {
        item.innerHTML = `<label><input type= 'checkbox'>  ${toDo.content}</label><button class="x">X</button>`;
    }
    else  if(!hidden && !toDo.completed ) {
        item.innerHTML = `<label><input type= 'checkbox'>  ${toDo.content}</label><button class="x">X</button>`;
    }

if (hidden ||(!hidden && !toDo.completed )){
    checkbox = item.childNodes[0].childNodes[0];

    if(checkbox){
        checkbox.addEventListener("change", function(){
            toDos.completeToDo(toDo.id);
            
        });
  
  
    }
          
    btn = item.childNodes[1];
    if(btn){
        btn.addEventListener("click", function(){
        toDos.removeToDo(toDo.id);
        });
    }


    element.appendChild(item);
}
    });
    

} 
 //filter completed tasks in a todo list?    
 /*document.getElementById('completedBtn').addEventListener('click', function(event) {
    /*   if (toDos.target.localName === 'span'){
           let selectedOption = e.target.innerText;
   
           if(selectedOption === 'all')
               renderToDos(toDoList); // render everything
    
           else if(selectedOption === 'active'){
               let activeToDos = toDoList.filter(todo => todo.completed === false);
               renderToDos(activeToDos); // only render the todos which have not been completed
           }
           let toDoList= item.innerHTML;
            if(hidden && toDo.completed ){
               let completedToDos = toDoList.filter(item=> item.completed === true);
               renderToDos(completedToDos); // only render the todos which have not been completed
           
       }
   });*/
   


function getToDos(key){
    if(liveToDos === null){
        liveToDos = readFromLS(key) || [];
    }

    return liveToDos;
}

function addToDo(value, key){
    const newToDo = {
        id: new Date(),
        content: value,
        completed: false       

    };

   liveToDos.push(newToDo);
   writeToLS(key, liveToDos);     
    
    } 

function deleteToDo(key, listkey){

    let newList = liveToDos.filter(item => item.id != key);
    liveToDos = newList;
    writeToLS(listkey, liveToDos);

}







//filter completed tasks in a todo list?      
/* document.getElementById('completedBtn').addEventListener('click', function(event) {
   
   
 
    let toDos = getToDos(key, listKey);
    toDos = toDos(toDos.id);
        
        if(toDos === 'all')
            renderToDos(getToDos(this.key), this.listElement, this, hidden); // render everything
 
        else if(toDos === 'active'){
            let activeToDos = toDos.filter(item => item.completed === false);
            renderToDos(activeToDos); // only render the todos which have not been completed
       

       if(toDos === hidden){
            let completedToDos = toDos.filter(item => item.completed === true);
            renderToDos(completedToDos); // only render the todos which have not been completed
        }
        
});*/




export default class ToDos {
    constructor(listElement, key) {
        console.log(this.listElement);
        this.listElement = listElement;
        console.log(this.listElement);
       
        this.key = key;
        onTouch("#addToDo", this.newToDo.bind(this));
        onTouch("#completedBtn", this.listToDos.bind(this,true ));
        onTouch("#activeBtn", this.listToDos.bind(this, false));
        onTouch("#allBtn", this.listToDos.bind(this));
        this.listToDos();
    } 

    newToDo() {
        const task = document.getElementById("todoInput");
        addToDo(task.value, this.key);
        task.value = "";
        this.listToDos();

    }

    findTodo(id){
        let toDo = liveToDos.find( element => {
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
            renderList(liveToDos, this.listElement,this, true);
        }
    }

    removeToDo(id) {
        console.log(id + "removed");
        let toDo = this.findTodo(id);

        if(toDo){
            deleteToDo(id , this.key);
            renderList(liveToDos, this.listElement,this, true);
        }
    }

    listToDos(hidden = true){
         renderList(getToDos(this.key), this.listElement, this, hidden);
    }
}

