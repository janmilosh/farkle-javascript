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
var player;
var roundScore;
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
	player1.name = prompt("Player one: please enter your name","Player one name");
	$(".player1-name").text(player1.name);
	if (player2.name !== "The House") {
		player2.name = prompt("Player two: please enter your name","Player two name");
		$(".player2-name").text(player2.name);
	}
	if (player2.name !== "The House") {
		$("#one-player").fadeOut("slow");
	}
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
//                 function to roll dice
// ---------------------------------------------------------
function rollDice(diceArray) {
	for (var i = 0; i < diceArray.length; i++) {
		if (diceArray[i] === false) {
			diceArray[i] = Math.floor((Math.random() * 6) + 1);
	  	
  	}
  	console.log(diceArray[i]);
	}
	console.log(diceArray.length);
}
// ---------------------------------------------------------
//              function to complete a round
// ---------------------------------------------------------
function round(player) {
	roundScore = 0;
	playerDice = [false,false,false,false,false,false];



}
// ---------------------------------------------------------
//                       Begin game
// ---------------------------------------------------------
$(document).ready(function() {
  $("#instructions").fadeTo(1000, 0.4).fadeTo(1000, 1) //a couple of fades to draw
  	.fadeTo(1000, 0.4).fadeTo(1000, 1);		         //attention to the instructions
  player1.turn = true;
  player = player1.name;
  do {
  	roundScore = round(player);
  	if (player1.turn == true) { // switch players and add the score
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


  } while((player1.score < 10000) && (player2.score < 10000));
});
