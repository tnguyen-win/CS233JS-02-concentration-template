/*  Overview
    This application simulates a concentration or memory game of 20 cards.
    The game begins with 20 (10 pairs of 2) cards "face down" on the board.
    The user clicks 2 cards at a time.  The cards are displayed "face up".
    After a brief pause the cards are removed from the board if they match
    or are turned "face down" if they are not.  The game is over when the 
    user has cleared all 20 cards from the board.

    There are 3 global variables that are used to keep track of the "state"
    of the application.
    -  imagePath - the folder where the cards are stored
    -  images - an array of 20 card file names
    -  firstPick - the 0 based index of the first card picked by the user
    -  secondPick - the 0 based index of the 2nd card picked by the user
    -  matches - the number of matches the user has removed from the board so far
    -  tries - the number of pairs of cards the user has selected so far

    The function handleClick is associated with the click event handler for each card.

    There are lots of  "helper" functions.  Comments in the code describe each of these functions.
    I've written more functions that I might have done to make each function as simple as possible.
*/

// start with these global variables
// the folder where your card images are stored
var imagePath = 'Cards/';
// an array that stores the images for each card
var images = Array(20).fill(null);
// the index of the first card picked by the user
var firstPick = -1;
// the index of the second card picked by the user
var secondPick = -1;
// statistics about this "round"
var matches = 0;
var tries = 0;

// PART 1 //
// when the page loads, call the function init
window.onload = init;

// this function initializes the page
function init()
{
    fillImages();
    //shuffleImages();
    showMatches();
    enableAllCards();
    showAllBacks();
}

// shows the number of matches and tries in the status element on the page
function showMatches() {
    var status = document.getElementById("status");
    if (matches < 10)
        status.innerHTML = 'Matches: ' + matches + " Tries: " + tries;
    else
        status.innerHTML = "Congratulations!  You found all 10 matches in " + tries + " tries!";   
}

// fills the array images with 10 pairs of card filenames
// card filenames follow this pattern:  cardvs.jpg where
// v is the first char of the value of the card and 
// s is the first char of the suit of the card
// example:  cardjh.jpg is the jack of hearts
function fillImages() {
    var values = ['a', 'k', 'q', 'j', 't', '9', '8', '7', '6', '5'];
    var suits = ['h', 's'];
    var index = 0;
    for (var value = 0; value < values.length; value++){
        for (var suit = 0; suit < suits.length; suit ++) {
            images[index] = "card" + values[value] + suits[suit] + ".jpg";
            index++;
        }
    }
}

// shuffles the elements in the images array
function shuffleImages() {
    for (var i = 0; i < images.length; i++) {
        var rnd = Math.floor(Math.random() * images.length);
        var temp = images[i];
        images[i] = images[rnd];
        images[rnd] = temp;
    }
}

// assigns the handleclick function to the onclick event for all cards
// on the page.  All cards have the name attribute set to card.
// It also sets the cursor (part of the style) to 'pointer'
function enableAllCards() {
    var cards = document.getElementsByName("card");
    for (var i = 0; i < cards.length; i++) {
        cards[i].onclick = handleClick;
        cards[i].style.cursor = 'pointer';
    }
}

// enables (see enable all) only the cards whose backgroundImage
// style property is not 'none'
function enableAllRemainingCards() {
    var cards = document.getElementsByName("card");
    for (var i = 0; i < cards.length; i++) {
        if (cards[i].backgroundImage != 'none')
            cards[i].onclick = handleClick;
            cards[i].style.cursor = 'pointer';
    }
}

// shows the back of one card based on it's index
// each card has an id attribute set to it's index in the html page
// the backgroundImage (style) is set to the url of the image
// for a card back to "show the back"
function showBack(index) {
    var backImage = imagePath + 'black_back.jpg';
    var card = document.getElementById(index);
    card.style.backgroundImage = 'url(' + backImage + ')';
}

// shows the back for all cards
// calls showBack in the body of a for loop
function showAllBacks() {
    var cards = document.getElementsByName("card");
    for (var i = 0; i < cards.length; i++) {
        showBack(i);
    }    
}
// END PART 1 - TEST THIS FAR //

// PART 2 //
// this is the function that fires when the user clicks on a card
function handleClick() {
    var index = this.id;
    var cardImage = imagePath + images[index];
    this.style.backgroundImage = 'url(' + cardImage + ')';
    disableCard(index);
    if (firstPick == -1) {
        firstPick = index;
    }
    else {
        secondPick = index;
        disableAllCards();
        setTimeout(checkCards, 2000);
    }
}

// disable one card based on it's index
function disableCard(index) {
    var card = document.getElementById(index);
    card.onclick = () => {}; 
    card.style.cursor = 'none';
}

// disable all of the cards
function disableAllCards() {
    for (var i = 0; i < images.length; i++)
        disableCard(i);
}
// END PART 2 - TEST TO HERE //

// PART 3 //
// checks the 2 cards that have been picked for matches 
function checkCards() {
    // increment the number of tries
    tries++;
    if (isMatch() == true) {
        matches++;
        removeCard(firstPick);
        removeCard(secondPick);
        if (matches < 10) {
            enableAllRemainingCards();
        }
    }
    else {
        showBack(firstPick);
        showBack(secondPick);
        enableAllRemainingCards();
    }
    showMatches();
    firstPick = -1;
    secondPick = -1;
}

// determines if the images in firstPick and secondPick are a match
// 2 cards are a match if they have the same value
// cardvs.jpg is the pattern for card file names
function isMatch() {
    if (images[firstPick].substr(4, 1) == images[secondPick].substr(4, 1))
        return true;
    else
        return false;
}

// removes one card from the board based on it's index
// set the backgroundImage to 'none' to remove the card
function removeCard(index) {
    var card = document.getElementById(index);
    card.style.backgroundImage = 'none';
}
// END PART 3 - TEST THE ENTIRE APP //