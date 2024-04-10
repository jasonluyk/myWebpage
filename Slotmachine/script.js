const rockPaperScissors = document.getElementById('rockPaperScissors');
const slots = document.getElementsByClassName('slot');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const scoreDisplay = document.getElementById('scoreDisplay');

const objects = [
    '🪨',
    '📃',
    '✂️'
];

// Define scores for different objects


let spinning = false;
let intervalIds = [];
//let totalScore = 0; // Cumulative score
let spinningTime = 1500; // Duration for spinning in milliseconds

// Function to update the objects in the slots
function updateSlots() {
    for (let i = 0; i < slots.length; i++) {
        const randomIndex = Math.floor(Math.random() * objects.length);
        slots[i].textContent = objects[randomIndex];
        scoreDisplay.innerHTML = randomIndex;
    }
}

// Function to start spinning
function startSpinning() {
    if (!spinning) {
        spinning = true;
        updateSlots(); // Update slots initially

        // Clear previous interval IDs
        intervalIds.forEach(id => clearInterval(id));
        intervalIds = [];

        // Start spinning each slot
        for (let i = 0; i < slots.length; i++) {
            const intervalId = setInterval(() => {
                updateSlots();
            }, 100); // Update slots every 100 milliseconds
            intervalIds.push(intervalId);
        }

        // Stop spinning after a certain time
        setTimeout(() => {
            stopSpinning();
        }, spinningTime);
    }
}

// Function to stop spinning
function stopSpinning() {
    clearInterval(intervalIds[0]);
    //clearInterval(intervalIds[1]);
    //clearInterval(intervalIds[2]);
    spinning = false;
    
    // Calculate the score
    const currentObjects = Array.from(slots).map(slot => slot.textContent);
    const spinScore = calculateSpinScore(currentObjects);
    
    // Update total score
    totalScore += spinScore;
    
    // Display the total score
    scoreDisplay.textContent = "Total Score: " + totalScore;
}

// Function to calculate the score of a spin
function calculateSpinScore(currentObjects) {
    let spinScore = 0;
    currentObjects.forEach(object => {
        spinScore += scores[object];
    });
    return spinScore;
}

// Function to reset the slot machine and score
function resetSlotMachine() {
    totalScore = 0;
    scoreDisplay.textContent = "Total Score: " + totalScore;
}

// Event listeners
startButton.addEventListener('click', startSpinning);
resetButton.addEventListener('click', resetSlotMachine);

 //Rock Paper Scissors game

 const answerElement = document.getElementById("answer");
 const computerElement = document.getElementById("computer");
 const gameElement = document.getElementById("gameResult");
 
 const getUserChoice = userInput => {
 userInput = prompt("Select your weapon(rock, paper, scissors): ")
 userInput = userInput.toLowerCase();
 answerElement.innerHTML = "Player chose: " + userInput;
 if(userInput === 'rock' || userInput === 'paper' || userInput === 'scissors' || userInput === 'bomb'){
   return userInput
 }else {
   console.log("Invalid input")
 }
}
//📃✂️🪨
const getComputerChoice = () => {
 const choice = Math.floor((Math.random() * 3))
 if(choice === 0){
   return 'rock'
 } else if(choice === 1){
   return 'paper'
 }else{
   return 'scissors'
 }
 
}
 const determineWinner = (userChoice, computerChoice) => {
   if(userChoice === computerChoice){
     return 'Game was a tie'
   }
   if(userChoice === 'bomb'){
     return 'Player cheat code BOMB activated! Player Wins!'
   }
   if(userChoice === 'rock' && computerChoice === 'paper'){
     return 'Computer chooses paper. Computer wins';
   } else if (userChoice === 'rock' && computerChoice === 'scissors'){
     return 'Computer chooses scissors. Player wins!';
   } else if (userChoice === 'paper' && computerChoice === 'scissors'){
     return 'Computer chooses scissors. Computer wins';
   } else if (userChoice === 'paper' && computerChoice === 'rock'){
     return 'Computer chooses rock. Player wins!';
   } else if (userChoice === 'scissors' && computerChoice === 'rock'){
     return 'Computer chooses rock. Computer wins';
   } else if (userChoice === 'scissors' && computerChoice === 'paper'){
     return 'Computer chooses paper. Player wins!';
   };
 }
 
 const playGame = () => {
   const userChoice = getUserChoice('bomb');
   const computerChoice = getComputerChoice();
   computerElement.innerHTML = "Computer chose: " + computerChoice;
   gameElement.innerHTML = determineWinner(userChoice, computerChoice);

 }