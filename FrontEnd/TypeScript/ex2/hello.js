var timeoutPromise = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve("1sec");
    }, 1000);
});
timeoutPromise.then(console.log);
// $ tsc hello.ts --lib es5, es2015.promise, es2015.iterable, dom
