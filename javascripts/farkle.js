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
var playerDice = [false,false,false,false,false,false];	// scoring array
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
		$("#one-player").fadeOut();
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
//                       Begin game
// ---------------------------------------------------------
$(document).ready(function() {
	

});
