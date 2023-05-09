// If you would like to see some examples of similar code to make an interface interact with an API,
// check out the coin-server example from a previous COMP 426 semester.
// https://github.com/jdmar3/coinserver

async function playButton() {
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
  document.getElementById('playButton').innerHTML = '<button type="button" onclick="playButton()">Play Again</button> <button type="button" onclick="resetPage()">Reset</button>';
  //document.getElementById('playButton').innerHTML = '<button type="button" onclick="resetPage()">Reset</button>';

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

let gameType = "rps"
if (gameSelector === 'rpsChosen') {
  gameType = "rps";
}else {
  gameType = "rpsls"
}
if(!rpsOpponentChoice){
  var resultString = "Your Choice: " + playerChoice;
}else{
document.getElementById('resultHeader').style.display = 'block';
var opponentChoice = getOpponentChoice(gameSelector);
// Call determineWinner() and store the result in a variable
var resultString = determineWinner(playerChoice, opponentChoice);
}
// Create a string that includes the player's choice and the result
//var resultString = 'You chose ' + playerChoice + ' and your opponent chose ' + opponentChoice + '. Result: ' + result;

// Set the content of an HTML element with the result string
document.getElementById('resultHeader').style.display = 'block';
document.getElementById('resultText').innerHTML = resultString;
//document.getElementById('resultText').style.display = 'block'
//return result;

let baseurl = window.location.href.concat('/app/')
let url = baseurl.concat(gameType.concat('/play/'))
let oppCheck = document.getElementById('rpsOpponentChoice').checked
if (oppCheck) { url = url.concat(playerChoice) }
let response = await fetch(url)
let result = await response.json()

// Determine the winner
resultString = 'You chose ' + result.player
if (oppCheck) {
    resultString = resultString + ' and your opponent chose ' + result.opponent + '. Result: ' + result.result;
}

  // Display the result header and text
  document.getElementById('resultHeader').style.display = 'block'
  document.getElementById('resultText').innerHTML = resultString

  // Show the Result section
  document.getElementById('resultHeader').style.display = 'block'
  document.getElementById('resultText').style.display = 'block'

  // Return the result
  return result
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
  document.querySelector('div:nth-of-type(1)').style.display = 'block';
  document.querySelector('div:nth-of-type(2)').style.display = 'block';

  document.getElementById('playButton').innerHTML = '<button type="button" onclick="playButton()">Play Again</button>';
  // Hide the appropriate choices element(s) based on the game selector value
    document.getElementById('rpsChoices').style.display = 'none';
    document.getElementById('rpslsChoices').style.display = 'none';

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
    var result = "It's a tie!";
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
    var result = 'You win!';
  } else {
    var result = 'You lose!';
  }
  return "You chose " + playerChoice + " and your opponent chose " + opponentChoice + ". Result: " + result;
}

function showRules() {
  var gameSelector = document.querySelector('input[name="gameSelector"]:checked').value;

  if (gameSelector === 'rpsChosen') {
    alert('Rock-Paper-Scissors Rules: \n\nRock beats scissors\nScissors beats paper\nPaper beats rock');
  } else if (gameSelector === 'rpslsChosen') {
    alert('Rock-Paper-Scissors-Lizard-Spock Rules: \n\nScissors cuts paper\nPaper covers rock\nRock crushes lizard\nLizard poisons Spock\nSpock smashes scissors\nScissors decapitates lizard\nLizard eats paper\nPaper disproves Spock\nSpock vaporizes rock\nRock crushes scissors');
  }
}
