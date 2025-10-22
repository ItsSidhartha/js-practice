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

function distanceBetweenTwoVowels(string) {
  let currVowelIndex = -1;
  let nextVowelIndex = -1;
  let minDistance = Infinity;

  for (let stringIndex = 0; stringIndex < string.length; stringIndex++) {
    if (isVowel(string[stringIndex])) {
      currVowelIndex = nextVowelIndex; 
      nextVowelIndex = stringIndex;
      minDistance = currVowelIndex === -1 ? minDistance : Math.min(minDistance, nextVowelIndex - currVowelIndex);
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
