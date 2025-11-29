const dbg = (x) => {
  console.log(x);
  return x;
};

const createScreen = (row, col) => {
  const screen = [];
  for (let index = 0; index < row; index++) {
    screen.push(" ".repeat(col).split(""));
  }
  return screen;
};

const row = 20;
const col = 30;
const screen = createScreen(row, col);

const drawScreen = (screen) => {
  for (const index in screen) {
    console.log(screen[index].join(""));
  }
};

const normalize = (x, side) => ((side + x) % side);

const alignHorizontaly = (x, y) => [(x + 1) % col, y];
const alignVerticaly = (x, y) => [x, (y + 1) % row];

const alignments = {
  h: alignHorizontaly,
  v: alignVerticaly,
};

const coordinatesToDraw = (x, y, direction) => {
  if (direction === "h") {
    return [x, y + 1];
  }

  if (direction === "v") {
    return [x + 1, y];
  }

  return [x, y];
};

const snakeBody = [];

const drawSnakeOnScreen = (screen, x = 0, y = 0, str = "********") => {
  for (const char of str) {
    drawOnScreen(screen, x, y, char);
    snakeBody.push({ x, y ,heading:'E'});
    x = (x + 1) % col;
  }
};

const drawOnScreen = (screen, x, y, char) => {
  screen[y][x] = char;
};

const clearScreen = (screen) => {
  for (const row in screen) {
    for (const col in screen[row]) {
      screen[row][col] = " ";
    }
  }
};

const moves = {
  R: { dx: 1, dy: 0 },
  L: { dx: -1, dy: 0 },
  U: { dx: 0, dy: -1 },
  D: { dx: 0, dy: 1 },
};

const directionChanges = {
  R:'E',
  L:'W',
  U:'N',
  D:'S',
}

const move = (direction) => {
  const head = snakeBody[snakeBody.length - 1];
  const tail = snakeBody[0];
  screen[tail.y][tail.x] = " ";
  snakeBody.shift();
  const headX = (head.x + moves[direction].dx) % col;
  const headY = (head.y + moves[direction].dy) % row;
  screen[headY][headX] = "*";
  const newHead = {
    x: headX,
    y: headY,
    heading: directionChanges[direction],
  };
  snakeBody.push(newHead);
  return newHead.heading;
};

let index = 0;

const navigateSnake = (screen, instructions) => {
  drawSnakeOnScreen(screen);
  setInterval(() => {
    console.clear();
    drawScreen(screen);
    const heading = move(instructions[index]);
    index = (index + 1) % instructions.length;
  }, 500);
}

navigateSnake(screen,'D')
