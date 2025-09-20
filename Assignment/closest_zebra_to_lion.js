const testCase1 = "LZ";
const testCase2 = "Z L";
const testCase3 = "L     Z";
const testCase4 = "L     L";
const testCase5 = "Z  Z  Z";
const testCase6 = "L  ZL Z";
const testCase7 = "Z   LL Z";
const testCase8 = "ZZ L  Z";
const testCase9 = "Z  LZZ LLZZ  LL   ZZ    L";
const testCase10 = "ZZZZZZ   LLLLLL"

const testCaseToUse = testCase10;
let minimumDistanceBetweenTwoAnimals = -1;
let indexOfCurrentTargetAnimal ;
let indexOfTestCase = 0;
let currentTargetAnimal = testCaseToUse[indexOfTestCase];
indexOfCurrentTargetAnimal = indexOfTestCase;
indexOfTestCase = indexOfTestCase + 1;
let distanceBetweenTwoAnimals;

for ( ; indexOfTestCase < testCaseToUse.length; indexOfTestCase++) {
    if (testCaseToUse[indexOfTestCase] === currentTargetAnimal) {
        indexOfCurrentTargetAnimal = indexOfTestCase;
    } else if (testCaseToUse[indexOfTestCase] !== currentTargetAnimal && testCaseToUse[indexOfTestCase] !== " ") {
        distanceBetweenTwoAnimals = indexOfTestCase - indexOfCurrentTargetAnimal - 1;
        if (minimumDistanceBetweenTwoAnimals > distanceBetweenTwoAnimals || minimumDistanceBetweenTwoAnimals < 0) {
            minimumDistanceBetweenTwoAnimals = distanceBetweenTwoAnimals;
        }
        currentTargetAnimal = testCaseToUse[indexOfTestCase];
        indexOfCurrentTargetAnimal = indexOfTestCase;
    }
}

console.log("Input: ", testCaseToUse, "Output: ", minimumDistanceBetweenTwoAnimals );
