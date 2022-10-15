import Hike from './hikes.js';

const myHike = new Hike('hikes');

myHike.showHikeList();

window.addEventListener("load", () => {
    myHike.showHikeList();
  });
myHike.hikeList;