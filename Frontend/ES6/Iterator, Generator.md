# iterable?
이터러블한 객체는 [Symbol.iterator] 프로퍼티를 가진 객체이다.
Symbol.iterator는 주어진 객체의 이터레이터를 반환하는 함수를 명시한다.
# iterator?
이터레이터는 반복을 위해 설계된, 특별한 인터페이스를 가진 객체이다.
이터레이터 객체는 next()를 가진다.
연산의 결과로 객체를 반환한다. { value: value, done: boolean }

출처 : 
https://velog.io/@victor/Javascript-iterator%EC%99%80-iterable-%EA%B7%B8%EB%A6%AC%EA%B3%A0-%EC%82%AC%EC%9A%A9%EB%B2%95
## 이터러블/이터레이터 프로토콜
- 이터러블: 이터레이터를 리턴하는 [Symbol.iterator]() 를 가진 값
- 이터레이터: { value, done } 객체를 리턴하는 next() 를 가진 값
- 이터러블/이터레이터 프로토콜: 이터러블을 for...of, 전개 연산자 등과 함께 동작하도록한 규약

for... of... 같은경우 array가 이터러블이고 심볼 이터레이터를 통해 이터레이터를 리턴하기 때문에 이터러블/이터레이터 프로토콜을 따른다고 볼 수 있다.

Set같은 경우 set[0]과 같이 직접 접근은 할 수 없지만, 이터러블 프로토콜을 따르고 있기 때문에 for of를 이용할 수 있다.


map의 경우  new Map([['a',1],['b',2],['c',3]]) 과 같이 되어있다.
map.keys는 키 값만 갖고나온다 : a b c
map.values는 밸류 값만 갖고나온다 : 1 2 3
map.entries는 키: 밸류값을 갖고 나온다 : ["a",1] ["b",2] ["c",3]

### 사용자 정의 이터러블 만들기
<script>
const iterable = {
    [Symbol.iterator](){
        let i =3;
        return {
            next(){
                return i == 0? {done: true} : {value : i--, done: false };
            }
        }
    }
};
let iterator = iterable[Symbol.iterator]();
</script>

이터레이터가 자기 자신을 반환하는 이터레이터를 갖고있으면 well-formed 이터레이터라 할 수 있다.

위의 이터러블이 well-formed iterator를 반환하게 하려면 [Symbol.iterator]()를 실행했을때 반환하는 이터레이터가 자기자신 또한 이터러블이면서 자기자신을 리턴해서 어디서든 Symbol.iterator() 을 할때 자기자신의 값을 기억하게 하기 위해서 

```js
 const iterable = {
    [Symbol.iterator]() {
      let i = 3;
      return {
        next() {
          return i == 0 ? {done: true} : {value: i--, done: false};
        },
        // iterator 함수를 iterable로 만들어줌
        [Symbol.iterator]() {
          return this;
        }
      }
    }
  };
```
와 같이 변경하면 된다.
그러면 이터레이터도 iterable이 된다. (재귀 느낌?)
그러면 
let iterator = iterable[Symbol.iterator]();
for( const a of iterator )
원래 에러가 났던 것이 자기자신값을 반환하기 때문에 실행이 된다.

for(const a of iterable);
for(const a of iterator);
위의 두 for문이 정상적으로 동작한다.

const all = document.querySeletorAll('*')이 순회를 할 수 있는 이유는 이것이 배열이기 때문이 아니라 Symbol.iterator가 구현이 되어있기 때문이다.
이처럼 dom에서도 iterator/iterable 프로토콜을 사용한다.


전개연산자도 iterable 프로토콜을 따르고 있다.

```js
console.clear(); //콘솔을 초기화
const a = [1,2];
log([...a, ...arr, ...set, ...map]);
```


# 제너레이터 
- 제너레이터: 이터레이터이자 이터러블을 생성하는 함수
이터레이터를 반환한다.
## 표기법
```js
function *gen(){
// 함수 앞에 별을 붙인다.
yield 1;
yield 2;
yield 3;
return 100; // done이 true가 되면서 값을 반환한다. 안해주면 undefined
//단 return 값은 순회하면서 사라진다 (즉 1 2 3 만 출력)
}
ler iter = gen();
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());

console.log(iter[Symbol.iterator]() == iter); // true, 자기 자신이다.

for(const a of gen()) console.log(a);
```
즉 generator는 well-formed iterator를 리턴하는 함수이다.

자바스크립트에서는 어떤 값이든 Iterator를 통해 순회를 만들 수 있다.
제너레이터를 통해 어떠한 상태나 어떤한 값이든 순회할 수 있게 만들 수 있다. 이것은 굉장히 중요하다.
제너레이터를 통해 어떠한 값이든 조작하여 순회 할 수 있게 한다.
프로그래머가 로직을 만들어가며 순회를 시킬 수 있다는 뜻이다.
또, 제너레이터는 return을 하고 끝나는 것이 아닌 다시 돌아와서 실행하는 느낌이다.

```js
function *odds(l){
  for(let i = 0; i< l; i++){
    if(i % 2) yield i;
  }
}

let iter2 = odds(10);
console.log(iter2.next());
console.log(iter2.next());
console.log(iter2.next());
console.log(iter2.next());
// 1 3 5 undefined
```

```js
function *infinity(i = 0){
  while(true) yield i++;
}

function *limit(l, iter){
  for(const a of iter){
    yield a;
    if(a==l) return;
  }
}
function *odd(l){
  for(const a of limit(l,infinity(1))) {
    if(a % 2) yield a;
  }
}

let iter2 = odds(10);
console.log(iter2.next());
console.log(iter2.next());
console.log(iter2.next());
console.log(iter2.next());
console.log(iter2.next());
console.log(iter2.next());

for(const a of odds(40)) log(a);
```

## for of, 전개연산자, 구조 분해, 나머지 연산자.

```js
console.log(...odds(10));// 1, 3, 5, 7 ,9
console.log([...odds(10),...odds(20)])// [1, 3, 5, 7, 9, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19]

const [head, ...tail] = odds(5);
console.log(head);// 1 (배열이 아니다?!)
console.log(tail);// [3, 5]

const [a, b, ...rest] = odds(10);
console.log(a);//1
console.log(b);//3
console.log(rest); //[5,7,9]

