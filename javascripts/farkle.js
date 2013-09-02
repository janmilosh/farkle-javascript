// 
//               Farkle game for two players
//           by Jan Milosh (http://janmilosh.com)
//
// ---------------------------------------------------------
//                Create two player objects
//             Initial scores are set to zero
// ---------------------------------------------------------
var player1 = {};
var player2 = {};
player1.score = 0;						 // set initial values to zero
player2.score = 0;
var roundScore = 0;
var rollScore = 0;
var tempScore = 0;
player1.name = "Player One";
player2.name = "Player Two";
player1.turn = true;
player2.turn = false;
var request = "none";
var diceArray = []; 					// array for keeping track of everything
var onePlayerVisited = false;
var lastRound = false;
var youHaveHotDice = false;
var tempRoundScore;
// ---------------------------------------------------------
//            Set initial dice array object values        
//               toggle instructions on click
//     and fade in/out instruction sentence on page load
// ---------------------------------------------------------
$(document).ready(function() {			//set initial values for dice array object
	for (i = 0; i < 6; i++) {	
		diceArray[i] = {};						
		diceArray[i].id = "#die" + (i+1);
		diceArray[i].value = i + 1;
		diceArray[i].state = 0;
	}
	$("#instructions").fadeTo(1000, 0.4).fadeTo(1000, 1) //a couple of fades to draw
  	.fadeTo(1000, 0.4).fadeTo(1000, 1);		         			//attention to the instructions
	$("#rules").click(function(){
		$("aside").slideToggle("slow", function(){
			$('#rules').text($(this).is(':hidden')? 'Show instructions' : 'Hide instructions');
		});
	});
});
// ---------------------------------------------------------
//       function to allow players to personalize game
//                   by adding their names
// ---------------------------------------------------------
function addNames() {
	player1.name = prompt("Player one: please enter your name");
	player2.name = prompt("Player two: please enter your name");
	if (player1.name.substring(0,1) === " " || player1.name === "") {
		player1.name = "Player One";		//input default values if needed
	}
	if (player2.name.substring(0,1) === " " || player2.name === "") {
		player2.name = "Player Two";		//input default values if needed
	}
	if (player1.turn === true) {
		$("#instructions").text(player1.name + ": start your round by rolling the dice.");
	} else {
		$("#instructions").text(player2.name + ": start your round by rolling the dice.");
	}
	$(".player1-name").text(player1.name);
	$("#current-name").text(player1.name);
	$("#site-title").css("color", "#AFF584").text(player1.name + " Rolling")
	$(".player2-name").text(player2.name);
}
// ---------------------------------------------------------
//       function for ending game with page reload
//            prompt to make sure this is ok
// ---------------------------------------------------------
function reloadPage() {
	location.reload(true);
}
//window.onbeforeunload = function() {
 //return "You are about to quit and start a new game.";
