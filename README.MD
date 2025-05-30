**Predict Dice Challenge - Game Documentation**

**Game Title:** Predict Dice Challenge

**Players:** 1

**Goal:** Predict the dice roll value before each roll and Earn points.

---

### How to Play:

- A 6-sided dice is shown.
- Player predicts a number (1-6).
- Dice is rolled.
- If prediction is correct, player earns points.

---

### Levels:

**Level 1**

- No time limit
- unlimitted wrong guesses

**Level 2**

- 15-minute timer
- 30 wrong guesses allowed

**Level 3**

- 10-second timer
- 20 wrong guesses allowed

**Level 4**

- 5-second timer
- 16 wrong guess allowed

_Bonus:_ for level 2-4, 3 correct guesses gives 5 bonus points.

---

### Game Logic:

**1. Turn System**

- Player selects number.
- Timer starts if required.
- Dice rolls.
- Result is shown.

**2. Dice Roll**

- Dice rolls with `Math.floor(Math.random() * 6) + 1`.
- Show result (number and animation).

**3. Level Progression**

- users can select their level, an increase in level is an increase in difficulties

**4. Scoring**

- +1 point for correct prediction
- +5 bonus for level-up
- 0 points for wrong guess

**5. Game Over**

- Game ends if wrong guesses run out or timer runs out.
- Final score is shown.

---

### Extra Features
- Dice roll animation
- Sound effects for actions
- confetti animation

### Extra Features
- Leaderboard for high scores
- keyboard/mouse control support
