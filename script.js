// Startup

document.getElementById("game").style.display = "none";

let teamA, teamB, turn;

function Team(name) {
	this.points = 0;
	this.name = name;
}

setColor()

var card = {
	question: "",
	answer: "",
	category: "",
	answerShowing: false
}

var correctSFX = new Audio('assets/correct.mp3');
var incorrectSFX = new Audio('assets/incorrect.mp3');


// Setup Buttons

function setup(customNames) {

	// set the team names
	if (customNames) {
		var teamAWantedName = document.getElementById("teamANameInput").value;
		var teamBWantedName = document.getElementById("teamBNameInput").value;

		if (teamAWantedName == "") {
			teamAWantedName = "Team A";
		}

		if (teamBWantedName == "") {
			teamBWantedName = "Team B";
		}

		teamA = new Team(teamAWantedName);
		teamB = new Team(teamBWantedName);
	} else {
		teamA = new Team("Team A");
		teamB = new Team("Team B");
	}

	// randomly decides who goes first
	if (Math.random() >= 0.5) {
		turn = "teamA"
	} else {
		turn = "teamB"
	}

	// startup functions
	newQuestion();
	updateScore();

	setColor()

	// show game, hide Setup
	document.getElementById("setup").style.display = "none";
	document.getElementById("game").style.display = "block";
}

function begin() {
	document.getElementById("setup").style.display = "block";
	document.getElementById("game").style.display = "none";
}



// Buttons

function correctAnswer() {
	correctSFX.play();

	if (turn == "teamA") { teamA.points++ }
	else if (turn == "teamB") { teamB.points++ }
	updateScore()
	//toggleTurn()
	newQuestion()
}

function wrongAnswer() {
	incorrectSFX.play();

	toggleTurn()
	newQuestion()
	updateScore()
}

function skipAnswer() {
	newQuestion()
}

function showAnswer() {
	if (card.answerShowing) {
		document.getElementById("card").innerHTML = card.question;
		card.answerShowing = false;
	} else {
		document.getElementById("card").innerHTML = card.answer;
		card.answerShowing = true;
	}
}



// Other Functions

function setColor() {
	let color1, color2;
	if (turn == "teamA") {
		color1 = "#103783";
		color2 = "#9bafd9";
	} else if (turn == "teamB") {
		color1 = "#C02425";
		color2 = "#F0CB35";
	} else {
		color1 = "#232526";
		color2 = "#414345";
	}

	let body = document.querySelector("body");
	body.style.backgroundImage = "linear-gradient(to top right, " + color1 + " , " + color2 + ")"
}

function toggleTurn() {
	if (turn == "teamA") { turn = "teamB"; }
	else if (turn == "teamB") { turn = "teamA"; }
}

function updateScore() {
	let teamAOutput, teamBOutput = "";
	if (turn == "teamA") {
		teamAOutput = "<b>> " + teamA.name + " <</b><br>" + teamA.points;
		teamBOutput = teamB.name + ":<br> " + teamB.points;
	} else {
		teamAOutput = teamA.name + ":<br>" + teamA.points;
		teamBOutput = "<b>> " + teamB.name + " <</b><br>" + teamB.points;
	}

	if (teamA.points == 1) { teamAOutput += " point"}
	else  { teamAOutput += " points"}

	if (teamB.points == 1) { teamBOutput += " point"}
	else  { teamBOutput += " points"}

	document.getElementById("teamA").innerHTML = teamAOutput;
	document.getElementById("teamB").innerHTML = teamBOutput;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

var icons = {
	arts: "auto_stories",
	geography: "public",
	entertainment: "theater_comedy",
	history: "history_edu",
	science: "biotech",
	general: "sentiment_satisfied_alt"
}

function newQuestion() {
	setColor();

	//console.log("requesting")
	link = "https://www.randomtriviagenerator.com/questions?limit=1";
	// backup: https://jservice.io/api/random
	// backup: https://opentdb.com/api.php?amount=1
	var request = new XMLHttpRequest();
	request.open('GET', link, true);
	request.onload = function () {
		var obj = JSON.parse(this.response);
		if (request.status >= 200 && request.status < 400) {

			card.question = obj.question;
			card.answer = obj.answer;
			card.category = obj.categories[0];

			document.getElementById("card").innerHTML = card.question;
			document.getElementById("category").innerHTML = capitalize(card.category);
			document.getElementById("categoryIcon").innerHTML = icons[card.category];
			card.answerShowing = false;

		} else {
			console.log("ERROR: Unable to fetch new question");
		}
	}
	request.send();
}