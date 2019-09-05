# 맵
ES6 이전 
- 프로토타입 체인 때문에 의도하지 않은 연결이 생길 수 있습니다.
- 객체 안에 연결된 키와 값이 몇개나 되는지 쉽게 알아낼 수 있는 방법이 없습니다.
- 키는 반드시 문자열이나 심볼이어야 하므로 객체를 키로 써서 값과 연결할 수 없습니다.
- 객체는 프로퍼티 순서를 전혀 보장하지 않습니다.

Map 객체는 이들 결함을 모두 해결했습니다. 키와 값을 연결할 목적이라면 객체보다 나은 선택입니다.
```js
const u1 = {name: 'Cynthia'};
const u2 = {name: 'Jackson'};
const u3 = {name: 'Olive'};
const u4 = {name: 'James'};
```

먼저 맵을 만듭니다.
```js
const userRoles = new Map();

//다음에는 맵의 set() 메서드를 써서 사용자 역할을 할당합니다.
userRoles.set(u1, 'User');
userRoles.set(u2, 'User');
userRoles.set(u3, 'Admin');

//set() 메서드는 체인으로 연결할수도 있습니다.
userRoles
    .set(u1, 'User')
    .set(u2, 'User')
    .set(u3, 'Admin');

// 생성자에 배열의 배열을 넘기는 형태로 써도 됩니다.
const userRoles = new Map([
    [u1, 'User'],
    [u2, 'User'],
    [u3, 'Admin'],
]);

//역할을 알아볼 때에는 get() 메서드를 쓰면 됩니다.
userRoles.get(u2); //"User"

userRoles.has(u1); // true
userRoles.get(u1); // "User"
userRoles.has(u4); // false
userRoles.get(u4); // undefined

```

- key() : 맵의 키
- values() : 메서드 값
- entries() : 첫 번째 요소가 키
이들 메서드가 반환하는 것은 모두 이터러블 객체이므로 for ... of 루프를 쓸 수 있습니다.

```js
for(let u of userRoles.keys()) console.log(u.name);
for(let r of userRoles.values()) console.log(r);
for(let ur of userRoles.entries()) console.log(`${ur[0].name}: ${ur[1]}`);
// 맵도 분해할 수 있습니다.
for (let [u, r] of userRoles.entries()) console.log(`${u.name}:${r}`);
//entries() 메서드는 맵의 기본 이터레이터입니다.
//다시한번 단축합니다.
for(let [u, r] of userRoles) console.log(`${u.name}:${r}`);
```

이터러블 객체보다 배열이 필요하다면 확산 연산자를 쓰면 됩니다.
```js
[...userRoles.values()]; // ["Uset","User","Admin"]
```
맵의 요소를 지울때는 delete() 메서드를 사용합니다.
```js
userRoles.delete(u2);
userRoles.size; // 2
```

맵의 요소를 모두 지울 때는 clear() 메서드를 사용합니다.