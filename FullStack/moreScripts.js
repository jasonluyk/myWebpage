

//Flashcard section 
let cards = document.getElementsByClassName('card');

for (let cardIndex in cards){
    let button = cards[cardIndex].querySelector('.card-button');
    button.addEventListener('click', function(event){
        let currentButton = event.target;
        let currentCard = currentButton.parentNode;
        let currentAnswer = currentCard.querySelector('.card-answer');
        if(currentButton.innerHTML =='Show'){
            currentAnswer.style.display = 'Block';
            currentButton.innerHTML = 'Hide';
        } else if (currentButton.innerHTML == 'Hide'){
            currentAnswer.style.display = 'None';
            currentButton.innerHTML = 'Show';
        }
    })
}

