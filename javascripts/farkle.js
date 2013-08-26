// 
//       Farkle game for two players, written in Ruby
//           by Jan Milosh (http://janmilosh.com)
//
// ---------------------------------------------------------
//                Create two player objects
//             Initial scores are set to zero
// ---------------------------------------------------------
var player = [];										// create player objects
player[1] = {};
player[2] = {};
player[1].score = 0;					 // set initial values to zero
player[2].score = 0;
player[1].roundScore = 0;
player[2].roundScore = 0;
player[1].rollScore = 0;
player[2].rollScore = 0;
//player1.turn = true;		// player1 rolls first
//player2.turn = false;
player[1].dice = [false,true,false,true,false,true];	// scoring arrays
player[2].dice = [false,false,false,false,false,false];
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
	$("p, li, h1, h2, h3, h4").click(function() {
    	$(this).hide();
    });
  	
  	
	});
function reloadPage() {
	location.reload(true);
}