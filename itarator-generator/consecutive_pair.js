function* consecutivePairs(numbers) {
  let i = 0;
  while (i < numbers.length - 1) {
    yield [numbers[i++], numbers[i]];
  }
}
const x = consecutivePairs([1, 2, 3, 4, 5]);
