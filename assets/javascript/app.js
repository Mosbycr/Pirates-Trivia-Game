$(document).ready(function() {
  var intervalId; //time
  var countDownNumber = 20; //timer seconds
  var currentQuestion = 0; //added values here instead of newGame
  var correctAnswer = 0;
  var wrongAnswer = 0;
  var unanswered = 0;
  var answered; //Used?
  var userChoice;

  var text = {
    correct: "Arg! Yore the Captain of this Ship!",
    incorrect: "Gar! Walk the Plank!",
    timeOut: "Ye better be faster or i'll plunder yer booty!",
    done: "Well done me Matey, the we're docked now"
  };

  //object containing questions, answers, and images/gifs for answers
  var pirateQuestions = [
    {
      question: "The rules that pirates lived by while on ship were known as?",
      choices: ["Guidelines", "Articles", "Laws"],
      correct: 1,
      image: "../images/articlesgif.gif"
    },

    {
      question:
        "Only two women were ever convicted of piracy. One was Anne Bonney, but who was the other?",
      choices: ["Red Handed Jill", "Mary Read", "Blackbeard's Bride"],
      correct: 1,
      image: "../images/maryReed.jpg"
    },

    {
      question:
        "What is the name of the flag generally associated with pirates?",
      choices: ["The Jolly Roger", "Skull and Crossbones", "Hanging Man"],
      correct: 0,
      image: "../images/jollyRoger.gif"
    },

    {
      question: "What was Blackbeard's real name?",
      choices: ["Johnathan Larky", "Jasper Hook", "Edward Teach"],
      correct: 2,
      image: "../images/blackbeard.gif"
    },

    {
      question:
        "The English word pirate is derived from which of the following Latin terms?",
      choices: ["piratos", "pyrit", "pirata"],
      correct: 2,
      image: "../images/latin.gif"
    },

    {
      question:
        "If you were entitled to a double share of the loot and booty ye would be the ____?",
      choices: ["First Mate", "Captain", "Surgeon"],
      correct: 1,
      image: "../images/captain.gif"
    }
  ];

  // Hides time countdown and extra areas on startup
  $("#timeRow").hide();
  $("#gameInfo").hide();
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
    // $("#gameInfo").text("Hello");
    //do i need to rehide answers and results area after click restart button?
    showQuestion();
  }

  function showQuestion() {
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
      console.log(userChoice);
      clearInterval(intervalId);
      showAnswers();
    });
  }

  //shows time countdown and sets interval
  function startGame() {
    // $("#timeRow").show();
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
  }

  // decrements count down number every second until hits 0 and updates DOM with clock number
  function decrement() {
    countDownNumber--;

    $("#questionCountdown").text(countDownNumber + " seconds");

    if (countDownNumber === 0) {
      clearInterval(intervalId);
      showAnswers();
    }
  }

  //clears the interval and stops the game
  function showAnswers() {
    $("#timeRow").hide();
    $("#gameInfo").hide();
    $("#answerArea").show();
    $(".thisChoice").empty();

    var rightAnswerText =
      pirateQuestions[currentQuestion].choices[
        pirateQuestions[currentQuestion].correct
      ];
    var rightAnswerIndex = pirateQuestions[currentQuestion].correct;
    console.log(rightAnswerText);
    console.log(rightAnswerIndex);

    var gifImgLink = pirateQuestions[currentQuestion].image;
    var gifImg = $("<img>");
    gifImg.attr("Src", gifImgLink);
    gifImg.addClass("gif");
    $("#imageGif").html(gifImg);
  }
});
