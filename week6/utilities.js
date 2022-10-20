   function qs(selectorName){
    return document.querySelector(selectorName);
}


   

export function onTouch(selector, callback) { 
    const element = qs(selector);
    element.addEventListener("click", callback);
}