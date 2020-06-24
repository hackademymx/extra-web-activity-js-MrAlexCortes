// Helped you a little by adding some boilerplate code.
// Feel free to modify it, if you believe is necessary.
const grid = document.querySelector(".grid");

const cardsArray = [
  { name: "cheeseburger", img: "images/cheeseburger.png" },
  { name: "fries", img: "images/fries.png" },
  { name: "hotdog", img: "images/hotdog.png" },
  { name: "ice-cream", img: "images/ice-cream.png" },
  { name: "milkshake", img: "images/milkshake.png" },
  { name: "pizza", img: "images/pizza.png" },
]
  .reduce((acc, element) => [...acc, element, element], [])
  .sort(() => 0.5 - Math.random());

// fill cards grid
cardsArray.forEach(({ img, name }, idx) => {
  const card = document.createElement("img");
  card.setAttribute("src", "images/blank.png");
  card.setAttribute("id", idx);
  grid.appendChild(card);
});

let score = 0;
let isFirstFlip = true;
const flippedCards = [null, null];

grid.addEventListener("click", event => {
   //check if click isn't outside cards
   if(event.target.className !== 'grid') {
      //if first card
      if(isFirstFlip) {
         flipCard(event.target.id, 0);
         isFirstFlip = false;
      }
      //else it's second card
      else {
         //check if flipped card isn't the same
         if(flippedCards[0] !== event.target.id) {
            flipCard(event.target.id, 1);

            checkIfMatch(); 
         }
      }
   }
});

function checkIfMatch() {
   setTimeout(() => {
      //it's a match
      if(cardsArray[flippedCards[0]].img == cardsArray[flippedCards[1]].img) {
         disableMatchCards();
         updateScore();
      }
      //else unflip cards
      else {
         unflipCards();
      }
   }, 750) 
}

function flipCard(cardId, cardNumber) {
   flippedCards[cardNumber] = cardId; 
   document.getElementById(cardId).setAttribute("src", cardsArray[event.target.id].img);
}

function disableMatchCards() {
   document.getElementById(flippedCards[0]).className = 'invisible';
   document.getElementById(flippedCards[1]).className = 'invisible';
   isFirstFlip = true;
}

function updateScore() {
   score++;
   document.getElementById('result').innerHTML = score;
}

function unflipCards() {
   isFirstFlip = true;
   document.getElementById(flippedCards[0]).setAttribute("src", "images/blank.png");
   document.getElementById(flippedCards[1]).setAttribute("src", "images/blank.png");
   flippedCards[0] = null;
   flippedCards[1] = null;
}