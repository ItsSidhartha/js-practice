const GRID = makeGrid();

const THINGS_UNDERNETH = makeGridOfZeros();
const ALLREADY_REVEALED = []

function makeGridOfZeros() {
  const rows = 10;
  const cols = 10;
  const grid = [[]];
  for (let row = 0; row <= rows; row++) {
    for (let col = 0; col <= cols; col++) {
      grid[row].push(0);
    }
    grid.push([]);
  }
  return grid;
}

function makeGrid() {
  const rows = 10;
  const cols = 10;
  const grid = [[`\t  `, ' 1', ' 2', ' 3', ' 4', ' 5', ' 6', ' 7', ' 8', ' 9', ' 10']];

  for (let row = 1; row <= rows; row++) {
    grid.push([`\t ${valueOf(row)} `]);
    for (let col = 0; col < cols; col++) {
      grid[row].push('⬜️');
    }
  }
  return grid;
}

function generateNumber() {
  return Math.floor(Math.random() * 10);
}

function generateBomb() {
  const numberOfBombs = 15;
  for (let index = 0; index < numberOfBombs; index++) {
    THINGS_UNDERNETH[generateNumber()][generateNumber()] = '💣';
  }
}

function calculateAdjucentNumOfBombs(x, y) {
  let count = 0;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const X = x - 1 + col;
      const Y = y - 1 + row;

      if (X < 0 || Y < 0) {
        continue;
      }

      if (THINGS_UNDERNETH[X][Y] === '💣') {
        count++;
      }
    }
  }
  return count;
}

function getNumberEmoji(number) {
  const emojiString = '0️⃣1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣8️⃣9️⃣';
  return emojiString.slice(number * 3, (number * 3) + 3);
}

function putAdjucentBombCountUnderneth() {
  for (let row = 0; row <= THINGS_UNDERNETH[row].length; row++) {
    for (let col = 0; col <= THINGS_UNDERNETH[col].length; col++) {
      if (THINGS_UNDERNETH[row][col] !== '💣') {
        THINGS_UNDERNETH[row][col] = getNumberEmoji(calculateAdjucentNumOfBombs(row, col)) + " ";
      }
    }
  }
}

function valueOf(char) {
  const stringOfAlphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (typeof char === 'number') {
    return stringOfAlphabets[char - 1];
  }
  return stringOfAlphabets.indexOf(char.toUpperCase());
}

function turnUserInputToCordinate(userInput) {
  const x = valueOf(userInput.slice(0, 1));
  const y = parseInt(userInput.slice(1)) - 1;
  return [x, y];
}

function takeUserInput() {
  const validAlpha = 'abcdefghij'
  const userInput = prompt("Enter where you want to sweep");
  const sweepIndexs = turnUserInputToCordinate(userInput);
  if (userInput.length < 2 || userInput.length > 3 || userInput[2] > 0 || !validAlpha.includes(userInput[0].toLowerCase())) {
    console.log('Invalid Input');
    return takeUserInput();
  }
  return sweepIndexs;
}

function sweep(x, y) {
  GRID[x + 1][y + 1] = THINGS_UNDERNETH[x][y];
  ALLREADY_REVEALED.push([x, y]);
  if (THINGS_UNDERNETH[x][y] === getNumberEmoji(0) + ' ') {
    revealAllAdjucentZeros(x, y);
  }
}

function giveSweepFeedBack() {
  if (sweepLocation === '💣') {
    console.log('Boooom 💥\n You Lost');
  }
}

function dispGrid() {
  const joinedGrid = [];
  for (let index = 0; index < GRID.length; index++) {
    joinedGrid.push(GRID[index].join(''))
  }
  console.log(joinedGrid.join('\n'));
}

function revealAllAdjucentZeros(x, y) {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const X = x - 1 + col;
      const Y = y - 1 + row;

      if (X < 0 || Y < 0 || (x === X && y === Y)) {
        continue;
      }

      if (GRID[X + 1][Y + 1] === '⬜️') {
        sweep(X, Y);
      }
    }
  }
}

function revealAllBombs() {
  for (let row = 0; row <= THINGS_UNDERNETH[row].length; row++) {
    for (let col = 0; col <= THINGS_UNDERNETH[col].length; col++) {
      if (THINGS_UNDERNETH[row][col] === '💣') {
        GRID[row + 1][col + 1] = '💣';
      }
    }
  }
}

function main() {
  dispGrid()
  generateBomb();
  putAdjucentBombCountUnderneth();

  while (true) {
    const sweepIndexs = takeUserInput();
    const sweepLocation = THINGS_UNDERNETH[sweepIndexs[0]][sweepIndexs[1]];
    sweep(sweepIndexs[0], sweepIndexs[1]);
    console.clear();
    dispGrid();
    if (sweepLocation === '💣') {
      console.clear();
      console.log('Boooom 💥\n You Lost');
      revealAllBombs();
      dispGrid();
      return;
    }
  }
}

main();
