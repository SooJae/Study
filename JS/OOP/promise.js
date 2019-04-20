var square = function (flag, number) {
    return new Promise(function (resolve, reject) {
        if (flag) {
            resolve(number*number);
        } else {
            reject("실패");
        }
    });
};
 
square(true, 2)                               // async1
    .then(function (number) {
        console.log("First Success : " + number);
        return square(true, number);    // async2
    })
    .then(function (number) {
        console.log("Second Success : " + number);
        return square(false, number);  // async3
    })
    .catch(function (e) {
        console.log("First Fail : " + e);
        return square(true, 3);            // asyncFail1
    })
    .then(function (number) {
        console.log("Third Success : " + number);
        return square(true, number);  // async4
    })
    .catch(function (e) {
        console.log("Second Fail : " + e);
    })
    .then(function (number) {
        console.log("Complete : " + number);  //complete
    });

