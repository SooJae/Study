# Splice
배열을 제거후, 제거한 값 반환

```js
const numbers = [10,20,30,40];
const index = numbers.indexOf(30);
const spliced = numbers.splice(index,2);

console.log(spliced); // [30, 40]
console.log(numbers);// [10,20] // 기존의 배열 변화 O
```
# Slice

```js
const numbers = [10, 20, 30 ,40];

const sliced = numbers.slice(0,2);
console.log(sliced); // [10,20]
console.log(numbers); // [10, 20, 30, 40] 기존의 배열 변화 X
```

# Shift (앞에서부터 빼냄)
```js
const numbers = [10, 20, 30, 40];

const value = numbers.shift();
console.log(value);
console.log(numbers);
```

# Pop (뒤에서부터 빼냄)
```js
const numbers = [10, 20, 30, 40];

const value = numbers.pop();
console.log(value);
console.log(numbers);
```
# Unshift (앞에서부터 삽입)
```js
const numbers = [10, 20, 30, 40];
numbers.unshift(5);
console.log(numbers);
```

Push & Pop은 한쌍이다.
Shift & UnShift도 한쌍이다.

# Concat 
배열 두개일 경우 합침 (전개연산자로 대체 가능)
# Join
배열 => 문자열
