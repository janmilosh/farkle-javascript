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
//		diceArray[i].currentClick = false;
//		diceArray[i].scored = false;
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
//       function to set single player values
// ---------------------------------------------------------
function onePlayer() {
	$(document).ready(function() {
		player2.name = "The House";
		$("#singular-plural").text("name");
		$(".player2-name").text(player2.name);
		$("#one-player").fadeOut("slow");
		onePlayerVisited = true;
	});	
}
// ---------------------------------------------------------
//       function to allow players to personalize game
//                   by adding their names
// ---------------------------------------------------------
function addNames() {
	player1.name = prompt("Player one: please enter your name","Player One");
	if (player2.name !== "The House") {
		player2.name = prompt("Player two: please enter your name","Player Two");
	}
	if (player2.name !== "The House") {
		$("#one-player").fadeOut("slow");
	}
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
//  return "You are about to quit and start a new game.";
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
	for (var i = 0; i < 6; i++) {																	//loop through the dice
		if (diceArray[i].state === 0) {															//roll die that are rollable (state = 0)
			diceArray[i].value = Math.floor((Math.random() * 6) + 1);	//rolled dice get new numbers
		} 																													
  }

  $("#debug").append("<p>In rollDice, states are: " + diceArray[0].state+", "+diceArray[1].state+", "+diceArray[2].state+", "+diceArray[3].state+", "+diceArray[4].state+", "+diceArray[5].state +"</p>");

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
	$("#debug").append("<p>Just updated images.</p>");
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

	$("#debug").append("<p>" +diceArray[i].id+ ", rolled a " +diceArray[i].value + ", state: " +diceArray[i].state+ "</p>"); 	
}														
// ---------------------------------------------------------
//       			 function to calculate roll score
// ---------------------------------------------------------
function calculateRollScore() {
	tempScore = 0;
	$("#roll-score").text(tempScore);
	for (var i = 0; i < 6; i++) {							//test out totals, etc.
		if (diceArray[i].state === 1) {
			tempScore = tempScore + diceArray[i].value;
		}
	}
	$("#roll-score").text(tempScore);
	
}
// ---------------------------------------------------------
//                Main game control function
// ---------------------------------------------------------
function gameController() {
		
	$("#debug").append("<p>At top of controller</p>");
	
	if (request === "roll") {
		rollScore = tempScore;										//pass off score from last roll
		if (rollScore === 0) {										//if there was no score in the last roll
			roundScore = 0;													//the round score is now zero (Farkled)
		}
		roundScore = roundScore + rollScore; 			//register score from last roll
		if (player1.turn === true) {
			$("#player1-roll").text(rollScore);
		} else {
			$("#player2-roll").text(rollScore);
		}
		if (player1.turn === true) {							//update display for current player
			$("#player1-round").text(roundScore);
		} else {
			$("#player2-round").text(roundScore);
		}
		for (var i = 0; i < 6; i++) {							//update state for dice previously rolled
			if (diceArray[i].state === 1) {
				diceArray[i].state = -1;
				$(diceArray[i].id).removeClass("faded").addClass("more-faded");
			}
		}
		tempScore = 0;
		$("#roll-score").text(tempScore);

		rollDice();																//roll any dice that can be rolled
		updateImage();									 					//make images match new dice values
		
		$("#instructions").text("Select scoring dice and roll, or bank to end round.");
		selectDice();		//allow player to click dice for scoring, calls function to calculate score

	}

/*   
  do {
  	roundScore = round(player);
  	if (player1.turn === true) { // switch players and add the score
			player1.turn = false;
			player2.turn = true;
			player = player2.name;
			player1.score = player1.score + roundScore;
			$("#player1-total").text(player1.score);
			$("#player1-round").text(roundScore);
			roundScore = 0;
			if (player2.name !== "The House") {
				$("#instructions").text(player2.name + ": start your round by rolling the dice.");
			}
		} else {
			player1.turn = true;
			player2.turn = false;
			player = player1.name;
			player2.score = player2.score + roundScore;
			$("#player2-total").text(player2.score);
			$("#player2-round").text(roundScore);
			roundScore = 0;
			$("#instructions").text(player1.name + ": start your round by rolling the dice.");
		}
		player1.bankScore = false;  //these must be reset after each round
		player2.bankScore = false;

  } while((player1.score < 10000) && (player2.score < 10000));
*/	
}
