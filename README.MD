**Predict Dice Challenge - Game Documentation**

**Game Title:** Predict Dice Challenge

**Players:** 1

**Goal:** Predict the dice roll value before each roll. Earn points to move to higher levels.

---

### How to Play:

* A 6-sided dice is shown.
* Player predicts a number (1-6).
* Dice is rolled.
* If prediction is correct, player earns points.

---

### Levels:

**Level 1**

* No time limit
* 3 wrong guesses allowed

**Level 2**

* 10-second timer
* 2 wrong guesses allowed

**Level 3**

* 7-second timer
* 2 wrong guesses allowed

**Level 4**

* 5-second timer
* 1 wrong guess allowed

*Bonus:* Multiple correct guesses in a row give extra points.

---

### Game Logic:

**1. Turn System**

* Player selects number.
* Timer starts if required.
* Dice rolls.
* Result is shown.

**2. Dice Roll**

* Dice rolls with `Math.floor(Math.random() * 6) + 1`.
* Show result (number or animation).

**3. Level Progression**

* 2 correct guesses = move to next level.
* Reset wrong guess counter each level.

**4. Scoring**

* +1 point for correct prediction (multiplied by level)
* +2 bonus for level-up
* 0 points for wrong guess

**5. Game Over**

* Game ends if wrong guesses run out or all levels are completed.
* Final score is shown.

---

### Optional Features (if time allows)

* Leaderboard for high scores
* Dice roll animation
* Sound effects for actions
