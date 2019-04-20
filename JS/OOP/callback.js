var obj = {
    name: "victolee",
    email: "empty",
  
    setEmail : function(email){
      this.email = email;
    }
  }
  
  function callback(email, cb){
    cb.call(obj,email);
  }
  
 callback("example.com", obj.setEmail);
//  console.log(obj.email);






function callbackFunction (callback) {
    callback();
    console.log("메롱");
}

function testFunction() {
    var text = "callback function is closure";
    callbackFunction(function () {
        console.log(text);
    });
}
 
testFunction();