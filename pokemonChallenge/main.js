import { readFromLS, retrieveToLS } from "./ls.js";
import { onTouch } from "./utilities.js";

const pokemonContainer = document.querySelector(".pokemon-container");
const pokemonCard = document.querySelector(".pokemon-card");
const pokemonWhite = document.querySelector(".poke-empty-cards");
const spinner = document.querySelector("#spinner");
const newTeam = document.querySelector("#newTeam");
const search = document.querySelector("#search-container");
const searchCard = document.querySelector("#search-card");
const inputSearch =  document.querySelector(".inputPoke");

let offset = 1;
let limit = 8;
const pokemonsTeam = [];

const pokemonsTeamLocalStorage =
  localStorage.getItem("pokemonsTeam") !== null && readFromLS("pokemonsTeam");

class Pokemon {
  constructor(pokemons, card) {
    this.pokemons = pokemons;
    this.card = card;
   
    onTouch("#previous", this.getPreviousPokemon.bind(this));
    onTouch("#next", this.getNextPokemon.bind(this));
  }
  getPokemons(offset, limit) {
    spinner.style.display = "block";
    for (let i = offset; i <= offset + limit; i++) {
      fetchPokemon(i);
    }
  }
  removeChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  getPreviousPokemon() {
    previous.addEventListener("click", () => {
      if (offset != 1) {
        offset -= 9;
        this.removeChildNodes(pokemonContainer);
        this.getPokemons(offset, limit);
      }
    });
  }
  getNextPokemon() {
    next.addEventListener("click", () => {
      offset += 9;
      this.removeChildNodes(pokemonContainer);
      this.getPokemons(offset, limit);
    });
  }
}
const poke = new Pokemon();
poke.getPokemons(offset, limit);

function fetchPokemon(id) {
  const pokemons = [];
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        pokemons.push(data);
        if (pokemons.length > 0) {
          createPokemon(pokemons);
        }
      }
      /* console.log(data); */
      spinner.style.display = "none";
    });
}


const readInput = (input) => {
  input.addEventListener("change", (e) => searchPokemon((e.target.value)));
};

readInput(inputSearch);

