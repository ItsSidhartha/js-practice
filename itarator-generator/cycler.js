function* creatCycle(numbers) {
  let i = 0;
  while (true) {
    yield numbers[i++ % numbers.length];
  }
}

const cycler = creatCycle([1, 2, 3, 4, 5]);
