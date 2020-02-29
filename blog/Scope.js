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


// function celebrityIDCreator(theCelebrities) {
//     var i;
//     var uniqueID = 100;
//     for (i=0; i<theCelebrities.length; i++) {
//         theCelebrities[i]["id"] = function(j) {
//             // j 파라미터는 호출시 즉시 넘겨받은(IIFE) i의 값이 됩니다.
//             console.log(1);
//             return function() {
//                 console.log(2);
//                 // for문이 순환할때마다 현재 i의 값을 넘겨주고, 배열에 저장합니다.
//                 return uniqueID + j;
//             } () // 함수의 마지막에 ()를 추가함으로써 함수를 리턴하는 대신 함수를 즉시 실행하고 그 결과값을 리턴합니다.
//         } (i); // i 변수를 파라미터로 즉시 함수를 호출합니다.
//     }
//     return theCelebrities;
// }
// var actionCelebs = [{name:"Stallone", id:0}, {name:"Cruise", id:0}, {name:"Willis", id:0}];
// var createIdForActionCelebs = celebrityIDCreator(actionCelebs);
// var stalloneID = createIdForActionCelebs[0];
// console.log(stalloneID.id); // 100
// var cruiseID = createIdForActionCelebs[1];
// console.log(cruiseID.id); // 101


// class Character {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     };
//
//     greet = () => {
//         console.log(`My name is ${this.name}`);
//     };
//
//     getBirthYear = () => {
//         console.log(`I'm ${new Date().getFullYear() - this.age}`);
//     };
//
// }
//
// const soojaeInfo = new Character('수재',28);
//
// // My name is 수재
// soojaeInfo.greet();
// // I'm born in 1992
// soojaeInfo.getBirthYear();

// let name = 'soojae';
// let age = 29;
//
// const displayName = () => {
//     console.log(`My name is ${name}`);
// }
//
// const displayAge = () => {
//     console.log(`I'm ${age}`)
// }
//
// //...
// // 10000 줄
// //...
//
// // 이름이니까 name이라고 선언해야지
// name = 'jumbeom';
//
// // 나이니까 age라고 선언해야지
// age = 29;
//
// //...
// // 10000 줄
// //...
//
//
// // soojae를 출력해봐야지~
// displayName()


//
// const x = 3;
// function f() {
//     console.log(x);
//     console.log(y);
// }
//
// const y = 5;
//
// // ReferenceError: y is not defined
// f();
//
// // x : 함수 f를 정의할때 존재 O
// // y : 함수 f를 정의할때 존재 X


// {
//     const name = '수재';
//     const age = 29;
//
//     const displayName = () => {
//         console.log(`My name is ${name}`);
//     }
//
//     const displayAge = () => {
//         console.log(`I'm ${new Date().getFullYear() - age}`);
//     }
//     displayName();
//     displayAge();
// }
//
// {
//     const name = '준범';
//     const age = 28;
//     const displayName = () => {
//         console.log(`My name is ${name}`);
//     }
//
//     const displayAge = () => {
//         console.log(`I'm ${new Date().getFullYear() - age}`);
//     }
//
//     displayName();
//     displayAge();
// }



const globalVar = '전역 변수';
function outerFunction() {

  const outerVar = '외부 변수';

  function innerFunction() {
    const innerVar = '내부 변수';
    console.log(`inner 함수에서 ${globalVar} 접근!`);
    console.log(`inner 함수에서 ${outerVar} 접근!`); // inner 함수에서 ${outerVar} 접근!
    console.log(`inner 함수에서 ${innerVar} 접근!`); // inner 함수에서 ${outerVar} 접근!
  }

  innerFunction();
  console.log(`outer 함수에서 ${globalVar} 접근!`); // outer 함수에서 전역 변수 접근!
  console.log(`outer 함수에서 ${outerVar} 접근!`); // outer 함수에서 외부 변수 접근!
  // console.log(`outer 함수에서 ${innerVar} 접근!`); // innerVar is not defined
}

outerFunction();
console.log(`전역에서 ${globalVar} 접근!`); // 전역에서 전역 변수 접근!
// console.log(`전역에서 ${outerVar} 접근!`); // outerVar is not defined
// console.log(`전역에서 ${innerVar} 접근!`); // innerVar is not defined


// let x = 3; // const는 immutable 이라 재 할당이 되지 않기때문에 let으로 바꿨습니다.
// const f = () => {
//   console.log(x);
// };
//
// {
//   x = 5;
//   f();
// }
// // 5

//
// var name = 'Peter';
// function greet() {
//   var greeting = 'Hello';
//   {
//     let lang = 'English';
//     console.log(`${lang}: ${greeting} ${name}`);
//   }
// }
// greet();


{
  var name = '수재';
  var age = 28;

  function displayName() {
    console.log(`My name is ${name}`);
  }

  function displayAge() {
    console.log(`I was born in ${new Date().getFullYear() - age}`);
  }
  displayName();	// My name is 수재
  displayAge();		// I'm 1992
}
//...
//1000 Lines // name을 정의 했던 것을 잊어버렸습니다...
//...
{
  var name = '준범';
  var age = 29;
  function displayName() {
    console.log(`My name is ${name}`);
  }

  function displayAge() {
    console.log(`I was born in ${new Date().getFullYear() - age}`);
  }

  displayName();	// My name is 준범
  displayAge();		// I'm 1991
}

console.log(name);  // name is not defined
