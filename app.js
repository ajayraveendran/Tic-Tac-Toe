console.log('TIC TAC TOE')

//Basic variable assignment
var clicks = 0;
var maxClicks = 9;
var sideLength = 3;
var player1choices = [];
var player2choices = [];
var combinedChoices = [];

//figure out how to dynamically add these arrays
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

//assign DOM elements
var player1score = document.querySelector('.p1score');
var player2score = document.querySelector('.p2score');
player1score.textContent = 0
player2score.textContent = 0;
var boxes = document.querySelectorAll('.boxes li');
var displayMessage = document.querySelector('.message');
var resetButton = document.querySelector('.reset-button');
var newButton = document.querySelector('.new-button');

//Function to check for a match between player choice arrays and winnind input array
var checkMatch = function(playerSelectionArray){
  var match = [];
  for (j = 0; j < winningCombinations.length; j++){
    var arrayInWinningCombinations = winningCombinations[j];
    for (i = 0; i < arrayInWinningCombinations.length; i++){
      if(playerSelectionArray.indexOf(arrayInWinningCombinations[i]) !== -1){
        match.push(arrayInWinningCombinations[i]);
      }
    }
    if(match.length !== sideLength){
      match = []
    } else  {
      return true;
      // think of how to make contents of Match pulse.
    }
  }
  return false
}

// basic function to whiten out squares. Currently used in resetGame()
var clearSquares = function(squares){
  squares.style.backgroundColor = 'white'
}

// Visually reset's board and in JS resets basic variables to default state of 0.
var resetGame = function(){
  boxes.forEach(clearSquares);
  player1choices = [];
  player2choices = [];
  combinedChoices = [];
  clicks = 0;
  displayMessage.textContent = ''
}

// KEY FUNCTION :- 
// looks for win based on number of clicks. i.e. odd no. of clicks and resulting className are assigned to Player 1 and even no. to player 2
// After each click, checks for win by using checkMatch()
// resets game using resetGame() after a win or draw
var userClick = function(event){
  // checks if a previously selected box was reclicked.
  if(checkClick(event.target.className)){
    displayMessage.textContent = 'Please select a blank square';
  } else  {
    //instantiate click counter once player 1 has clicked a box
    clicks++
    // ODD number clicks - Player 1 code block
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
      //EVEN number clicks - Player 1 code block  
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
    //Draw condition block
    if(clicks === maxClicks && checkMatch(player1choices) === false && checkMatch(player2choices) === false){
      resetGame()
      displayMessage.textContent = `It's a Draw`
    }
  }
}

var checkClick = function(clickLocation){
  if(combinedChoices.indexOf(clickLocation) !== -1){
    return true;
  } else  {
    return false;
  }
}

boxes.forEach(function(box){
  box.addEventListener('click', userClick)
});
resetButton.addEventListener('click', resetGame);
newButton.addEventListener('click', resetGame);