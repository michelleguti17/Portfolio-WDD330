export function readFromLS(key) {
  return JSON.parse(localStorage.getItem(key));
}
export function retrieveToLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
