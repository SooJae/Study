// / <reference path = "CalcSum.d.ts" />
const obj = new TestSum.Calc();
console.log(`Sum: ${obj.doSum(15, 25)}`);
console.log(`Sum: ${obj.doSum(15, 'abc')}`);
