$(document).ready(function() {
  var intervalId; //time
  var countDownNumber; //timer seconds

  var currentQuestion; //added values here instead of newGame currentQ
  var correctAnswer;
  var wrongAnswer;
  var unanswered;
  var answered; //Used?
  var userChoice;

  var text = {
    correct: "Arg! Yore the Captain of this Ship!",
    incorrect: "Gar! Walk the Plank!",
    timeOut: "Ye better be faster or i'll plunder yer booty!",
    done: "Well done me Matey, the we're docked now",
  };

  //object containing questions, answers, and images/gifs for answers
  var pirateQuestions = [
    {
      question: "The rules that pirates lived by while on ship were known as?",
      choices: ["Guidelines", "Articles", "Laws"],
      correct: 1,
      image: "assets/images/articlesgif.gif",
    },

    {
      question:
        "Only two women were ever convicted of piracy. One was Anne Bonney, but who was the other?",
      choices: ["Red Handed Jill", "Mary Read", "Blackbeard's Bride"],
      correct: 1,
      image: "assets/images/maryReed.jpg",
    },

    {
      question:
        "What is the name of the flag generally associated with pirates?",
      choices: ["The Jolly Roger", "Skull and Crossbones", "Hanging Man"],
      correct: 0,
      image: "assets/images/jollyRoger.gif",
    },

    {
      question: "What was Blackbeard's real name?",
      choices: ["Johnathan Larky", "Jasper Hook", "Edward Teach"],
      correct: 2,
      image: "assets/images/blackbeard.gif",
    },

    {
      question:
        "The English word pirate is derived from which of the following Latin terms?",
      choices: ["piratos", "pyrit", "pirata"],
      correct: 2,
      image: "assets/images/latin.gif",
    },

    {
      question:
        "If you were entitled to a double share of the loot and booty ye would be the ____?",
      choices: ["First Mate", "Captain", "Surgeon"],
      correct: 1,
      image: "assets/images/captain.gif",
    }
  ];

  // Hides time countdown and extra areas on startup
  $("#timeRow").hide();
  $("#gameInfo").hide();
  //$("#startOverButton").hide();
  $("#answerArea").hide();
  $("#finalResults").hide();

  //hides start button after clicked and begins game
  $("#startButton").on("click", function() {
    $("#startButton").hide();
    newGame();
  });

  //reset button
  $("#startOverButton").on("click", function() {
    $("#finalResults").hide();
    newGame();
  });

  function newGame() {
    //add what will show up when clock starts
    $("#timeRow").show();
    $("#gameInfo").show();
    $("#answerArea").hide();
    $("#finalResults").hide();

    correctAnswer = 0;
    wrongAnswer = 0;
    timeOut = 0;
    unanswered = 0;
    currentQuestion = 0;

    showQuestion();
  }

  function showQuestion() {
    $("#answerArea").hide();
    $("#timeRow").show();
    $("#gameInfo").show();
    answered = true;
    //add cycle to show questions and answers
    $("#question").html(pirateQuestions[currentQuestion].question);

    // loop through choices and append each option
    for (var i = 0; i <= 3; i++) {
      var list = $("<div>");
      list.text(pirateQuestions[currentQuestion].choices[i]);
      list.attr({ "data-index": i });
      list.addClass("thisChoice");
      $("#choices").append(list);

    }
    //call startGame to start timer
    startGame();

    //add userclick function
    $(".thisChoice").on("click", function() {
      userChoice = $(this).data("index");
      //console.log(userChoice);
      clearInterval(intervalId);
      showAnswers();
    });
  }

  //shows time countdown and sets interval
  function startGame() {
    countDownNumber = 20;
    // $("#timeRow").show();
    //clearInterval(intervalId);
    
    answered = true;
    intervalId = setInterval(decrement, 1000);
  }

  // decrements count down number every second until hits 0 and updates DOM with clock number
  function decrement() {
    countDownNumber--;

    $("#questionCountdown").text(countDownNumber + " seconds");

    if (countDownNumber === 0) {
      clearInterval(intervalId);
      answered = false;
      showAnswers();
    }
  }

  //clears the interval and stops the game
  function showAnswers() {
    $("#timeRow").hide();
    $("#gameInfo").hide();
    $("#finalResults").hide();
    $("#answerArea").show();
    $(".thisChoice").empty();

    var rightAnswerText = pirateQuestions[currentQuestion].choices[pirateQuestions[currentQuestion].correct];
    var rightAnswerIndex = pirateQuestions[currentQuestion].correct;
    //console.log(rightAnswerText);
    //console.log(rightAnswerIndex);

    var gifImgLink = pirateQuestions[currentQuestion].image;
    var gifImg = $("<img>");
    gifImg.attr("Src", gifImgLink);
    gifImg.addClass("gif");
    $("#imageGif").html(gifImg);

    if ((userChoice === rightAnswerIndex) && (answered === true)){
      correctAnswer++;
     // console.log(correctAnswer);
      $("#answerText").html(text.correct);
      $("#correctAnswer").hide();
    } else if ((userChoice !== rightAnswerIndex) && (answered === true)){
      wrongAnswer++;
      $("#answerText").html(text.incorrect);
      $("#correctAnswer").show().html("The correct answer was: " + rightAnswerText);
    } else {
      unanswered++;
      $("#answerText").html(text.timeOut);
      $("#correctAnswer").html("The correct answer was: " + rightAnswerText);
      answered = true;
    }

    if (currentQuestion === (pirateQuestions.length-1)) {
      setTimeout(results, 5000);
    } else {
      currentQuestion++;
      //console.log(currentQuestion);
      setTimeout(showQuestion, 5000);
    }
  }

  function results(){
    $("#answerArea").hide();
    $("#timeRow").hide();
    $("#gameInfo").hide();
    $("#finalResults").show();
    $("#resultText").html(text.done);
    $("#amountCorrect").html("Correct Answers: " + correctAnswer);
    $("#amountWrong").html("Incorrect Answers: " + wrongAnswer);
    $("#amountUnanswered").html("Didn't Answer: " + timeOut);
    $("#startOverButton").show();
    $("#startOverButton").html("Restart Game Here If Ye Dare!");
  }
});
