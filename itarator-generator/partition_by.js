function* partitionBy(numbers, predicate) {
  const currGroup = [];
  currGroup.push(numbers[0]);

  for (let index = 1; index < numbers.length; index++) {
    if (predicate(currGroup.at(-1)) !== predicate(numbers[index])) {
      yield [...currGroup];
      currGroup.length = 0;
    }
    currGroup.push(numbers[index]);
  }
  yield currGroup;
}

const identity = partitionBy([1, 1, 1, 2, 2, 1, 1, 3, 3, 2], (x) => x);
const oddEven = partitionBy([1, 3, 1, 2, 2, 1, 1, 3, 5, 2], (x) => !(x & 1));
