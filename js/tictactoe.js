$(function() {
  var game;

  // Default behavior is to wait until the user 
  // selects number of players and presses "Go!"
  $(".square").on('click', function() {
    alert("Please select 'Number of players' and press 'Go!' first.");
  });
  
  // Play the game
  $("#go").click(function() {
    var numberOfPlayers = $("#playerCount").val();
    var playerTurn = 'X'; // Xs are always first in my world
    if (game) {
      game.reset();
    } else {
      game = new TicTacToeGame(numberOfPlayers);  
    }
    $("#game-grid").fadeTo(200, 0.1);
    $("#game-grid").fadeTo(500, 1);
    
    $(".square").text("");

    // Reset existing square click warning
    $(".square").off('click');
    $(".square").on('click', function() {
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
        break;
      case "O":
        alert("O wins!");
        $(".square").off('click');
        break;
      case "D":
        alert("All right, we'll call it a draw.");
        $(".square").off('click');
      default:
        // Do nothing
      }
    });
    
    // Automated player handling
    if (numberOfPlayers == 0) {
      while (!game.winner()) {
        var availableMoves = game.availableMoves();
        var randomIndex = Math.floor(Math.random() * availableMoves.length);
        
        $("#"+availableMoves[randomIndex]).click();
      }
    }
  });
});

var notifyInvalid = function() {
  alert("Invalid move.  Try a blank square.");
}

// Begin game class
function TicTacToeGame(numberOfPlayers) {
  this.squares = new Array(9);
  this.currentPlayer = 'X';
  
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
    var threeFound;
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