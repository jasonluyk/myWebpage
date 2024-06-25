function showDiv(divId, divId2, divId3, divId4, divId5, element) {
    document.getElementById(divId).style.display = element.value == 1 ? 'block' : 'none';
    document.getElementById(divId2).style.display = element.value == 2 ? 'block' : 'none';
    document.getElementById(divId3).style.display = element.value == 3 ? 'block' : 'none';
    document.getElementById(divId4).style.display = element.value == 4 ? 'block' : 'none';
    document.getElementById(divId5).style.display = element.value == 5 ? 'block' : 'none';
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

  //Crossy RPG

  function CrossyRPG() {
    //Hide start button
    let hideStart = document.getElementById('startGame');
    hideStart.style.display = 'none';
    // create a new scene
    let gameScene = new Phaser.Scene('Game');
    // initiate scene parameters
    gameScene.init = function() {
      // player speed
      this.playerSpeed = 3;
      // enemy speed
      this.enemyMinSpeed = 2;
      this.enemyMaxSpeed = 4.5;
      // boundaries
      this.enemyMinY = 80;
      this.enemyMaxY = 280;
      // we are not terminating
      this.isTerminating = false;
    };
    // load assets
    gameScene.preload = function(){
      // load images
      this.load.image('background', './assets/background.png');
      this.load.image('player', './assets/player.png');
      this.load.image('enemy', './assets/dragon.png');
      this.load.image('goal', './assets/treasure.png');
    };
    // called once after the preload ends
    gameScene.create = function() {
      // create bg sprite
      let bg = this.add.sprite(0, 0, 'background');
      // change the origin to the top-left corner
      bg.setOrigin(0,0);
      // create the player
      this.player = this.add.sprite(40, this.sys.game.config.height / 2, 'player');
      // we are reducing the width and height by 50%
      this.player.setScale(0.5);
      // goal
      this.goal = this.add.sprite(this.sys.game.config.width - 80, this.sys.game.config.height / 2, 'goal');
      this.goal.setScale(0.6);
      // enemy group
      this.enemies = this.add.group({
        key: 'enemy',
        repeat: 5,
        setXY: {
          x: 90,
          y: 100,
          stepX: 80,
          stepY: 20
        }
      });
      // setting scale to all group elements
      Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.4, -0.4);
      // set flipX, and speed
      Phaser.Actions.Call(this.enemies.getChildren(), function(enemy){
        // flip enemy
        enemy.flipX = true;
        // set speed
        let dir = Math.random() < 0.5 ? 1 : -1;
        let speed = this.enemyMinSpeed + Math.random() * (this.enemyMaxSpeed - this.enemyMinSpeed);
        enemy.speed = dir * speed;
      }, this);
    };
    // this is called up to 60 times per second
    gameScene.update = function(){
      // don't execute if we are terminating
      if(this.isTerminating) return;
      // check for active input (left click / touch)
      if(this.input.activePointer.isDown) {
        // player walks
        this.player.x += this.playerSpeed;
      }
      // treasure overlap check
      let playerRect = this.player.getBounds();
      let treasureRect = this.goal.getBounds();
      if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, treasureRect)) {
        console.log('reached goal!');
        // end game
        return this.gameOver();
      }
      // get enemies
      let enemies = this.enemies.getChildren();
      let numEnemies = enemies.length;
      for(let i = 0; i< numEnemies; i++) {
        // enemy movement
        enemies[i].y += enemies[i].speed;
        // check we haven't passed min or max Y
        let conditionUp = enemies[i].speed < 0 && enemies[i].y <= this.enemyMinY;
        let conditionDown = enemies[i].speed > 0 && enemies[i].y >= this.enemyMaxY;
        // if we passed the upper or lower limit, reverse
        if(conditionUp || conditionDown) {
          enemies[i].speed *= -1;
        }
        // check enemy overlap
        let enemyRect = enemies[i].getBounds();
        if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, enemyRect)) {
          console.log('Game over!');
          // end game
          return this.gameOver();
        }
      }
    };
    gameScene.gameOver = function() {
      // initiated game over sequence
      this.isTerminating = true;
      // shake camera
      this.cameras.main.shake(500);
      // listen for event completion
      this.cameras.main.on('camerashakecomplete', function(camera, effect){
        // fade out
        this.cameras.main.fade(500);
      }, this);
      this.cameras.main.on('camerafadeoutcomplete', function(camera, effect){
        // restart the Scene
        this.scene.restart();
      }, this);
    };
    // set the configuration of the game
    let config = {
      type: Phaser.AUTO, // Phaser will use WebGL if available, if not it will use Canvas
      width: 640,
      height: 360,
      parent: 'phaserGame',
      scene: gameScene
    };
    // create a new game, pass the configuration
    let game = new Phaser.Game(config);
  }