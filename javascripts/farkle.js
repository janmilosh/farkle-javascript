// 
//       Farkle game for two players, written in Ruby
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
var playerDice = [false,true,false,true,false,true];	// scoring array
function rollDice(diceArray) {
	for (var i = 0; i < diceArray.length; i++) {
		if (diceArray[i] === false) {
			diceArray[i] = Math.floor((Math.random() * 6) + 1);
	  	
  	}
  	console.log(diceArray[i]);
	}
	console.log(diceArray.length);
}
$(document).ready(function(){
	$("img").click(function() {
    $(this).toggleClass("faded").fadeTo("fast", 0.7);
  });
$("img.faded").click(function() {
    $(this).fadeIn("fast");
  });	
	
  	
});
function reloadPage() {
	location.reload(true);
}
//window.onbeforeunload = function() {
//  return "You are about to quit and start a new game.";
//};