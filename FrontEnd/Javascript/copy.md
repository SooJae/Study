# Assignment Operator(=), Shallow Copy, Deep Copy

프로그래밍을 하다보면 문자열, 숫자, 객체, 배열등을 복사 해야하는 상황이 옵니다. 
하지만 제 생각대로 복사가 되지 않는 상황이 많아 정리를 하려고 합니다.


## Assignment Operator(=)
우선 코드를 보고 설명하겠습니다.

## 첫 번째
```js
let s1 = 'soojae';
let s2 = s1;
s2 = 'junbeom';
console.log(`s1: ${s1}, s2: ${s2}`);

// s1: soojae, s2: jun
```

## 두 번째
```js
const o1 = { name : "soojae", age : 29 };
const o2 = o1;
o2.name = 'junbeom'
o2.age = 30;
console.log(`o1.name: ${o1.name}, o2.name: ${o2.name}  o1.age: ${o1.age}, o2.age: ${o2.age}`);

// o1.name: jun, o2.name: jun  o1.age: 30, o2.age: 30
```

## 세 번째
```js
const a1 = [29, 30];
const a2 = a1;
a1[1] = 31;
console.log(`a1: ${a1},  a2: ${a2}`);

// a1: 29,31,  a2: 29,31
```

첫 번째 경우에는 복사한 값이 변경될 때, 원본 값은 유지가 됩니다.
하지만 두 번째와 세 번째의 경우에는 복사한 값이 변경될 때 원본 값도 같이 변경됩니다.

왜 이런 상황이 발생한 것일까요?

그 이유는 객체와, 배열 그 자체의 값을 할당(대입)하는 것이 아닌 값이 들어 있는 주소 값(포인터)을 할당하기 때문 입니다. 
그래서 o1과 o2는 같은 객체의 주소를 가지고 있고, a1과 a2도 같은 배열의 주소를 가지고 있습니다.

이 주소의 값은 불변이고, 상수입니다.

이제 객체, 배열을 복사하는 방법을 알아봅시다.

## Shallow Copy, Deep Copy
Shallow Copy는 말 그대로 얕은 복사입니다.
얕은 복사는 1차원 객체, 배열만 복사 가능합니다.

### slice()
**배열**을 얕은 복사합니다.
```js
const _ = require('lodash');

const originalArray = [1, 2, 3, 4, [5,6]];

const shallowClone = originalArray.slice();

shallowClone[0] = 10;
shallowClone[4][0] = 20;

console.log('OriginalArray', originalArray);
console.log('ShallowClone: ',shallowClone);

// OriginalArray [ 1, 2, 3, 4, [ 20, 6 ] ]  
// ShallowClone:  [ 10, 2, 3, 4, [ 20, 6 ] ]
```
결과를 보시면 1차원 배열은 원본 값의 변화가 없지만, 2차원 배열(Nested)은 값이 변한 것을 확인 할 수 있습니다.

### Object.assign
**객체**를 얕은 복사합니다.
```js
const originalObject = {
    name: 'soojae',
    age : 29,
    address : {
        city : 'seoul'
    }
}
const shallowClone = Object.assign(originalObject);

shallowClone.age = 30;
shallowClone.address.city = 'kyungki'

console.log('OriginalObject: ', originalObject);
console.log('ShallowClone: ', shallowClone);
// OriginalObject:  { name: 'soojae', age: 29, address: { city: 'kyungki' } }
// ShallowClone:  { name: 'soojae', age: 30, address: { city: 'kyungki' } }
```
결과를 보시면 1차원 객체는 원본 값의 변화가 없지만, 2차원 객체(Nested)는 값이 변한 것을 확인 할 수 있습니다.

### clone
lodash 라이브러리에 있는 메서드로 **객체 또는 배열**을 얕은 복사합니다.

```js
const _ = require('lodash');

const originalArray = [1, 2, 3, 4, [5,6]];

const shallowClone = _.clone(originalArray);

originalArray[0] = 10;
originalArray[4][0] = 20;

console.log('OriginalArray', originalArray);
console.log('ShallowClone: ',shallowClone);

// OriginalArray [ 10, 2, 3, 4, [ 20, 6 ] ]
// ShallowClone:  [ 1, 2, 3, 4, [ 20, 6 ] ]
```

### 전개 연산자
**객체 또는 배열**을 얕은 복사합니다.
```js
const _ = require('lodash');

const originalArray = [1, 2, 3, 4, [5,6]];

const shallowClone = [...originalArray]; // Object일 시 {...originalObject}

originalArray[0] = 10;
originalArray[4][0] = 20;

console.log('OriginalArray', originalArray);
console.log('ShallowClone: ',shallowClone);

// OriginalArray [ 10, 2, 3, 4, [ 20, 6 ] ]
// ShallowClone:  [ 1, 2, 3, 4, [ 20, 6 ] ]
```



