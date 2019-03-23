/*jshint esversion: 6*/
/* I added this eversion to make sure the javascript ran properly*/
/*
 * Create a list that holds all of your cards
 */
var cards = ['fa-diamond', 'fa-diamond',
            'fa-paper-plane-o', 'fa-paper-plane-o',
            'fa-anchor', 'fa-anchor',
            'fa-bolt', 'fa-bolt',
            'fa-cube', 'fa-cube',
            'fa-leaf', 'fa-leaf',
            'fa-bicycle', 'fa-bicycle',
            'fa-bomb', 'fa-bomb',
];

function generateCard(card) {
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}
// Class moves controls what's displayed in the score panel
let moveCounter = document.querySelector('.moves');
const restartButton = document.querySelector('.fa-repeat');
let second = 0, minute = 0, hour = 0;
let timer = document.querySelector('.timer');
let interval;
var staricons = document.querySelector('.fa fa-star');
let stars = document.querySelectorAll('.fa-star');
let congrats = document.querySelector('.modal');
var matches = 0;
let finalmoves = document.querySelector('.final-moves');
let finaltime = document.querySelector('.total-time');
let finalstars = document.querySelector('.starrating');
let playagainbutton = document.querySelector('.play-again');
let closeX = document.querySelector('.close');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */



 // Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//game begins with this function
function initGame(){
    startTimer();

    var deck = document.querySelector('.deck');
    var moveCounter = document.querySelector('.moves');
    var cardHTML = shuffle(cards).map(function(card) {
        return generateCard(card);
    });

    deck.innerHTML = cardHTML.join('');

    }
initGame();

// Game timer
function startTimer() {
    interval = setInterval(function() {
      timer.innerHTML = minute + ' mins ' + second + ' secs';
      second++;
      if (second == 60) {
        minute++;
        second = 0;
      }
      if (minute == 60) {
        hour++;
        minute = 0;
      }
    }, 1000);
  }

var allCards = document.querySelectorAll('.card');
var openCards = [];
var moves = 0;


//Moves
function updateMoves(){
    moves++;
    moveCounter.innerHTML = moves;
    removeStar();


function removeStar() {
    console.log(stars);

    if (moves === 8) {
        console.log('moves at 8');
        const star = stars[0];
        star.style.display = 'none';
    }
    if (moves ===11){
        console.log('moves at 11');
        const star = stars[1];
        star.style.display = 'none';
    }
    if (moves === 14){
        console.log('moves at 11');
        const star = stars[2];
        star.style.display = 'none';
    }
}

}
 function updateMatches(){
    console.log(finalstars);
    matches++;

    var endtime = timer.innerHTML;
    if(matches ===8){
        congrats.style.visibility= "visible";
        congrats.style.opacity=1;
        finalmoves.innerHTML= moves;
        finaltime.innerHTML = endtime;
        stars.forEach(star => finalstars.appendChild(star));

    }
 }
playagainbutton.addEventListener('click',reset);
restartButton.addEventListener('click',reset);
closeX.addEventListener('click',closeModal);

function closeModal(){
    congrats.style.visibility='hidden';
    congrats.style.opacity=0;
}

 function reset(){

     location.reload();
 }
//finds matches and flips cards over
allCards.forEach(function(card){
    card.addEventListener('click', function(e){
        if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')){
            openCards.push(card);
            card.classList.add('open','show');
            if(openCards.length == 2){
                if(openCards[0].dataset.card == openCards[1].dataset.card){
                    openCards[0].classList.add('match');
                    openCards[0].classList.add('open');
                    openCards[0].classList.add('show');

                    openCards[1].classList.add('match');
                    openCards[1].classList.add('open');
                    openCards[1].classList.add('show');
                    openCards = [];
                    updateMatches();
                }else {
                    //If there isn't a match, hide
                    setTimeout(function(){
                        openCards.forEach(function(card){
                            card.classList.remove('open' , 'show');
                        });

                        openCards =[];
                    }, 1000);
                }

                moveCounter.innerText = moves;
                updateMoves();
            }
        }
    });
});
