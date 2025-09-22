const inputNumber = 75257;
let copyOfInput = inputNumber;
let reverseOfInput = 0 ;

while (copyOfInput > 0) {
  const lastDigit = copyOfInput % 10;
  copyOfInput = (copyOfInput - lastDigit) / 10;
  reverseOfInput = reverseOfInput * 10 + lastDigit;
}

const isPalindrom = inputNumber === reverseOfInput;
const resultSuffix = isPalindrom ? "is a palindrome" : "is not a palindrome";
console.log(inputNumber, resultSuffix);
