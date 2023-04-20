/* jshint esversion: 6 */

class Concentration {
	constructor() {
		this.imagePath = "Cards/";
		this.images = Array(19).fill(null);
		this.firstPick = -1;
		this.secondPick = -1;
		this.matches = 0;
		this.tries = 0;

		this.showMatches = this.showMatches.bind(this);
		this.enableAllCards = this.enableAllCards.bind(this);
		this.enableAllRemainingCards = this.enableAllRemainingCards.bind(this);
		this.checkCards = this.checkCards.bind(this);
		this.disableAllCards = this.disableAllCards.bind(this);
		this.isMatch = this.isMatch.bind(this);

		this.init();
	}

	init() {
		this.fillImages();
		this.shuffleImages();
		this.showMatches();
		this.enableAllCards();
		this.showAllBacks();

		// for (let i in this.images) {
		// 	let cardImage = this.imagePath + this.images[i];
		// 	let card = document.getElementById(i);

		// 	card.style.backgroundImage = `url("${cardImage}")`;
		// };
	}

	showMatches() {
		document.getElementById("status").innerText = `Matches: ${this.matches} | Tries: ${this.tries}`;
	}

	fillImages() {
		const values = ["a", "k", "q", "j", "t", "9", "8", "7", "6", "5"];
		const suits = ["h", "s"];
		let index = 0;

		for (let n1 of values) {
			for (let n2 of suits) {
				this.images[index] = `card${n1}${n2}.jpg`;
				index++;
			}
		}
	}

	shuffleImages() {
		for (let i of this.images) {
			let r = Math.floor(Math.random() * this.images.length);
			let temp = i;

			i = this.images[r];
			this.images[r] = temp;
		}
	}

	enableAllCards() {
		const cards = document.getElementsByName("card");

		for (let c of cards) {
			c.onclick = this.handleClick.bind(this, c.id);
			c.style.cursor = "pointer";
		}
	}

	enableAllRemainingCards() {
		const cards = document.getElementsByName("card");

		for (let c of cards) {
			if (c.style.backgroundImage !== "none") {
				c.onclick = this.handleClick.bind(this, c.id);
				c.style.cursor = "pointer";
			}
		}
	}

	showBack(index) {
		let backImage = `${this.imagePath}black_back.jpg`;
		let card = document.getElementById(index);

		card.style.backgroundImage = `url("${backImage}")`;
	}

	showAllBacks() {
		const cards = document.getElementsByName("card");

		for (let c of cards) this.showBack(c.id);
	}

	handleClick(index) {
		let cardImage = `${this.imagePath}${this.images[index]}`;

		document.getElementById(index).style.backgroundImage = `url("${cardImage}")`;

		this.disableCard(index);

		if (this.firstPick === -1) this.firstPick = index;
		else {
			this.secondPick = index;
			this.disableAllCards();
			setTimeout(this.checkCards, 2000);
		}
	}

	disableCard(index) {
		let card = document.getElementById(index);

		card.onclick = () => { };
		card.style.cursor = "none";
	}

	disableAllCards() {
		const cards = document.getElementsByName("card");

		for (let c of cards) this.disableCard(c.id);
	}

	checkCards() {
		this.tries++;

		if (this.isMatch()) {
			this.matches++;
			this.removeCard(this.firstPick);
			this.removeCard(this.secondPick);
			if (this.matches < 10) this.enableAllRemainingCards();
		} else {
			this.showBack(this.firstPick);
			this.showBack(this.secondPick);
			this.enableAllRemainingCards();
		}

		this.showMatches();

		this.firstPick = this.secondPick = -1;
	}

	isMatch() {
		if (this.images[this.firstPick].substr(4, 1) === this.images[this.secondPick].substr(4, 1)) return true;

		return false;
	}

	removeCard(index) {
		let card = document.getElementById(index);

		card.style.backgroundImage = "none";
	}
}

var concentration;

window.onload = () => { concentration = new Concentration(); };