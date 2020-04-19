
SYMBOL
유니크 값을 만들기 위해 쓴다.

```js
let user = {
    id:9451,
    name: "이수재",
    city: "화성시",
    age : 28
};
const idSym = Symbol("id");
user[idSym] = 2191237923;
```

```js
const idSym = Symbol("id");
let user = {
    id:9451,
    name: "이수재",
    city: "화성시",
    age : 28,
    //idSym : 613124289 // idSym이라고만 나온다.
    [idSym] : 4219308 // Symbol(id)라고 정상 출력
};
```

```js
Object.getOwnPropertyNames(user)
// ["id", "name", "city", "age"] Symbol(id)는 없다!
Object.getOwnPropertySymbols(user)
//[Symbol(id)]로 출력
```

```js
const sym1 = Symbol.for("cat"); 
const sym2 = Symbol.for("cat");
sym == sym2 //true
sym === sym2 //true
```
Symbol.for()는 또한 매 호출마다 새로운 심볼을 만들지 않고 현재 레지스트리에 해당 키를 가진 심볼이 있는지 먼저 검사를 한다. 있다면 그 심볼을 반환한다. 만약 키에 해당하는 심볼이 없다면 Symbol.for()는 새로운 전역 심볼을 만들 것이다. (싱글톤 같다고 보면 되나?)

Symbol은 비공개 객체 멤버를 만들기 위한 방법으로써 추가되었다.
완벽한 비공개는 아니지만 심볼을 사용한 프로퍼티는 우연히 변경하거나
덮어쓰는것이 까다로우므로 원치 않는 상황에 변경될 확률이 더 적다.

Symbol 자료형은 유일하고 변경 불가능한 기본값이다.
프로그램에서 이름(변수명)의 충돌 없이 사용하기 위해 활용한다.
주로 객체 속성의 식별자(key)로 사용된다.


# REFERENCES
https://www.youtube.com/watch?v=4J5hnOCj69w