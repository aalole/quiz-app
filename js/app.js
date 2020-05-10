const question =document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById("progressText");
const scoreTest  = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const game = document.getElementById("game");
const loader = document.getElementById("loader");
// console.log(choices);
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestion = [];

let questions = [];

fetch("https://opentdb.com/api.php?amount=20&category=22&difficulty=easy&type=multiple").then(res => res.json())
    .then(loadedQuestions => {
      // console.log(loadedQuestions.results);
   questions =  loadedQuestions.results.map(loadedQuestion => {
        const formattedQuestion = {
          question: loadedQuestion.question
        };
        const answerChoices = [...loadedQuestion.incorrect_answers];
        
        formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
        answerChoices.splice(
          formattedQuestion.answer - 1,
          0, 
          loadedQuestion.correct_answer
        );

        answerChoices.forEach((choice, index) => {
          formattedQuestion["choice" + (index + 1)] = choice;
        });
        // console.log(formattedQuestion);
        return formattedQuestion;
      });
      // game.classList.remove("hidden");
      // loader.classList.add("hidden");
        startGame();
    }).catch(err =>{
      console.error(err)
    });
        

  //CONSTANTS

  const correctBonus = 10;
  const maxQuestions = 20;

 const startGame = () => {
      questionCounter = 0;
      score = 0;
      availableQuestions = [...questions];
      // console.log(availableQuestions.length);
      getNewQuestion();
      game.classList.remove("hidden");
      loader.classList.add("hidden");  
  }
  const  getNewQuestion = () => {
      if(availableQuestions.length === 0 || questionCounter >= maxQuestions){
          localStorage.setItem("mostRecentScore", score)
          return window.location.assign('end.html')
      }
      questionCounter++;  
      progressText.innerText = `Question  ${questionCounter}/${maxQuestions}`;
      progressBarFull.style.width = `${(questionCounter/maxQuestions) * 100}% `;
      const questionIndex = Math.floor(Math.random() * availableQuestions.length);
       //   console.log(questionIndex);
      currentQuestion = availableQuestions[questionIndex];
      question.innerText = currentQuestion.question;
    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion["choice" + number];
        // console.log(choice);
    });
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
    choices.forEach(choice => {
        choice.addEventListener('click', e => {
            if(!acceptingAnswers) return;
            acceptingAnswers = false;
            const selectedChoice = e.target;
            // console.log(selectedChoice);
            
            const selectedAnswer = selectedChoice.dataset['number'];
            const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";   

            selectedChoice.parentElement.classList.add(classToApply);
            if(selectedChoice.dataset.value === currentQuestion.answer){
          console.log(true);
          
            }
            if(classToApply === "correct"){
              increamentScore(correctBonus);
            }
            setTimeout(() =>{
              
              selectedChoice.parentElement.classList.remove(classToApply);
             
              getNewQuestion();
            }, 1000);
            
            // console.log(selectedAnswer == currentQuestion.answer);
        });
    });
    const increamentScore = num => {
      score += num;
      scoreTest.innerText = score;
    }
  }

  // startGame();