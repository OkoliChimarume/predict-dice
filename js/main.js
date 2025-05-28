const predictValues = [1, 2, 3, 4, 5, 6];
let prediction;
let timer = "3:00";
let level = document.getElementById("level");
level.dataset.value = 0;
const diceElement = document.getElementById("dice");
const rollButton = document.getElementById("roll");
const rollSound = document.getElementById("roll-sound");
const error1 = document.getElementById("error-msg1");
const error2 = document.getElementById("error-msg2");
const error3 = document.getElementById("error-msg3");
const error4 = document.getElementById("error-msg4");
const wahwah_sound = document.getElementById("wahwah-sound");
const die_sound = document.getElementById("die-sound");
const success_sound = document.getElementById("success-sound");
const level_up_sound = document.getElementById("level-up-sound");
let lastNumber = 0;
let score = parseInt(localStorage.getItem("score")) || 0;
const levels = [1, 2, 3, 4];

// makes score score is not cleared on page reload
document.addEventListener("DOMContentLoaded", () => {
  const scr = document.getElementById("score");
  scr.innerHTML = score;
});

function PredictButtons() {
  const prediction_container = document.getElementById("prediction-container");
  predictValues.forEach((value) => {
    const predictBtn = document.createElement("button");
    predictBtn.classList.add("predict-val");
    predictBtn.id = "predict-val";
    predictBtn.dataset.value = value;
    predictBtn.textContent = value;
    predictBtn.addEventListener("click", () => {
      document.getElementById("pop-sound").play();
      SavePredictions(value);
    });
    prediction_container.appendChild(predictBtn);
  });
}
function SavePredictions(value) {
  prediction = value;
  const buttons = document.querySelectorAll(".predict-val");
  buttons.forEach((btn) => {
    btn.classList.remove("active-val");
  });
  const selectedBtn = [...buttons].find((btn) => btn.dataset.value == value);
  if (selectedBtn) {
    selectedBtn.classList.add("active-val");
  }
}

rollButton.addEventListener("click", () => RollDice());

function RollDice() {
  if (!prediction) {
    error4.classList.remove("hidden");

    setTimeout(() => {
      error4.classList.add("hidden");
    }, 2500);
  } else {
    // play roll sound
    rollSound.play();

    // Ensure a new number different from the previous
    let newNumber;

    do {
      newNumber = Math.floor(Math.random() * 6) + 1;
    } while (newNumber === lastNumber);

    lastNumber = newNumber;

    console.log(newNumber);

    // Remove previous classes
    for (let i = 1; i <= 6; i++) {
      diceElement.classList.remove("show-" + i);
    }

    // Trigger animation
    diceElement.classList.add("show-" + newNumber);

    // display Error after a delay
    setTimeout(() => {
      showErrorMessage();
      updateScores();
    }, 3000);

    //reset predictions
    setTimeout(() => {
      resetPrediction();
    }, 3500);
  }
}

function showErrorMessage() {
  if (lastNumber === prediction) {
    success_sound.play();
  } else if (lastNumber != prediction) {
    die_sound.play();
    error3.classList.remove("hidden");

    setTimeout(() => {
      error3.classList.add("hidden");
    }, 2000);
  }
}

function updateScores() {
  let scr = document.getElementById("score");
  if (lastNumber === prediction) {
    score++;
    localStorage.setItem("score", score);
  }
  scr.innerHTML = score;
}

// const lv1 = document.getElementById("level-btn1");
// const lv2 = document.getElementById("level-btn2");
// const lv3 = document.getElementById("level-btn3");
// const lv4 = document.getElementById("level-btn4");

// lv1.addEventListener("click", () => console.log("hey"));
// lv2.addEventListener("click", () => handleLevelClick(2));
// lv3.addEventListener("click", () => handleLevelClick(3));
// lv4.addEventListener("click", () => handleLevelClick(4));

// function handleLevelClick(number) {
//   window.location.href = "/prediction-page.html";
//   updateLevels(number);
// }

function updateLevels(number) {
  console.log(number);
  if (number == 4) {
    level.innerText = "Four";
  } else if (number == 3) {
    level.innerText = "Three";
  } else if (number == 2) {
    level.innerText = "Two";
  } else {
    level.innerText = "One";
  }
  number;
}

function SetTimer() {
  const timerParagraph = document.getElementById("timer");
  timerParagraph.innerText = timer;

  // let timeLeft = 10;
  // const timerDisplay = document.getElementById("timer");

  // const countdown = setInterval(() => {
  //   timeLeft--;
  //   timerDisplay.textContent = timeLeft;

  //   if (timeLeft <= 0) {
  //     clearInterval(countdown);
  //     timerDisplay.textContent = "Time's up!";
  //   }
  // }, 1000);
}
PredictButtons();

function resetPrediction() {
  const buttons = document.querySelectorAll(".predict-val");
  prediction = 0;
  buttons.forEach((btn) => {
    btn.classList.remove("active-val");
  });
}
