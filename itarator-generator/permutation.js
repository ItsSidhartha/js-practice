function* permutaion(numbers) {
  let i = 0;
  while (i < numbers.length) {
    let j = i + 1;
    while (j < numbers.length) {
      yield [numbers[i], numbers[j]];
      j++;
    }
    i++;
  }
}

const main = () => {
  const x = permutaion([1, 2, 3, 4, 5]);
  const permutaions = Iterator.from(x)
  console.log([...permutaions]);
};

main();
