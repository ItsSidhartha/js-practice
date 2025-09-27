function isVowel(letter) {
  const vowels = "aeiou";

  for (let index = 0; index < vowels.length; index++) {
    if (letter === vowels[index]) {
      return true;
    }
  }

  return false;
}

function slice(string, targetIndex) {
  let slicedString = "";

  for (let index = 0; index < string.length; index++) {
    if (index !== targetIndex) {
      slicedString = slicedString + string[index];
    }
  }

  return slicedString;
}
function creatRest(string) {
  let isCurrVowel = isVowel(string[0]);
  let createdWord = slice(string, 0);
  let sliceCount = 1;

  for (let index = 1; index < string.length; index++) {
    if (isCurrVowel !== isVowel(string[index])) {
      createdWord = slice(createdWord, index - sliceCount);
      sliceCount++;
      isCurrVowel = !isCurrVowel;
    }
  }

  return createdWord;
}
function creatWord(string) {
  let isCurrVowel = isVowel(string[0]);
  let createdWord = string[0];

  for (let index = 1; index < string.length; index++) {
    if (isCurrVowel !== isVowel(string[index])) {
      createdWord = createdWord + string[index];
      isCurrVowel = !isCurrVowel;

    }
  }

  return createdWord;
}

function splitWord(string) {
  let copyOfString = string
  let resultString = "";

  while (copyOfString !== "") {
    resultString = resultString + creatWord(copyOfString) + ",";
    copyOfString = creatRest(copyOfString);
  }

  resultString = slice(resultString, resultString.length - 1);

  return resultString;
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

function testSplitWord(string, expected) {
  const actual = splitWord(string);

  console.log(composseMessage(actual, expected));
}

function testAll() {
  testSplitWord("apple", "ape,p,l");
  testSplitWord("there", "tere,h");
  testSplitWord("apple", "ape,p,l");
  testSplitWord("there", "tere,h");
  testSplitWord("hello", "helo,l");
  testSplitWord("abyys", "ab,y,y,s");
  testSplitWord("this", "tis,h");
  testSplitWord("aaabbb", "ab,ab,ab");
  testSplitWord("aaaeee", "a,a,a,e,e,e");
}

testAll();
