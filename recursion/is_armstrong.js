function countDigit(inputNumber) {
  const stringOfInput = inputNumber + "";
  return stringOfInput.length;
}

function extractLastDigit(number) {
  return number % 10;
}

function sumOfDigitsToPowerOfCount(number, countDigit,) {
  if (number === 0) {
    return 0;
  }

  const lastDigit = extractLastDigit(number);
  return (lastDigit ** countDigit) + sumOfDigitsToPowerOfCount(((number - lastDigit) / 10), countDigit);
}

function isArmstrong(number) {
  const countOfDigits = countDigit(number);
  const sum = sumOfDigitsToPowerOfCount(number, countOfDigits);
  return sum === number;
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

function testIsArmstrong(inputs, expected, testType) {
  const actual = isArmstrong(inputs);
  console.log(composeMessage(inputs, actual, expected, testType));
}

function testAll() {
  testIsArmstrong(0, true, "when input is 0");
  testIsArmstrong(7, true, "inputs less than 10");
  testIsArmstrong(12, false, "two digit non armstrong input");
  testIsArmstrong(153, true, "three digit armstrong input");
}

testAll();
