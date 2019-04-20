// function outer(){
//     var x = 10;

//     function inner(){
//       x++;
//       console.log(x);
//     };
//     return inner;
// }

// var x = -10;
// var foo = outer();
// foo();
// foo();
// console.log(x);







// function Outer(){
//     var x = 10;
  
//     this.getX = function(){
//       return x;
//     }
  
//     this.setX = function(newNum){
//       x = newNum;
//     }
//   }
  
//   var foo = new Outer();
//   console.log(foo.getX());
//   console.log(foo.x)
  
//   foo.setX(20);
//   console.log(foo.getX());






// var x = 10;

// function foo(){
//   var x = 20;
//   goo();

//   function goo(){
//     console.log(x);
//   }
// }

// foo();



var x = 10;

function foo(){
  var x = 20;
  goo();
}

function goo(){
  console.log(x);
}

foo();



//호이스팅
// function outer() {
//   var outerText = "Is Closure ?";
//   function inner() {
//       console.log(outerText);
//   }
//   inner();
// }
// outer();

//클로저
function outer() {
  var outerText = "Is Closure !";
  function inner() {
      console.log(outerText);
  }
  return inner;
}
var myClosure = outer();
myClosure();

//

// function square(x, callback) {
//   setTimeout(callback, 100, x*x);
// }

// square(2, function(x) {
//   square(x, function(x2) {
//       square(x2, function(x3) {
//           console.log(x3);
//       });
//   });
// });

//

var square = function (flag, number) {
  return new Promise(function (resolve, reject) {
      setTimeout(function () {
          if (flag) {
              resolve({ result: "성공", number: number*number });
          } else {
              reject({ result: "실패" });
          }
      }, 1000);
  });
};

square(true, 2)
.then(function (result) {
  console.log(result);
}, function (error) {
  console.log(error);
});



