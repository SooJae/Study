var foo = function(var1, var2, var3){
    for(let i = 0; i < arguments.length; i++){
      console.log(arguments[i])
    }
  }
  foo(3,5,2,1,2,3,4);



 var foo = function(var1, var2, var3){
  var args = Array.prototype.slice.call(arguments);
  args.push(100);

  for(let i = 0; i < args.length; i++){
    console.log(args[i]);
  }
}
foo(3,5,2,1,2,3,4);