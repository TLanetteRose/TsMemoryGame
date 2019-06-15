

	

//Thanks to tutorial by Sandra Israel-Ovirih, https://scotch.io/tutorials/how-to-build-a-memory-matching-game-in-javascript 


//Array for cards
let card = document.getElementsByClassName("card");
let cards = [...card];


//Deck of all cards
const deck = document.getElementById("card-deck");

//Move variable
let moves = 0;
let counter = document.querySelector(".moves");

//Star variable
const stars = document.querySelectorAll(".fa-star");

//Matched Cards variable
let matchedCard = document.getElementsByClassName("match");

//Stars List
let starsList = document.querySelectorAll(".stars li");

//Close icon
let closeicon = document.querySelector(".close");

//Modal
let modal = document.getElementById("popup");

//Array for opened cards
var openedCards = [];


// Shuffle function from http://stackoverflow.com/a/2450976 Knuth Shuffle

function shuffle(array) {
   var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0){
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

//Shuffles cards when page is refreshed
document.body.onload = startGame();

// Function to start a new play
function startGame(){

	//empty openCards array
	openedCards = [];

	 // Shuffle Deck
	cards = shuffle(cards);
	for(var i = 0; i < cards.length; i++) {
		deck.innerHTML = "";
		[].forEach.call(cards, function(item){
			deck.appendChild(item); 
		});
		cards[i].classList.remove("show", "open", "match", "disabled"); 
	}
	//reset moves
	moves = 0;
	counter.innerHTML = moves;
	//reset rating
	for(var i = 0; i < stars.length; i++){
		stars[i].style.color = "#ffd700";
		stars[i].style.visibility = "visible";
	}
	//reset timer
	second = 0;
	minute = 0;
	hour = 0;
	var timer = document.querySelector(".timer");
	timer.innerHTML= "0 mins 0 seconds";
	clearInterval(interval); 
}

// Toggles open and show class to display cards
var displayCard = function (){
	this.classList.toggle("open");
	this.classList.toggle("show");
	this.classList.toggle("disabled"); 
};

//Add opened cards to OpenedCards list and check matches
function cardOpen(){
	openedCards.push(this);
	var len = openedCards.length;
	if(len === 2){
		moveCounter();
		if(openedCards[0].type === openedCards[1].type) {
			matched();
		} else {
			unmatched();
		}
	}
};

//When Cards match
function matched() {
	openedCards[0].classList.add("match", "disabled");
	openedCards[1].classList.add("match", "disabled");
	openedCards[0].classList.remove("show", "open", "no-event");
	openedCards[1].classList.remove("show", "open", "no-event");
	openedCards = [];
}

//When Cards don't match
function unmatched(){
	openedCards[0].classList.add("unmatched");
	openedCards[1].classList.add("unmatched");
	disable();
	setTimeout(function() {
		openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
		openedCards[1].classList.remove("show", "open", "no-event", "unmatched");
		enable();
		openedCards = [];
	}, 1100);
}

//Disable cards temporarily
function disable() {
	Array.prototype.filter.call(cards, function(card) {
		card.classList.add("disabled");
	});
}

//Enable cards and disable matched cards
function enable(){
	Array.prototype.filter.call(cards, function(card) {
		card.classList.remove("disabled");
		for(var i = 0; i < matchedCard.length; i++){
			matchedCard[i].classList.add("disabled");
		}
	});
}

//Count player's moves
function moveCounter(){
	moves++;
	counter.innerHTML = moves;
	//start timer on first click
	if(moves == 1){
		second = 0;
		minute = 0;
		hour = 0;
		startTimer();
	}
	//setting rates based on moves
	if (moves > 8 && moves < 12){
		for( i = 0; i < 3; i++){
			if(i > 1){
				stars[i].style.visibility = "collapse";
			}
		}
	}
	else if (moves > 13){
		for( i = 0; i < 3; i++){
			if (i > 0){
				stars[i].style.visibility = "collapse";
			}
		}
	}
	
}

//Game timer
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
	interval = setInterval(function(){
		timer.innerHTML = minute+"mins "+second+"secs";
		second++;
		if(second == 60){
			minute++;
			second=0;
		}
		if(minute == 60){
			hour++;
			minute = 0;
		}
	}, 1000);
}

//Congratulations Modal
function congratulations(){
	if (matchedCard.length == 16){
		clearInterval(interval);
		finalTime = timer.innerHTML;

		//show congratulations
		modal.classList.add("show");

		//declare star rating variable
		var starRating = document.querySelector(".stars").innerHTML;

		//show move, rating, time
		document.getElementById("finalMove").innerHTML = moves;
		document.getElementById("starRating").innerHTML = starRating;
		document.getElementById("totalTime").innerHTML = finalTime;

		//closeicon on modal
		closeModal();
	};
}

// Close icon on modal
function closeModal(){
	closeicon.addEventListener("click", function(e){
		modal.classList.remove("show");
		startGame();
	});
}

//Allows user to play again
function playAgain(){
	modal.classList.remove("show");
	startGame();
}

//loop to add event listeners to each card
for (var i=0; i < cards.length; i++){
	card = cards[i];
	card.addEventListener("click", displayCard);
	card.addEventListener("click", cardOpen);
	card.addEventListener("click", congratulations);
};



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


 
