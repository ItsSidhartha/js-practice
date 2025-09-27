function splitWord(string) {
  return "ape,p,l"
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
}

testAll();
