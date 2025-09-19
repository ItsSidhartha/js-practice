const yearInput = 2100;
const isLeapYear = (yearInput % 4 === 0 && yearInput % 100 !== 0) || yearInput % 400 === 0;
const resultSuffix = isLeapYear ? 'is a leap year' : 'is not a leap year';
console.log(yearInput, resultSuffix);
