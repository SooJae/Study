let timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(()=>{
        resolve("1sec");
    }, 1000);
})

timeoutPromise.then(console.log);

import add from './util';
const value = add(1,2);
console.log(value);

// $ tsc hello.ts --lib es2015,dom