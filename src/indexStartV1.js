/* jshint esversion: 6 */

var imagePath = "Cards/";
var images = Array(19).fill(null);
var firstPick = -1;
var secondPick = -1;
var matches = 0;
var tries = 0;

window.onload = init;

function init() {
	fillImages();
	shuffleImages();
	showMatches();
	enableAllCards();
	showAllBacks();

	// images.forEach((n, i) => {
	// 	let cardImage = imagePath + n;
	// 	let card = document.getElementById(i);

	// 	card.style.backgroundImage = `url("${cardImage}")`;
	// });
}

function showMatches() {
	document.getElementById("status").innerText = `Matches: ${matches} | Tries: ${tries}`;
}

function fillImages() {
	const values = ['a', 'k', 'q', 'j', 't', '9', '8', '7', '6', '5'];
	const suits = ['h', 's'];
	let index = 0;

	values.forEach((n1) => {
		suits.forEach((n2) => {
			images[index] = `card${n1}${n2}.jpg`;
			index++;
		});
	});
}

function shuffleImages() {
	images.forEach((i) => {
		let r = Math.floor(Math.random() * images.length);
		let temp = i;

		i = images[r];
		images[r] = temp;
	});
}

function enableAllCards() {
	const cards = document.getElementsByName("card");

	cards.forEach((c) => {
		c.onclick = handleClick;
		c.style.cursor = "pointer";
	});
}

function enableAllRemainingCards() {
	const cards = document.getElementsByName("card");

	cards.forEach((c) => {
		if (c.style.backgroundImage !== "none") {
			c.onclick = handleClick;
			c.style.cursor = "pointer";
		}
	});
}

function showBack(index) {
	let backImage = `${imagePath}black_back.jpg`;
	let card = document.getElementById(index);

	card.style.backgroundImage = `url("${backImage}")`;
}

function showAllBacks() {
	const cards = document.getElementsByName("card");

	cards.forEach((c) => showBack(c.id));
}

function handleClick() {
	let index = this.id;
	let cardImage = `${imagePath}${images[index]}`;

	this.style.backgroundImage = `url("${cardImage}")`;

	disableCard(index);

	if (firstPick === -1) firstPick = index;
	else {
		secondPick = index;
		disableAllCards();
		setTimeout(checkCards, 2000);
	}
}

function disableCard(index) {
	let card = document.getElementById(index);

	card.onclick = () => { };
	card.style.cursor = "none";
}

function disableAllCards() {
	const cards = document.getElementsByName("card");

	cards.forEach((c) => disableCard(c.id));
}

function checkCards() {
	tries++;

	if (isMatch()) {
		matches++;
		removeCard(firstPick);
		removeCard(secondPick);
		if (matches < 10) enableAllRemainingCards();
	} else {
		showBack(firstPick);
		showBack(secondPick);
		enableAllRemainingCards();
	}

	showMatches();

	firstPick = secondPick = -1;
}

function isMatch() {
	if (images[firstPick].substr(4, 1) === images[secondPick].substr(4, 1)) return true;

	return false;
}

function removeCard(index) {
	let card = document.getElementById(index);

	card.style.backgroundImage = "none";
}