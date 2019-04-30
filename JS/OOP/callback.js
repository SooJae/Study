// var obj = {
//     name: "victolee",
//     email: "empty",
  
//     setEmail : function(email){
//       this.email = email;
//     }
//   }
  
//   function callback(email, cb){
//     cb.call(obj,email);
//   }
  
//  callback("example.com", obj.setEmail);
// //  console.log(obj.email);






// function callbackFunction (callback) {
//     callback();
//     console.log("메롱");
// }

// function testFunction() {
//     var text = "callback function is closure";
//     callbackFunction(function () {
//         console.log(text);
//     });
// }
 
// testFunction();




function add(x, callback){
    let sum = x + x;
    console.log(sum);
    callback(sum);
  }
  
  add(3, function(result){
    add(result, function(result2){
      add(result2, function(result3){
        add(result3, function(result4){
          console.log("에너지 파")
        })
      })
    })
  })

//promise
//   var mul = function(flag, number){
//       return new Promise(function(resolve, reject){
//         if(flag){
//             resolve(number*number);
//         } else {
//             reject("실패");
//         }
//       });
//   }

// mul(true,2)
// .then(function(number){
//     console.log("1 : ",number);
//     return mul(true,number);
    
// })
// .then(function(number){
//     console.log("2 : ",number);
//     return mul(true,number);
// })
// .then(function(number){
//     console.log("3 : ",number);
// })


//await

async function divs(){
   let res = await div(50,2);
    let res2 = await div(res,4);
    await div(res2,5);
    //await div(100,5);
}

// function div(num, div){
//     return new Promise(function(resolve, reject){
//         console.log(num/div);
//         resolve(num/div);
//     });
// }
function div(num, div){
    console.log(num/div);
    return (num/div);
}

divs();