const inputNumber = 9926315;
const stringOfInput = inputNumber + "";
const countOfDigits = stringOfInput.length
let sumOfDigitsToPowerOfCount = 0;

for (let indexOfDigit = 0; indexOfDigit < countOfDigits; indexOfDigit++) {
  sumOfDigitsToPowerOfCount = sumOfDigitsToPowerOfCount + stringOfInput[indexOfDigit] ** countOfDigits;
}

const isArmstrongNumber = sumOfDigitsToPowerOfCount === inputNumber
const resultSuffix = isArmstrongNumber ? "is an armstrong number" : "is not an armstrong number"
console.log(inputNumber, resultSuffix);
