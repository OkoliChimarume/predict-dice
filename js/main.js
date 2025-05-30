const predictValues = [1, 2, 3, 4, 5, 6];
let prediction;
let timer = "3:00";
let level = document.getElementById("level");
const currentLevel = sessionStorage.getItem("level");
const levelScore = sessionStorage.getItem("level-score");
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
let pdc = document.getElementById("prediction-countdown");
let tc = document.getElementById("trails-countdown");
let lastNumber = 0;
let score = parseInt(localStorage.getItem("score")) || 0;
let trial = parseInt(levelScore) || 0;
const levels = [1, 2, 3, 4];
let permittedTrials;

if (currentLevel == 4) {
  permittedTrials = parseInt(sessionStorage.getItem("permitted-trials")) || 16;
} else if (currentLevel == 3) {
  permittedTrials = parseInt(sessionStorage.getItem("permitted-trials")) || 20;
}
if (currentLevel == 2) {
  permittedTrials = parseInt(sessionStorage.getItem("permitted-trials")) || 30;
}

if (currentLevel >= 2) {
  document.getElementById("bonus").classList.remove("hidden");
  pdc.innerHTML = 3 - trial;
  tc.innerHTML = permittedTrials;
}

// makes score score is not cleared on page reload
document.addEventListener("DOMContentLoaded", () => {
  const scr = document.getElementById("score");
  scr.innerHTML = score;
});

// create and populate the prediction buttons
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

// save the selected prediction value and add the select state design
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

// access the roll dice button
rollButton.addEventListener("click", () => RollDice());

// function for the roll dice, it activates the dice rolling animation
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

    // Remove previous classes
    for (let i = 1; i <= 6; i++) {
      diceElement.classList.remove("show-" + i);
    }

    // Trigger animation
    diceElement.classList.add("show-" + newNumber);

    // display Error after a delay
    setTimeout(() => {
      showErrorMessage(3);
      updateScores();
    }, 3000);

    //reset predictions
    setTimeout(() => {
      resetPrediction();
    }, 3500);
  }
}

// displays errors depending on the argument passed
function showErrorMessage(error_type) {
  if (error_type === 3) {
    if (lastNumber === prediction) {
      success_sound.play();
    } else if (lastNumber != prediction) {
      die_sound.play();
      error3.classList.remove("hidden");

      setTimeout(() => {
        error3.classList.add("hidden");
      }, 2000);
    }
  } else if (error_type === 2) {
    wahwah_sound.play();
    error2.classList.remove("hidden");
    setTimeout(() => {
      error2.classList.add("hidden");
    }, 2000);
  } else {
    wahwah_sound.play();
    error1.classList.remove("hidden");
    setTimeout(() => {
      error1.classList.add("hidden");
    }, 2000);
  }
}
// handles the confetti animation effect, this comes up after a successful prediction
function showConfetti() {
  const container = document.getElementById("confetti-container");
  container.style.display = "flex";

  setTimeout(() => {
    container.style.display = "none";
  }, 2100);
}
function showYouWon() {
  const container = document.getElementById("won-container");
  container.style.display = "flex";

  setTimeout(() => {
    container.style.display = "none";
  }, 2100);
}

//updates and saves score
function updateScores() {
  let scr = document.getElementById("score");
  if (lastNumber === prediction) {
    if (currentLevel >= 2) {
      trial++;
      sessionStorage.setItem("level-score", trial);
    }
    if (trial == 3 && currentLevel >= 2) {
      score += 5;
      localStorage.setItem("score", score);
      showYouWon();
      setTimeout(() => {
        resetGame();
      }, 2300);
    } else {
      score++;
      localStorage.setItem("score", score);
      showConfetti();
    }
  }
  if (currentLevel >= 2) {
    permittedTrials--;
    sessionStorage.setItem("permitted-trials", permittedTrials);
    pdc.innerHTML = 3 - trial;
    tc.innerHTML = permittedTrials;
  }
  scr.innerHTML = score;
}

// updates the level header content
function updateLevels() {
  if (currentLevel == 4) {
    level.innerText = "Four";
  } else if (currentLevel == 3) {
    level.innerText = "Three";
  } else if (currentLevel == 2) {
    level.innerText = "Two";
  } else {
    level.innerText = "One";
  }
  currentLevel;
}

//sets the timer for levels above one
function SetTimer() {
  let minutes;
  const timerParagraph = document.getElementById("timer");
  const timerSection = document.getElementById("timer-section");
  if (currentLevel == 2) minutes = 15;
  else if (currentLevel == 3) minutes = 10;
  else if (currentLevel == 4) minutes = 5;
  else minutes = 0;

  let seconds = minutes * 60;

  const interval = setInterval(() => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;

    timerParagraph.textContent = `${min.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;

    if (seconds === 0 && currentLevel >= 2) {
      showErrorMessage(2);
      clearInterval(interval);
      setTimeout(() => {
        resetGame();
      }, 2300);
    }
    if (permittedTrials === 0 && currentLevel >= 2) {
      showErrorMessage(1);
      clearInterval(interval);
      setTimeout(() => {
        resetGame();
      }, 2300);
    }

    seconds--;
  }, 1000);
  if (currentLevel >= 2) {
    timerSection.classList.remove("hidden");
  }
}

// deletes prediction
function resetPrediction() {
  const buttons = document.querySelectorAll(".predict-val");
  prediction = 0;
  buttons.forEach((btn) => {
    btn.classList.remove("active-val");
  });
}

// resets game and navigates back to home
function resetGame() {
  resetPrediction();
  sessionStorage.setItem("level", 1);
  sessionStorage.setItem("permitted-trials", 0);
  sessionStorage.setItem("level-score", 0);
  window.location.href = "index.html";
}

SetTimer();
updateLevels();
PredictButtons();
