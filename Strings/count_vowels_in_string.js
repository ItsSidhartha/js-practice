const inputString = "Sidhartha";
const vowelString = "aeiouAeiou";
let countOfVowels = 0;
let isVowel;
for (let inedxOfTheString = 0; inedxOfTheString < inputString.length; inedxOfTheString++) { 
    isVowel = false
    for(let indexOfVowelString = 0; indexOfVowelString < vowelString.length && !isVowel; indexOfVowelString++) {
        isVowel = inputString[inedxOfTheString] === vowelString[indexOfVowelString];
        if (isVowel) {
            countOfVowels = countOfVowels + 1;
        }
    }
}



console.log(countOfVowels);