const searchPokemon =(pokemonName) => {
  console.log("entro");
  const pokemons = [];
console.log(pokemonName);

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}/`)
    .then((response) => response.json())
    .then((data) => {
      if (data) {
  
      pokemons.push(data);
      if (pokemons.length > 0) {
        
      createPokemons(data);
     
      }


      }

      spinner.style.display = "none";
    });
};
function createPokemons(pokemon) {
    const flipCard = document.createElement("div");
    flipCard.classList.add("flip-card");
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");

    flipCard.appendChild(cardContainer);

    const card = document.createElement("div");
    card.classList.add("pokemon-block");

    const spriteContainer = document.createElement("div");
    spriteContainer.classList.add("img-container");

    const sprite = document.createElement("img");
    sprite.src = pokemon.sprites.front_default;
    spriteContainer.appendChild(sprite);

    const number = document.createElement("p");
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;
    number.classList.add("number");

    const name = document.createElement("p");
    name.classList.add("name");
    name.textContent = pokemon.name;

    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);

    const cardBack = document.createElement("div");
    cardBack.classList.add("pokemon-block-back");
    cardBack.appendChild(progressBars(pokemon.stats));
    cardContainer.appendChild(card);
    cardContainer.appendChild(cardBack);

    search.appendChild(flipCard);

    flipCard.addEventListener("click", function () {
      // for remove array local storage and app array
      if (pokemonsTeamLocalStorage) {
        if (pokemonsTeamLocalStorage.length < 6) {
          if (pokemonsTeam.length < 6) {
            pokemonsTeam.push(pokemon);
            addPokemonInCard();
           
            retrieveToLS("pokemonsTeam", pokemonsTeam);
          }
        }
      } else {
        if (pokemonsTeam.length < 6) {
          pokemonsTeam.push(pokemon);
          addPokemonInCard();
        
          retrieveToLS("pokemonsTeam", pokemonsTeam);
        }
      }
    });
  
}
function deletePoke(pokemon) {
  console.log(pokemonsTeamLocalStorage);
  let newPokeArray = pokemonsTeamLocalStorage.filter(
    (element) => element.id !== pokemon.id
  );

  /*localStorage.removeItem('pokemonsTeam');*/
localStorage.setItem("pokemonsTeam" , JSON.stringify(newPokeArray));
window.location.reload();
}



// i verify in local storage if i have a pokemons team
function verifyPokemonsInLocalStorage() {
  if (pokemonsTeamLocalStorage.length > 0) {
    for (let index = 0; index < pokemonsTeamLocalStorage.length; index++) {
      const button = document.createElement("button");
      button.classList.add("remove");
      button.textContent = "X";

      if (index === 0) {
        let block1 = document.getElementById("block1");
        block1.appendChild(button);
        let pokemon = pokemonsTeamLocalStorage[0];
        let img = document.getElementById("content1").querySelector("img");
;
    
        img.src = pokemon.sprites.front_default;
        let number =  document.getElementById("content1").querySelectorAll("p");
        number = `#${pokemon.id.toString().padStart(3, 0)}`;
        document.getElementById("number1").innerHTML = number;
     
       let name =  document.getElementById("content1").querySelectorAll("p");
       name = pokemon.name;
       document.getElementById("name1").innerHTML = name;
        button.addEventListener("click", () => {
          block1.style.display = "none";
          deletePoke(pokemon);
        });
       
      }
      if (index === 1) {
        let block2 = document.getElementById("block2");
        block2.appendChild(button);
        let pokemon = pokemonsTeamLocalStorage[1];
        let img = document.getElementById("content2").querySelector("img");
        img.style.height = "100px";
        img.style.width = "100px";
        img.src = pokemon.sprites.front_default;
        let number =  document.getElementById("content2").querySelectorAll("p");
        number = `#${pokemon.id.toString().padStart(3, 0)}`;
        document.getElementById("number2").innerHTML = number;
     
       let name =  document.getElementById("content2").querySelectorAll("p");
       name = pokemon.name;
       document.getElementById("name2").innerHTML = name;
        button.addEventListener("click", () => {
          block2.style.display = "none";
          deletePoke(pokemon);
        });

      }
      if (index === 2) {
        let block3 = document.getElementById("block3");
        block3.appendChild(button);
        let pokemon = pokemonsTeamLocalStorage[2];
        let img = document.getElementById("content3").querySelector("img");
        img.style.height = "100px";
        img.style.width = "100px";
        img.src = pokemon.sprites.front_default;
        let number =  document.getElementById("content3").querySelectorAll("p");
        number = `#${pokemon.id.toString().padStart(3, 0)}`;
        document.getElementById("number3").innerHTML = number;
     
       let name =  document.getElementById("content3").querySelectorAll("p");
       name = pokemon.name;
       document.getElementById("name3").innerHTML = name;
        button.addEventListener("click", () => {
          block3.style.display = "none";
          deletePoke(pokemon);
        });

      }
      if (index === 3) {
        let block4 = document.getElementById("block4");
        block4.appendChild(button);
        let pokemon = pokemonsTeamLocalStorage[3];
        let img = document.getElementById("content4").querySelector("img");
        img.style.height = "100px";
        img.style.width = "100px";
        img.src = pokemon.sprites.front_default;
        let number =  document.getElementById("content4").querySelectorAll("p");
        number = `#${pokemon.id.toString().padStart(3, 0)}`;
        document.getElementById("number4").innerHTML = number;
     
       let name =  document.getElementById("content4").querySelectorAll("p");
       name = pokemon.name;
       document.getElementById("name4").innerHTML = name;
        button.addEventListener("click", () => {
          block4.style.display = "none";
          deletePoke(pokemon);
        });
     
      }
      if (index === 4) {
        let block5 = document.getElementById("block5");
        block5.appendChild(button);
        let pokemon = pokemonsTeamLocalStorage[4];
        let img = document.getElementById("content5").querySelector("img");
        img.style.height = "100px";
        img.style.width = "100px";
        img.src = pokemon.sprites.front_default;
        let number =  document.getElementById("content5").querySelectorAll("p");
        number = `#${pokemon.id.toString().padStart(3, 0)}`;
        document.getElementById("number5").innerHTML = number;
     
       let name =  document.getElementById("content5").querySelectorAll("p");
       name = pokemon.name;
       document.getElementById("name5").innerHTML = name;
        button.addEventListener("click", () => {
          block5.style.display = "none";
          deletePoke(pokemon);
        });
    
      }
      if (index === 5) {
        let block6 = document.getElementById("block6");
        block6.appendChild(button);
        let pokemon = pokemonsTeamLocalStorage[5];
        let img = document.getElementById("content6").querySelector("img");
        img.style.height = "100px";
        img.style.width = "100px";
        img.src = pokemon.sprites.front_default;
        let number =  document.getElementById("content6").querySelectorAll("p");
        number = `#${pokemon.id.toString().padStart(3, 0)}`;
        document.getElementById("number6").innerHTML = number;
     
       let name =  document.getElementById("content6").querySelectorAll("p");
       name = pokemon.name;
       document.getElementById("name6").innerHTML = name;
        button.addEventListener("click", () => {
          block6.style.display = "none";
          deletePoke(pokemon);
        });
    
      }
    }
  }
}
newTeam.addEventListener("click", (e) => {
  // for remove array local storage and app array
  localStorage.clear();
  window.location.reload();
});

