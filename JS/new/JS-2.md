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


# 자바스크립트에서 무조건 거짓 값
- undefined
- null
- false
- 0
- NaN
- ''(빈 문자열)

# 자바스크립트 무조건 참인 값
- 모든 객체, valueOf() 메서드를 호출했을 때 false를 반환하는 객체도 참 같은 값에 속합니다.
- 배열. 빈 배열도 참 같은 값에 속합니다.
- 공백만 있는 문자열 (" " 등)
- 문자열 "false"

## 기본 값 설정하기(중요!!!!)
```js
const options = suppliedOptions || {name : "Default"}
// suppliedOptions에 null이나 undefied같이 거짓값이 오면 기본값 "Default"를 갖는다.
```

## 쉼표 연산자
쉼표 연산자는 표현식을 결합하여 두 표현식을 평가한 후, 두 번째 표현식의 결과를 반환합니다.

```js
let x = 0, y = 10, z;
z = (x++, y++)
// x++이 연산이 된 후, y값이 반환 그 후에 ++실행 답 : 10

z = x++, y++ // x 값이 저장 된후 ++연산 , 그 후에 y값 ++연산 답: 0
```

```js
let n = 22 //32 비트 바이너리 : 00000000000000000000000000010110
n >> 1 //32 비트 바이너리     : 00000000000000000000000000001011
n >>> 1 //32 비트 바이너리    : 00000000000000000000000000001011
n = ~n //1의 보수            : 11111111111111111111111111101001
n ++ //2의 보수              : 11111111111111111111111111101010
n >> 1 //                    : 11111111111111111111111111110101
n >>> 1 //                   : 01111111111111111111111111110101
```
자세한 내용은 러닝 자바스크립트 167p쪽을 봅시다!

| 표현식    | 반환값    | 참고 |
| --- | --- |---|
|typeof undefined| "undefined"||
|typeof null| "object"||
# 표현식과 연산자
## 표현식
표현식은 값으로 평가될 수 있는 문입니다.

