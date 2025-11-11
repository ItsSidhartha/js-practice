const data = [12, 12, 45, 5, 4, 34, 2, 41, 4, 12];

const frequencyData = (frequency, target) => {
  if (!(target in frequency)) {
    frequency[target] = 0;
  }

  frequency[target]++;
  return frequency;
};
const frequencytable = data.reduce(frequencyData, {});

console.log(frequencytable);
