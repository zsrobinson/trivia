/*  =====================
	  TABLE OF CONTENTS
	=====================

	1. VARIABLES
	2. FUNCTIONS
	3. ANIMATIONS
	4. EVENT HANDLERS  
	5. SETUP  */

/*  ================
	  1. VARIABLES
	================  */

let currentSet = {};
let currentIndex;
let currentTeam;
let teams = {
	teamA: { points: 0, name: "" },
	teamB: { points: 0, name: "" },
};
let stopwatchStartTime = 0;

/*  ================
	  2. FUNCTIONS
	================  */

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
				category: obj[i].categories[0],
			};
			output.push(element);
		}
		// output
		console.log("Fetching new questions from randomtriviagenerator.com");
		return output;
	} catch {
		// creates the link
		let link = "questions/set" + Math.floor(Math.random() * 256) + ".txt";
		// fetches the data
		const response = await fetch(link);
		// converts to json
		const sets = await response.json();
		// output
		console.log("Fetching new questions from predefined folder");
		return sets;
	}
}

function newQuestion() {
	hide("text-answer");
	show("button-answer");
	stopwatchReset();

	if (currentSet.length > 0) {
		// if there are questions, update screen

		currentIndex = Math.floor(Math.random() * currentSet.length);

		console.log(`Displaying question ${currentIndex}. There are ${currentSet.length - 1} questions left.`);

		document.getElementById("text-question").innerHTML = currentSet[currentIndex]["question"];
		document.getElementById("text-answer").innerHTML = currentSet[currentIndex]["answer"];
		document.getElementById("text-category").innerHTML =
			currentSet[currentIndex]["category"].charAt(0).toUpperCase() + currentSet[currentIndex]["category"].slice(1);
		document.getElementById("icon-category").src = "assets/categories/" + currentSet[currentIndex]["category"] + ".svg";

		currentSet.splice(currentIndex, 1);
	} else {
		// otherwise, get a set of questions and try again
		getData().then((array) => {
			currentSet = array;
			currentIndex = -1;
			newQuestion();
		});
	}
}

function numToPoints(number) {
	let suffix;
	if (number == 1) {
		suffix = " point";
	} else {
		suffix = " points";
	}
	return number + suffix;
}

function stopwatchReset() {
	stopwatchStartTime = (new Date()).getTime();
}

function stopwatchLoop() {
	//get time difference
	const difference = (new Date()).getTime() - stopwatchStartTime
	const differenceSec = Math.floor(difference/1000)

	//calculate seconds and minutes for time
	let sec = differenceSec % 60;
	const min = Math.floor(differenceSec / 60);
	if (sec < 10) {
		sec = "0" + sec;
	}

	//update screen and repeat
	document.getElementById("text-time").innerHTML = `${min}:${sec} seconds`;
	setTimeout(stopwatchLoop, 100);
}

/*  =================
	  3. ANIMATIONS
	=================  */

function shrink(name) {
	let target = document.getElementById(name);
	try {
		target.classList.remove("box-grow");
	} finally {
		target.classList.add("box-shrink");
	}
}

function grow(name) {
	let target = document.getElementById(name);
	try {
		target.classList.remove("box-shrink");
	} finally {
		target.classList.add("box-grow");
	}
}

function show(name) {
	let target = document.getElementById(name);
	target.style.display = "block";
}

function hide(name) {
	let target = document.getElementById(name);
	target.style.display = "none";
}

/*  =====================
	  4. EVENT HANDLERS
	=====================  */

/* Correct Button */

document.getElementById("button-large-correct").addEventListener("click", function () {
	if (currentTeam == "teamA") {
		teams.teamA.points++;
	} else if (currentTeam == "teamB") {
		teams.teamB.points++;
	}

	// display team points
	document.getElementById("text-points-team-a").innerHTML = numToPoints(teams.teamA.points);
	document.getElementById("text-points-team-b").innerHTML = numToPoints(teams.teamB.points);

	newQuestion();
});

/* Wrong Button */

document.getElementById("button-large-wrong").addEventListener("click", function () {
	newQuestion();

	if (currentTeam == "teamA") {
		currentTeam = "teamB";
		shrink("box-team-a");
		grow("box-team-b");
	} else if (currentTeam == "teamB") {
		currentTeam = "teamA";
		shrink("box-team-b");
		grow("box-team-a");
	}
});

/* Skip Button */

document.getElementById("button-large-skip").addEventListener("click", function () {
	newQuestion();
});

/* Start Button */

document.getElementById("button-setup-start").addEventListener("click", function () {
	// get values from name inputs
	teams.teamA.name = document.getElementById("teamANameInput").value;
	teams.teamB.name = document.getElementById("teamBNameInput").value;

	// set values for names if blank
	if (teams.teamA.name == "") {
		teams.teamA.name = "Team A";
	}
	if (teams.teamB.name == "") {
		teams.teamB.name = "Team B";
	}

	// display team points
	document.getElementById("text-points-team-a").innerHTML = numToPoints(teams.teamA.points);
	document.getElementById("text-points-team-b").innerHTML = numToPoints(teams.teamB.points);

	// display team names
	document.getElementById("header-team-a").innerHTML = teams.teamA.name;
	document.getElementById("header-team-b").innerHTML = teams.teamB.name;

	// switch screens
	document.getElementById("page-home").style.display = "none";
	document.getElementById("page-game").style.display = "grid";

	stopwatchReset();
});

/* Answer Button */

document.getElementById("button-answer").addEventListener("click", function () {
	show("text-answer");
	hide("button-answer");
});

/*  ============
	  5. SETUP
	============  */

newQuestion();
stopwatchLoop();

if (Math.floor(Math.random() * 2) == 0) {
	currentTeam = "teamA";
	shrink("box-team-b");
} else {
	currentTeam = "teamB";
	shrink("box-team-a");
}

console.log((new Date()).getTime())