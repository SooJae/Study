# 배열의 기초
- 배열은 객체와 달리 본질에서 순서가 있는 데이터 집합이며 0으로 시작하는 숫자형 인덱스를 사용합니다.
- 자바스크립트의 배열은 비균질적입니다. 한 배열의 요소가 모두 같은 타입일 필요는 없습니다. 배열은 다른 배열이나 객체도 포함할 수 있습니다.

# 배열 조작
push : 배열 자체를 수정
concat : 새 배열을 반환

스택 : push, pop
큐 : shift, unshift
push, unshift : 늘어난 길이를 반환
pop, shift : 제거된 요소를 반환

```js
const arr = [1, 2, 3];
arr.concat(4,5,6); // [1,2,3,4,5,6] arr은 바뀌지 않습니다.

arr.slice(3); // [4,5] arr은 바뀌지 않습니다.
arr.slice(-2); // [4,5] arr은 바뀌지 않습니다.
arr.slice(1, -2) // [2,3] arr은 바뀌지 않습니다.

arr.splice(1, 0, 5, 6, 7) // 첫번째 인자 : 위치, 두번 째 인자 : 제거할 요소 숫자, rest : 투입시킬 인자
// [1,5,6,7,2,3]이 된다.

arr.splice(1,3); //[1,2,3] 이 된다.
```

## 배열 안에서 요소 교체하기
copyWithin은 ES6에서 도입한 새 메서드입니다. 이 메서드는 배열 요소를 복사해서 다른 위치에 붙여넣고, 기존의 요소를 덮어씁니다.
첫 번째 매개변수는 복사한 요소를 붙여넣을 위치이고, 
두 번째 매개변수는 복사를 시작할 위치이고, 
세 번째 매개변수는 복사를 끝낼 위치입니다.

```js
const arr = [1,2,3,4]
arr.copyWithin(1, 2); // arr은 이제 [1,3,4,4] 입니다.
arr.copyWithin(2, 0, 2); // arr은 이제 [1,3,1,3] 입니다.
arr.copyWithin(0,-3,-1); // arr은 이제 [3, 1, 1, 3] 입니다.
```

## 특정 값으로 배열 채우기
ES6에서 도입한 새 메서드 fill은 환영할만한 좋은 메서드입니다. 이 메서드는 정해진 값으로 배열을 채웁니다.
```js
const arr = new Array(5).fill(1) // arr이 [1,1,1,1,1]로 초기화 됩니다.
arr.fill("a"); // arr은 이제 ["a","a","a","a","a"]입니다.
arr.fill("b",1) // arr은 이제 ["a","b","b","b","b"]
arr.fill("c",2,4) // arr은 이제 ["a","b","c","c","b"]
arr.fill(5.5, -4) //arr은 이제 ["a", 5.5, 5.5, 5.5, 5.5]
arr.fill(0, -3, -1) //arr은 이제 ["a", 5.5, 0,0,5.5]
```

## 배열 정렬과 역순 정렬
```js
const arr =[1, 2, 3, 4, 5];
arr.reverse(); // arr은 이제 [5, 4, 3, 2, 1] 입니다.
```

sort는 배열 요소의 순서를 정렬합니다.
```js
const arr = [5, 3, 2, 4, 1]
arr.sort(); // arr은 이제 [1, 2, 3, 4, 5] 입니다.
```
### 중요!
sort는 정렬 함수를 받을 수 있습니다. 예를 들어 일반적으로는 객체가 들어있는 배열을 정렬할 수 없지만, 정렬 함수를 쓰면 가능합니다.

```js
const arr =[{name : "Suzanne"}, {name:"Jim"}, {name:"Trevor"}, {name:"Amanda"}];
arr.sort(); // arr은 바뀌지 않습니다.
arr.sort((a,b)=>a.name>b.name); // arr은 name 프로퍼티의 알파벳 순으로 정렬합니다.
arr.sort((a,b)=> a.name[1]<b.name[1]); // arr은 name프로퍼티의 두번째 인덱스의 알파벳 역순으로 정렬됩니다.
```

# indexOf vs findIndex
findIndex는 보조함수를 써서 검색 조건을 지정할 수 있습니다.

