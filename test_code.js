function somthing() {
  return 0;
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

function testSomthing(inputs, expected, testType) {
  const actual = somthing(inputs);
  console.log(composeMessage(inputs, actual, expected, testType));
}

function testAll() {
  testSomthing(0, 0, "when input is 0");
  testSomthing(1, -1, "input is more than 0");
  testSomthing(-1, 0, "input is negative");
}

testAll();
