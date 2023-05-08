const rpsInputs = ["rock", "paper", "scissors"]
const rpslsInputs = ["rock", "paper", "scissors", "lizard", "spock"]

export function rps(input){
   if(input == undefined){
	        return {"player": "rock"};
   }
   if(!rpsInputs.includes(input)){
		console.error(`${input} is out of range.`);
		rulesRPS();
	        helpRPS();
	        return;

	}
    const opponentChoice = rpsInputs[Math.floor(Math.random() * 3)];
  const result = playRps(input, opponentChoice);
		return {
			"player": input,
			"opponent": opponentChoice,
			"result": result
		};
}

export function playRps(playerChoice, opponentChoice){
  if (playerChoice === opponentChoice) {
    return "tie";
  } else if (
    (playerChoice === "rock" && opponentChoice === "scissors") ||
    (playerChoice === "paper" && opponentChoice === "rock") ||
    (playerChoice === "scissors" && opponentChoice === "paper")
  ) {
    return "win";
  } else {
    return "lose";
  }

}


export function rpsls(input1){
   if(input1 == undefined){
                return {"player": "rock"};
   }
   if(!rpslsInputs.includes(input1)){
                console.error(`${input1} is out of range.`);
                rulesRPSLS();
                helpRPSLS();
                return;
        
        } 

    const opponentChoice = rpslsInputs[Math.floor(Math.random() * 5)];
  const result = playRpsls(input1, opponentChoice);
 return { "player": input1.toLowerCase(), "opponent": opponentChoice, "result": result };

}

export function playRpsls(playerChoice, opponentChoice){
  if (playerChoice === opponentChoice) {
    return "tie";
  } else if (
    (playerChoice === "rock" && (opponentChoice === "scissors" || opponentChoice === "lizard")) ||
    (playerChoice === "paper" && (opponentChoice === "rock" || opponentChoice === "spock")) ||
    (playerChoice === "scissors" && (opponentChoice === "paper" || opponentChoice === "lizard")) ||
    (playerChoice === "lizard" && (opponentChoice === "paper" || opponentChoice === "spock")) ||
    (playerChoice === "spock" && (opponentChoice === "rock" || opponentChoice === "scissors"))
  ) {
    return "win";
  } else {
    return "lose";
  }

}

export function rulesRPS() {
	console.log(`Rules for Rock Paper Scissors:
		  - Scissors CUTS Paper
		  - Paper COVERS Rock
		  - Rock CRUSHES Scissors`);
	return;
}


export function helpRPS() {
  console.log(`Usage: node-rps [SHOT]
    Play Rock Paper Scissors (RPS)
    -h, --help      display this help message and exit
    -r, --rules     display the rules and exit`);
}

export function helpRPSLS() {
  console.log(`Usage: node-rpsls [SHOT]
    Play Rock Paper Scissors Lizard Spock (RPSLS)
    -h, --help      display this help message and exit
    -r, --rules     display the rules and exit`);
}

export function rulesRPSLS() {
	console.log(`Rules for the Lizard-Spock Expansion of Rock Paper Scissors:
	  - Scissors CUTS Paper
	    - Paper COVERS Rock
	      - Rock SMOOSHES Lizard
	        - Lizard POISONS Spock
		  - Spock SMASHES Scissors
		    - Scissors DECAPITATES Lizard
		      - Lizard EATS Paper
		        - Paper DISPROVES Spock
			  - Spock VAPORIZES Rock
			    - Rock CRUSHES Scissors`);
	return;
}


