// var arr = [];

// for (var i = 0; i < 5; i++) {
//   arr[i] = (function (id) {
//     return function(){
//       return  id;
//     };
//   }(i));
// }

// for (var j = 0; j < arr.length; j++) {
//   console.log(arr[j]());
// }



// var myFunction = function () {
//     var name = 'Todd';
//     var myOtherFunction = function () {
//       console.log('My name is ' + name);
//     };
//     console.log(name);
//     myOtherFunction(); // myOtherFunction 호출
//   };
//   myFunction(); // myFunction 호출



// var sayHello = function (name) {
//     var text = 'Hello, ' + name;
//     return function () {
//       console.log(text);
//     };
//   };

//   sayHello('Todd')();


var  name = "zero1";
var makeClosure = function() {
    var name = 'zero';
    return function () {
      console.log(name);
    }
  }; 
  var closure = makeClosure(); // function () { console.log(name); }
  closure(); // 'zero';


  var name = "zero1";
var makeClosure = function() {
    var name = 'zero';
    return console.log(name);
  };
  makeClosure(); 
  



  var name = 'zero'; // (1)변수 선언 (6)변수 대입
function wow(word) { // (2)변수 선언 (3)변수 대입
  console.log(word + ' ' + name); // (11)
}
function say () { // (4)변수 선언 (5)변수 대입
  var name = 'nero'; // (8)
  console.log(name); // (9)
  wow('hello'); // (10)
}
say(); // (7)

// '전역 컨텍스트': {
//     변수객체: {
//       arguments: null,
//       variable: ['name', 'wow', 'say'],
//     },
//     scopeChain: ['전역 변수객체'],
//     this: window,
//   }