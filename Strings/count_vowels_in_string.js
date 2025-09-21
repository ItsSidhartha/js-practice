const inputString = "SIDHARTHA";
const vowelString = "aeiouAEIOU";
let countOfVowels = 0;
let isVowel = false;
for (let inedxOfTheString = 0; inedxOfTheString < inputString.length; inedxOfTheString++) { 
    isVowel = false
    for(let indexOfVowelString = 0; indexOfVowelString < vowelString.length && !isVowel; indexOfVowelString++) {
        isVowel = inputString[inedxOfTheString] === vowelString[indexOfVowelString];
        countOfVowels = isVowel ? countOfVowels + 1 : countOfVowels;
    }
}

console.log(countOfVowels);
