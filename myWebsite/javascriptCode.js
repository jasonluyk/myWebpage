function showDiv(divId, divId2, divId3, divId4, element) {
    document.getElementById(divId).style.display = element.value == 1 ? 'block' : 'none';
    document.getElementById(divId2).style.display = element.value == 2 ? 'block' : 'none';
    document.getElementById(divId3).style.display = element.value == 3 ? 'block' : 'none';
    document.getElementById(divId4).style.display = element.value == 4 ? 'block' : 'none';
  }   

function convert(){
    const inputValue = document.getElementById("userInput").value;
    const unit = document.getElementById("unit").value;
    const milesToKm = unit ==="milesToKm";
    let result = 0;
    if (milesToKm == true){
      result = inputValue * 1.60934;
      }else {
        result = inputValue / 1.60934;
      }
    document.getElementById("resultElement").innerHTML = result;
    }

    function random() {
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      return randomNumber;
    }
    
    let number = random();
    let guesses = 1;
    


    function checkGuess() {
      
      const inputElement = document.getElementById("guess");
      const feedbackElement = document.getElementById("feedback");
      let guess = inputElement.value;
      
      if (guess == number) {
        feedbackElement.innerHTML = "You guessed right! It took you " + guesses + " guess(s) to get the number. Give it another try!";
        feedbackElement.style.color = "green";
        number = Math.floor(Math.random() * 100) + 1;
        guesses = 1;
        document.getElementById("guess").value = "";
      } else if (guess < number) {
        feedbackElement.innerHTML = "Too low! Try again.";
        feedbackElement.style.color = "red";
        guesses += 1;
      } else {
        feedbackElement.innerHTML = "Too high! Try again.";
        feedbackElement.style.color = "red";
        guesses += 1;
      }
      
    }

    function randomClickX() {
      let randomX1 = Math.ceil(Math.random() * 10 );
      let randomX2 = Math.ceil(Math.random() * 10 );
      let randomX3 = Math.ceil(Math.random() * 10 );
  
      document.getElementById("randomX1").innerHTML = randomX1;
      document.getElementById("randomX2").innerHTML = randomX2;
      document.getElementById("randomX3").innerHTML = randomX3;
  
      let output = "Play again";
      if (randomX1 === randomX2) {
      if(randomX2 === randomX3) {
          output = "Jackpot";
          }
      }
  
  
      let chance = output;
      function clickChance() {
          document.getElementById("chance").innerHTML = chance;
      }
      document.getElementById('spanId').innerHTML = chance;
  };

  function createEnclosingDiv() {
    let enclosingDiv = document.createElement("div");
    enclosingDiv.classList.add("comment");
    return enclosingDiv;
    
  }
  
  function createAvatar(initials) {
    let newAvatar = document.createElement("span");
    newAvatar.innerText = initials;
    newAvatar.classList.add("avatar");
    return newAvatar;
  }
  
  function createText(text) {
    let newText = document.createElement("span");
    newText.classList.add("text");
    newText.innerText = text;
    return newText;
  }
  function resetFields(){
    document.getElementById("initials").value = "";
    document.getElementById("commentText").value = "";
  }
  
  
  function addComment() {
   let commentsDiv = document.getElementById("commentSection");
    let initialsInput = document.getElementById("initials").value;
    let textInput = document.getElementById("commentText").value;
  
    let enclosingDiv = createEnclosingDiv();
    let avatar = createAvatar(initialsInput);
    let text = createText(textInput);
    enclosingDiv.appendChild(avatar);
    enclosingDiv.appendChild(text);
    commentsDiv.appendChild(enclosingDiv);
    resetFields();
  }


  //Rock Paper Scissors game

  const choices = ["rock", "paper", "scissors", "rock", "paper", "scissors"];

    function computerChoice() {
        return choices[Math.floor(Math.random() * choices.length)];
    }

    function play(userChoice) {
        const computer = computerChoice();
        let result = '';

        if (userChoice === computer) {
            result = "It's a tie!";
        } else if (
            (userChoice === "rock" && computer === "scissors") ||
            (userChoice === "paper" && computer === "rock") ||
            (userChoice === "scissors" && computer === "paper")
        ) {
            result = "You win!";
        } else {
            result = "You lose!";
        }

        document.getElementById('result').innerText = `You chose ${userChoice}, computer chose ${computer}. ${result}`;
    }
    //cheat code button can only be used once
    function cheatCode(userInput){
      userInput = prompt("Whats the cheat code?");
      const button = document. getElementById("cheat"); button. removeAttribute("onclick");
      button.style.display = 'none';
      if(userInput === 'bomb'){
        document.getElementById('result').innerText = `You chose ${userInput}, You win! Game over!`
        
      } else {
        document.getElementById('result').innerText = `You failed pick an image!`;
        
      }

    }

    document.getElementById('rock').addEventListener('click', () => play('rock'));
    document.getElementById('paper').addEventListener('click', () => play('paper'));
    document.getElementById('scissors').addEventListener('click', () => play('scissors'));
    
  

  //Slot Machine starting point
  const slotMachine = document.getElementById('slotMachine');
  const slots = document.getElementsByClassName('slot');
  const startButton = document.getElementById('startButton');
  const resetButton = document.getElementById('resetButton');
  const scoreDisplay = document.getElementById('scoreDisplay');
  
  const objects = [
      '🍭',
      '❌',
      '⛄️',
      '🦄',
      '🍌',
      '💩',
      '👻',
      '😻',
      '💵',
      '🤡',    
      '🦖',
      '🍎',
      '😂',
      '🤑',
  ];
  
  // Define scores for different objects
  const scores = {
      "🍭": 5,
      "❌": 10,
      "⛄️": 15,
      "🦄": 20,
      "🍌": 25,
      "💩": 30,
      "👻": 35,
      "😻": 40,
      "💵": 45,
      "🤡": 50,
      "🦖": 100,
      "🍎": 110,
      "😂": 120,
      "🤑": 130,
  };
  
  let spinning = false;
  let intervalIds = [];
  let totalScore = 0; // Cumulative score
  let spinningTime = 1500; // Duration for spinning in milliseconds
  
  // Function to update the objects in the slots
  function updateSlots() {
      for (let i = 0; i < slots.length; i++) {
          const randomIndex = Math.floor(Math.random() * objects.length);
          slots[i].textContent = objects[randomIndex];
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
      clearInterval(intervalIds[1]);
      clearInterval(intervalIds[2]);
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