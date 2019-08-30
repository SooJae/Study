var myObject = {};
myObject['prop1'] = 1;
myObject['prop2'] = 2;
var prop3 = Symbol('prop3');
var prop4 = Symbol('prop4');
myObject[prop3] = 3;
myObject[prop4] = 4;
for (var key in myObject){
  console.log(myObject[key]); // prop3 prop4는 나오지 않음.
}
console.log(myObject[prop3]) // 3
console.log(myObject[prop4]) // 4