import { readFromLS , writeToLS } from "./ls.js";

import { onTouch ,setCallbacks, qs } from "./utilities.js";


let liveToDos = null;

//Build a list of elements for each task
function renderList(list, element) {
        console.log(list);
        element.innerHTML = "";


    list.forEach((toDo, index) => {
        if (!toDo.hide) {
        const item = document.createElement("li");
        const formattedDate = new Date(toDo.id).toLocaleDateString("en-US");
         item.id = index;
         item.innerHTML = ` <label class="${toDo.completed ? "checkbox done" : 'checkbox'}" id="checkbox-${index}" data-id=${index}></label>
                <label class="${toDo.completed ? "detail done" : 'detail'}" >${toDo.content}</label>
                <button class="remove" id="remove-${index}" data-id=${index}>X</button>`;
          
                element.appendChild(item);
           }
            });   
        }
   

//Get tasks from local storage
function getToDos(key){
    if(liveToDos === null){
        liveToDos = readFromLS(key) || [];
    }

    return liveToDos;
}
//Add new tasks
function addToDo(value, key){ 
    const newToDo = {
        id: new Date(),
        content: value,
        completed: false       

    };

   liveToDos.push(newToDo);
   writeToLS(key, liveToDos);     
    
    } 

//Update counter
function updateCounter(counter) { 
    const item = qs('.counter-task');
    item.innerHTML = `${counter} left tasks`;
}


export default class ToDos {
    constructor(listElement, key) {
        this.liveToDos = getToDos(key);
        console.log(this.listElement);
        this.listElement = listElement;
        this.key = key;
        onTouch("#addToDo", this.newToDo.bind(this));
        onTouch("#completed", this.filterToDos.bind(this));
        onTouch("#active", this.filterToDos.bind(this));
        onTouch("#all", this.filterToDos.bind(this));  
            this.listToDos();
    } 

    newToDo() { // Add a new task
        const task = qs(".todoInput");
        addToDo(task.value, this.key);
        task.value = "";
        this.liveToDos = getToDos(this.key);
        this.listToDos();

    } 
  
   completeToDo(event) {
            let toDoId = event.target.dataset.id
            this.liveToDos[toDoId].completed = !this.liveToDos[toDoId].completed;
            writeToLS(this.key, this.liveToDos);
            this.listToDos();
        
    }

    removeToDo(event) { //Probar si funciona con el remoce todo de neustra funcion
        const toDoId = event.target.dataset.id
        this.liveToDos.splice(toDoId, 1);
        writeToLS(this.key, this.liveToDos);
        this.listToDos();
    }
    
   //Update list
    listToDos(){
         renderList( this.liveToDos , this.listElement,);
         updateCounter(this.remains);
         this.setCallbacks();
        }
    
        //filter all, complete and active tasks
        filterToDos() {
            const toDo = event.target.dataset.id
            this.liveToDos.forEach(item => {
            if (toDo === 'active' && item.completed ) {
                item.hide = true
            } else if (toDo === 'completed' && !item.completed) {
                item.hide = true;
            } else {
                item.hide = false;
            }
        });
            const listElement = qs('.btn-section');
            listElement.className = 'btn-section ' + toDo;
    
            this.listToDos(); 
            
        }

//Callbacks for remove and checkbox

   setCallbacks() {

        setCallbacks('.checkbox', this.completeToDo.bind(this));
      
        setCallbacks('.remove', this.removeToDo.bind(this));
    }

    //Remains tasks filter
    get remains() {
        return this.liveToDos.filter(item => !item.completed).length;
    }

 }




