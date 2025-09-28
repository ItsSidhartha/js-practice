function slice(string, targetIndex) {
  let slicedString = "";

  for (let index = 0; index < string.length; index++) {
    if (index !== targetIndex) {
      slicedString = slicedString + string[index];
    }
  }

  return slicedString;
}

function isAnagram(string1, string2) {
  if (string1.length !== string2.length) {
    return false;
  } 

  for (let indexOfString1 = 0; indexOfString1 < string1.length; indexOfString1++) {
    let indexOfString2 = 0;
    let isFound = false;

    while (indexOfString2 < string2.length && !isFound) {
      if (string1[indexOfString1] === string2[indexOfString2]) {
        isFound = true;
        string2 = slice(string2, indexOfString2);  
      }

      indexOfString2++;
    }

    if (!isFound) {
      return false;
    }
  }

  return true;
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

function testAnagram(string1, string2, expected) {
  const actual = isAnagram(string1, string2);

  console.log(composseMessage(actual, expected));
}

function testAll() {
  testAnagram("apple", "plepa", true);  
  testAnagram("abcd", "edcba", false);   
  testAnagram("listen", "silent", true);
  testAnagram("triangle", "integral", true);
  testAnagram("apple", "pale", false);
  testAnagram("rat", "car", false);
  testAnagram("evil", "vile", true);
  testAnagram("dormitory", "dirtyroom", true);
  testAnagram("schoolmaster", "theclassroom", true);
  testAnagram("conversation", "voicesranton", true);
  testAnagram("astronomer", "moonstarer", true);
  testAnagram("hello", "bello", false);
  testAnagram("night", "thing", true);
  testAnagram("abc", "cab", true);
  testAnagram("abc", "abcd", false);
  testAnagram("tommarvoloriddle", "iamlordvoldemort", true);
  testAnagram("elevenplustwo", "twelveplusone", true);
  testAnagram("agentleman", "elegantman", true);
  testAnagram("clinteastwood", "oldwestaction", true);
  testAnagram("slotmachines", "cashlostinme", true);
  testAnagram("debitcard", "badcredit", true);
  testAnagram("funeral", "xrealfun", false);
}

testAll();