findIndex는 인덱스를 지정할 수 없습니다. findLastIndex같은 짝도 없습니다.

```js
const arr =[{id : 5, name:"Judith"},{id:7, name:"Francis"}];
arr.findIndex(o=>o.id===5); // 0
arr.findIndex(o=>o.name==="Francis"); // 1
//없으면 -1 리턴
```
조건에 맞는 요소의 **인덱스가 아니라 요소 자체**를 원할때는 find를 사용합니다.

```js
const arr =[{id : 5, name:"Judith"},{id:7, name:"Francis"}];
arr.find(o=>o.id===5); //객체 {id : 5 , name : "Judith"}
//없으면 undefined
```

```js
class Person{
    constructor(name){
        this.name = name;
        this.id = Person.nextId++;
    }
}

Person.nextId = 0 ;
const jamie = new Person("Jamie"),
juliet = new Person("Juliet"),
peter = new Person("Peter"),
jay = new Person("Jay");
const arr = [jamie, juliet, peter, jay];

// 옵션 1 : ID를 직접 비교하는 방법
arr.find(p=> p.id === juliet.id) // juliet 객체

// 옵션 2 : "this" 매개변수를 이용하는 방법
arr.find(function(p) {
    return p.id === this.id
},juliet) // juliet 객체
```

## some
some은 조건에 맞는 요소를 찾으면 즉시 검색을 멈추고 true를 반환합니다. 조건에 맞는 요소를 찾지 못하면 false를 반환합니다.
```js
const arr = [5, 7, 12, 15, 17];
arr.some(x => x%2 === 0); // true; 12는 짝수입니다.
arr.some(x => Number.isInteger(Math.sqrt(x))); // false: 제곱수가 없습니다.
```

## every
every는 배열의 모든 요소가 맞아야 true를 반환하며 그렇지 않다면 false를 반환합니다.

이 장에서 소개하는 메서드 중 콜백 함수를 받는 모든 메서드가 그렇듯, some과 every도 **콜백함수를 호출할 때 this로 사용할 값을 두 번째 매개변수**로 받을 수 있습니다.

# map과 fileter
map과 filter는 배열 메서드 중 가장 유용한 메서드입니다. 이들 메서드로 할 수 있는 일은 정말 다양합니다.
## map
map은 배열 요소를 변형합니다. 무엇으로 변형하냐고요? 뭐든 가능합니다. 숫자가 들어있는 객체가 있는데, 필요한 건 숫자라고요? **일정한 형식의 배열을 다른 형식으로 바꿔야 한다면 map**을 쓰십시오.

map과 filter는 모두 **사본을 반환**하며 원래 배열은 바뀌지 않습니다.

```js
const cart = [{name:"Widget", price:9.95}, {name:"Gadget", price : 22.95}];
const names = cart.map(x=>x.name); //["Widget","Gadget"]
const prices = card.map(x=>x.price)//[7.96, 18.36]
const discountPrices = prices.map(x=>x*0.8)//[7.96, 18.36]
```

```js
const items = ["Widget","Gadget"];
const prices = [9.95,22.95];
const cart = items.map((x,i) => ({name:x, price:prices[i]}));
```
객체를 괄호로 감싼 이유는, 이렇게 하지 않으면 화살표 표기법에서 객체 리터럴의 중괄호를 블록으로 판단하기 때문입니다.
## filter
filter는 배열에서 필요한 것들만 남길 목적으로 만들어졌습니다. 

```js
const cards = [];
for(let suit of ['H','C','D','S'])
 for(let value=1;value<=13; value++)
  cards.push({suit, value});
// value가 2인 카드
cards.filter(c=>c.value===2); 
//[
//{suit:'H',value:2}
//{suit:'C',value:2}
//{suit:'D',value:2}
//{suit:'S',value:2}
//]

cards.filter(c=>c.suit === 'D'); // lengh : 13

```
```js
function cardToString(c){
    const suits = {'H':'\u2665', 'C':'\u2663', 'D':'\u2663', 'S':'\u2660'};
    const values = {1:'A', 11:'J', 12:'Q', 13:'K'};
    for(i =2 i<=10; i++) values[i] = i;
    return values[c.value] + suits[c.suit];
}

cards.filter(c => c.value ===2).map(cardToString) // ["2하트","2클로버","2","2스페이드"]
cards.filter(c => c.value > 1- && c.suit ==='H').map(cardToString) // ["JQK 하트"]
```


