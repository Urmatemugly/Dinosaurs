//define grid variables
const grid = document.getElementById('grid');
const gridItem = document.querySelector('.grid-item')

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
  //randomize a fact
        cardFact.innerHTML = dinosaurs[i].fact
  // [Math.floor(Math.random() * dino[i].fact.length)];
  };
    }
          // return createTile(human)

catch {
  console.log(err);
  }
    };

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
  }

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.


// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.


// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.


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
