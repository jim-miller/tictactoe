var game;
var playerTurn;
var playerX;
var playerO;
var computerPlayerX;
var computerPlayerO;

$(function() {
  // set default player configuration
  $("input[name='playerX'][value='human']").click();
  $("input[name='playerO'][value='computer']").click();

  // Default behavior is to wait until the user
  // selects number of players and presses "Go!"
  $(".square").on('click', preGameMessage);

  // Play the game
  $("#play").click(function() {
    playerTurn = 'X'; // Xs are always first in my world
    playerX = $("input[name='playerX']:checked").val();
    playerO = $("input[name='playerO']:checked").val();

    if (game) {
      game.reset();
    } else {
      game = new TicTacToeGame();
    }

    // Reset existing squares
    $(".square").off('click');
    $(".square").on('click', squareClickHandler);
    $("#game-grid").fadeTo(200, 0.1);
    $("#game-grid").fadeTo(500, 1);
    $(".square").text("");

    // Creating a new player will cause the loss of learned states
    computerPlayerX = playerX == 'computer' ? (computerPlayerX || new RobotOverlord()) : null;
    computerPlayerO = playerO == 'computer' ? (computerPlayerO || new RobotOverlord()) : null;

    // We need to kick off the game when computer players go first  It
    // will continue on its own after that.
    if (computerPlayerX) {
      $("#"+computerPlayerX.chooseSquare()).click();
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

  if (game.winner()) {  // Game over, man!  Game over!
    if (computerPlayerX) {
      computerPlayerX.learn();
    }
    if (computerPlayerO) {
      computerPlayerO.learn();
    }

    if (game.winner() == "D") {
      alert("All right, we'll call it a draw.");
    } else {
      alert(game.winner() + " wins!");
    }

    $(".square").off('click');
    $(".square").on('click', preGameMessage);
  }

  // Be polite.  Let the computer play
  // FYI, the game will have already switched currentPlayer to the next
  // player via move(squareClicked)
  if (game.currentPlayer == 'O' && computerPlayerO && !game.winner()) {
    $("#"+computerPlayerO.chooseSquare()).click();
  } else if (game.currentPlayer == 'X' && computerPlayerX && !game.winner()) {
    $("#"+computerPlayerX.chooseSquare()).click();
  }
}

// Begin game class
function TicTacToeGame() {
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
        emptySquares.push(i); // Squares run 1 - 9 from a player's perspective, not 0 - 8
      }
    }
    return emptySquares;
  }

  this.move = function(squareClicked) {
    if (squareClicked > 9 || this.squares[squareClicked]) {
      return false;
    } else {
      this.squares[squareClicked] = this.currentPlayer;
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
  var movesMadeLastGame = {};
  var iWonLastGame = false;
  var move;
  var me; // We'll need to know when learning after the game is over
  // var learnedStates = {};
  // Pre-training...
  var learnedStates = {"100000000":[null,0,0,0,164.4409482010504,0,0,0,0],"100020001":[null,0,0,0,null,0,0,390.07939461119975,null],"100020010":[null,0,0,0,null,0,0,null,30.869999999999997],"100020100":[null,0,0,49.391999999999996,null,0,null,0,0],"100020112":[null,0.7,0.7,1.2,null,1],"100020121":[null,2.48832,0.7,1,null,1],"100021000":[null,0,0,0,null,null,0,0,34.3],"100021021":[null,1,1.44,1,null,null,1],"100021102":[null,0.7,0.7,1,null,null,null,0.7],"100120000":[null,0,0,null,null,0,84,0,0],"100120012":[null,0.7,0.7,null,null,0.7,0.9],"100120021":[null,1,1,null,null,1,1.2],"100120210":[null,1,1.2,null,null,1,null,null,1],"100121212":[null,1,1],"100220101":[null,0.7,0.7,null,null,1.44,null,1],"100220110":[null,1,1,null,null,1,null,null,1],"100221112":[null,1,1],"101020000":[null,41.16,null,0,null,0,0,0,0],"101020021":[null,1.728,null,1,null,1,1],"101021002":[null,1,null,1,null,null,1,1],"101021212":[null,1,null,1],"101022001":[null,1,null,1.44,null,null,1,1],"101022211":[null,1,null,1.2],"101120200":[null,1,null,null,null,1,null,0.7,1],"101120212":[null,1,null,null,null,0.9],"101120221":[null,1.2,null,null,null,1],"101122201":[null,1,null,null,null,null,null,1],"101220100":[null,1.2,null,null,null,1,null,0.7,1],"101220112":[null,1,null,null,null,1],"101220121":[null,1.2,null,null,null,1],"101221102":[null,1,null,null,null,null,null,0.9],"102021100":[null,0.7,null,0.9,null,null,null,0.7,0.7],"102021121":[null,2.9859839999999997,null,1],"102221101":[null,0.9,null,null,null,null,null,1],"102221110":[null,1,null,null,null,null,null,null,1],"110020000":[null,null,175.5758591999999,0,null,0,0,0,0],"110020021":[null,null,90,0,null,0,0,null,null],"110220112":[null,null,1,null,null,1.2],"110221102":[null,null,1,null,null,null,null,1],"112020001":[null,null,null,1,null,1,1.2,1],"112020010":[null,null,null,1,null,1,1.44,null,1],"112020100":[null,null,null,1,null,1,null,1,0.7],"112020121":[null,null,null,1,null,0.9],"112120000":[null,null,null,null,null,0.84,1.728,1,1],"112122010":[null,null,null,null,null,null,1.2,null,1],"112221100":[null,null,null,null,null,null,null,1,1],"121020001":[null,null,null,0.7,null,1.2,1,1],"121021012":[null,null,null,1,null,null,1],"121021102":[null,null,null,1,null,null,null,1],"121022011":[null,null,null,1,null,null,1],"121022101":[null,null,null,1.2,null,null,null,1],"121120000":[null,null,null,null,null,0.7,1,1,0.7],"121120201":[null,null,null,null,null,1,null,1],"121120210":[null,null,null,null,null,1,null,null,1],"121122001":[null,null,null,null,null,null,1,1],"121220101":[null,null,null,null,null,1.2,null,1],"200010001":[null,0,0,0,null,0,248.83199999999997,0,null],"200010010":[null,561.7143282401277,0,0,null,0,0,null,0],"200010100":[null,0,70,0,null,0,null,0,0],"200010211":[null,1.44,1,1,null,1],"200011000":[null,0,0,298.59839999999997,null,null,0,0,0],"200011201":[null,1,1,1.44,null,null,null,1],"200110000":[null,0,0,null,null,10.588409999999998,0,0,0],"200110201":[null,0,0,null,null,100,null,0,null],"200112010":[null,0.9,0.7,null,null,null,0.7,null,0.7],"200112100":[null,0,100,null,null,null,null,0,0],"200112211":[null,100,0,null,null,null,null,null,null],"200120101":[null,0.7,0.7,null,null,0.7,null,1.728],"200120110":[null,0.7,0.7,null,null,0.7,null,null,1.2],"200121121":[null,1.728,1],"200211001":[null,0,0,null,null,null,144,0,null],"200211010":[null,0,0,null,null,null,172.79999999999998,null,0],"200211100":[null,0,100,null,null,null,null,0,0],"201010000":[null,0,null,0,null,0,248.83199999999997,0,0],"201010201":[null,0,null,172.79999999999998,null,0,null,0,null],"201010210":[null,1,null,1.2,null,1,null,null,1],"201011200":[null,0,null,144,null,null,null,0,0],"201110200":[null,0,null,null,null,100,null,0,0],"201112000":[null,0,null,null,null,null,100,0,0],"201112210":[null,100,null,null,null,null,null,null,0],"201120001":[null,0.7,null,null,null,0.81,0.7,0.7],"201120121":[null,1,null,null,null,1],"201122011":[null,0.9,null,null,null,null,1],"201122101":[null,0.9,null,null,null,null,null,1],"201211000":[null,0,null,null,null,null,120,0,0],"202011100":[null,1,null,1,null,null,null,0.7,1],"210010000":[null,null,0,0,null,0,0,97.2,0],"210010021":[null,null,0,0,null,90,0,null,null],"210010120":[null,null,90,0,null,0,null,null,0],"210011020":[null,null,0,100,null,null,0,null,0],"210020101":[null,null,0.7,0.7,null,0.7,null,0.9],"210021001":[null,null,0.9,0.7,null,null,0.7,0.7],"210021121":[null,null,1,1],"210110020":[null,null,0,null,null,100,0,null,0],"210112000":[null,null,0.7,null,null,null,0.7,1,0.7],"210112021":[null,null,1,null,null,null,1],"210112201":[null,null,0,null,null,null,null,100,null],"210120121":[null,null,1,null,null,1],"210211000":[null,0,null,null,null,null,100,0,0],"210211021":[null,null,1,null,null,null,1],"210211120":[null,null,1,null,null,null,null,null,1],"211010020":[null,null,null,0,null,0,120,null,0],"211012021":[null,null,null,0.9,null,null,1],"211020001":[null,null,null,0.7,null,1.44,0.7,1],"211020121":[null,null,null,0.9,null,1],"211021000":[null,null,null,0.7,null,null,0.7,0.7,1.728],"211022011":[null,null,null,1.2,null,null,1],"211022101":[null,null,null,1.2,null,null,null,1],"211110220":[null,null,null,null,null,1,null,null,1.2],"211112020":[null,null,null,null,null,null,1,null,1],"211122001":[null,null,null,null,null,null,1,1],"212010100":[null,null,null,0,null,0,null,100,0],"212010121":[null,null,null,1,null,1],"212011120":[null,null,null,1,null,null,null,null,1],"212021101":[null,null,null,0.9,null,null,null,1],"212110120":[null,null,null,null,null,1,null,null,0.9],"212121100":[null,null,null,null,null,null,null,1,1],"212211100":[null,null,null,null,null,null,null,100,0],"220010011":[null,null,1,1,null,1,1.728],"220011010":[null,null,1.44,1,null,null,1,null,0.7],"220011211":[null,null,1.44,1],"220110010":[null,null,1.44,null,null,1,1,null,1],"220110211":[null,null,1,null,null,1],"220112011":[null,null,1,null,null,null,1],"221010010":[null,null,null,0,null,0,223.94879999999995,null,0],"221010211":[null,null,null,358.31807999999995,null,null,null,null,0],"221011210":[null,null,null,120,null,null,null,null,0],"221110210":[null,null,null,null,null,1,null,null,0.9],"221112010":[null,null,null,null,null,null,1,null,0.9],"010000000":[0,null,0,0,4.0817959045964045,0,0,0,0],"001000000":[0,0,null,0,84.67199999999998,0,0,0,0],"000100000":[0,0,0,null,9.529568999999999,0,0,0,0],"000010000":[748.1875777067742,0,0,0,null,0,0,0,0],"000001000":[0,0,0,0,22.667199248071107,null,0,0,0],"000000100":[0,0,0,0,4.47915514392847,0,null,0,0],"000000010":[0,0,0,0,37.63907481599998,0,0,null,0],"000000001":[0,0,0,0,310.7349739248876,0,0,0,null],"011020000":[41.82119423999998,null,null,0,null,0,0,0,0],"010120000":[100,null,0,null,null,0,0,0,0],"010021000":[0,null,207.35999999999999,0,null,null,0,0,0],"010020100":[0,null,34.3,0,null,0,null,0,0],"010020010":[0,null,0,0,null,120,0,null,0],"010020001":[9.529568999999997,null,0,0,null,0,0,0,null],"001120000":[0,0,null,null,null,0,34.3,0,0],"001021000":[0,0,null,0,null,null,0,0,144],"001020100":[0,0,null,36.87786216692119,null,0,null,0,0],"001020010":[0,0,null,0,null,0,100,null,0],"001020001":[0,0,null,0,null,175.57585919999994,0,0,null],"000121000":[0,100,0,null,null,null,0,0,0],"000120100":[24.39569663999999,0,0,null,null,0,null,0,0],"000120010":[0,0,0,null,null,0,100,null,0],"000120001":[27.782999999999998,0,0,null,null,0,0,0,null],"000021100":[0,0,8.894264399999997,0,null,null,null,0,0],"000021010":[0,0,0,0,null,null,0,null,172.79999999999998],"000021001":[0,0,624.1270313779198,0,null,null,0,0,null],"000020110":[0,0,0,0,null,0,null,null,102.41925119999999],"000020101":[0,0,0,0,null,0,null,174.18239999999997,null],"000020011":[0,0,0,0,null,0,41.16,null,null],"002021110":[1,1,null,0.7,null,null,null,null,1],"000120112":[2.48832,1,0.7,null,null,1],"012021010":[1,null,null,1,null,null,1.728,null,1],"012021100":[1,null,null,1,null,null,null,1,1],"010022011":[1,null,1,1.2,null,null,1],"002021101":[0.7,0.7,null,0.7,null,null,null,4.299816959999999],"002121121":[1,2.9859839999999997],"012021121":[1,null,null,1],"010021012":[1.728,null,1,1,null,null,1],"000021121":[1,1,1.44,1],"012021001":[1,null,null,1,null,null,1.44,1],"010020121":[1,null,1,1,null,1],"002021011":[1,1,null,1,null,null,2.0736],"011021002":[1.2,null,null,1,null,null,1,1],"001021012":[1.2,1,null,1,null,null,1],"001221100":[0.7,0.7,null,null,null,null,null,0.7,0.972],"001220101":[0.7,0.7,null,null,null,2.0736,null,0.756],"011220121":[0.9,null,null,null,null,1],"011221102":[1.2,null,null,null,null,null,null,0.9],"001020121":[0.7,1.2,null,1,null,1],"001220110":[1,1,null,null,null,1,null,null,1.2],"001221112":[1.2,1],"001020211":[0.7,0.7,null,0.7,null,1.2],"001122211":[1,1],"000120121":[1,1.2,1,null,null,1],"002121100":[1,0.7,null,null,null,null,null,1,1],"012020101":[0.7,null,null,0.7,null,0.7,null,1],"012120121":[1,null,null,null,null,1],"001120201":[0.7,0.7,null,null,null,1,null,0.7],"011122201":[1,null,null,null,null,null,null,1],"001022101":[0.7,0.7,null,1.44,null,null,null,1],"001022011":[1,1,null,1.44,null,null,1],"011022001":[1,null,null,1.2,null,null,1,1],"001122001":[1,1,null,null,null,null,1,1]};

  this.chooseSquare = function() {
    var currentState = game.currentState();
    var availableMoves = game.availableMoves();
    me = game.currentPlayer;

    if (iWonLastGame && movesMadeLastGame[currentState]) {
      move = movesMadeLastGame[currentState];
    } else if (learnedStates[currentState]) {
      // Pick the most probable move
      var maxValue = 0.0;
      var potentialMoves = [];

      for (var i in learnedStates[currentState]) {
        if (learnedStates[currentState][i] > maxValue) {
          maxValue = learnedStates[currentState][i];
          potentialMoves = [parseInt(i)];
        } else if (learnedStates[currentState][i] == maxValue) {
          potentialMoves.push(parseInt(i));
        } else if (potentialMoves.length == 0) { // Fail-safe
          potentialMoves = [availableMoves[Math.floor(Math.random() * availableMoves.length)]];
        }
        // select a random move from the highest values this allows
        // us to fully train and weed out the default values
        move = potentialMoves[Math.floor(Math.random()*potentialMoves.length)];
      }
    } else {
      // Try something new
      move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    movesMadeThisGame[currentState] = move;
    if (!learnedStates[currentState]) {
      learnedStates[currentState] = new Array();
      for (var i = 0; i < availableMoves.length; i++) {
        learnedStates[currentState][availableMoves[i]] = 1.0;
      }
    }

    return move;
  }

  this.learn = function() {
    var factor;
    iWonLastGame = game.winner() == me ? true : false;

    switch (game.winner()) {
    case "D": // Call it a draw
      factor = 1.0;
    break;
    case me: // I won!
      factor = 1.5;
      break;
    default: // I guess we lost
      // More moves left = the greater the loss = the greater the punishment needed
      factor = 0.5 - game.availableMoves().length/10.0;
      // factor = 0.5;
    }

    // Review the game
    for (var state in movesMadeThisGame) {
      if (movesMadeThisGame.hasOwnProperty(state)) {
        var squareSelected = movesMadeThisGame[state];
        learnedStates[state][squareSelected] *= factor;
      }
    }
    movesMadeLastGame = movesMadeThisGame;
    movesMadeThisGame = {};
  }

  this.learnByPractice = function() {
    var practicedStates = {};
    var opponentPrevMoves = [];

    if (game) {
      game.reset();
    } else {
      game = new TicTacToeGame();
    }

    // TODO: Training algorithm should reuse a successful sequence of moves until the computer catches on
    for (var i = 0; i < 2; i++) {
      var even = i%2; // We just need to focus on one at a time.  The order doesn't matter
      var me = even ? "O" : "X";
      var moveSequence = 0;
      var iLost = false;
      var gamesWon = 0;
      var gamesLost = 0;
      var gamesDraw = 0;

      for (var totalGamesPracticed = 0; totalGamesPracticed < 25000; totalGamesPracticed++) {
        moveSequence = 0;
        do {
          // TODO: have the opponent try the same sequence until we catch on
          // Random move
          opponentMove = game.availableMoves()[Math.floor(Math.random() * game.availableMoves().length)];

          if (even) {
            game.move(opponentMove);
            game.move(this.chooseSquare());
          } else {
            game.move(this.chooseSquare());
            game.move(opponentMove);
          }

          moveSequence++;
        } while (!game.winner())

        iLost = game.winner() == me ? false : true;

        switch (game.winner()) {
        case me:
          gamesWon++;
          opponentPrevMoves = [];
          break;
        case "D":
          gamesDraw++;
          break;
        default:
          gamesLost++
        }

        this.learn();
        game.reset();
      }
      console.log("Won:  "+gamesWon);
      console.log("Lost: "+gamesLost);
      console.log("Draw: "+gamesDraw);
    }
  }

  this.learnByPractice();
}

var preGameMessage = function() {
  alert("Please choose players, then press 'Play'");
}

