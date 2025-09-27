function identity(x) {
  return x;
}

function length(x) {
  return x.length
}

function addFive(x) {
  return x + 5;
}

function printf(x) {
  console.log(x);
}

function sqr(x) {
  return x * x;
}

function sum(x, y) {
  return x + y;
}

function sumOfThree(x, y, z) {
  return x + y + z;
}

function floorValue(x) {
  return x < 0 ? x - 1 - (x % 1) : x - (x % 1);
}

function max(x, y) {
  return x > y ? x : y;
}

function min(x, y) {
  return x < y ? x : y;
}

function largestOfThree(x, y, z) {
  return max(max(x, y), z);
}

function smallestOfThree(x, y, z) {
  return min(min(x, y), z);
}

function secondLargestOfThree(x, y, z) {
  const largest = largestOfThree(x, y, z);
  const smallest = smallestOfThree(x, y, z);

  const secondLargest = sumOfThree(x, y, z) - largest - smallest;

  return secondLargest === largest ? smallest : secondLargest;
}

function greetUser(name) {
  console.log("Wellcome " + name);
}

greetUser("Sidhartha")

printf(secondLargestOfThree(2,2,1));
