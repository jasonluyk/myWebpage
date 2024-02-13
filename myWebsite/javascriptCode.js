var input = document.getElementById("input");
var button = document.getElementById("button");
var output = document.getElementById("output");

function displayOutput() {
    const text = input.value;
    output.innerHTML = text;
}

button.addEventListener("click", displayOutput);


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
      } else if (guess < number) {
        feedbackElement.innerHTML = "Too low! Try again.";
        feedbackElement.style.color = "red";
        guesses += 1;
      } else {
        feedbackElement.innerHTML = "Too high! Try again.";
        feedbackElement.style.color = "red";
        guesses += 1;
      }
      console.log(number);
    }
