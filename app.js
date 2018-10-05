console.log('TIC TAC TOE')

var clicks = 0;
var gameCount = 0;
var maxClicks = 9;
var sideLength = 3;
// var maxGameCount = ;
var player1choices = [];
var player2choices = [];
var combinedChoices = [];
var winningCombinations = [
  ['1','2','3'],
  ['4','5','6'],
  ['7','8','9'],
  ['1','4','7'],
  ['2','5','8'],
  ['3','6','9'],
  ['1','5','9'],
  ['3','5','7']
]
var player1score = document.querySelector('.p1score');
var player2score = document.querySelector('.p2score');
player1score.textContent = 0
player2score.textContent = 0;
var boxes = document.querySelectorAll('.boxes li');
var displayMessage = document.querySelector('.message');
var resetButton = document.querySelector('.reset-button');
var newButton = document.querySelector('.new-button');



var checkMatch = function(playerSelectionArray){
  //create temp array to push 'x's into so we can count if a succesful combination is acheived. 
  //goal is to have this array reach a length of 3 IF an array matches.
  var match = [];
  //loop through nested arrays and hold on to each array as a variable.
  for (j = 0; j < winningCombinations.length; j++){
    var arrayInWinningCombinations = winningCombinations[j];
    //loop through the array that is held onto in the previous step and match it against each item of the player's choices array.
    for (i = 0; i < arrayInWinningCombinations.length; i++){
      //if results of the indexOf function isn't a -1 then a successful match was made in which case add an 'x' into the previously blank temp match array.
      if(playerSelectionArray.indexOf(arrayInWinningCombinations[i]) !== -1){
        match.push(arrayInWinningCombinations[i]);
      }
    }
    //if 3 'x's weren't added then the array in the nested array isn't a subset of the player's selection array. 
    //clear the temp match array anf move onto the next nested array.
    if(match.length !== sideLength){
      match = []
      // else 3 x's were added which means one of the nested arrays in the winning combo array is a subset of the player's selection array. 
      //Return true as a the result of this function.
    } else  {
      return true;

    }
  }
// none of the nested arrays (SO FAR..) is a subset of the player's selection. 
//This means the game is either a draw or all moves haven't been completed yet. Return false as the result of the function.
return false
}



var clearSquares = function(squares){
  squares.style.backgroundColor = 'white'
}

var resetGame = function(){
  boxes.forEach(clearSquares);
  player1choices = [];
  player2choices = [];
  combinedChoices = [];
  clicks = 0;
  displayMessage.textContent = ''
}

var userClick = function(event){
  if(checkClick(event.target.className)){
    displayMessage.textContent = 'Please select a blank square';
  } else  {
    clicks++
    
    if(clicks % 2 !== 0){
      player1choices.push(event.target.className)
      combinedChoices.push(event.target.className)  
      event.target.style.backgroundColor = 'gray';
      if(checkMatch(player1choices) === true){
        player1score.textContent = Number(player1score.textContent)+1
        resetGame()
        displayMessage.textContent = 'Player 1 wins';
      } else  {
        displayMessage.textContent = 'Player 2, your move next'
      }
      
    } else  {
      player2choices.push(event.target.className);
      combinedChoices.push(event.target.className);
      event.target.style.backgroundColor = 'lightgray';
      if(checkMatch(player2choices) === true){
        player2score.textContent = Number(player2score.textContent)+1
        resetGame()
        displayMessage.textContent = 'Player 2 wins';
      } else  {
        displayMessage.textContent = 'Player 1, your move next'
      }
    } 
    
    if(clicks === 9 && checkMatch(player1choices) === false && checkMatch(player2choices) === false){
      resetGame()
      displayMessage.textContent = `It's a Draw`
    }
    // gameCount++
  }
}

var checkClick = function(clickLocation){
  if(combinedChoices.indexOf(clickLocation) !== -1){
    return true;
  } else  {
    return false;
  }
debugger
}

boxes.forEach(function(box){
  box.addEventListener('click', userClick)
});

resetButton.addEventListener('click', resetGame);
newButton.addEventListener('click', resetGame);