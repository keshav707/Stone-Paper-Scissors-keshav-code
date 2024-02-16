//all images
let choices = document.querySelectorAll(".img");

let n = 5; // coin target
let coin = 0;
//dashboard
let result = document.getElementById("inst-board");

let gift = document.getElementsByClassName("Gift");
let OK = document.querySelector("#button");

OK.addEventListener("click", () => {
  document.body.querySelector("main").style.opacity = "1.0";
  document.body.querySelector("main").style.pointerEvents = "visible";
  gift[0].style.visibility = "hidden";
});

//score of both
let userScore = 0;
let compScore = 0;
//function to get computer's choice
function getComputerChoice() {
  //possible computer choices
  let possible_choice = ["rock", "paper", "scissor"];

  //get random value
  let idx = Math.floor(Math.random() * 3);
  let choice_val = possible_choice[idx];
  // console.log(choice_val);

  return choice_val;
}

//match is draw
function Draw() {
  result.style.backgroundColor = "blue";
  result.style.borderColor = "pink";
  result.innerText = "Match is draw";
}
//compare both value
function FinalResult(UserChoice, CompChoice) {
  //if both are equa then match will be draw
  if (UserChoice === CompChoice) {
    Draw();
  } else {
    let UserWin = false;
    //check user win or not
    if (UserChoice === "rock") {
      UserWin = CompChoice === "paper" ? false : true;
    } else if (UserChoice === "paper") {
      UserWin = CompChoice === "scissor" ? false : true;
    } else {
      UserWin = CompChoice === "rock" ? false : true;
    }

    //perform output according to user win or not
    // console.log(UserWin);
    //output according to user's condition
    //user win or not
    if (UserWin) {
      result.style.backgroundColor = "green";
      result.style.borderColor = "green";
      result.innerText = `Congratulations! your ${UserChoice} beats ${CompChoice}`;

      //increase the points of user
      userScore++;
      document.getElementById("User-score").innerText = userScore;

      if (userScore === n) {
        document.body.querySelector("main").style.opacity = "0.5";
        document.body.querySelector("main").style.pointerEvents = "none";
        gift[0].style.visibility = "visible";
        // console.log("hi");
        n += 5;
        coin++;
        let point = document.getElementById("point-value");
        point.innerText = " " + coin;
      }
    } else {
      result.style.backgroundColor = "red";
      result.style.borderColor = "red";
      result.innerText = `Sorry! ${CompChoice} beats your ${UserChoice}`;

      //increase computer's score
      compScore++;
      document.getElementById("Comp-score").innerText = compScore;
    }
  }
}
//start the game after user's input
function startGame(UserChoice) {
  let CompChoice = getComputerChoice();
  // console.log(CompChoice);

  FinalResult(UserChoice, CompChoice);
}

//take the user's choice
choices.forEach((choice) => {
  //check each individual input
  choice.addEventListener("click", () => {
    //if user click any image then start the game with user's choice

    // console.log(choice.getAttribute("id"));
    let UserChoice = choice.getAttribute("id");
    startGame(UserChoice);
  });
});

//Restart the game
let reset_btn = document.getElementById("restart");
reset_btn.addEventListener("click", () => {
  if (confirm("do you want to restart")) {
    result.innerText = "Play your move";
    result.style.background = "transparent";
    result.style.borderColor = "blue";

    userScore = 0;
    n=5;
    document.getElementById("User-score").innerText = userScore;

    compScore = 0;
    document.getElementById("Comp-score").innerText = compScore;
  }
});

//use the coin
let coin_use = document.getElementById("use-coin");
coin_use.addEventListener("click", () => {
  if (coin > 0) {
    userScore += 2;
    document.getElementById("User-score").innerText = userScore;
    coin--;
    document.getElementById("point-value").innerText = coin;

    if (compScore >= 2) {
      compScore -= 2;
      document.getElementById("Comp-score").innerText = compScore;
    }
    
  }
});

coin_use.addEventListener('mouseenter' , () =>{
  document.getElementById('un-usable').style.visibility = 'visible';
})
coin_use.addEventListener('mouseleave' , () =>{
  document.getElementById('un-usable').style.visibility = 'hidden';
})