const testCase1 = "LZ";
const testCase2 = "Z  L";
const testCase3 = "L     Z";
const testCase4 = "L     L";
const testCase5 = "Z  Z  Z";
const testCase6 = "L  ZL Z";
const testCase7 = "Z   LL Z";

function savana(field) {
  let minDistance = Infinity;

  for (let currIndex = 0; currIndex < field.length; currIndex++) {
    if (field[currIndex] !== ' ') {
      const currAnimal = field[currIndex];
      const targetAnimal = currAnimal === 'Z' ? 'L' : 'Z';
      const indexOfClosestTarget = field.indexOf(targetAnimal, currIndex);
      const targetIndex = indexOfClosestTarget === -1 ? Infinity : indexOfClosestTarget;
      const distance = targetIndex - currIndex;
      minDistance = Math.min(distance, minDistance);
    }
  }

  return minDistance === Infinity ? -1 : minDistance;
}


function validateOutput(actual, expected) {
  return actual === expected;
}

function composeMessageForSuccess(testType) {
  return `✅ ${testType}`;
}

function composeMessageForFail(inputs, testType, actual, expected) {
  const message = `\n❌ ${testType}
      | inputs - [${inputs}]
      | expected output - [${expected}]
      | actual output - [${actual}]\n`;
  return message;
}


function composeMessage(inputs, actual, expected, testType) {
  let message = "";

  if (validateOutput(actual, expected)) {
    message = composeMessageForSuccess(testType);
  } else {
    message = composeMessageForFail(inputs, testType, actual, expected);
  }

  return message;
}

function testSavana(inputs, expected, testType) {
  const actual = savana(inputs);
  console.log(composeMessage(inputs, actual, expected, testType));
}

function testAll() {
  testSavana(testCase1, 1, "one of each animal");
  testSavana(testCase2, 3, "seperated L and Z");
  testSavana(testCase3, 6, "seperated Z and L");
  testSavana(testCase4, -1, "only L");
  testSavana(testCase5, -1, "only Z");
  testSavana(testCase6, 1, "pair in the middle");
  testSavana(testCase7, 2, "pair at the end");
}

testAll();
