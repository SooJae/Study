# for
## for  ... in 루프
for ... in 루프는 **객체의 프로퍼티에 루프를 실행하도록 설계된** 루프입니다. 문법은 다음과 같습니다.
```js
for(variable in object)
    statement
```
예제
```js
const player = {name : 'Thomas', rank :'Midshipman', age:25};
for(let prop in player){
    if(!player.hasOwnProperty(prop)) continue;
    console.log(prop + ': ' + player[prop]);
}
```

## for ...of 루프
for ... of 문은 ES6에서 새로 생긴 반복문이며 컬렉션 요소에 루프를 실행하는 다른 방법입니다.

```js
for(variable of object)
    statement
```

for ... of는 배열에 루프를 실행해야 하지만 **각 요소의 인덱스를 알 필요는 없을때** 사용합니다.
예제
```js
const hand = [randFace(), randFace(), randFace()];
for(let face of hand)
 console.log(`you rolled ... ${face}`);
```
```
for ... in :객체의 프로퍼티에 루프를실행하도록 설계된 루프   
for ... of : 각 요소의 인덱스를 알 필요 없을 때
```

## break vs return
함수 안에 if가 있으면 return 문을 써도 괜찮다. (break도 가능)