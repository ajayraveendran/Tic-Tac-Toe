console.log('TIC TAC TOE')

//Basic variable assignment
var clicks = 0;
var maxClicks = 9;
var sideLength = 3;
var player1choices = [];
var player2choices = [];
var combinedChoices = [];
var winningCombinations = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['1', '4', '7'],
  ['2', '5', '8'],
  ['3', '6', '9'],
  ['1', '5', '9'],
  ['3', '5', '7']
]

//assign DOM elements
var player1score = document.querySelector('.p1score');
var player2score = document.querySelector('.p2score');
var boxes = document.querySelectorAll('.boxes li');
var displayMessage = document.querySelector('.message');
var resetButton = document.querySelector('.reset-button');
var newButton = document.querySelector('.new-button');

//set player scores to 0 when refreshing the page.
player1score.textContent = 0
player2score.textContent = 0;

// Visually reset's board and in JS resets basic variables to default state of 0.
var resetGame = function () {
  player1choices = [];
  player2choices = [];
  combinedChoices = [];
  clicks = 0;
  displayMessage.textContent = ''
  boxes.forEach(function (box) {
    if (box.classList.contains('player1')) {
      box.classList.remove('player1')
    } else if (box.classList.contains('player2')) {
      box.classList.remove('player2')
    }
  });
  boxes.forEach(function (box) {
    box.addEventListener('click', userClick)
  });
}

var newGame = function () {
  resetGame()
  player1score.textContent = 0
  player2score.textContent = 0;
}

var checkForWin = function (playerSelectionArray) {
  var match = [];
  for (var i = 0; i < winningCombinations.length; i++) {
    for (var j = 0; j < winningCombinations[i].length; j++) {
      if (playerSelectionArray.includes(winningCombinations[i][j])) {
        match.push(winningCombinations[i][j]);
      }
    }
    if (match.length === sideLength) {
      return match
    } else {
      match = []
    }
  }
  return match
}




var userClick = function (event) {
  if (checkClick(event.target.classList[0])) {
    displayMessage.textContent = 'Please select a blank square';
  } else {
    clicks++

    if (clicks % 2 !== 0) {
      player1choices.push(event.target.classList[0])
      combinedChoices.push(event.target.classList[0])
      event.target.classList.add('player1')

      if (checkForWin(player1choices).length === 3) {
        displayMessage.textContent = 'Player 1 wins';
        player1score.textContent = Number(player1score.textContent) + 1
        addWinToDom(checkForWin(player1choices))
        stoplisteningForClicks()
      } else {
        displayMessage.textContent = 'Player 2, your move next'
      }

    } else {
      player2choices.push(event.target.classList[0]);
      combinedChoices.push(event.target.classList[0]);
      event.target.classList.add('player2')

      if (checkForWin(player2choices).length === 3) {
        displayMessage.textContent = 'Player 2 wins';
        player2score.textContent = Number(player2score.textContent) + 1
        addWinToDom(checkForWin(player2choices))
        stoplisteningForClicks()
      } else {
        displayMessage.textContent = 'Player 1, your move next'
      }
    }
    //Draw condition block
    if (clicks === maxClicks && checkForWin(player1choices).length !== 3 && checkForWin(player2choices).length !== 3) {
      displayMessage.textContent = `It's a Draw`
      stoplisteningForClicks()
    }
  }
}

var checkClick = function (clickLocation) {
  if (combinedChoices.includes(clickLocation)) {
    return true;
  } else {
    return false;
  }
}


var stoplisteningForClicks = function () {
  boxes.forEach(function (box) {
    box.removeEventListener('click', userClick)
  });
}

var addWinToDom = function (playerSelectionArray) {
  boxes.forEach(function (box) {
    checkForWin(playerSelectionArray).forEach(function (winBox) {
      if (box.classList.contains(winBox)) {
        box.classList.add('win-box')
      }
    });
  })
}

boxes.forEach(function (box) {
  box.addEventListener('click', userClick)
});

resetButton.addEventListener('click', resetGame);
newButton.addEventListener('click', newGame);
