const scores = [0, 0];

function takeUserInput(possibleDirections, isUserShooting) {
  console.log(possibleDirections.join(", "));
  const promptMsg = isUserShooting ? "enter side you want to shot :" : "enter side you want to save :";
  return prompt(promptMsg);
}

function generateCompTurn(possibleDirections) {
  const RandomNum = Math.round(Math.random() * 4);
  switch (RandomNum) {
    case 0: return possibleDirections[1];
    case 1: return possibleDirections[2]; 
    case 2: return possibleDirections[3];
    case 3: return possibleDirections[4];
    case 4: return possibleDirections[0];
  }
}

function saveMsg() {
  return `
  SAVED`;
}

function goalMsg(isUserShooting, userInput, compInput) {
  const msg = `
  GOOOOAL
  The ball went ${isUserShooting ? userInput : compInput}
  `
  return msg;
}

function invalidChoiceMsg(possibleDirections) {
  const msg = `
  Invalid choise
  Try again...
  choose from ${possibleDirections.join(", ")}
  `
  return msg;
}

function outputMsg(possibleDirections, isGoal, userInput, compInput, isUserShooting) {
  if (!possibleDirections.includes(userInput)) {
    console.log(invalidChoiceMsg(possibleDirections));
    return playPenalti();
  }

  if (isGoal) {
    console.log(goalMsg(isUserShooting, userInput, compInput));
  } else {
    console.log(saveMsg());
  }
}

function updateScore(isUserShooting) {
  const index = isUserShooting ? 0 : 1;
  scores[index]++;
}

function showScore() {
  const msg = `
  Noob User ${scores.join("-")} Pro Computer
  `
  console.log(msg);
}

function showMessage(possibleDirections, isGoal, userInput, compInput, isUserShooting) {
  outputMsg(possibleDirections, isGoal, userInput, compInput, isUserShooting);
  showScore();
}

function playPenalti(isUserShooting) {
  const possibleDirections = ["up", "down", "left", "right", "straight"];
  const compInput = generateCompTurn(possibleDirections);
  const userInput = takeUserInput(possibleDirections, isUserShooting);
  const isGoal = userInput !== compInput;
  if (isGoal) {
    updateScore(isUserShooting);
  }
  console.clear();
  return showMessage(possibleDirections, isGoal, userInput, compInput, isUserShooting);
}

function resultMsg(user) {
  const winner = scores[0] > scores[1] ? user : 'computer';
  const msg = `${winner} won the match`;
  console.log(msg);
}

function main() {
  const user ="Noob " + prompt("Name ?");
  const max = 5;
  let isUserShooting = false;
  for (let index = 0; index < max * 2; index++) {
    playPenalti(isUserShooting);
    isUserShooting = !isUserShooting;
  }

  resultMsg(user);
}


main();
