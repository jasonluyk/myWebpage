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