# (중요!) 배열의 마법 reduce
map이 배열의 **각 요소를 변형**한다면 reduce는 **배열 자체**를 변형합니다.
reduce라는 이름은 이 메서드가 **보통 배열을 값 하나로 줄이는데 쓰이기 때문에** 붙었습니다. 예를 들어 배열에 들어있는 숫자를 더하거나 평균을 구하는 것은 배열의 값 하나로 줄이는 동작입니다.

reduce는 map이나 filter와 마찬가지로 콜백 함수로 받습니다. 
그런데 여태까지 설명한 콜백에서 **첫 번째 매개변수**는 항상 **현재 배열 요소**였지만 reduce는 다릅니다. 
reduce가 받는 **첫번째 매개변수**는 배열이 줄어드는 대상인 **어큐뮬레이터**입니다.
**두 번째 매개변수**부터는 여태까지 설명한 콜백의 순서대로 **현재 배열 요소, 현재 인덱스, 배열 자체**입니다.

```js
const arr =[5,7,2,4];
const sum = arr.reduce((a, x) => a += x,0) // 1, 초기화 0
```
1 . 첫 번째 배열 요소 5에서 (익명) 함수를 호출합니다. a 초깃값은 0이고 x의 값은 5입니다. 함수는 a와 x(5)의 합을 반환합니다. 이 값은 다음 단계에서 a의 값이 됩니다.

2 . 두 번째 배열 요소 7에서 함수를 호출합니다. a의 초깃값은 이전 단계에서 전달한 5이고, x의 값은 7입니다. 함수는 a와 x의 합 12를 반환합니다. 이 값은 다음 단계에서 a의 값이 됩니다.

...

18을 반환 합니다.

reduce는 통계에도 사용할 수 있습니다.예를 들어 데이터 셋의 평균과 분산을 계산한다고 해 봅시다.
```js
const data=[3.3, 5, 7.2, 12, 4, 6, 10.3]

const stats =data.reduce((a, x) => {
    a.N++;
    let delta = x -a.mean;
    a.mean += delta/a.N;
    a.M2 += delta*(x-a.mean);
    return a;
}, {N:0, mean:0, M2: 0});
if(stats.N > 2){
    stats.variance = stats.M2/(stats.N-1);
    stats.stdev = Math.sqrt(stats.variance);
}
```

```js
const words = ["Beachball","Rodeo","Angel","Aardvark","Uniform","Joker"
,"Clover", "Bali","Choco","November","Bali"];
const logWords = words.reduce((a, w) => w.length>6 ? a+" "+w : a,"").trim();

console.log(logWords);
```
trim을 쓰지 않으면 첫 글자가 띄어쓰기 돼서 출력된다. `a + " " < 얘 때문에 +w`

reduce 대신 filter와 join을 써도 됩니다.

# 삭제되거나 정의되지 않는 요소들
Array메서드는 삭제되거나 정의되지 않은 요소들을 다룰 때 좀 당혹스럽게 동작합니다. 
```js
const arr = Array(10).map(function(x) {return 5});

//arr의 요소는 전부 undefined입니다. 이와 비슷하게 배열 중간의 요소를 삭제하고
//map을 호출하면 배열 가운데 '구멍'이 생깁니다.
```

# 문자열 병합
```js
const arr = [1, null, "hello", true, undefined];
arr.join(); // "1,,hello,,true,"
arr.join(''); // "1hellotrue"
arr.join(' -- ') // "1 -- -- hello -- -- true --"

```
## html에 사용법
```js
const attributes = ["Nimble", "Perspective","Generous"];
const html = '<ul><li>' + attributes.join('</li><li>')+'</li></ul>';
// html :'<ul><li>Nimble</li><li>Perspective</li><li>Perspective</li></ul>
```
(중요!) 즉 배열의 ,가 join안의 문자로 바뀐다고 생각하면 됩니다.

요약
find, findIndex, some, every, map, filter, reduce 
러닝 자바스크립트 222p 봐라!