function createPokemon(pokemons) {
  pokemons.forEach((pokemon) => {
    const flipCard = document.createElement("div");
    flipCard.classList.add("flip-card");
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");

    flipCard.appendChild(cardContainer);

    const card = document.createElement("div");
    card.classList.add("pokemon-block");

    const spriteContainer = document.createElement("div");
    spriteContainer.classList.add("img-container");

    const sprite = document.createElement("img");
    sprite.src = pokemon.sprites.front_default;
    spriteContainer.appendChild(sprite);

    const number = document.createElement("p");
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;
    number.classList.add("number");

    const name = document.createElement("p");
    name.classList.add("name");
    name.textContent = pokemon.name;

    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);

    const cardBack = document.createElement("div");
    cardBack.classList.add("pokemon-block-back");
    cardBack.appendChild(progressBars(pokemon.stats));
    cardContainer.appendChild(card);
    cardContainer.appendChild(cardBack);
    pokemonContainer.appendChild(flipCard);

    flipCard.addEventListener("click", function () {
      // for remove array local storage and app array
      if (pokemonsTeamLocalStorage) {
        if (pokemonsTeamLocalStorage.length < 6) {
          if (pokemonsTeam.length < 6) {
            pokemonsTeam.push(pokemon);
            addPokemonInCard();
            /* replaceExternalDiv(content[0]);*/
            retrieveToLS("pokemonsTeam", pokemonsTeam);
          }
        }
      } else {
        if (pokemonsTeam.length < 6) {
          pokemonsTeam.push(pokemon);
          addPokemonInCard();
          /* replaceExternalDiv(content[0]);*/
          retrieveToLS("pokemonsTeam", pokemonsTeam);
        }
      }
    });
  });
}

function progressBars(stats) {
  const statsContainer = document.createElement("div");
  statsContainer.classList.add("stats-container");

  for (let i = 1; i < 6; i++) {
    const stat = stats[i];

    const statPercent = stat.base_stat / 2 + "%";
    const statContainer = document.createElement("stat-container");
    statContainer.classList.add("stat-container");

    const statName = document.createElement("p");
    statName.textContent = stat.stat.name;
    statName.classList.add("stats-name");

    const progress = document.createElement("div");
    progress.classList.add("progress");

    const progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");
    progressBar.setAttribute("aria-valuenow", stat.base_stat);
    progressBar.setAttribute("aria-valuemin", 0);
    progressBar.setAttribute("aria-valuemax", 200);
    progressBar.style.width = statPercent;

    progressBar.textContent = stat.base_stat;

    progress.appendChild(progressBar);
    statContainer.appendChild(statName);
    statContainer.appendChild(progress);

    statsContainer.appendChild(statContainer);
  }

  return statsContainer;
}


