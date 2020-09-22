//define grid variables
const grid = document.getElementById('grid');
const gridItem = document.querySelector('.grid-item')

// Create Dino(/creature) Constructor function
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

// Generate Tiles for each Dino in Array
const createGrid = async function createGrid(){
try {
  //fetch dino.json
        const dino = await fetch ("dino.json")
          .then(result => result.json())
          .then(result => result.Dinos);

// Create Dino Objects
//Create variable & map the dino array through Creatures constructor function
        const dinosaurs = dino.map(dino => new Creature(
          dino.species,
          dino.weight,
          dino.height,
          dino.diet,
          dino.where,
          dino.when,
          dino.fact,
          dino.image
            ));

//randomize facts from Array; Source; https://stackoverflow.com/questions/5915096/get-a-random-item-from-a-javascript-array/23976260#23976260
Creature.prototype.randomize = function() {
    return this.fact[Math.floor(Math.random() * this.fact.length)];
};

  // Create Human Object
        const human = new Creature();

  // Use IIFE to get human data from form
        (function(human) {
          human.image = "images/human.png";
          human.species = document.getElementById('name').value;
          human.diet = document.getElementById('diet').value;
          human.weight = document.getElementById('weight').value;
          const feet = document.getElementById('feet').value;
          const inches = document.getElementById('inches').value;
          human.height = feet + "'" + inches;
        }(human));
//add human to Array
        dinosaurs.splice(4, 0, human);
// variable function for creating cards
const getCards = () => {
//loop through array, create elements and add data
      for (let i = 0; i < dinosaurs.length; i++) {
          const newCard = document.createElement('div');
          const cardTitle = document.createElement('h3');
          const cardPic = document.createElement('img');
          const cardFact = document.createElement('p');
// Add cards to the DOM
          newCard.className = 'grid-item';
          grid.appendChild(newCard);
          newCard.appendChild(cardTitle);
          newCard.appendChild(cardPic);
          newCard.appendChild(cardFact);
          cardTitle.innerHTML = dinosaurs[i].species;
          cardPic.setAttribute('src', dinosaurs[i].image);
//Compare methods
          const dinosaurObj = dinosaurs[i];
          // Create Dino Compare Method 1
          const checkWeight = () => {
            if (dinosaurObj.weight > human.weight) {
              return '${dinosaurObj.species} is ${dinosaurObj.weight - human.weight} lbs more than ${human.species}';
            } else if (human.weight > dinosaurObj.weight) {
                return '${human.species} is ${human.species - dinosaurObj.weight} lbs more than ${dinosaurObj.species}';
              }
          };
          // Create Dino Compare Method 2
          const checkDiet = () => {
            if (human.diet == 'herbavor' && dinosaurObj.diet == 'herbavor') {
              return '${human.species} shares the same diet as ${dinosaurObj.species}';
              } else if (human.diet == 'carnivor' && dinosaurObj.diet == 'carnivor') {
              return '${human.species} shares the same diet as ${dinosaurObj.species}';
              } else {
              return 'None of our Dinosaurs share the same diet as ${human.species}';
              }
          };
          // Create Dino Compare Method 3
          const checkHeight = () => {
          //Variable to convert human height (string) to number
            const humanInches = parseInt(human.feet * 12) + parseInt(human.inches)
            if (dinosaurObj.height > humanInches) {
              return '${dinosaurObj.species} is  ${dinosaurObj.height - humanInches} inches taller than ${human.species}';
          }
            else if (humanInches > dinosaurObj.height) {
              return '${human.species} is  ${humanInches - dinosaurObj.height} inches taller than ${dinosaurObj.species}';
            }
        };
        // randomize a fact
      if (typeof dinosaurObj.fact === 'string'){
        cardFact.innerHTML = "";
      } else {
        dinosaursObj.fact.push(checkWeight(), checkDiet(), checkHeight());
        cardFact.innerHTML = dinosaursObj.randomize();
        }
      }
    };
  } catch {
  console.log("There seems to be an issue!");
  }
    };

// Remove form from screen
    function toggleForm() {
      const toggleMe = document.getElementById('dino-compare');
      toggleMe.classList.add("hide")
      createGrid()
      };
// On button click, prepare and display infographic
    const compareMe = document.getElementById('btn');
    compareMe.addEventListener('click', function(e){
      toggleForm(); //Hide form
    });


// Sources; Knowledge posts (udacity), in particular student Typhaney; https://github.com/typhaneybdev/dino
