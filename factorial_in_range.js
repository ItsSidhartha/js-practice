const startOfRange = 1;
const endOfRange = 6;
for(let input = startOfRange; input <= endOfRange; input++){
    let factorial = 1;
    for (let multiplier = 1; multiplier <= input; multiplier ++) {
        factorial = factorial * multiplier;
    }
    console.log("factorial of", input, "is",factorial );
}
