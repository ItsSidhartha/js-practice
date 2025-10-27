function encodeNumber(number) {
  const start = 'i';
  const end = 'e';
  return start + number + end;
}

function encodeString(string) {
  const separator = ':';
  return string.length + separator + string;
}

function encodeList(list) {
  let encodedString = '';
  for (let index = 0; index < list.length; index++) {
    encodedString = encodedString + encode(list[index]);
  }

  const start = 'l';
  const end = 'e';
  return start + encodedString + end;
}

function encode(data) {
  const typeOfData = typeof data;
  switch (typeOfData) {
    case 'number': return encodeNumber(data);
    case 'string': return encodeString(data);
    case 'object': return encodeList(data);
  }
}

function decodeInteger(bencodedString) {
  const startIndex = bencodedString.indexOf('i') + 1;
  const endIndex = bencodedString.indexOf('e');
  return parseInt(bencodedString.slice(startIndex, endIndex));
}

function decodeString(bencodedString) {
  const startIndex = bencodedString.indexOf(':') + 1;
  const endIndex = startIndex + parseInt(bencodedString.slice(0, startIndex - 1));
  return bencodedString.slice(startIndex, endIndex);
}

function endOfString(string) {
  const startIndex = string.indexOf(':') + 1;
  const length = parseInt(string.slice(0, startIndex - 1));
  const endIndex = startIndex + length - 1;
  return endIndex;
}

function endOfList(string) {
  const endOfAnElement = calculateEndOfElement(string.slice(1)) + 1;
  if (string[endOfAnElement + 1] === 'e') {
    return endOfAnElement + 1;
  }

  return endOfAnElement + endOfList(string.slice(endOfAnElement));
}

function calculateEndOfElement(string) {
  switch (string[0]) {
    case 'i': return string.indexOf('e');
    case 'l': return endOfList(string);
  }

  return endOfString(string);
}


function decodeList(bencodedString) {
  const startOfList = bencodedString.indexOf('l') + 1;
  const endOfList = bencodedString.lastIndexOf('e');
  const decodedList = [];
  let endOfElement = startOfList;
  let remainingString = bencodedString.slice(startOfList, endOfList);

  while (remainingString !== '') {
  endOfElement = calculateEndOfElement(remainingString);
  decodedList.push(decode(remainingString.slice(0,endOfElement + 1)));
  remainingString = remainingString.slice(endOfElement + 1, endOfList);
  }

  return decodedList;
}

function decode(bencodedString) {
  if (bencodedString.startsWith('i')) {
    return decodeInteger(bencodedString);
  }
  if (bencodedString.startsWith('l')) {
    return decodeList(bencodedString);
  }

  return decodeString(bencodedString);
}

function isArray(target) {
  return typeof target === 'object';
}

function areArraysEqual(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }

  for (let index = 0; index < array1.length; index++) {
    if (!areDeepEqual(array1[index], array2[index])) {
      return false;
    }
  }

  return true;
}

function areDeepEqual(value1, value2) {
  if (typeof value1 !== typeof value2) {
    return false;
  }

  if (isArray(value1) && isArray(value2)) {
    return areArraysEqual(value1, value2);
  }

  return value1 === value2;
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

  if (areDeepEqual(actual, expected)) {
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

function testAllListDecodes() {
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
  console.log("\nIntegers\n");
  testEncode(1, 'i1e', 'one digit integer');
  testEncode(12, 'i12e', 'two digit integer');
  testEncode(123, 'i123e', 'three digit integer');
  console.log("-".repeat(100));

  console.log("\nStrings\n");
  testEncode("", "0:", 'Empty String');
  testEncode("abc", "3:abc", 'String of alphabets');
  testEncode("@#$", "3:@#$", 'String of symbols');
  testEncode("abc@#$", "6:abc@#$", 'String of symbols and alphabets');
  testEncode("123", "3:123", 'String of numbers');
  testEncode("abc@#$123", "9:abc@#$123", 'String of symbols, alphabets and numbers');
  console.log("-".repeat(100));

  console.log("\nLists\n");
  testEncode([], 'le', 'Empty list');
  testEncode([1], 'li1ee', 'list of one number');
  testEncode(['a'], 'l1:ae', 'list of one string');
  testEncode([1, 2, 4], 'li1ei2ei4ee', 'list of multiple numbers');
  testEncode(['a', 'b', 'c'], 'l1:a1:b1:ce', 'list of multiple strings');
  testEncode(["apple", 123, ["banana", -5]], 'l5:applei123el6:bananai-5eee', 'nested list');
  testEncode(["apple", 123, ["banana", -5], 123, "abc"], 'l5:applei123el6:bananai-5eei123e3:abce', 'nested list in the middle');
  console.log("-".repeat(100));
}

function testDecode(bencodedString, expected, testType) {
  const actual = decode(bencodedString);
  const inputs = `"${bencodedString}"`;
  console.log(composeMessage(inputs, actual, expected, testType));
}

function testAllDecodes() {
  console.log("\nIntegers\n");
  testDecode('i1e', 1, 'one digit integer');
  testDecode('i12e', 12, 'two digit integer');
  testDecode('i123e', 123, 'three digit integer');
  console.log("-".repeat(100));

  console.log("\nStrings\n");
  testDecode("", "", 'Empty String');
  testDecode("0:", "", 'Empty String');
  testDecode("3:abc", "abc", 'String of alphabets');
  testDecode("3:@#$", "@#$", 'String of symbols');
  testDecode("6:abc@#$", "abc@#$", 'String of symbols and alphabets');
  testDecode("3:123", "123", 'String of numbers');
  testDecode("9:abc@#$123", "abc@#$123", 'String of symbols, alphabets and numbers');
  console.log("-".repeat(100));

  console.log("\nLists\n");
  testDecode('le', [], 'Empty list');
  testDecode('li1ee', [1], 'list of one number');
  testDecode('l1:ae', ['a'], 'list of one string');
  testDecode('li1ei2ei4ee', [1, 2, 4], 'list of multiple numbers');
  testDecode('l1:a1:b1:ce', ['a', 'b', 'c'], 'list of multiple strings');
  testDecode('l5:applei123el6:bananai-5eee', ["apple", 123, ["banana", -5]], 'nested list');
  testDecode('l5:applei123el6:bananai-5eei123e3:abce', ["apple", 123, ["banana", -5], 123, "abc"], 'nested list in the middle');
  console.log("-".repeat(100));
}


function main() {
  console.log("\nEncodes");
  testAllEncodes();
  console.log("\nDecodes");
  testAllDecodes();
}

main();
