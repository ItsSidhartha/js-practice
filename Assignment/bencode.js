function encodeNumber(number) {
  return 'i' + number + 'e';
}

function encodeString(string) {
  return string.length + ":" + string;
}

function encodeList(list) {
  let encodedString = '';
  for (let index = 0; index < list.length; index++) {
    encodedString = encodedString + encode(list[index]);
  }
  return 'l' + encodedString + 'e';
}

function encode(data) {
  const typeOfData = typeof data;
  switch (typeOfData) {
    case 'number': return encodeNumber(data);
    case 'string': return encodeString(data);
    case 'object': return encodeList(data);
  }
}

function decode() {

}

function composeMessageForSuccess(testType) {
  return `✅ ${testType}`;
}

function composeMessageForFail(inputs, testType, actual, expected) {
  const message = `\n❌ ${testType}
      | inputs - [${inputs}]
      | expected output - [${expected}]
      | actual output - [${actual}]\n`;
  return message;
}

function composeMessage(inputs, actual, expected, testType) {
  let message = "";

  if (actual === expected) {
    message = composeMessageForSuccess(testType);
  } else {
    message = composeMessageForFail(inputs, testType, actual, expected);
  }

  return message;
}

function testIntegerEncode(number, expected, testType) {
  const actual = encodeNumber(number);
  const inputs = `"${number}"`;
  console.log(composeMessage(inputs, actual, expected, testType));
}

function testAllIntegerEncodes() {
  testIntegerEncode(1, 'i1e', 'one digit integer');
  testIntegerEncode(12, 'i12e', 'two digit integer');
  testIntegerEncode(123, 'i123e', 'three digit integer');
  testIntegerEncode(-1, 'i-1e', 'one digit negative integer');
  testIntegerEncode(0, 'i0e', 'Zero');
}

function testStringEncode(string, expected, testType) {
  const actual = encodeString(string);
  const inputs = `"${string}"`;
  console.log(composeMessage(inputs, actual, expected, testType));
}

function testAllStringEncodes() {
  testStringEncode("", "0:", 'Empty String');
  testStringEncode("abc", "3:abc", 'String of alphabets');
  testStringEncode("@#$", "3:@#$", 'String of symbols');
  testStringEncode("abc@#$", "6:abc@#$", 'String of symbols and alphabets');
  testStringEncode("123", "3:123", 'String of numbers');
  testStringEncode("abc@#$123", "9:abc@#$123", 'String of symbols, alphabets and numbers');
}

function TestListEncode(list, expected, testType) {
  const actual = encodeList(list);
  const inputs = `"${list}"`;
  console.log(composeMessage(inputs, actual, expected, testType));
}

function testAllLists() {
  TestListEncode([], 'le', 'Empty list');
  TestListEncode([1], 'li1ee', 'list of one number');
  TestListEncode(['a'], 'l1:ae', 'list of one string');
  TestListEncode([1, 2, 4], 'li1ei2ei4ee', 'list of multiple numbers');
  TestListEncode(['a', 'b', 'c'], 'l1:a1:b1:ce', 'list of multiple strings');
  TestListEncode(["apple", 123, ["banana", -5]], 'l5:applei123el6:bananai-5eee', 'nested list');
}

function testEncode(data, expected, testType) {
  const actual = encode(data);
  const inputs = `"${data}"`;
  console.log(composeMessage(inputs, actual, expected, testType));
}

function testAllEncodes() {
  testEncode(1, 'i1e', 'one digit integer');
  testEncode(12, 'i12e', 'two digit integer');
  testEncode(123, 'i123e', 'three digit integer');
  
  testEncode("", "0:", 'Empty String');
  testEncode("abc", "3:abc", 'String of alphabets');
  testEncode("@#$", "3:@#$", 'String of symbols');
  testEncode("abc@#$", "6:abc@#$", 'String of symbols and alphabets');
  testEncode("123", "3:123", 'String of numbers');
  testEncode("abc@#$123", "9:abc@#$123", 'String of symbols, alphabets and numbers');
  
  testEncode([], 'le', 'Empty list');
  testEncode([1], 'li1ee', 'list of one number');
  testEncode(['a'], 'l1:ae', 'list of one string');
  testEncode([1, 2, 4], 'li1ei2ei4ee', 'list of multiple numbers');
  testEncode(['a', 'b', 'c'], 'l1:a1:b1:ce', 'list of multiple strings');
  testEncode(["apple", 123, ["banana", -5]], 'l5:applei123el6:bananai-5eee', 'nested list');
}

function main() {
  // console.log("\nIntegers\n");
  // testAllIntegerEncodes();
  // console.log("-".repeat(100));

  // console.log("\nStrings\n");
  // testAllStringEncodes();
  // console.log("-".repeat(100));

  // console.log("\nLists\n");
  // testAllLists();
  // console.log("-".repeat(100));

  testAllEncodes();
}

main();
