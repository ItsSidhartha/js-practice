const inputNumber = 32100;
let workingInput = inputNumber;
let numberOfDigits = 0;

while (workingInput > 1) {
    numberOfDigits = numberOfDigits + 1;
    workingInput = workingInput / 10;
}

console.log(numberOfDigits);