## Deep Copy
Deep Copy는 깊은 복사입니다.
다차원적인 객체, 배열까지 복사가 가능합니다.
자바스크립트 메서드에는 Deep Copy 메서드가 없기 때문에, 직접 만들어야 합니다.
```js
// Deep Copy 함수

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

const originalObject = {
    name: 'soojae',
    age : 29,
    address : {
        city : 'seoul'
    }
}

const deepClone = deepCopy(originalArray);

deepClone.age = 30;
deepClone.address.city = 'kyungki'

console.log('OriginalObject: ', originalObject);
console.log('DeepClone: ', deepClone);
// OriginalObject:  { name: 'soojae', age: 29, address: { city: 'seoul' } }
// DeepClone:  { name: 'soojae', age: 30, address: { city: 'kyungki' } }
```

위 처럼 직접 Deep Copy를 만들기 번거로울 때는 Lodash의 cloneDeep을 사용하면 됩니다.

### cloneDeep
lodash 라이브러리에 있는 메서드로 객체와, 배열 모두 Deep Copy 합니다.
```js
const _ = require('lodash');

const originalArray = [1, 2, 3, 4, [5,6]];
const deepClone = _.cloneDeep(originalArray);

deepClone[0] = 10;
deepClone[4][0] = 20;

console.log('OriginalArray: ', originalArray);
console.log('DeepClone: ', deepClone);
// OriginalArray [ 1, 2, 3, 4, [ 5, 6 ] ]
// DeepClone:  [ 10, 2, 3, 4, [ 20, 6 ] ]
```



### JSON.parse(JSON.stringify())
JSON.parse(JSON.stringify())는 Deep Copy중 하나입니다.
JSON.stringify는 객체를 스트링 포맷으로 변환하는 메서드입니다.
```js
let originalObject = {
    name: 'soojae',
    age : 29,
    address : {
        city : 'seoul'
    }
}

let jsonStringify = JSON.Stringify(originalObject); 

console.log('jsonStringify: ', jsonStringify)
// jsonStringify:  {"name":"soojae","age":29,"address":{"city":"seoul"}}
```
JSON.parse는 스트링 포맷을 객체로 변환해주는 메서드입니다.
객체를 스트링 포맷으로 변환(Json.Stringify)할 때 구조가 달라지기 때문에 새로운 객체의 주소값이 할당됩니다.
즉, Deep Copy가 되는 것이죠

하지만 이 방식은 **객체안의 메서드는 복사가 되지 않습니다.**

```js
const originalObject = {
    name: 'soojae',
    age : 29,
    address : {
        city : 'seoul'
    },
    say:() => {
        return 'Hello World';
    }
}

const JSONClone = JSON.parse(JSON.stringify(originalObject));

console.log('OriginalObject: ', originalObject);
console.log('JSONClone: ', JSONClone);

/*
OriginalObject:  { name: 'soojae',
  age: 29,
  address: { city: 'seoul' },
  say: [Function: say] }

JSONClone:  { name: 'soojae', age: 29, address: { city: 'seoul' } }
*/
```




# 결론  
복사기능 자체로 보면 Deep Copy가 Shallow Copy보다 더 좋다고 볼 수 있습니다. 
하지만 Deep Copy는 재귀함수를 사용하기 때문에 시간 복잡도([복잡도 란?](https://soojae.tistory.com/15))가 O(2^n)로 높습니다.(하지만 Lodash의 메소드를 사용하는 것이 복잡도가 더 높습니다... _.clone보다 직접 만든 Deep Copy가 더 빠릅니다...)   
좋은 개발자가 되기위해 Shallow Copy와 Deep Copy를 상황에 따라 잘 사용해야겠습니다.


복잡도 


복잡도 계산
http://jsben.ch/p2OfH


그래서 const의 경우 배열, 객체의 값이 할당되는 것이 아니라 객체의 주소 값이 할당되는 것이기 때문에 바꿔도 괜찮습니다. 
(할당?)


DeepClone

Assignment Operator(=) : 문자열, 숫자 



# REFERENCES
https://medium.com/@thawsitt/assignment-vs-shallow-copy-vs-deep-copy-in-python-f70c2f0ebd86
https://thecodebarbarian.com/object-assign-vs-object-spread.html

splice는 원본을 바꾼다.
slice는 원본을 바꾸지 않는다.