//};
// ---------------------------------------------------------
//            function to initiate dice rolling
// ---------------------------------------------------------
function initiateRoll() {
	$(document).ready(function() {
		$("img").off();												//remove event handlers to start with
		if (onePlayerVisited === false) {			//since the player rolled
				$("#one-player").fadeOut("slow");	//no longer need to display the one player button
			onePlayerVisited = true;						//so fade out button and set to true so we don't 
		}																			//try to fade the button out again
		request = "roll";											//let the gameController know that the player wants to roll
		gameController();											//go to the gameController now that the request has been set
	});
}
// ---------------------------------------------------------
//                 function to roll dice
// ---------------------------------------------------------
function rollDice() {
	for (var i = 0; i < 6; i++) {																//loop through the dice
		if (diceArray[i].state === 0) {															//roll die that are rollable (state = 0)
			$(diceArray[i].id).removeClass("more-faded");							//if they are faded on the first roll, unfade them
			diceArray[i].value = Math.floor((Math.random() * 6) + 1);	//rolled dice get new numbers
		} 																													
  }
}
// ---------------------------------------------------------
//              function to update dice images
// ---------------------------------------------------------
function updateImage() {
	var dieImage;
	for (var i = 0; i < 6; i++) {
			switch (diceArray[i].value) {						//update dice images
				case 1: dieImage = "images/1.png";
								break;
				case 2: dieImage = "images/2.png";
								break;
				case 3: dieImage = "images/3.png";
								break;
				case 4: dieImage = "images/4.png";
								break;
				case 5: dieImage = "images/5.png";
								break;
				case 6: dieImage = "images/6.png";
								break;
			}
			$(diceArray[i].id).attr("src", dieImage);
	}
}
// ---------------------------------------------------------
//         functions for selecting dice to score
//		and update score for the roll with each selection
// ---------------------------------------------------------
function selectDice() {
	$("img").on("click", imageClick);
}
function imageClick() {
	var i = $(this).data("number");			//get the data-number value which corresponds to clicked die's position
	if (diceArray[i].state === 0 || diceArray[i].state === 1) {		//if not scored on a previous roll
		$(this).toggleClass("faded"); 															//toggle the fade class when die is clicked
		if (diceArray[i].state === 0) {															//also toggle the state to match 
			diceArray[i].state = 1;
		} else {
			diceArray[i].state = 0;
		}
	}
	calculateRollScore();						//update the score for this roll with each click
	hotDice();
}												
// ---------------------------------------------------------
//       			 function to calculate roll score
// ---------------------------------------------------------
function calculateRollScore() {
	tempScore = 0;
	$("#roll-score").text(addCommas(tempScore));
	var ones = [];
	var twos = [];
	var threes = [];
	var fours = [];
	var fives = [];
	var sixes = [];
	var scoreArray = [];
	for (var i = 0; i < 6; i++) {							//test out totals, etc.
		if (diceArray[i].state === 1) {
			switch (diceArray[i].value) {
				case 1: ones.push(1);
								break;
				case 2: twos.push(2);
								break;
				case 3: threes.push(3);
								break;
				case 4: fours.push(4);
								break;
				case 5: fives.push(5);
								break;
				case 6: sixes.push(6);
								break;
			}
		}
	}
	switch (ones.length) {
		case 1: scoreArray[0] = 100; break;
		case 2: scoreArray[0] = 200; break;
		case 3: scoreArray[0] = 1000; break;
		case 4: scoreArray[0] = 2000; break;
		case 5: scoreArray[0] = 3000; break;
		case 6: scoreArray[0] = 4000; break;
		default: scoreArray[0] = 0;
	}
	switch (twos.length) {
		case 3: scoreArray[1] = 200; break;
		case 4: scoreArray[1] = 400; break;
		case 5: scoreArray[1] = 600; break;
		case 6: scoreArray[1] = 800; break;
		default: scoreArray[1] = 0;
	}
	switch (threes.length) {
		case 3: scoreArray[2] = 300; break;
		case 4: scoreArray[2] = 600; break;
		case 5: scoreArray[2] = 900; break;
		case 6: scoreArray[2] = 1200; break;
		default: scoreArray[2] = 0;
	}
	switch (fours.length) {
		case 3: scoreArray[3] = 400; break;
		case 4: scoreArray[3] = 800; break;
		case 5: scoreArray[3] = 1200; break;
		case 6: scoreArray[3] = 1600; break;
		default: scoreArray[3] = 0;
	}
	switch (fives.length) {
		case 1: scoreArray[4] = 50; break;
		case 2: scoreArray[4] = 100; break;
		case 3: scoreArray[4] = 500; break;
		case 4: scoreArray[4] = 1000; break;
		case 5: scoreArray[4] = 1500; break;
		case 6: scoreArray[4] = 2000; break;
		default: scoreArray[4] = 0;
	}
	switch (sixes.length) {
		case 3: scoreArray[5] = 600; break;
		case 4: scoreArray[5] = 1200; break;
		case 5: scoreArray[5] = 1800; break;
		case 6: scoreArray[5] = 2400; break;
		default: scoreArray[5] = 0;
	}
	tempScore = scoreArray[0] + scoreArray[1] + scoreArray[2] + scoreArray[3] + scoreArray[4] + scoreArray[5];
	$("#roll-score").text(addCommas(tempScore));
	if(player1.turn === true) {
		$("#player1-roll").text(addCommas(tempScore));
		tempRoundScore = roundScore + tempScore;
		$("#player1-round").text(addCommas(tempRoundScore));
	} else {
		$("#player2-roll").text(addCommas(tempScore));
		tempRoundScore = roundScore + tempScore;
		$("#player2-round").text(addCommas(tempRoundScore));
	}
}
// ---------------------------------------------------------
//              Function to check for hot dice
// ---------------------------------------------------------
function hotDice() {
	var counter = 0;
	for (var i = 0; i < 6; i++) {
		if (diceArray[i].state === -1 || diceArray[i].state === 1) {
			counter++;
		}
	}
	if (counter === 6 && tempScore !== 0) {
		$("#instructions").text("You have Hot Dice! Keep rolling or bank your score.");
		youHaveHotDice = true;
	}
}	
// ---------------------------------------------------------
//       		  function to add commas to score
// ---------------------------------------------------------
function addCommas(nStr) {
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}
// ---------------------------------------------------------
//       		  function to bank a player's score
// ---------------------------------------------------------
function bankScore () {
	$(document).ready(function() {
		$("img").off();												//remove event handler
		request = "bank";											//let the gameController know that the player wants to bank
		gameController();											//go to the gameController now that the request has been set
	});
}
//----------------------------------------------------------
//						function to check for a win
//----------------------------------------------------------
function checkForWin() {
  if (player2.score === player1.score && lastRound === true) {			//compare scores to evaluate for a win
		$("#instructions").text("Game over. It's a tie!!!");
		$("#site-title").css("color", "#AFF584").text("Game over. It's a tie!!!");
  	player1.score = 0;
		player2.score = 0;
		roundScore = 0;
		lastRound = false;
		confetti();
  }	  
  if (player1.score > player2.score && lastRound === true) {
		$("#instructions").text("Congratulations, " + player1.name + " wins!!!");
		$("#site-title").css("color", "#AFF584").text("Congratulations, " + player1.name + " wins!!!")
  	player1.score = 0;
		player2.score = 0;
		roundScore = 0;
		lastRound = false;
		confetti();
  }
  if (player2.score > player1.score && lastRound === true) {
		$("#instructions").text("Congratulations, " + player2.name + " wins!!!");
		$("#site-title").css("color", "#AFF584").text("Congratulations, " + player2.name + " wins!!!")
  	player1.score = 0;
		player2.score = 0;
		roundScore = 0;
		lastRound = false;
		confetti();
  }
  if (player1.score >= 10000 && lastRound !== true) {
		$("#instructions").text(player1.name + " topped 10,000. " + player2.name + " gets one last round.");
  	lastRound = true;
  }
  if (player2.score >= 10000 && lastRound !== true) {
		$("#instructions").text(player2.name + " topped 10,000. " + player1.name + " gets one last round.");
  	lastRound = true;
  }
}
//----------------------------------------------------------
//       Create clickable area for confetti effect
//----------------------------------------------------------
$(document).ready(function() {									//create area in upper right corner to activate confetti
	var clickableArea = $("<div id='clickable'></div>")	 //manual activation is for demonstration purposes
	$("body").prepend(clickableArea);
	$("#clickable").css("position", "absolute")
		.css("width","50px")
		.css("height","50px")
		.css("background","transparent")
		.css("cursor","pointer");
	$("#clickable").on("click", function() {
		confetti();
	});
});
//----------------------------------------------------------
//                Confetti effect functions
//----------------------------------------------------------
function confetti() {								//loop for creating confetti with delay
	for (var i = 0; i < 300; i++) {
		setTimeout(function(){
			addConfetti(i);
		}, 30 * i);
  }
}
function addConfetti(i) {							//a div is created for each particle
	var totalTime = 3000;
	var pageWidth = $(window).width();
	var pageHeight = $(window).height();
	var particleBlue = [];
	var particleGreen = [];
	var xPositionBlue = [];
	var yPositionBlue = [];
	var xPositionGreen = [];
	var yPositionGreen = [];
	particleBlue[i] = $("<div class='confettiParticle'></div>");
	particleGreen[i] = $("<div class='confettiParticle'></div>");
	xPositionBlue[i] = randomPosition(pageWidth);
	yPositionBlue[i] = randomPosition(pageHeight);
	xPositionGreen[i] = randomPosition(pageWidth);
	yPositionGreen[i] = randomPosition(pageHeight);
	$("body").prepend(particleBlue[i]);
	$("body").prepend(particleGreen[i]);
	$(particleBlue[i]).css("position", "absolute")		//the blue confetti
		.css("width","4px")
		.css("height","4px")
		.css("background","#7848FE")
		.css("left", xPositionBlue[i])
		.css("top", yPositionBlue[i])
		.css("opacity", "0")
		.css("z-index", "1000").animate({opacity: 1}, 50).animate({top: yPositionBlue[i] + 600, opacity: 0}, 3000);
	$(particleGreen[i]).css("position", "absolute")		//the green confetti
		.css("width","4px")
		.css("height","4px")
		.css("background","#AFF584")
		.css("left", xPositionGreen[i])
		.css("top", yPositionGreen[i])
		.css("opacity", "0")
		.css("z-index", "1000").animate({opacity: 1}, 50).animate({top: yPositionGreen[i] + 600, opacity: 0}, 3000);
	setTimeout(function() {							//Don't leave a mess behind, clean up the confetti!!!
	  $('.confettiParticle').remove();
	}, 12100);		
}
function randomPosition(dimension) {
	var position = Math.floor((Math.random() * (dimension - 52)) + 20); //10px margin each side
	return position;
}
//----------------------------------------------------------
//				function to switch players and add score
//----------------------------------------------------------
function switchPlayers() {
	if (player1.turn === true) {
		player1.turn = false;
		player2.turn = true;
		player1.score = player1.score + roundScore;
		$("#player1-total").text(addCommas(player1.score));
		if (roundScore === 0) {
			$("#player1-round").text("Farkle!!!");
		} else {
			$("#player1-round").text(addCommas(roundScore));
		}
		roundScore = 0;
		$("#player1-roll").text(addCommas(rollScore));
		$("#instructions").text(player2.name + ": start your round by rolling the dice.");
		$("#current-name").text(player2.name);
		$("#site-title").css("color", "#AFF584").text(player2.name + " rolling")
	} else {
		player1.turn = true;
		player2.turn = false;
		player2.score = player2.score + roundScore;
		$("#player2-total").text(addCommas(player2.score));
		if (roundScore === 0) {
			$("#player2-round").text("Farkle!!!");
		} else {
			$("#player2-round").text(addCommas(roundScore));
		}
		roundScore = 0;
		$("#player2-roll").text(addCommas(rollScore));
		$("#instructions").text(player1.name + ": start your round by rolling the dice.");
		$("#current-name").text(player1.name);
		$("#site-title").css("color", "#AFF584").text(player1.name + " Rolling");
	}
}
// ---------------------------------------------------------
//                Main game control function
// ---------------------------------------------------------
function gameController() {
	if (player1.name === null) {
		player1.name = "Player One";		//input default values if name input was cancelled from alert box
	}
	if (player2.name === null) {
		player2.name = "Player Two";		//input default values if name input was cancelled from alert box
	}
	if (request === "roll") {
		rollScore = tempScore;										//pass off score from last roll
		if (rollScore === 0) {										//if there was no score in the last roll
			roundScore = 0;													//the round score is now zero (Farkled)
		}
		roundScore = roundScore + rollScore; 			//register score from last roll
		if (player1.turn === true) {
			$("#player1-roll").text("0");
		} else {
			$("#player2-roll").text("0");
		}
		if (player1.turn === true) {							//update display for current player
			$("#player1-round").text(addCommas(roundScore));
		} else {
			$("#player2-round").text(addCommas(roundScore));
		}
		for (var i = 0; i < 6; i++) {							//update state for dice previously rolled
			if (diceArray[i].state === 1) {
				diceArray[i].state = -1;
				$(diceArray[i].id).removeClass("faded").addClass("more-faded");
			}
		}
		if (youHaveHotDice === true) {						//if hot dice, reset for continued rolling
			for (i = 0; i < 6; i++) {
				diceArray[i].state = 0;
			}
		}	
		tempScore = 0;
		$("#roll-score").text(addCommas(tempScore));
		rollDice();																//roll any dice that can be rolled
		updateImage();									 					//make images match new dice values
		if (youHaveHotDice === true) {
			$("#instructions").text("You have Hot Dice! Keep rolling or bank your score.");
		} else {
			$("#instructions").text("Select scoring dice, then Roll or Bank.");
		}
		youHaveHotDice = false;		//reset the hot dice indicator
		selectDice();		//allow player to click dice for scoring, calls function to calculate score
	}
	if (request === "bank") {
		rollScore = tempScore;										//pass off score from last roll
		if (rollScore === 0) {										//if there was no score in the last roll
			roundScore = 0;													//the round score is now zero (Farkled)
		}
		tempScore = 0;														//reset the temporary score to zero
		$("#roll-score").text(addCommas(tempScore));		//replace the text with zero value
		roundScore = roundScore + rollScore; 			//register score from last roll
		$("#instructions").text("Select scoring dice, then Roll or Bank.");
		for (var i = 0; i < 6; i++) {							//remove faded and more-faded classes
			diceArray[i].state = 0;
			$(diceArray[i].id).removeClass("faded").removeClass("more-faded").addClass("more-faded");
		}
		switchPlayers();
		checkForWin();		//check to see if either player has topped 10,000
	}
}
