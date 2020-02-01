// const scope = x => {
//     return x + 3;
// }
// console.log(scope(5));
// console.log(x);

// const x = 3;
// const f = () => {
//     console.log(x);
//     console.log(y);
// }

// {
//     const y = 5;
//     f();
// }



// class Character {
//     constructor(name, age) {
//       this.name = name;
//       this.age = age;
//     }
// }

// const userName = 'soojae';
// const userAge = 29;

// const soojaeInfo = new Character(userName, userAge);

// const greet = user => {
//   console.log(`Hello, ${user.name}`);
// }
  
// const getBirthYear = user => {
//   return new Date().getFullYear() - user.age;
// }

// greet(soojaeInfo);

// console.log('before block');
// {
//   console.log('inside block');
//   const x = 3;
//   console.log(x);
// }
// console.log(`after block: x = ${x}`)



// let globalFunc;
// {
//   let blockVar = 'a';
//   globalFunc = () => {
//     console.log(blockVar);
//   }
// }
// // 'a'
// globalFunc()


// let f;
// {
//   let user = {name : 'soojae'};
//   f = () => {
//     return user;
//   }
// }

// let oRef = f();
// oRef.name = 'jerry'
// console.log(oRef);


// f();
// const f = () => {
//   console.log('f');
// }

// var i;
// for(i=5; i>=0; i--){
//     setTimeout(function(){
//         console.log(i === 0? 'go!' : i);
//     }, (5-i)* 1000)
// }


function celebrityIDCreator(theCelebrities) {
    var i;
    var uniqueID = 100;
    for (i=0; i<theCelebrities.length; i++) {
        theCelebrities[i]["id"] = function(j) {
            // j 파라미터는 호출시 즉시 넘겨받은(IIFE) i의 값이 됩니다.
            console.log(1);
            return function() {
                console.log(2);
                // for문이 순환할때마다 현재 i의 값을 넘겨주고, 배열에 저장합니다.
                return uniqueID + j;
            } () // 함수의 마지막에 ()를 추가함으로써 함수를 리턴하는 대신 함수를 즉시 실행하고 그 결과값을 리턴합니다.
        } (i); // i 변수를 파라미터로 즉시 함수를 호출합니다.
    }
    return theCelebrities;
}
var actionCelebs = [{name:"Stallone", id:0}, {name:"Cruise", id:0}, {name:"Willis", id:0}];
var createIdForActionCelebs = celebrityIDCreator(actionCelebs);
var stalloneID = createIdForActionCelebs[0];
console.log(stalloneID.id); // 100
var cruiseID = createIdForActionCelebs[1];
console.log(cruiseID.id); // 101