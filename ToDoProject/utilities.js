 export  function qs(selectorName){
    return document.querySelector(selectorName);
}


function qsAll(selector) {
    return document.querySelectorAll(selector);
}

   

export function onTouch(selector, callback) { 
    const element = qs(selector);
    element.addEventListener("click", callback);

}

 export function setCallbacks(selector, callback) {
    const items =  qsAll(selector);
    element.addEventListener("click", callback);
}