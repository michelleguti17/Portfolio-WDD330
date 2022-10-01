//function doSomething(){
    //console.log('Something Happened!');
//}

//function doSomething(event){
 //   console.log(event.type);
//}

//function doSomething(event){
   /// console.log(event.type);
//}
function doSomething(event){
    console.log(event.target);
}

addEventListener('click', doSomething);

//The add event listener should always use the world click? as parameter

const onceParagraph = document.getElementById('once');
onceParagraph.addEventListener('click', remove);

function remove(event) {
    console.log('Enjoy this while it lasts!');
    onceParagraph.style.backgroundColor = 'pink';
    onceParagraph.removeEventListener('click',remove);
}
