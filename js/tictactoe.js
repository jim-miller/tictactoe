var game;
var playerTurn;
var computerPlayerX;
var computerPlayerO;
var learnedStates = {};

$(function() {
  // Default behavior is to wait until the user 
  // selects number of players and presses "Go!"
  $(".square").on('click', preGameMessage);
  
  // Play the game
  $("#go").click(function() {
    var numberOfPlayers = parseInt($("#playerCount").val());
    playerTurn = 'X'; // Xs are always first in my world
    
    if (game) {
      game.reset();
    } else {
      game = new TicTacToeGame(numberOfPlayers);
    }

    // Reset existing squares
    $(".square").off('click');
    $(".square").on('click', squareClickHandler);
    $("#game-grid").fadeTo(200, 0.1);
    $("#game-grid").fadeTo(500, 1);
    $(".square").text("");
    
    switch (numberOfPlayers) {
    case 0:
      computerPlayerX = new RobotOverlord();
      computerPlayerY = new RobotOverlord();
      while (!game.winner()) {
        $("#"+computerPlayerX.chooseSquare()).click();
        $("#"+computerPlayerY.chooseSquare()).click();
      }
      break;
    case 1:
      computerPlayerO = new RobotOverlord();
      break;
    default: 
      computerPlayerO = undefined;
    }
  });
});

var notifyInvalid = function() {
  alert("Invalid move.  Try a blank square.");
}

var squareClickHandler = function() {
  var squareClicked = $(this).attr("id");

  if (game.move(squareClicked)) { // If it's a valid move
    $(this).text(playerTurn);
    playerTurn = playerTurn === 'X' ? 'O' : 'X';
  } else {
    notifyInvalid(squareClicked);
  }
  
  switch (game.winner()) {
  case "X":
    alert("X wins!");
    $(".square").off('click');
    $(".square").on('click', preGameMessage);
    break;
  case "O":
    alert("O wins!");
    $(".square").off('click');
    $(".square").on('click', preGameMessage);
    break;
  case "D":
    alert("All right, we'll call it a draw.");
    $(".square").off('click');
    $(".square").on('click', preGameMessage);
  default:
    // Do nothing
  }
  
  // Be polite.  Let the computer play
  if (computerPlayerO && playerTurn == "O" && !game.winner()) {
    $("#"+computerPlayerO.chooseSquare()).click();
  }
}
    
// Begin game class
function TicTacToeGame(numberOfPlayers) {
  this.squares = new Array(9);
  this.currentPlayer = 'X';
  
  this.currentState = function() {
    var squaresString = ""; // Empty board = 0, all X's = 111111111, all O's = 222222222
    for (var i = 0; i < this.squares.length; i++) {
      squaresString += this.squares[i] ? (this.squares[i] == 'X' ? 1 : 2) : 0;
    }
    return squaresString;
  }
  
  this.availableMoves = function() {
    var emptySquares = new Array();
    for (var i = 0; i < this.squares.length; i++) {
      if (!this.squares[i]) {
        emptySquares.push(i+1); // Squares run 1 - 9 from a player's perspective, not 0 - 8
      }
    }
    return emptySquares;
  }
  
  this.move = function(squareClicked) {
    if (squareClicked > 9 || this.squares[squareClicked - 1]) {
      return false;
    } else {
      this.squares[squareClicked - 1] = this.currentPlayer;
      this.currentPlayer = this.currentPlayer == 'X' ? 'O' : 'X';
      return true;
    }
  }
  
  this.reset = function() {
    this.squares = new Array(9);
    this.currentPlayer = 'X';
  }
  
  this.winner = function() {
    var winner; // Undefined intentionally
    
    if (threeInARow(this.squares, "X")) {
      winner = "X";
    } else if (threeInARow(this.squares, "O")) {
      winner = "O";
    } else if (emptyCount(this.squares) == 0) {
      winner = "D"; // Draw
    }
    return  winner;
  }
  
  var threeInARow = function(currentState, mark) {
    var threeFound = false;
    var winningStates = [[0,1,2], [3,4,5], [6,7,8], [0,4,8], 
                         [2,4,6], [0,3,6], [1,4,7], [2,5,8]];
    
    for (var i = 0; i < winningStates.length; i++) {
      if (currentState[winningStates[i][0]] == mark && 
          currentState[winningStates[i][1]] == mark && 
          currentState[winningStates[i][2]] == mark) {
        threeFound = winningStates[i];
      }
    }
    
    return threeFound;
  }
  
  var emptyCount = function(arr) {
    return arr.length - arr.filter(String).length;
  }
}

// I, for one, welcome our new robot tic-tac-toe-playing overlords
function RobotOverlord() {
  var movesMadeThisGame = {};
  var move;
  var whoAmI; // We'll need to know when learning after the game is over
  
  this.chooseSquare = function() {
    var currentState = game.currentState();
    var availableMoves = game.availableMoves();
    var position;
    whoami = game.currentPlayer;
    
    if (learnedStates[currentState]) {
      // Pick the most probable move
      position = Math.floor(Math.random() * availableMoves.length);
    } else {
      // Try something new
      position = Math.floor(Math.random() * availableMoves.length);
      
      learnedStates[currentState] = new Array();
      learnedStates[currentState][move] = 1.0;
    }
    move = availableMoves[position];    
    movesMadeThisGame[currentState] = move;
    return move;
  }
}

var preGameMessage = function() {
  alert("Please select 'Number of players' and press 'Go!' first.");
}

