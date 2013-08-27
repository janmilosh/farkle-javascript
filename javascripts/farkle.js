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
player1.roundScore = 0;
player2.roundScore = 0;
player1.rollScore = 0;
player2.rollScore = 0;
player1.bankScore = false;
player2.bankScore = false;
player1.name = "Player One";
player2.name = "Player Two";
var player;
var roundScore;
var firstClick = true;
var playerDice = [];	// scoring array
// ---------------------------------------------------------
//             toggle instructions on click
// ---------------------------------------------------------
$(function() {
	$("#rules").click(function(){
		$("aside").slideToggle("slow", function(){
			$('#rules').text($(this).is(':hidden')? 'Show instructions' : 'Hide instructions');
		});
	});
}); 
// ---------------------------------------------------------
//      function to give instructions during play
// ---------------------------------------------------------
function instruct() {

}
// ---------------------------------------------------------
//       function to set single player values
// ---------------------------------------------------------
function onePlayer() {
	player2.name = "The House";
	$(document).ready(function() {	
		$("#singular-plural").text("name");
		$(".player2-name").text(player2.name);
		$("#one-player").fadeOut("slow");
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
		player1.name = "Player One"		//input default values if needed
	}
	if (player2.name.substring(0,1) === " " || player2.name === "") {
		player2.name = "Player Two"		//input default values if needed
	}
	$(".player1-name").text(player1.name);
	$("#current-name").text(player1.name);
	$(".player2-name").text(player2.name);
	player1.turn = true;
  roundScore = round(player1.name);
  firstClick = false;
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
//         function for selecting dice to score
//		and update score for the roll with each selection
// ---------------------------------------------------------
function selectDice() {
	$("img").click(function() {
	  $(this).toggleClass("faded").fadeTo("fast", 0.7);
	});
	$("img.faded").click(function() {
	  $(this).fadeIn("fast");
	});
}
// ---------------------------------------------------------
//              function to update dice images
// ---------------------------------------------------------
function updateImage(diceArray) {
	var dieId;
	var dieImage;																//declare a variable for the die id
	for (var i = 0; i < 6; i++) {
		if (diceArray[i] !== false && diceArray[i] !== true) {
			switch (diceArray[i]) {									//update images for only dice
				case 1: dieImage = "images/1.png";		//that were just rolled
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
			dieId = "#die" + (i + 1);
			$(dieId).attr("src", dieImage);
		}
	}
		$("#debug").append("<p>in updateImage: " + diceArray[0]+", "+diceArray[1]+", "+diceArray[2]+", "+diceArray[3]+", "+diceArray[4]+", "+diceArray[5]+"</p>");

}
// ---------------------------------------------------------
//                function to start game 
//          if Roll Dice button is clicked first
// ---------------------------------------------------------
function firstRoll() {
	$("#debug").append("<p>in firstRoll function, firstClick = " + firstClick + "</p>");
	if (firstClick === true) {
		$("#one-player").fadeOut("slow");
		player1.turn = true;
		roundScore = round(player1.name);
	}
}
// ---------------------------------------------------------
//                 function to roll dice
// ---------------------------------------------------------
function rollDice(diceArray) {
$("#debug").append("<p>in rollDice function</p>")
	if (firstClick === false) {
		$("#roll-button").on("click", function() { //when the roll button is clicked
			for (var i = 0; i < 6; i++) {						//loop through the dice
				if (diceArray[i] === false) {					//roll die that are rollable (false)
					diceArray[i] = Math.floor((Math.random() * 6) + 1); //rolled dice get new numbers
		  	}
			}
		});
	} else {  																//for the case of player clicking roll dice before entering names
		for (var i = 0; i < 6; i++) {						//loop through the dice
			if (diceArray[i] === false) {					//roll die that are rollable (false)
				diceArray[i] = Math.floor((Math.random() * 6) + 1); //rolled dice get new numbers
	  	}
		}
		firstClick = false; 										//set to false after the first roll
	}
	updateImage(diceArray);
	return diceArray;
}
// ---------------------------------------------------------
//              function to complete a round
// ---------------------------------------------------------
function round(player) {
	//alert(player);
	$("#roll-button").prop('onclick',null); //disable onclick function 'firstRoll' - no longer needed
	roundScore = 0;
	playerDice = [false,false,false,false,false,false];
	$("#debug").append("<p>"+"in round, before rolling: " + playerDice[0]+", "+playerDice[1]+", "+playerDice[2]+", "+playerDice[3]+", "+playerDice[4]+", "+playerDice[5] +"</p>");

	playerDice = rollDice(playerDice);

$("#debug").append("<p>in round, after rolling: "+playerDice[0]+", "+playerDice[1]+", "+playerDice[2]+", "+playerDice[3]+", "+playerDice[4]+", "+playerDice[5]+"</p>");
$("#instructions").text("Select scoring dice and roll, or bank to end round.")

}
// ---------------------------------------------------------
//                       Begin game
// ---------------------------------------------------------
$(document).ready(function() {
  $("#instructions").fadeTo(1000, 0.4).fadeTo(1000, 1) //a couple of fades to draw
  	.fadeTo(1000, 0.4).fadeTo(1000, 1);		         //attention to the instructions
  //***** tally score and switch turns only if someone has completed a round *****
  if (player1.bankScore === true || player2.bankScore === true) {
	  do {
	  	roundScore = round(player);
	  	if (player1.turn === true) { // switch players and add the score
				player1.turn = false;
				player2.turn = true;
				player = player2.name;
				player1.score = player1.score + roundScore;
				$("#player1-total").text(player1.score);
				$("#player1-round").text(player1.roundScore);
				if (player2.name !== "The House") {
					$("#instructions").text(player2.name + ": start your round by rolling the dice.");
				}
			} else {
				player1.turn = true;
				player2.turn = false;
				player = player1.name;
				player2.score = player2.score + roundScore;
				$("#player2-total").text(player2.score);
				$("#player2-round").text(player2.roundScore);
				$("#instructions").text(player1.name + ": start your round by rolling the dice.");
			}
			player1.bankScore = false;  //these must be reset after each round
			player2.bankScore = false;

	  } while((player1.score < 10000) && (player2.score < 10000));
	}
});
