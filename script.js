let currentSet = {};
let currentIndex;
let currentTeam;

let teams = {
	teamA: { points: 0, name: "" },
	teamB: { points: 0, name: "" },
};

async function getData() {
	try {
		// fetches the data
		// limit value must be 2 or greater
		const response = await fetch("https://www.randomtriviagenerator.com/questions?limit=256");
		// converts to json
		const obj = await response.json();
		// converts to simplified array
		let output = [];
		for (let i = 0; i < obj.length; i++) {
			let element = {
				question: obj[i].question,
				answer: obj[i].answer,
				category: obj[i].categories[0]
			};
			output.push(element);
		}
		// output
		console.log("Fetching new questions from randomtriviagenerator.com")
		return output;
	} catch {
		// creates the link
		let link = "questions/set" + Math.floor(Math.random()*256) + ".txt";
		// fetches the data
		const response = await fetch(link);
		// converts to json
		const sets = await response.json();
		// output
		console.log("Fetching new questions from predefined folder")
		return sets;
	}
}

function newQuestion() {
	hide("answer");
	show("answerButton");
	if (currentSet.length > 0) {
		// if there are questions, update screen

		currentIndex = Math.floor(Math.random()*currentSet.length);

		console.log(`Displaying question ${currentIndex}. There are ${currentSet.length-1} questions left.`)

		document.getElementById("question").innerHTML = currentSet[currentIndex]["question"];
		document.getElementById("answer").innerHTML = currentSet[currentIndex]["answer"];
		document.getElementById("categoryText").innerHTML = currentSet[currentIndex]["category"].charAt(0).toUpperCase() + currentSet[currentIndex]["category"].slice(1);
		document.getElementById("categoryIcon").src = "assets/categories/" + currentSet[currentIndex]["category"] + ".svg";

		currentSet.splice(currentIndex, 1);

	} else {
		// otherwise, get a set of questions and try again
		getData().then(array => {
			currentSet = array;
			currentIndex = -1;
			newQuestion();
		});
	}
}

function numToPoints(number) {
	let suffix;
	if (number == 1) { suffix = " point"}
	else { suffix = " points"}
	return number + suffix;
}



//CSS Animation functions

function shrink(name) {
	let target = document.getElementById(name)
	try { target.classList.remove("grow"); }
	finally { target.classList.add("shrink"); }
}

function grow(name) {
	let target = document.getElementById(name)
	try { target.classList.remove("shrink"); }
	finally { target.classList.add("grow"); }
}

function show(name) {
	let target = document.getElementById(name)
	target.style.display = "block";
}

function hide(name) {
	let target = document.getElementById(name)
	target.style.display = "none";
}

/* function flyIn() {
	let target = document.getElementsByClassName("question")[0]
	try { target.classList.remove("flyOut"); }
	finally { target.classList.add("flyIn"); }
}

function flyOut() {
	let target = document.getElementsByClassName("question")[0]
	try { target.classList.remove("flyIn"); }
	finally { target.classList.add("flyOut"); }
} */


// correct button

document.getElementById("correctButton").addEventListener("click", function () {
	if (currentTeam == "teamA") {
		teams.teamA.points++;
	} else if (currentTeam == "teamB") {
		teams.teamB.points++;
	}

	// display team points
	document.getElementById("teamAPoints").innerHTML = numToPoints(teams.teamA.points);
	document.getElementById("teamBPoints").innerHTML = numToPoints(teams.teamB.points);

	newQuestion();

})



// setup

newQuestion();

if (Math.floor(Math.random()*2) == 0) {
	currentTeam = "teamA";
	shrink("teamB");
} else {
	currentTeam = "teamB";
	shrink("teamA");
}



// wrong button

document.getElementById("wrongButton").addEventListener("click", function () {

	newQuestion();

	if (currentTeam == "teamA") {
		currentTeam = "teamB";
		shrink("teamA");
		grow("teamB");
	} else if (currentTeam == "teamB") {
		currentTeam = "teamA";
		shrink("teamB");
		grow("teamA");
	}

});



// skip button

document.getElementById("skipButton").addEventListener("click", function () {
	newQuestion();
});



// start button

document.getElementById("startButton").addEventListener("click", function () {

	// get values from name inputs
	teams.teamA.name = document.getElementById("teamANameInput").value;
	teams.teamB.name = document.getElementById("teamBNameInput").value;

	// set values for names if blank
	if (teams.teamA.name == "") { teams.teamA.name = "Team A"; }
	if (teams.teamB.name == "") { teams.teamB.name = "Team B"; }

	// display team points
	document.getElementById("teamAPoints").innerHTML = numToPoints(teams.teamA.points);
	document.getElementById("teamBPoints").innerHTML = numToPoints(teams.teamB.points);

	// display team names
	document.getElementById("teamAName").innerHTML = teams.teamA.name;
	document.getElementById("teamBName").innerHTML = teams.teamB.name;

	// switch screens
	document.getElementsByClassName("setup")[0].style.display = "none";
	document.getElementsByClassName("game")[0].style.display = "grid";
});

document.getElementById("answerButton").addEventListener("click", function () {
	show("answer");
	hide("answerButton");
});
