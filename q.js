const correctAnswerIcon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG7HVtoF91KK85ZKPlBL0wzdW8URDpziD2PRsFZm4awGyD2BS-";
const wrongAnswerIcon= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyGk_AHvtphypbgsJNN6qI1qX7v1b2vRXBgLwgGMcSZ95oZqaqug";
const warningIcon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa7WP9E3LDA10kP2Rk2enw-_kjI-iJd4kny8yH2kTrPR8hgrwtBg";

let questionCounter = 0;
let score = 0;
let questionsArray = [
  {
    question: "1. Consider the following recursive function fun(x, y). What is the value of:"+"fun(4, 3)" + 
                "int fun(int x,inty)",
    imge:"code.PNG",            
    optionone: "3",
    optiontwo: "5",
    optionthree: "6",
    optionfour: "7",
    correctAnswer: "5"
  },
  {
     question: "2. Which of the following function of Array object reverses the order of the elements of an array?",
    imge:"codeeg.PNG",
    optionone: "reverse()",
    optiontwo: "push()",
    optionthree: "reduceRight()",
    optionfour: "reduce()",
    correctAnswer: "reverse()"
  
  },
  {
     question: "3. What statement supplies the value of a function?",
    imge:"",
    optionone: "continue",
    optiontwo: "return",
    optionthree: "cancel",
    optionfour: "valueOf",
    correctAnswer: "return"
    
  },
  {
    question: "4. How do you find the number with the highest value of x and y?",
    imge:"",
    optionone: "Math.max(x, y)",
    optiontwo: "top(x, y)",
    optionthree: "ceil(x, y)",
    optionfour: "Math.ceil(x, y)",
    correctAnswer: "Math.max(x, y)"
  },
  {
    question: "5. Inside which HTML element do we put the JavaScript?",
    imge:"",
    optionone: "<javascript>",
    optiontwo: "<js>",
    optionthree: " <scripting>",
    optionfour: "<script>",
    correctAnswer: "<script>"
  },
  {
    question: "6. How does a FOR loop start?",
    imge:"",
    optionone: "for (i = 0; i <= 5)",
    optiontwo: "for (i = 0; i <= 5; i++)",
    optionthree: "for i = 1 to 5",
    optionfour: "for (i <= 5; i++)",
    correctAnswer: "for (i = 0; i <= 5; i++)"
  },
   {
    question: "7. How do you create a function in JavaScript?",
    imge:"",
    optionone: "function = myFunction()",
    optiontwo: "function:myFunction()",
    optionthree: "function myFunction()",
    optionfour: "function - myFunction()",
    correctAnswer: "function myFunction()"
  },
  {
    question: "8. How to write an IF statement in JavaScript?",
    imge:"",
    optionone: "if i = 5",
    optiontwo: "if i == 5 then",
    optionthree: "if i = 5 then",
    optionfour: "if (i == 5)",
    correctAnswer: "if (i == 5)"
  }
  ];

let questionsCount = questionsArray.length;

function handleStartClick(){
	$('.js-start-button').on('click',function(event){
		console.log("handleStartClick() ran");
		$('.progress-section').show();
		$('.start-section').hide();
		$('.end-section').hide();
		$('.quiz-box').fadeIn("slow");
		renderQuizBox(); 

	});
}

// This function displays the quizz box with the question, options, 
// score and question count
function renderQuizBox(){
  renderQuestionCount();
  renderQuestion();
  renderScore();
}
function renderScore(){
  $(".progress-section .score-card").text(`${score}/${questionsCount}`);
}
function renderQuestionCount(){
  $(".progress-section .question-count").text(`Question ${questionCounter+1} of ${questionsCount}`);
}

// This function renders a new question
function renderQuestion(){
  $(".questions-form p").text(questionsArray[questionCounter].question);
  $(".questions-form img").attr("src",questionsArray[questionCounter].imge);
  $(".questions-form #option-one").val(questionsArray[questionCounter].optionone);
  $(".questions-form #option-two").val(questionsArray[questionCounter].optiontwo);
  $(".questions-form #option-three").val(questionsArray[questionCounter].optionthree);
  $(".questions-form #option-four").val(questionsArray[questionCounter].optionfour);
   
  $(".questions-form #option-one").next().text(questionsArray[questionCounter].optionone);
  $(".questions-form #option-two").next().text(questionsArray[questionCounter].optiontwo);
  $(".questions-form #option-three").next().text(questionsArray[questionCounter].optionthree);
  $(".questions-form #option-four").next().text(questionsArray[questionCounter].optionfour);
}

function handleSubmitAnswer(){
  $('.js-submit-button').on('click',function(event){
    console.log("handleSubmitAnswer() ran");
    let selectedOption = $('input[type=radio]:checked').val();
    if(selectedOption === undefined) {
       displayPopup(false, selectedOption);
    }
    else{
     //reset radio button
      $('input[type=radio]:checked').attr('checked',false);
      checkAnswer(selectedOption);
    }
 });
}


// This function checks whether the answer selected by the
// user is correct or not
function checkAnswer(selected){
  let rightAnswer = questionsArray[questionCounter].correctAnswer;
  
  if(selected === rightAnswer){
    score++;
    displayPopup(true, rightAnswer);
  } 
  else{
   displayPopup(false, rightAnswer);
  }
}

//This function gives feedback to the user whether 
//the option selected in correct or wrong. 
//It also alerts the user if no option is selected
function displayPopup(statusFlag, answer){
  $('.feedback-section').show();
  if(statusFlag){
    $(".popup-box img").attr("src",correctAnswerIcon);
    $(".popup-box #popup-text").text("You are right!");
    $(".popup-box").show();
  }
  else{
      if(answer === undefined) {
         questionCounter--;
         $(".popup-box img").attr("src",warningIcon);
         $(".popup-box #popup-text").text('Please select an option');
       }
      else{
         $(".popup-box img").attr("src",wrongAnswerIcon);
        $(".popup-box #popup-text").text(`Sorry, the correct answer was: ${answer}`);
      }
    }
     $(".popup-box").show();
}

//This function will proceed to the next question or display the final score
//based on the question count.
function handlePopupClose(){
  $('.js-close-button').on('click', function(event){
    console.log("handlePopupClose() ran");
    $('.popup-box').hide();
    $('.feedback-section').hide();
    $('.quiz-box').hide().fadeIn();
    questionCounter++;
    if(questionCounter < questionsArray.length) {
       $('.quiz-box').fadeIn();
       renderQuizBox();
    }
    else{
      $('.quiz-box').hide();
      displayFinalScore();
    }
  });
}

//This function displays the final score once the quiz is completed
function displayFinalScore(){
   $('.end-section').fadeIn(1000);
   $('.end-section h4').text(`Your Score is: ${score}/${questionsCount}`);
   $('.correct .count' ).text(score);
   $('.wrong .count').text(questionsCount - score);
   resetQuiz();
}

//This function resets the questions and score
function resetQuiz(){
  questionCounter = 0;
  score = 0;
}

//This function will start over the quiz
function handleStartOver(){
  $('.js-startover-button').on('click',function(event){
    console.log("handleStartOver() ran");
    $('.end-section').hide();
    $('.quiz-box').fadeIn();
    renderQuizBox();
  });
}

function init(){
  $('.end-section').hide();
  $('.progress-section').hide();
  $('.quiz-box').hide();
  $('.feedback-section').hide();
  handleStartClick();
  handleSubmitAnswer();
  handlePopupClose();
  handleStartOver()
}
$(init());
