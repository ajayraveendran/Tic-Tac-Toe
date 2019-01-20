console.log('TIC TAC TOE')

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



var player1score = document.querySelector('.p1score');
var player2score = document.querySelector('.p2score');
var player1text = document.querySelector('.player-1-text');
var player2text = document.querySelector('.player-2-text');
var boxes = document.querySelectorAll('.box');
var displayMessage = document.querySelector('.message');
var resetButton = document.querySelector('.reset-button');
var resetButtonSpan = document.querySelector('.reset-button-span');
var newButton = document.querySelector('.new-button');
var newButtonSpan = document.querySelector('.new-button-span');

player1score.textContent = 0
player2score.textContent = 0;
currentPlayer = 'player1'
displayMessage.textContent = 'Player 1, your move first'
player1text.classList.add('active-player')

var removeActivePlayer = function () {
  if (player1text.classList.contains('active-player')) {
    player1text.classList.remove('active-player')
  }
  if (player2text.classList.contains('active-player')) {
    player2text.classList.remove('active-player')
  }
}

var switchStartingPlayer = function () {
  if (currentPlayer === 'player1') {
    currentPlayer = 'player2'
    displayMessage.textContent = 'Player 2, your move first'
    removeActivePlayer()
    player2text.classList.add('active-player')
  } else {
    currentPlayer = 'player1'
    displayMessage.textContent = 'Player 1, your move first'
    removeActivePlayer()
    player1text.classList.add('active-player')
  }
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
  if (checkClick(event.target.classList[1])) {
    displayMessage.textContent = 'Please select a blank square';
  } else {
    clicks++

    if (currentPlayer === 'player1') {
      player1choices.push(event.target.classList[1])
      combinedChoices.push(event.target.classList[1])
      event.target.classList.add('player1')

      if (checkForWin(player1choices).length === 3) {
        displayMessage.textContent = 'Player 1 wins';
        player1score.textContent = Number(player1score.textContent) + 1
        addWinToDom(checkForWin(player1choices))
        player1score.classList.add('active-score')
        removeActivePlayer()
        stoplisteningForClicks()
        activateResetBtn()
      } else {
        currentPlayer = 'player2'
        displayMessage.textContent = 'Player 2, your move next'
        player1text.classList.toggle('active-player')
        player2text.classList.toggle('active-player')
      }

    } else {
      player2choices.push(event.target.classList[1]);
      combinedChoices.push(event.target.classList[1]);
      event.target.classList.add('player2')

      if (checkForWin(player2choices).length === 3) {
        displayMessage.textContent = 'Player 2 wins';
        player2score.textContent = Number(player2score.textContent) + 1
        addWinToDom(checkForWin(player2choices))
        player2score.classList.add('active-score')
        removeActivePlayer()
        stoplisteningForClicks()
        activateResetBtn()
      } else {
        currentPlayer = 'player1'
        displayMessage.textContent = 'Player 1, your move next'
        player1text.classList.toggle('active-player')
        player2text.classList.toggle('active-player')
      }
    }
    //Draw condition block
    if (clicks === maxClicks && checkForWin(player1choices).length !== 3 && checkForWin(player2choices).length !== 3) {
      displayMessage.textContent = `It's a Draw`
      stoplisteningForClicks()
      activateResetBtn()
      removeActivePlayer()
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

var resetGame = function () {
  switchStartingPlayer()
  player1choices = [];
  player2choices = [];
  combinedChoices = [];
  clicks = 0;
  boxes.forEach(function (box) {
    if (box.classList.contains('player1')) {
      box.classList.remove('player1')
    } else if (box.classList.contains('player2')) {
      box.classList.remove('player2')
    }

    if (box.classList.contains('win-box')) {
      box.classList.remove('win-box')
    }

    if (player1score.classList.contains('active-score')) {
      player1score.classList.remove('active-score')
    } else {
      player2score.classList.remove('active-score')
    }

    box.addEventListener('click', userClick)
    deactivateResetBtn()
  });

}

var newGame = function () {
  resetGame()
  player1score.textContent = 0
  player2score.textContent = 0;
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

var activateResetBtn = function () {
  resetButtonSpan.classList.add('activate-btn-span')
  resetButton.classList.add('activate-btn')
}

var deactivateResetBtn = function () {
  resetButton.classList.remove('activate-btn')
  resetButtonSpan.classList.remove('activate-btn-span')
}
var activateNewBtn = function () {
  newButtonSpan.classList.add('activate-btn-span')
  newButton.classList.add('activate-btn')
}

var deactivateNewBtn = function () {
  newButton.classList.remove('activate-btn')
  newButtonSpan.classList.remove('activate-btn-span')
}

boxes.forEach(function (box) {
  box.addEventListener('click', userClick)
});

resetButton.addEventListener('click', resetGame);
newButton.addEventListener('click', newGame);
resetButton.addEventListener('mouseover', activateResetBtn)
resetButton.addEventListener('mouseout', deactivateResetBtn)
newButton.addEventListener('mouseover', activateNewBtn)
newButton.addEventListener('mouseout', deactivateNewBtn)

