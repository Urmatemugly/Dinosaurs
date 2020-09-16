//define grid variables
const grid = document.getElementById('grid');
const gridItem = document.querySelector('.grid-item')

// Generate Tiles for each Dino in Array
const createGrid = async function createCards(){
  try {
  //fetch dino.json
  const dino = await fetch ("dino.json")
  .then(result => result.json())
  .then(result => result.Dinos);
  // Create Dino Objects
  //Create variable & map the dino array through Creatures constructor function
  const dinosaurs = dino.map(dinosaurs => new Creature(
    this.species,
    this.weight,
    this.height,
    this.diet,
    this.where,
    this.when,
    this.fact,
    this.image
  ));
  // Create Human Object
  const human = new Creature();
    // Use IIFE to get human data from form
  const humanData = () => {
  (function(human) {
      human.image = "images/human.png";
      human.species = document.getElementById('name').value;
      human.diet = document.getElementById('diet').value;
      human.weight = document.getElementById('weight').value;
      human.feet = document.getElementById('feet').value;
      human.inches = document.getElementById('inches').value;
    // human.fact = [(), (), ()];
    })(human);
  };
  //loop through array, create elements and add data
      for (let i = 0; i < 9; i++) {
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

      cardTitle.innerHTML = dino[i].species;
      cardPic.setAttribute('src', dino[i].image);

      //randomize a fact
      cardFact.innerHTML = dino[i].fact[Math.floor(Math.random() * dino[i].fact.length)];
      // create human card
          // return createCard(humanData());
          //add human to creatureArray
        const creatureArray = dinosaurs.splice(4, 0, human);
          }

  }
    //closing TRY statement
    //log any error to the console
  catch (err) {
  console.log(err)
  };
  }


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
      console.log("hiding the form...")
      const toggleMe = document.getElementById('dino-compare');
      toggleMe.classList.add("hide")
      createGrid()
      };
    // On button click, prepare and display infographic
    const compareMe = document.getElementById('btn');
    compareMe.addEventListener('click', function(e){
      console.log("clicked!")
      toggleForm(); //Hide form
    });
