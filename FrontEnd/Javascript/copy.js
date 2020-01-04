const _ = require('lodash');

// let s1 = 'soojae';
// let s2 = s1;
// s2 = 'jun';
// console.log(`name: ${s1}, ${s2}`);


// let o1 = { name : 'soojae', age : 29 };
// let o2 = o1;
// o2.name = 'jun'
// o2.age = 30;
// console.log(`name: ${o1.name}, ${o2.name}  age: ${o1.age}, ${o2.age}`);

// let a1 = [29, 30];
// let a2 = a1;
// a1[1] = 31;
// console.log(`array: ${a1} ${a2}`)

// console.log(`s1: ${s1} s2: ${s2}`);
// console.log(`o1.name: ${o1.name} o2.name: ${o2.name},  o1.age: ${o1.age} o2.age: ${o2.age}`)
// console.log(`a1: ${a1}  a2: ${a2}`);

const originalObject = {
    name: 'soojae',
    age : 29,
    address : {
        city : 'seoul'
    }
}

const originalArray = [1, 2, 3, 4, [5,6]];

deepCopy = oldObj => {
    let newObj = oldObj;
    if (oldObj && typeof oldObj === 'object') {
        newObj = Object.prototype.toString.call(oldObj) === "[object Array]" ? [] : {};
        for (const i in oldObj) {
            newObj[i] = deepCopy(oldObj[i]);
        }
    }
    return newObj;
}

const shallowClone = originalArray.slice();
// const deepClone = {...originalObject};
// const deepClone = _.cloneDeep(originalArray);
// const JSONClone = JSON.parse(JSON.stringify(originalObject));
// const JSONClone2 = JSON.stringify(originalObject);

// deepClone.age = 30;
// deepClone.address.city = 'kyungki'


// original.say = () => {
//     return 'Good Bye';
// }

// deepClone[0] = 10;
// deepClone[4][0] = 20;
// console.log('OriginalObject: ',originalObject);
console.log('ShallowClone: ',shallowClone);
// console.log('OriginalArray', originalArray);





// console.log('OriginalObject: ', originalObject);
// console.log('DeepClone: ', deepClone);
// beforeClone.say = () => {console.log('하세요')};

// console.log(shallowClone.say());