function deletePokeTeam(pokemon) {
  let newPokeArray = pokemonsTeam.filter(
    (element) => element.id !== pokemon.id
    
  );
  retrieveToLS("pokemonsTeam", newPokeArray);
}
function addPokemonInCard() {
  const button = document.createElement("button");
  button.classList.add("remove");
  button.textContent = "X";
  if (pokemonsTeam.length > 0) {
    for (let index = 0; index < pokemonsTeam.length; index++) {
      if (index === 0) {
        
        let block1 = document.getElementById("block1");
        block1.appendChild(button);
        let pokemon = pokemonsTeam[0];
        let img = document.getElementById("content1").querySelector("img");
      

        img.src = pokemon.sprites.front_default;
        let number =  document.getElementById("content1").querySelectorAll("p");
        number = `#${pokemon.id.toString().padStart(3, 0)}`;
        document.getElementById("number1").innerHTML = number;
     
       let name =  document.getElementById("content1").querySelectorAll("p");
       name = pokemon.name;
       document.getElementById("name1").innerHTML = name;

       button.addEventListener("click", () => {
          img.src = "./pokemon-ball-icon.jpg";
          document.getElementById("name1").innerHTML = " ";
          document.getElementById("number1").innerHTML = " ";
          button.textContent = " ";

      
        deletePokeTeam(pokemon);
      });
  

      
      }
      if (index === 1) {
        let content2 = document.getElementById("content2");
        let block2 = document.getElementById("block2");
        block2.appendChild(button);
        let pokemon = pokemonsTeam[1];
        let img = document.getElementById("content2").querySelector("img");
      
        img.src = pokemon.sprites.front_default;
        let number =  document.getElementById("content2").querySelectorAll("p");
        number = `#${pokemon.id.toString().padStart(3, 0)}`;
        document.getElementById("number2").innerHTML = number;
     
       let name =  document.getElementById("content2").querySelectorAll("p");
       name = pokemon.name;
       document.getElementById("name2").innerHTML = name;
       button.addEventListener("click", () => {
       
        img.src = "./pokemon-ball-icon.jpg";
          document.getElementById("name2").innerHTML = " ";
          document.getElementById("number2").innerHTML = " ";
          button.textContent = " ";
          deletePokeTeam(pokemon);
      });
  
      }
      if (index === 2) {
        let block3 = document.getElementById("block3");
        block3.appendChild(button);
        let pokemon = pokemonsTeam[2];
        let img = document.getElementById("content3").querySelector("img");
   
        img.src = pokemon.sprites.front_default;
        let number =  document.getElementById("content4").querySelectorAll("p");
        number = `#${pokemon.id.toString().padStart(3, 0)}`;
        document.getElementById("number3").innerHTML = number;
     
       let name =  document.getElementById("content4").querySelectorAll("p");
       name = pokemon.name;
       document.getElementById("name3").innerHTML = name;
       button.addEventListener("click", () => {
      
        img.src = "./pokemon-ball-icon.jpg";
          document.getElementById("name3").innerHTML = " ";
          document.getElementById("number3").innerHTML = " ";
          button.textContent = " ";
          deletePokeTeam(pokemon);
      });
      }
      if (index === 3) {
        let block4 = document.getElementById("block4");
        block4.appendChild(button);
        let pokemon = pokemonsTeam[3];
        let img = document.getElementById("content4").querySelector("img");
       

        img.src = pokemon.sprites.front_default;
        let number =  document.getElementById("content4").querySelectorAll("p");
        number = `#${pokemon.id.toString().padStart(3, 0)}`;
        document.getElementById("number4").innerHTML = number;
     
       let name =  document.getElementById("content4").querySelectorAll("p");
       name = pokemon.name;
       document.getElementById("name4").innerHTML = name;
       button.addEventListener("click", () => {
       
        img.src = "./pokemon-ball-icon.jpg";
          document.getElementById("name4").innerHTML = " ";
          document.getElementById("number4").innerHTML = " ";
          button.textContent = " ";
     
          deletePokeTeam(pokemon);
      });

       
      }
      if (index === 4) {
        let block5 = document.getElementById("block5");
        block5.appendChild(button);
        let pokemon = pokemonsTeam[4];
        let img = document.getElementById("content5").querySelector("img");
    

        img.src = pokemon.sprites.front_default;
        let number =  document.getElementById("content5").querySelectorAll("p");
        number = `#${pokemon.id.toString().padStart(3, 0)}`;
        document.getElementById("number5").innerHTML = number;
     
       let name =  document.getElementById("content5").querySelectorAll("p");
       name = pokemon.name;
       document.getElementById("name5").innerHTML = name;
       button.addEventListener("click", () => {
        img.src = "./pokemon-ball-icon.jpg";
          document.getElementById("name5").innerHTML = " ";
          document.getElementById("number5").innerHTML = " ";
          button.textContent = " ";
   
        deletePokeTeam(pokemon);
      });
      }
      if (index === 5) {
        let block6 = document.getElementById("block6");
        block6.appendChild(button);
        let pokemon = pokemonsTeam[5];
        let img = document.getElementById("content6").querySelector("img");
      
        img.src = pokemon.sprites.front_default;
        let number =  document.getElementById("content6").querySelectorAll("p");
        number = `#${pokemon.id.toString().padStart(3, 0)}`;
        document.getElementById("number6").innerHTML = number;
     
       let name =  document.getElementById("content6").querySelectorAll("p");
       name = pokemon.name;
       document.getElementById("name6").innerHTML = name;
       button.addEventListener("click", () => {
        img.src = "./pokemon-ball-icon.jpg";
        document.getElementById("name6").innerHTML = " ";
        document.getElementById("number6").innerHTML = " ";
        button.textContent = " ";

        deletePokeTeam(pokemon);
      });
      }
    }
  }
}


verifyPokemonsInLocalStorage();