$(document).ready(function() {
  var intervalId;
  var countDownNumber = 20;

  //object containing questions, answers, and images/gifs for answers
  var pirateQuestions = [
    {
      question: "The rules that pirates lived by while on ship were known as?",
      choices: ["Guidelines", "Articles", "Laws"],
      correct: 1,
      image: "../images/articlesgif.gif",
    },

    {
      question:
        "Only two women were ever convicted of piracy. One was Anne Bonney, but who was the other?",
      choices: ["Red Handed Jill", "Mary Read", "Blackbeard's Bride"],
      correct: 1,
      image: "../images/maryReed.jpg",
    },

    {
      question:
        "What is the name of the flag generally associated with pirates?",
      choices: ["The Jolly Roger", "Skull and Crossbones", "Hanging Man"],
      correct: 0,
      image: "../images/jollyRoger.gif",
    },

    {
      question: "What was Blackbeard's real name?",
      choices: ["Johnathan Larky", "Jasper Hook", "Edward Teach"],
      correct: 2,
      image: "../images/blackbeard.gif",
    },

    {
      question:
        "The English word pirate is derived from which of the following Latin terms?",
      choices: ["piratos", "pyrit", "pirata"],
      correct: 2,
      image: "../images/latin.gif",
    },

    {
      question:
        "If you were entitled to a double share of the loot and booty ye would be the ____?",
      choices: ["First Mate", "Captain", "Surgeon"],
      correct: 1,
      image: "../images/captain.gif",
    }
  ];

  // Hides time countdown and extra areas on startup 
  $("#timeRow").hide();
  $("#gameInfo").hide();
  $("#answerArea").hide();
  $("#finalResults").hide();

  //hides start button after clicked and begins game
  $("#startButton").on("click", function(){
    $("#startButton").hide();
    startGame();
  });

  //shows time countdown and sets interval
  function startGame(){
    $("#timeRow").show();
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
  }

  // decrements count down number every second until hits 0 and updates DOM with clock number
  function decrement(){
    if (countDownNumber === 0){
      alert("times up");    // will need to change to cycle questions
      stopGame(); //placeholder for stop function
    }

    countDownNumber --;

    $("#questionCountdown").text(countDownNumber + " seconds");
  }

  //clears the interval and stops the game
  function stopGame(){
    clearInterval(intervalId);
  }
});
