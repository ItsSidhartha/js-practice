const limit = 40;

for (let targetNumber = 2; targetNumber <= limit; targetNumber++) {
    let isDivisible = false;
    let divider = 2;

    while (divider < targetNumber && !isDivisible) {
        isDivisible = targetNumber % divider === 0;
        divider = divider + 1;
    }

    let isPrime = !isDivisible; 

    if (isPrime) {
        console.log(targetNumber);
    }   
}   
