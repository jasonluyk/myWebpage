
let questions = [
    {
        title: 'gato',
        alternatives: ['dog', 'cat', 'bird', 'fish'],
        correctAnswer: 1
    }, 
    {
        title: 'ave',
        alternatives: ['mouse', 'hamster', 'lizard', 'bird'],
        correctAnswer: 3
    }, 
    {
        title: 'rata',
        alternatives: ['cat', 'fish', 'rat', 'shark'],
        correctAnswer: 2
    },
    {
        title: 'mosca',
        alternatives: ['fly', 'puma', 'fish', 'dog'],
        correctAnswer: 0
    }
]

let app = {
    start: function() {

        this.currPositon = 0;
        this.score = 0;
                //selecting by a query
        let alts = document.querySelectorAll('.alternative');
        
        alts.forEach((element, index) => {

            element.addEventListener('click', () => {
                //check for correct answer
                this.checkAnswer(index);
            });
        });
        //refresh score
        this.updateStats();
        //show first question
        this.showQuestion(questions[this.currPositon]);
    },

    showQuestion: function (q){

        //1. select the dom element
        let titleDiv = document.getElementById('title');
        //2. modify it
        titleDiv.textContent = q.title;
        // select by class .className
        //selecting by a query
        let alts = document.querySelectorAll('.alternative');
        alts.forEach(function(element, index){
            element.textContent = q.alternatives[index];
        });
    },

    checkAnswer: function(userSelected) {
        let currQuestion = questions[this.currPositon];

        if (currQuestion.correctAnswer == userSelected){
            //correct
            console.log('correct');
            this.score++;
            this.showResult(true);
        }
        else {
            //incorrect
            console.log('wrong');
            this.showResult(false);
        }

        //refresh score
        this.updateStats();

        //increase position
        this.increasePosition();
        //show next question
        this.showQuestion(questions[this.currPositon]);
    },

    increasePosition: function () {
        this.currPositon++;
        
        if(this.currPositon == questions.length) {
            this.currPositon = 0;
        }
    },

    updateStats: function() {
        let scoreDiv = document.getElementById('score');
        scoreDiv.textContent = `Your score: ${this.score}`;
    },

    showResult: function(isCorrect) {
        let resultDiv = document.getElementById('result');
        let result = '';

        //checks
        if(isCorrect){
            result = 'Correct Answer!';
        }
        else {
            //get current question
            let currQuestion = questions[this.currPositon];
            //get correct answer(index)
            let correctAnsIndex = currQuestion.correctAnswer;
            //text of correct answer
            let correctAnsText = currQuestion.alternatives[correctAnsIndex];

            result = `Wrong! Correct answer: ${correctAnsText}`;
        }
        resultDiv.textContent = result;
    }
}





app.start();
