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

function decodeInteger(bencodedString) {
  const start = bencodedString.indexOf('i') + 1;
  const end = bencodedString.indexOf('e');
  return parseInt(bencodedString.slice(start, end));
}

function decodeString(bencodedString) {
  const start = bencodedString.indexOf(':') + 1;
  const end = start + parseInt(bencodedString.slice(0, start - 1));
  return bencodedString.slice(start, end);
}

function calculateEndOfElement(string) {
  switch(string[0]) {
    case 'i' : return string.indexOf('e');
    case 'l' : return string.lastIndexOf('e');
  }
  
  const start = string.indexOf(':') + 1;
  const end = start + parseInt(string.slice(0, start - 1));
  return end;
}

function decodeList(bencodedString) {
  const startOfList = bencodedString.indexOf('l') + 1;
  const endOfList = bencodedString.lastIndexOf('e');
  const decodedList = [];
  let endOfElement = startOfList;
  let remainingString = bencodedString.slice(startOfList, endOfList);

  while (remainingString !== '') {
    endOfElement = calculateEndOfElement(remainingString);
    decodedList.push(decode(remainingString));
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

function areDeepEqual(array1, array2) {
  if (typeof array1 !== typeof array2) {
    return false;
  }

  if (isArray(array1) && isArray(array2)) {
    return areArraysEqual(array1, array2);
  }

  return array1 === array2;
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

  if (areArraysEqual(actual, expected)) {
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

function allTestsOfEncoding() {
  // console.log("\nIntegers\n");
  // testAllIntegerEncodes();
  // console.log("-".repeat(100));

  // console.log("\nStrings\n");
  // testAllStringEncodes();
  // console.log("-".repeat(100));

  // console.log("\nLists\n");
  // testAllListDecodes();
  // console.log("-".repeat(100));

  testAllEncodes();
}

function testDecode(bencodedString, expected, testType) {
  const actual = decode(bencodedString);
  const inputs = `"${bencodedString}"`;
  console.log(composeMessage(inputs, actual, expected, testType));
}

function testAllDecodes() {
  testDecode('i1e', 1, 'one digit integer');
  testDecode('i12e', 12, 'two digit integer');
  testDecode('i123e', 123, 'three digit integer');

  testDecode("", "", 'Empty String');
  testDecode("0:", "", 'Empty String');
  testDecode("3:abc", "abc", 'String of alphabets');
  testDecode("3:@#$", "@#$", 'String of symbols');
  testDecode("6:abc@#$", "abc@#$", 'String of symbols and alphabets');
  testDecode("3:123", "123", 'String of numbers');
  testDecode("9:abc@#$123", "abc@#$123", 'String of symbols, alphabets and numbers');

  testDecode('le', [], 'Empty list');
  testDecode('li1ee', [1], 'list of one number');
  testDecode('l1:ae', ['a'], 'list of one string');
  testDecode('li1ei2ei4ee', [1, 2, 4], 'list of multiple numbers');
  testDecode('l1:a1:b1:ce', ['a', 'b', 'c'], 'list of multiple strings');
  testDecode('l5:applei123el6:bananai-5eee', ["apple", 123, ["banana", -5]], 'nested list');
}

function allTestsOfDecoding() {
  testAllDecodes();
}

function main() {
  allTestsOfEncoding();
  allTestsOfDecoding();
}

main();
