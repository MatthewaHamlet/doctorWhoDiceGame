// The Pig Game

var scores, roundScore, activePlayer, dice, gamePlaying;

init();

// Random number between 0 - 6.
dice = Math.floor(Math.random() * 6) + 1;

function nextPlayer() {
  //  Next Player.
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  // Reset Score To zero(0).
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  // Toggle .active class for active player.
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  // Hide dice image on player change.
  hideDice();
}

function hideDice() {
  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";
}

function showDice() {
  document.getElementById("dice-1").style.display = "block";
  document.getElementById("dice-2").style.display = "block";
}

document.querySelector(".btn-roll").addEventListener("click", () => {
  if (gamePlaying) {
    //  Random number.
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    //  Display the result.
    showDice();
    document.getElementById("dice-1").src = "dice-" + dice1 + ".svg";
    document.getElementById("dice-2").src = "dice-" + dice2 + ".svg";

    //  Update round score IF the rolled number is not a one(1) or two sixes rolled.

    if (dice === 6 && dice2 === 6) {
      // Player looses score.
      score[activePlayer] = 0;
      // Update UI.
      document.querySelector("#score-" + activePlayer).textContent = "0";
      nextPlayer();
    } else if (dice1 !== 1 && dice2 !== 1) {
      // Add Score
      roundScore += dice1 + dice2;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      // Next Player.
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", () => {
  if (gamePlaying) {
    // Add current score to global score.
    score[activePlayer] += roundScore;

    // Update UI.
    document.querySelector("#score-" + activePlayer).textContent =
      score[activePlayer];

    // Get the value of the users input.
    var userScoreInput = document.querySelector(".final-score").value;
    var finalScore;
    // Check to see if score inputted if not default = 100.
    if (userScoreInput) {
      var finalScore = userScoreInput;
    } else {
      finalScore = 100;
    }

    // Check if player won the game.
    if (score[activePlayer] >= finalScore) {
      document.querySelector("#name-" + activePlayer).textContent = "YOU WON!";

      hideDice();

      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");

      gamePlaying = false;
    } else {
      // Next Player
      nextPlayer();
    }
  }
});

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  // Record Both Players Scores.
  score = [0, 0];
  // Score when one(1) is rolled.
  roundScore = 0;
  // Active Player 0, NonActive Player 1.
  activePlayer = 0;

  gamePlaying = true;

  // Hide Dice Images Onload.
  hideDice();

  // Set Player Score To 0.
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";

  // Set Current score to 0.
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  // Reset Player names.
  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";

  // Remove winner class.
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  // Remove active class.
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  // Add active class to player zero(0).
  document.querySelector(".player-0-panel").classList.add("active");
}
