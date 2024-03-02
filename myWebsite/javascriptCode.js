function showDiv(divId, divId2, divId3, element) {
    document.getElementById(divId).style.display = element.value == 1 ? 'block' : 'none';
    document.getElementById(divId2).style.display = element.value == 2 ? 'block' : 'none';
    document.getElementById(divId3).style.display = element.value == 3 ? 'block' : 'none';
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
