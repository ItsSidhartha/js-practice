const PLAYING_FIELD = [
  '⬜',
  '⬜',
  '⬜',
  '⬜',
  '⬜',
  '⬜',
  '⬜',
  '⬜',
  '⬜'
];

const player1 = prompt('Enter player1 name :');
const player2 = prompt('Enter player2 name :');
const players = [player1, player2];
const score = [0, 0];

function dispPlayingFiled() {
  let index = 0;
  const rows = [];
  for (let row = 0; row < 3; row++) {
    const currRow = [];
    for (let col = 0; col < 3; col++) {
      currRow.push(PLAYING_FIELD[index]);
      index++;
    }
    rows.push(currRow.join(''));
  }
  console.log(rows.join('\n'));
}

function validateInput(input) {
  const isValidNumber = input <= 9 || input > 0;
  const isNotUsed = PLAYING_FIELD[input - 1] === '⬜';
  return isValidNumber && isNotUsed;
}

function takeUserInput() {
  const userInput = prompt('Enter ');
  if (validateInput(userInput)) {
    return parseInt(userInput);
  }
  console.log('Invalid Input');
  return takeUserInput();

}

function updatePlayingField(index, player) {
  const symbol = player === 0 ? '❌' : '⭕';
  PLAYING_FIELD[index - 1] = symbol;
  console.clear();
  dispPlayingFiled();
}

function areEqual(a, b, c) {
  if (a === '⬜') {
    return false;
  }
  return a === b ? a === c : a === b;
}

function checkRows() {
  let col = 0;
  for (let row = 0; row < 3; row++) {
    if (areEqual(PLAYING_FIELD[col], PLAYING_FIELD[col + 1], PLAYING_FIELD[col + 2])) {
      return true;
    }
    col = col + 3;
  }
  return false;
}

function checkCols() {
  let row = 0;
  for (let col = 0; col < 9; col += 3) {
    if (areEqual(PLAYING_FIELD[row], PLAYING_FIELD[row + 3], PLAYING_FIELD[row + 6])) {
      return true;
    }
    row = row + 1;
  }
  return false;
}

function checkDiagons() {
  const isDiagonal1Equal = areEqual(PLAYING_FIELD[0], PLAYING_FIELD[4], PLAYING_FIELD[8]);
  const isDiagonal2Equal = areEqual(PLAYING_FIELD[2], PLAYING_FIELD[4], PLAYING_FIELD[6]);
  return isDiagonal1Equal || isDiagonal2Equal;
}

function isGameOver() {
  return checkRows() || checkCols() || checkDiagons();
}

function dispWinningMsg(currPlayer) {
  const msg = `Game Over
    ${players[currPlayer]} won the Game`;

  console.log(msg);
}

function dispScore() {
  console.log(`${player1} ${score.join('-')} ${player2}`);
}

function resetPlayingField() {
  for (let index = 0; index < PLAYING_FIELD.length; index++) {
    PLAYING_FIELD[index] = '⬜';
  }
}

function playAgain() {
  const isPlayingAgain = confirm('Want to play again?');
  if (isPlayingAgain) {
    resetPlayingField();
    main();
  }
}

function updateScore(isDraw, currPlayer) {
  if (isDraw) {
    score[0] = score[0] + 0.5;
    score[1] = score[1] + 0.5;
  } else {
    score[currPlayer]++;
  }
}

function main() {
  dispPlayingFiled();

  for (let index = 0; index < 9; index++) {
    const currPlayer = index % 2;
    const playerInput = takeUserInput(1);
    updatePlayingField(playerInput, currPlayer);
    if (isGameOver()) {
      const isDraw = false;
      updateScore(isDraw, currPlayer);
      dispWinningMsg(currPlayer);
      dispScore();
      playAgain();
      return;
    }
  }
  console.log('Draw🤝');
  const isDraw = true;
  updateScore(isDraw);
  dispScore();
}

main();
