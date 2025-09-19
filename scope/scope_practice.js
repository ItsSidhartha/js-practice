let i = "outer most";
console.log(i);

if (true) {
    let i = "first if";
    console.log(i);

    if (true) {
        let i = "second if";
        console.log(i);

        if(true){
            let i = "last if";
            console.log(i);
        }

        console.log(i);
        
    }

    console.log(i);
}

console.log(i);
