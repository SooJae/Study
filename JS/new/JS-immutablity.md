# Immutability
데이터의 손상을 막는 것.
## CRUD
수정과 삭제는 신중해야 한다.
수정과 삭제는 위험하다.
그래서 불변하고 싶어한다.

불변함과 가변함을 조화롭게 사용하는 것이 고수다.

```js
var v//변수 불변함 가능 = 1// literal 불변함 가능
```

|Primitive(원자데이터 타입)|Object|
|---|---|
|Number| Object|
|String|Array|
|Boolean|Function|
|Null||
|Undefined||
|Symbol||

Object : 서로 연관되는 정보를 정리정돈한다.

## 값을 넣을 때
```js
//Primitive
var p1 = 1;
var p2 = 1; 
// 같은 위치를 가리킴
```
Primitive : 1은 언제나 1이기 때문에 값을 바꿀 수 없다.
```js
var o1 = {name:'kim'}
var o2 = {name:'kim'}
// 다른 위치를 가리킴
```
Object : 객체는 값이 바뀔수 있다. 가변성이 있다.

## 값을 바꿀 시
```js
//p3를 추가
var p3 = p1;
var p3 = 2;
// p3가 2의 위치를 가리킴

//o3 추가
var o3 = o1
o3.name = 'lee'
//o3가 기존에 가리키고 있던 {name:'kim'}이 {name:'lee'}로 바뀜 
//그러므로 o1은 {name:'lee'}를 가리킴... 값이 바뀌어버린 것임
```
## o1을 불변하게 하고 싶다면?
```js
var o1 = {name:'kim'}
//중요!!!!!!!!!!!!!!
var o2 = Object.assign({},o1)// 리턴 될 객체(여기선 빈 객체 사용했다.), o1과 똑같은 객체가 복제된다.
o2.name ='lee' // o1은 바뀌지 않는다.
```

## Nested Object
Object.assign이 **배열**에서는 안 먹힌다. 그렇다면 어떻게 해야할까?

이건 생활 코딩 영상을 봐야한다.   
https://www.youtube.com/watch?v=HN1-5v81Fzc&list=PLuHgQVnccGMBxNK38TqfBWk-QpEI7UkY8&index=7


```js
//원본을 바꿀줄 몰랐던 함수
function fn(person){
    person.name = 'lee';
}
// 10억줄...

// fn함수가 있던걸 까먹음
var o1 = {name : 'kim'}

fn(o1);
//side effect 발생
console.log(o1); // {name : 'lee'} 
```

**불변의 함수가 필요해!**
### 방법 1
```js
function fn(person){
    person = Object.assign({},person);
    person.name = 'lee';
    return person;
}
// 10억줄...

var o1 = {name : 'kim'}
var o2 = fn(o1);
console.log(o1 , o2); // {name : 'kim'}  {name : 'lee'} 
```
### 방법 2
```js
function fn(person){
    person.name = 'lee';
}
// 10억줄...

var o1 = {name : 'kim'}
var o2 = Object.assign({},o1);
fn(o2);
console.log(o1 , o2); // {name : 'kim'}  {name : 'lee'} 
```

# 배열

## 원본을 바꿈
```js
var score = [1,2,3];

score.push(4);
console.log(score); // [1, 2, 3, 4]
```
## 원본을 바꾸지 않음
```js
var score = [1,2,3];
var score2 = score.concat(4);
console.log(score, score2); // [1,2,3] [1, 2, 3, 4]
```

```js
var score = [1,2,3];
var a = score;
var b = score;
// 1~
score.push(4);
console.log(score, score2, a, b); // [1, 2, 3, 4] [1, 2, 3, 4] [1, 2, 3, 4] 
//원본을 바꾸지 않으려면 concat을 쓰자! 하지만 concat은 성능이 나쁘다 (복제하는 것 때문에)
```

# Object.freeze

```js
var o1 = {name : 'kim', score:[1,2]}
Object.freeze(o1); //객체의 프로퍼티를 얼림
o1.name = 'lee'; // 안 통함
o1.city = 'seoul'; //안 통함
o1.score.push(3); // 통함
console.log(o1); // {name : 'kim', score:[1,2], 3}
```

freeze를 하니 원본이 전혀 바뀌지 않는다.
freeze를 푸는 방법도 없다... 바꾸려면 복제 해야한다.
그러나 배열은 통한다.

그럼 어떻게 해야하나?
간단하다
```js
Object.freeze(o1.score);
```
만 추가하면 된다.

# const vs Object.freeze
## const 
변수가 가리키는 것을 다른것으로 바꾸지 못하게 한다.
## freeze
값 자체를 바꾸지 못하게 한다.

```js
const o1 = {name:'kim'}
Object.freeze(o1);
const o2 = {name : 'lee'}
o1 = o2; // const 때문에 에러
o1.name = 'park'; // freeze 때문에 안바뀜(에러는 안 생긴다.)
```