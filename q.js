
var quiz={
  correctAnswerIcon : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG7HVtoF91KK85ZKPlBL0wzdW8URDpziD2PRsFZm4awGyD2BS-",
  wrongAnswerIcon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyGk_AHvtphypbgsJNN6qI1qX7v1b2vRXBgLwgGMcSZ95oZqaqug",
  warningIcon : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa7WP9E3LDA10kP2Rk2enw-_kjI-iJd4kny8yH2kTrPR8hgrwtBg",
  questionCounter : 0,
  score :0,
  questionsArray : [
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
  ],

   handleStartClick:function(){
    $('.js-start-button').on('click',function(event){
      console.log("handleStartClick() ran");
      $('.progress-section').show();
      $('.start-section').hide();
      $('.end-section').hide();
      $('.quiz-box').fadeIn("slow");
      QuizBox.renderQuizBox(); 
  
    });
  },

  handleSubmitAnswer:function(){
    $('.js-submit-button').on('click',function(event){
      console.log("handleSubmitAnswer() ran");
      let selectedOption = $('input[type=radio]:checked').val();
      if(selectedOption === undefined) {
        QuizEvaluator.displayPopup(false, selectedOption);
      }
      else{
       //reset radio button
        $('input[type=radio]:checked').attr('checked',false);
        QuizEvaluator.checkAnswer(selectedOption);
      }
   });
  },

  handlePopupClose: function(){
    $('.js-close-button').on('click', function(event){
      console.log("handlePopupClose() ran");
      $('.popup-box').hide();
      $('.feedback-section').hide();
      $('.quiz-box').hide().fadeIn();
      quiz.questionCounter++;
      if(quiz.questionCounter < quiz.questionsArray.length) {
         $('.quiz-box').fadeIn();
         QuizBox.renderQuizBox();
      }
      else{
        $('.quiz-box').hide();
        QuizEvaluator.displayFinalScore();
      }
    });
  },

  handleStartOver:function(){
    $('.js-startover-button').on('click',function(event){
      console.log("handleStartOver() ran");
      $('.end-section').hide();
      $('.quiz-box').fadeIn();
      QuizBox.renderQuizBox();
    });
  },  
  
  attemptQuiz: function()
  {
    $('.end-section').hide();
    $('.progress-section').hide();
    $('.quiz-box').hide();
    $('.feedback-section').hide();
    this.handleStartClick();
    this.handleSubmitAnswer();
    this.handlePopupClose();
    this.handleStartOver();
  }
,
  resetQuiz:function(){
    this.questionCounter = 0;
    this.score = 0;
  }
}

var  QuizBox={

  renderScore:function(){
    $(".progress-section .score-card").text(`${quiz.score}/${quiz.questionsArray.length}`);
  },
  renderQuestionCount:function(){
    $(".progress-section .question-count").text(`Question ${quiz.questionCounter+1} of ${quiz.questionsArray.length}`);
  },
  
  // This function renders a new question
  renderQuestion:function(){
    $(".questions-form p").text(quiz.questionsArray[quiz.questionCounter].question);
    $(".questions-form img").attr("src",quiz.questionsArray[quiz.questionCounter].imge);
    $(".questions-form #option-one").val(quiz.questionsArray[quiz.questionCounter].optionone);
    $(".questions-form #option-two").val(quiz.questionsArray[quiz.questionCounter].optiontwo);
    $(".questions-form #option-three").val(quiz.questionsArray[quiz.questionCounter].optionthree);
    $(".questions-form #option-four").val(quiz.questionsArray[quiz.questionCounter].optionfour);
     
    $(".questions-form #option-one").next().text(quiz.questionsArray[quiz.questionCounter].optionone);
    $(".questions-form #option-two").next().text(quiz.questionsArray[quiz.questionCounter].optiontwo);
    $(".questions-form #option-three").next().text(quiz.questionsArray[quiz.questionCounter].optionthree);
    $(".questions-form #option-four").next().text(quiz.questionsArray[quiz.questionCounter].optionfour);
  }
,
  renderQuizBox:function()
  {
    this.renderQuestionCount(),
    this.renderQuestion(),
    this.renderScore()
  }

  
}

var QuizEvaluator={
// This function checks whether the answer selected by the
// user is correct or not
checkAnswer:function(selected)
{
  var rightAnswer = quiz.questionsArray[quiz.questionCounter].correctAnswer;
  
  if(selected === rightAnswer){
    quiz.score++;
    this.displayPopup(true, rightAnswer);
  } 
  else{
   this.displayPopup(false, rightAnswer);
  }
}
,
//This function gives feedback to the user whether 
//the option selected in correct or wrong. 
//It also alerts the user if no option is selected
displayPopup:function(statusFlag, answer){
  $('.feedback-section').show();
  if(statusFlag){
    $(".popup-box img").attr("src",quiz.correctAnswerIcon);
    $(".popup-box #popup-text").text("You are right!");
    $(".popup-box").show();
  }
  else{
      if(answer === undefined) {
         quiz.questionCounter--;
         $(".popup-box img").attr("src",quiz.warningIcon);
         $(".popup-box #popup-text").text('Please select an option');
       }
      else{
         $(".popup-box img").attr("src",quiz.wrongAnswerIcon);
        $(".popup-box #popup-text").text(`Sorry, the correct answer was: ${answer}`);
      }
    }
     $(".popup-box").show();
},

//This function will proceed to the next question or display the final score
//based on the question count.
//This function displays the final score once the quiz is completed

displayFinalScore:function(){
   $('.end-section').fadeIn(1000);
   $('.end-section h4').text(`Your Score is: ${quiz.score}/${quiz.questionsArray.length}`);
   $('.correct .count' ).text(quiz.score);
   $('.wrong .count').text(quiz.questionsArray.length - quiz.score);
   if (quiz.score<=5)
   {
    $('.end-section #result').text("Your Performance is weak You need to practice more")
   }
   if(quiz.score<=10 && quiz.score>5)
   {
    $('.end-section #result').text("Your Performance is Average You need to do little bit more practice !")
   }
   if (quiz.score<=15 && quiz.score>10)
   {
    $('.end-section #result').text("Your Performance is Good. Keep it up!")
   }
   quiz.resetQuiz();
},
}

//This function will start over the quiz
function performQuiz(){
  quiz.attemptQuiz();
}
$(performQuiz());
