// If you would like to see some examples of similar code to make an interface interact with an API,
// check out the coin-server example from a previous COMP 426 semester.
// https://github.com/jdmar3/coinserver

function playButton() {
  // Get the game selector value
  var gameSelector = document.querySelector('input[name="gameSelector"]:checked').value;
  var rpsOpponentChoice = document.getElementById('rpsOpponentChoice').checked;

  // Hide the game selector and opponent choice elements
  document.querySelector('div:nth-of-type(1)').style.display = 'none';
  document.querySelector('div:nth-of-type(2)').style.display = 'none';

  // Show the appropriate choices element(s) based on the game selector value
  if (gameSelector === 'rpsChosen') {
    document.getElementById('rpsChoices').style.display = 'block';
  } else if (gameSelector === 'rpslsChosen') {
    document.getElementById('rpslsChoices').style.display = 'block';
  }

  // Show the Play Again button
  document.getElementById('playButton').innerHTML = '<button type="button" onclick="playAgain()">Play Again</button>';

  // Hide the Result section (if visible)
  //document.getElementById('resultHeader').style.display = 'none';
  //document.getElementById('resultText').style.display = 'none';

  // Get the player's move
  var playerChoice;
  if (gameSelector === 'rpsChosen') {
    playerChoice = document.querySelector('input[name="rpsChoice"]:checked').value;
  } else {
    playerChoice = document.querySelector('input[name="rpslsChoice"]:checked').value;
  }

  // Get the opponent's move if checkbox is checked
  //var opponentChoice;
  //if (document.getElementById("rpsOpponentChoice").checked) {
  //  opponentChoice = getOpponentChoice(gameSelector);
  //} else {
  //  opponentChoice = '';
//  }

// Determine the winner
fetch('/app/rps/play/' + playerChoice)
  .then(response => response.json())
  .then(data => {
    // Display the result
    document.getElementById('resultHeader').style.display = 'block';
    document.getElementById('resultText').innerHTML = data;
  })
  .catch(error => {
    console.error(error);
  });


  // Display the result
  document.getElementById('resultHeader').style.display = 'block';
  document.getElementById('resultText').innerHTML = result;
}

function resetPage() {
  // Reset radio buttons and checkbox
  document.querySelector('input[name="gameSelector"][value="rpsChosen"]').checked = true;
  document.getElementById("rpsOpponentChoice").checked = false;
  document.querySelector('input[name="rpsChoice"][value="rock"]').checked = true;
  document.querySelector('input[name="rpslsChoice"][value="rock"]').checked = true;

  // Hide result
  document.getElementById('resultHeader').style.display = 'none';
  document.getElementById('resultText').innerHTML = '';
}
function getOpponentChoice(gameSelector) {
  // Generate a random choice for the opponent
  var choices = ['rock', 'paper', 'scissors'];
  if (gameSelector === 'rpslsChosen') {
    choices.push('lizard', 'spock');
  }
  var randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function determineWinner(playerChoice, opponentChoice) {
  // Determine the winner based on the choices
  if (playerChoice === opponentChoice) {
    return "It's a tie!";
  } else if (
    (playerChoice === 'rock' && opponentChoice === 'scissors') ||
    (playerChoice === 'paper' && opponentChoice === 'rock') ||
    (playerChoice === 'scissors' && opponentChoice === 'paper') ||
    (playerChoice === 'rock' && opponentChoice === 'lizard') ||
    (playerChoice === 'lizard' && opponentChoice === 'spock') ||
    (playerChoice === 'spock' && opponentChoice === 'scissors') ||
    (playerChoice === 'scissors' && opponentChoice === 'lizard') ||
    (playerChoice === 'lizard' && opponentChoice === 'paper') ||
    (playerChoice === 'paper' && opponentChoice === 'spock') ||
    (playerChoice === 'spock' && opponentChoice === 'rock')
  ) {
    return 'You win!';
  } else {
    return 'You lose!';
  }
}
