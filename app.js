/** define grid variables **/
const grid = document.getElementById("grid");
const gridItem = document.querySelector(".grid-item");

/** Create Dino(/creature) constructor function **/
function Creature(species, weight, height, diet, where, when, fact, image) {
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.fact = fact;
  this.image = image;
};

/** Generate Tiles for each Dino in Array **/
const createGrid = async function createGrid() {
  try {
    /** fetch dino.json & Create Dino Objects **/
    const dino = await fetch("dino.json")
    .then((result) => result.json())
    .then((result) => result.Dinos);

    /** Create new array variable & map the dino array through Creatures constructor function **/
    const dinosaurs = dino.map(
      (dino) =>
      new Creature(
        dino.species,
        dino.weight,
        dino.height,
        dino.diet,
        dino.where,
        dino.when,
        dino.fact,
        dino.image
      )
    );

    /** Create Human Object **/
    const human = new Creature();

    /** Use IIFE to get human data from form **/
    (function (human) {
      human.image = "images/human.png";
      human.species = document.getElementById("name").value;
      human.diet = document.getElementById("diet").value;
      human.weight = document.getElementById("weight").value;
      const feet = document.getElementById("feet").value;
      const inches = document.getElementById("inches").value;
      human.height = feet * 12 + inches;
    })(human);

    /** add human to Array **/
    dinosaurs.splice(4, 0, human);

    /** variable function for creating cards **/
    const getCards = () => {
      /** loop through array, create elements and add data **/
      for (let i = 0; i < dinosaurs.length; i++) {
        const newCard = document.createElement("div");
        const cardTitle = document.createElement("h3");
        const cardPic = document.createElement("img");
        const cardFact = document.createElement("p");
        const fragment = new DocumentFragment();

        /** Add cards to the DOM **/
        newCard.className = "grid-item";
        newCard.appendChild(cardTitle);
        newCard.appendChild(cardPic);
        newCard.appendChild(cardFact);
        fragment.appendChild(newCard);
        grid.appendChild(fragment);
        cardTitle.innerHTML = dinosaurs[i].species;
        cardPic.setAttribute("src", dinosaurs[i].image);

        /** Compare methods **/
        const dinosaurObj = dinosaurs[i];

        /** Create Dino Compare Method 1 **/
        const checkWeight = () => {
          if (dinosaurObj.weight > human.weight) {
            return `${dinosaurObj.species} weighed ${
              dinosaurObj.weight - human.weight
            } lbs more than ${human.species}`;
          } else if (human.weight > dinosaurObj.weight) {
            return `${human.species} weighs ${
              human.weight - dinosaurObj.weight
            } lbs more than ${dinosaurObj.species}`;
          }
        };

        /** Create Dino Compare Method 2 **/
        const checkDiet = () => {
          if (human.diet === "herbavor" && dinosaurObj.diet === "herbavor") {
            return `${dinosaurObj.species} was a herbavor too!`;
          } else if (
            human.diet === "carnivor" &&
            dinosaurObj.diet === "carnivor"
          ) {
            return `${dinosaurObj.species} also was a carnivor!`;
          } else {
            return `${dinosaurObj.species} was known to be a ${dinosaurObj.diet}`;
          }
        };

        /** Create Dino Compare Method 3 **/
        const checkHeight = () => {
          if (dinosaurObj.height > human.height) {
            return `${dinosaurObj.species} is ${
              dinosaurObj.height - human.height
            }
            inches taller than ${human.species}`;
          } else if (human.height > dinosaurObj.height) {
            return `${human.species} is ${
              human.height - dinosaurObj.height
            } inches taller than ${dinosaurObj.species}`;
          }
        };

        /** empty human fact **/
        human.fact = "";

        /** randomize a fact **/
        if (typeof dinosaurObj.fact === "string") {
          cardFact.innerHTML = dinosaurObj.fact;
        } else {
          dinosaurObj.fact.push(checkWeight(), checkDiet(), checkHeight());
          cardFact.innerHTML = dinosaurObj.randomize();
        }
      };
    };
      getCards();
      resetBtn();
    } catch (error) {
    console.log(error);
  };
};

/** randomize facts from Array; Source; https://stackoverflow.com/questions/5915096/get-a-random-item-from-a-javascript-array/23976260#23976260 **/
Creature.prototype.randomize = function () {
  return this.fact[Math.floor(Math.random() * this.fact.length - 1)];
};

/** Remove form from screen **/
/** classList.contains method; https://stackoverflow.com/questions/5898656/check-if-an-element-contains-a-class-in-javascript**/
function toggleForm() {
  const toggleMe = document.getElementById("dino-compare");
  if (toggleMe.classList.contains("hide")) {
    toggleMe.classList.remove("hide");
  } else {
    toggleMe.classList.add("hide");
  }
};

/** Create reset btn + event listener **/
function resetBtn() {
  const resetDiv = document.getElementById("resetbtn");
  if (document.getElementById("reset")) {
    reset.remove();
  } else {
    const reset = document.createElement("BUTTON");
    reset.innerHTML = "Compare again?";
    reset.id = "reset";
    reset.classList.add("btn");
    resetDiv.appendChild(reset);
    reset.addEventListener("click", function (e) {
      toggleForm();
      clearGrid();
    });
  }
};

/** clear grid after reset**/
function clearGrid() {
  grid.innerHTML = "";
  /** remove reset button if still on screen **/
  if (document.getElementById("reset")) {
    reset.remove();
  }
};

/** on button click prepare and display infographic **/
const compareMe = document.getElementById("btn");
compareMe.addEventListener("click", function (e) {
  toggleForm(); /** hide form **/
  createGrid(); /** create grid **/
});

/** Sources;Knowledge posts (udacity), in particular student Typhaney; https://github.com/typhaneybdev/dino **/
