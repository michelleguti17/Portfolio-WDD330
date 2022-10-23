
export function readFromLS(key) {
    return JSON.parse(localStorage.getItem(key));
 
    }
   
    export function writeToLS(key, data) { 
       localStorage.setItem(key, JSON.stringify(data));
     }