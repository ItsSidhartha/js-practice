const startOfRange = 21;
const endOfRange = 100;

for(let targetNumber = startOfRange; targetNumber <= endOfRange; targetNumber++){
    const isEven = targetNumber % 2 === 0;
    const suffix = isEven ? "is even" : "is odd";
    console.log(targetNumber, suffix);
} 
