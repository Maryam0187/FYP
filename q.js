const correctAnswerIcon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG7HVtoF91KK85ZKPlBL0wzdW8URDpziD2PRsFZm4awGyD2BS-";
const wrongAnswerIcon= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyGk_AHvtphypbgsJNN6qI1qX7v1b2vRXBgLwgGMcSZ95oZqaqug";
const warningIcon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa7WP9E3LDA10kP2Rk2enw-_kjI-iJd4kny8yH2kTrPR8hgrwtBg";

let questionCounter = 0;
let score = 0;
let questionsArray = [
  {
    question: "1. Consider the following recursive function fun(x, y). What is the value of fun(4, 3)"  ,
    imge:"quiz/1.JPG",            
    optionone: "12",
    optiontwo: "13",
    optionthree: "9",
    optionfour: "10",
    correctAnswer: "13"
  },
  {
     question: "2.Recursion is a method in which the solution of a problem depends on ____________",
     imge:"",
    optionone: "Larger instances of different problems",
    optiontwo: " Larger instances of the same problem",
    optionthree: "Smaller instances of the same problem",
    optionfour: "Smaller instances of different problems",
    correctAnswer: "Smaller instances of the same problem"
  
  },
  {
     question: "3. Consider the following recursive function fun(x). What is the value of fun(2)",
    imge:"quiz/3.JPG",
    optionone: "4",
    optiontwo: "16",
    optionthree: "Runtime Error",
    optionfour: "8",
    correctAnswer: "16"
    
  },
  {
    question: "4. Recursion is similar to which of the following?",
    imge:"",
    optionone: "Switch Case",
    optiontwo: "Loop",
    optionthree: "If-Else",
    optionfour: "None of above",
    correctAnswer: "Loop"
  },
  {
    question: "5. What does the following function print for n = 25",
    imge:"quiz/5.JPG",
    optionone: "10011",
    optiontwo: "11001",
    optionthree: "10110",
    optionfour: "10000",
    correctAnswer: "10011"
  },
  {
    question: "6. What does fun2() do in general?",
    imge:"quiz/6.JPG",
    optionone: "x * y",
    optiontwo: "x + x * y",
    optionthree: "x ^ y",
    optionfour: "y ^ x",
    correctAnswer: "y ^ x"
  },
   {
    question: "7. Which one of the following is TRUE?",
    imge:"quiz/7.JPG",
    optionone: "The function returns 0 for all values of j",
    optiontwo: "The function prints the string something for all values of j",
    optionthree: "The function returns 0 when j = 50",
    optionfour: "The function will exhaust the runtime stack or run into an infinite loop when j = 50",
    correctAnswer: "The function will exhaust the runtime stack or run into an infinite loop when j = 50"
  },
  {
    question: "8. The value returned by function(1) is ",
    imge:"quiz/9.JPG",
    optionone: "9",
    optiontwo: "7",
    optionthree: "5",
    optionfour: "6",
    correctAnswer: "7"
  },
  {
    question: "9.  Which of the following statements is true?",
    imge:"",
    optionone: "Recursion is always better than iteration",
    optiontwo: "Recursion uses more memory compared to iteration",
    optionthree: "Recursion uses less memory compared to iteration",
    optionfour: "Iteration is always better and simpler than recursion",
    correctAnswer: "Recursion uses more memory compared to iteration"
  }
  ,
  {
    question: "10.  In general, in a recursive and non-recursive implementation of a problem (program) :",
    imge:"",
    optionone: "Both time and space complexities are better in recursive than in non-recursive program",
    optiontwo: "Both time and space complexities are better in non-recursive than in recursive program",
    optionthree: "Time complexity is better in recursive version but space complexity is better in non-recursive version of the program",
    optionfour: "Space complexity is better in recursive version but time complexity is better in non-recursive version of the program",
    correctAnswer: "Both time and space complexities are better in non-recursive than in recursive program"
  }
  ,
  {
    question: "11.  Predict the output of the following snippet :",
    imge:"quiz/11.JPG",
    optionone: "24",
    optiontwo: "48",
    optionthree: "16",
    optionfour: "0",
    correctAnswer: "24"
  }
  ,
  {
    question: "12.  What’s happen if base condition is not defined in recursion ?",
    imge:"",
    optionone: "Stack underflow",
    optiontwo: " Stack Overflow",
    optionthree: "Both mentioned above",
    optionfour: "None of the above",
    correctAnswer: "Stack Overflow"
  }
  ,
  {
    question: "13. Consider the following code snippet to answer What will happen when the above snippet is executed?",
    imge:"quiz/13.JPG",
    optionone: "The code will be executed successfully and no output will be generated",
    optiontwo: " The code will be executed successfully and random output will be generated",
    optionthree: "The code will show a compile time error",
    optionfour: "The code will run for some time and stop when the stack overflows",
    correctAnswer: "The code will run for some time and stop when the stack overflows"
  }
  ,
  {
    question: "14. The return value of fun(5) is ",
    imge:"quiz/14.JPG",
    optionone: "0",
    optiontwo: " 71",
    optionthree: "51",
    optionfour: "21",
    correctAnswer: "51"
  }
  ,
  {
    question: "15. If get(6) function is being called in main() then how many times will the get() function be invoked before returning to the main()? ",
    imge:"quiz/15.JPG",
    optionone: "15",
    optiontwo: " 20",
    optionthree: "23",
    optionfour: "25",
    correctAnswer: "25"
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
   if (score<=5)
   {
    $('.end-section #result').text("Your Performance is weak You need to practice more")
   }
   if(score<=10 && score>5)
   {
    $('.end-section #result').text("Your Performance is Average You need to do little bit more practice !")
   }
   if (score<=15 && score>10)
   {
    $('.end-section #result').text("Your Performance is Good. Keep it up!")
   }
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
