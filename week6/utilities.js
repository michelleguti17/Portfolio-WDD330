 function qs(selector){
return document.querySelector(selector);
}

export function onTouch(elementSelector, callback) { 
    const element = qs(elementSelector);
    element.addEventListener("click", callback);
}