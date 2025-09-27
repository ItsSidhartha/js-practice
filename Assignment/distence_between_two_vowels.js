function isVowel(letter) {
  switch (letter) {
    case "a" : return true;
    case "e" : return true;
    case "i" : return true;
    case "o" : return true;
    case "u" : return true;
    default : return false;
  }
}

function min(a, b) {
  return a < b ? a : b;
}

/*function vowelsAt(string) {
  const vowels = "aeiou";
  let indicesOfVowels = "";

  for (let stringIndex = 0; stringIndex < string.length; stringIndex++) {
    let vowelIndex = 0;
    let isVowel = false;

    while (vowelIndex < vowels.length && !isVowel) {
      if (string[stringIndex] === vowels[vowelIndex]) {
        isVowel = true;
        indicesOfVowels = indicesOfVowels + stringIndex;
      }

      vowelIndex++;
    }
  }
  return indicesOfVowels;
}

function calculateMinDistence(string) {
  const indicesOfVowels = vowelsAt(string);

  if (indicesOfVowels.length <= 1) {
    return -1;
  }

  let minDistance = Infinity;

  for (let index = indicesOfVowels.length - 1; index > 0; index--) {
    const distance = indicesOfVowels[index] - indicesOfVowels[index - 1];

    if (distance < minDistance) {
      minDistance = distance;
    }

  }
  return minDistance;
}
*/

function distanceBetweenTwoVowels(string) {
  let currVowelIndex = -1;
  let nextVowelIndex = -1;
  let minDistance = Infinity;

  for (let stringIndex = 0; stringIndex < string.length; stringIndex++) {
    if (isVowel(string[stringIndex])) {
      currVowelIndex = nextVowelIndex; 
      nextVowelIndex = stringIndex;
      minDistance = currVowelIndex === -1 ? minDistance : min(minDistance, nextVowelIndex - currVowelIndex);
    }
  }

  if (minDistance === Infinity) {
    return -1;
  }

  return minDistance;
}


function validateOutput(actual, expected) {
  return actual === expected;
}

function composseMessage(actual, expected) {
  const emoji = validateOutput(actual, expected) ? "✅" : "❌";
  const expectedSegment = " expected - " + expected;
  const actualSegment = " | actual - " + actual;
  const message = emoji + expectedSegment + actualSegment;

  return message;
}

function testCalculateDistence(string, expected) {
  const actual = distanceBetweenTwoVowels(string);

  console.log(composseMessage(actual, expected));
}

function testAll() {
  testCalculateDistence("apple", 4);
  testCalculateDistence("hello", 3);
  testCalculateDistence("strength", -1);
  testCalculateDistence("beautiful", 1);
  testCalculateDistence("abyss", -1);
  testCalculateDistence("abbbba", 5);
  testCalculateDistence("abbabba", 3);
  testCalculateDistence("abcdefghijklmnopqrstuvwxyzaa", 1);
  testCalculateDistence("aba", 2);
  testCalculateDistence("abbaa", 1);
  testCalculateDistence("", -1);
}

testAll();
