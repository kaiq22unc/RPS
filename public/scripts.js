// If you would like to see some examples of similar code to make an interface interact with an API,
// check out the coin-server example from a previous COMP 426 semester.
// https://github.com/jdmar3/coinserver

import {rpsls, rps} from './lib/rpsls.js';

function showButton(button) {
    document.getElementById(button).style.display = "block";
}
function hideButton(button) {
  document.getElementById(button).style.display = "none";
}
function getRadioValue(name) {
    var radio = document.querySelector(`input[name=${name}]:checked`);
    return radio.value;
}
async function playButton() {
    var gameSelector = getRadioValue("gameSelector");
    if (gameSelector === "rpsChosen") {
        var opponentChoice = getRadioValue("rpsOpponentChoice")
        if (opponentChoice === "yes") {
            // CONTENT FOR RPS VS OPPONENT
            const value = getRadioValue("rpsChoice");
            const url = '/app/rps/play/' + value;
            var response = await fetch(url);
            var result = await response.json();
            document.getElementById("resultText").innerHTML = `Player chose ${result.player}, Opponent chose ${result.opponent}, Result is ${result.result}.`;
        } else {
            // CONTENT FOR RPS WITH RANDOM DRAW
            const rpsChoices = ["rock", "paper", "scissors"]
            const computerChoice = rpsChoices[Math.floor(Math.random() * rpsChoices.length)];
            const url = '/app/rps/play/' + computerChoice;
            var response = await fetch(url);
            var result = await response.json();
            document.getElementById("resultText").innerHTML = `Player chose ${result.player}, Opponent chose ${result.opponent}, Result is ${result.result}.`;
        }
    } else {
        var opponentChoice = getRadioValue("rpslsOpponentChoice")
        if (opponentChoice === "yes") {
            // CONTENT FOR RPSLS VS OPPONENT
            const value = getRadioValue("rpslsChoice");
            const url = '/app/rpsls/play/' + value;
            var response = await fetch(url);
            var result = await response.json();
            document.getElementById("resultText").innerHTML = `Player chose ${result.player}, Opponent chose ${result.opponent}, Result is ${result.result}.`;

        } else {
            // CONTENT FOR RPSLS WITH RANDOM DRAW
            const rpslsChoices = ["rock", "paper", "scissors", "lizard", "spock"]
            const computerChoice = rpslsChoices[Math.floor(Math.random() * rpslsChoices.length)];
            const url = '/app/rpsls/play/' + computerChoice;
            var response = await fetch(url);
            var result = await response.json();
            document.getElementById("resultText").innerHTML = `Player chose ${result.player}, Opponent chose ${result.opponent}, Result is ${result.result}.`;
        }
    }
}
function changeLabel(elementID, textReplacement) {
    document.getElementById(elementID).innerHTML = textReplacement;
}

document.getElementById("playButton").addEventListener("click", playButton);
