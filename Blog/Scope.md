스코프란?
스코프는 변수와 상수, 매개변수가 언제 **어디서 정의되는지 결정**합니다. 
스코프에는 전역(global)과 지역(local) 스코프가 있습니다.

```js
const f = x => {
    return x + 5;
}
// 10
console.log(f(5));
// ReferenceError: x is not defined
console.log(x);
```

scope()의 x는 계산이 됐지만, 함수 바디를 벗어나면 x가 존재하지 않는 것처럼 보입니다. 
즉, **x의 스코프는 함수 f**입니다.

변수의 스코프가 어떤 함수라고 말할 때는, **함수를 실제 호출할 때까지는 함수 바디의 매개변수가 존재하지 않음**을 생각해야 합니다.

선언 vs 정의
선언
let name;
정의
let name = 'soojae';
그러나 javascript에서는 두 용어를 구분하지 않습니다.(정의를 해주지 않으면 undefined가 암시적으로 주어지므로)

스코프는 프로그램의 형재 실행 중인 부분, 즉 실행 컨텍스트에서 현재 보이고 접근할 수 있는 식별자를 말합니다. 반면 존재한다는 말은 그 식별자가 메모리가 할당된 무언가 가리키고 있다는 뜻입니다.

## 정적 스코프, 동적 스코프

자바스크립트의 스코프는 **정적(lexical)**입니다. 
정적 스코프는 어떤 변수가 함수 스코프 안에 있는지 **함수를 정의할 때 알 수 있다**는 뜻입니다.
호출할 때 알 수 있는 것은 아닙니다.

```js
const x = 3;
const f = () => {
    console.log(x);
    console.log(y);
}

{
    const y = 5;
    // ReferenceError: y is not defined
    f();
}
```
x : 함수 f를 정의할때 존재 O
y : 함수 f를 정의할때 존재 X

이것이 정적 스코프입니다. **함수 f는 자신이 정의될 때 접근할 수 있었던 식별자에 여전히 접근**할 수 있지만, **호출할 때 스코프에 있는 식별자에 접근할 수는 없습니다.**

자바스크립트의 정적 스코프는 전역 스코프와 블록 스코프 함수 스코프에 적용됩니다.

# 전역 스코프
스코프는 계층적이며 트리의 맨 아래에는 바탕이 되는 무언가가 있어야 합니다.
즉 프로그램을 시작할 때 암시적으로 주어지는 스코프가 필요합니다.
자바스크립트 프로그램을 시작 후, 어떤 함수도 호출하지 않았을 때, 실행 흐름은 전역 스코프에 있습니다.
즉, 프로그램의 모든 스코프에서 볼 수 있습니다.

전역 스코프에서 선언된 것들을 전역 변수라고 합니다. 
전역변수가 나쁘다고는 하지만, 전역 변수는 반드시 필요하고, 나쁜 것은 전역 스코프를 남용하는 것입니다.

전역 스코프에 함수 하나만 만들면 될까요?
특정 함수의 스코프에서 선언한 것은 그 함수에서 호출한 어디에서든 다 보입니다.

```js
const name = 'soojae' 
const age = 29;

const displayName = () => {
  console.log(`My name is ${name}`);
}

const displayAge = () => {
  console.log(`I'm ${age}`)
}
```
greet와 getBirthYear은 전역변수에 의존합니다.

그럼 객체를 생성하여 개선해봅시다.

```js
const user = {
  name = 'soojae',
  age = 29
};

const greet = () => {
  console.log(`Hello, ${user.name}`);
}

const getBirthYear = () => {
  return new Date().getFullYear() - user.age;
}
```
여전히 user에 의존하고 있고, 이 객체는 어디서든 수정할 수 있습니다. 다시 개선 해봅시다.

```js
class Character {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
}

const userName = 'soojae';
const userAge = 29;

const soojaeInfo = new Character(userName, userAge);

const greet = user => {
  console.log(`Hello, ${user.name}`);
};
  
const getBirthYear = user => {
  return new Date().getFullYear() - user.age;
};
```

프로그램이 수천, 수만 행이 되어 모든 스코프를 기억하고 관리할 수 없게 된다면 전역스코프에 의존하지 않는 것이 중요해집니다.

## 블록 스코프
```js
console.log('before block');
{
  console.log('inside block');
  const x = 3;
  console.log(x);
}
//x is not defined
console.log(`after block: x = ${x}`)
```
사실 이런식으로 독립 블록을 사용하는 경우는 거의 없습니다.

# 클로저
함수가 특정 스코프에 접근할 수 있도록 의도적으로 그 스코프에서 정의하는 경우가 많습니다. 이런 것을 클로저라고 합니다. **스코프를 함수 주변으로 좁히는 것** 이라고 보면 됩니다.
클로저 예제를 봅시다.

```js
let globalFunc;
{
  let blockVar = 'a';
  globalFunc = () => {
    console.log(blockVar);
  }
}
// 'a'
globalFunc()
```

globalFunc는 블록 안에서 값을 할당받았습니다. 이 블록 스코프와 그 부모인 전역스코프가 클로저를 형성합니다.
이 예제를 잘 이해해야 합니다. globalFunc을 호출하면, 이 함수는 스코프에서 빠져나왔음에도 불구하고 blockVar에 접근할 수 있습니다. **일반적으로 스코프에서 빠져나가면 해당 스코프에서 선언한 변수는 메모리에서 제거해도 안전합니다.**

스코프 안에서 함수를 정의했고, 해당 함수는 스코프 밖에서도 참조할 수 있으므로 자바스크립트는 스코프를 계속 유지합니다.

```js
let f;
{
  let user = {name : 'soojae'};
  f = () => {
    return user;
  }
}

let oRef = f();
oRef.name = 'jerry'

// name : jerry
console.log(oRef);
```
일반적으로 스코프 바깥쪽에 있는 것들에는 접근할 수 없습니다. **함수를 정의해 클로저를 만들면 접근할 수 없었던 것들에 접근할 방법이 생깁니다.**

## IIFE

```js
(function() {
  // IIFE 바디
})();
```
함수 표현식으로 익명함수를 만들고 그 함수를 즉시 호출합니다. IIFE의 장점은 내부의 있는 것들이 모두 자신만의 스코프를 가지지만, IIFE 자체는 함수이므로 그 스코프 밖으로 무언가 내보낼 수 있는 것 입니다.

```js
const message = () => {
  const secret = `I'm a secret!`;
  return `The secret is ${secret.length} characters log.`;
}();
console.log(message);
```

변수 secret은 IIFE의 스코프 안에서 안전하게 보호되며 외부에서 접근할 수 없습니다.
IIFE는 함수이므로 무엇이든 반환할 수 있습니다. IIFE에서 배열, 객체, 함수를 반환하는 경우도 많습니다.

```js
const f = (function() {
  let count = 0;
  return () => {
    return `I have beean called ${++count} time(s)`;
  }
})();

f(); // I have beean called 1 time(s)
f(); // I have beean called 2 time(s)
```
변수 count는 IIFE 안에 안전하게 보관되어 있으므로 접근 할 수 없습니다. ES6에서 블록 스코프 변수를 도입하면서 IIFE가 필요한 경우가 줄어들긴 했지만 여전히 매우 널리 쓰입니다. 클로저를 만들고 클로저에서 무언가 반환받을 때에는 유용하게 쓸 수 있습니다.

# 함수 스코프와 호이스팅
ES6에서 let을 도입하기 전에는 var를 써서 변수를 선언했고, 이렇게 선언된 변수들은 함수 스코프라 불리는 스코프를 가졌습니다.(var로 선언한 전역 변수는 명시적인 함수 안에 있지는 않지만 함수 스코프와 똑같이 동작합니다.)

let으로 변수를 선언하면, 그 변수는 할당하기 전에는 존재하지 않습니다. var로 선언한 변수는 현재 스코프 안이라면 어디서든 사용할 수 있으며, 심지어 선언하기도 전에 사용할 수 있습니다.
아직 **선언되지 않은 변수와 값이 undefiend인 변수는 다르다**는 점을 상기해봅시다.
아직 선언되지 않은 변수는 에러를 일으키지만, 존재하되 값이 undefined인 변수는 에러를 일으키지 않습니다.

```js
let var1;
let var2 = undefined;
var1; // undefined
var2; // undefined
undefinedVar; // ReferenceError: undefinedVar is not defined
```

let을 쓰면, 변수를 선언하기 전 사용하려 할 때 에러가 일어납니다.
```js
x; // ReferenceError: x is not defined
let x = 3;
```
반면 var는 변수를 선언하면 선언하기 전에도 사용할 수 있습니다.
```js
x; // undefined
var x = 3;
x; // 3
```

```js
var x = 3; // var x; x = 3; 으로 해석된다.
if(x === 3) {
  var x = 2; // 위에 var x로 선언 됐으므로 x = 2; 가 된다.
}
```

# 함수 호이스팅
```js
f();
function f() {
  console.log('f');
}
```

함수 표현식은 호이스팅이 불가능합니다.
```js
f();
const f = () => {
  console.log('f');
}
```

Strict 모드

```js
(function() {
  'use strict';

  // 코드를 전부 이 안에 작성합니다.
  // 이 코드는 스트립트 모드로 동작하지만,
  // 이 코드와 함께 동작하는 다른 스크립트는
  // 스트릭트 모드에 영향 받지 않습니다.
})();
```

```js
function outerFunction () {
  const outer = 'I’m the outer function!'
    
  function innerFunction() {
     const inner = 'I’m the inner function!'
     console.log(outer) // I’m the outer function!
  }
    
  console.log(outer)
  console.log(inner) // Error, inner is not defined
}
```



살짝만 깊게 들어가볼까요? 자바스크립트 엔진은 변수의 범위를 어떻게 결정하고, 변수 조회를 할까요?
이를 이해하기 위해서는 자바스크립트의 렉시컬 환경(lexical environment)을 이해해야합니다.

렉시컬 환경(Lexical environment)
렉시컬 환경은 식별자(identifier)-변수(variable) 매핑을 보유하는 구조입니다. (여기서 식별자는 변수/ 함수를 뜻하고, 변수는 객체[함수 객체, 배열 객체] 또는 기본 값에 대한 참조입니다.)
즉, 렉시컬 환경은 객체에 대한 변수와 참조가 저장되는 장소입니다.
렉시컬 스코프와 렉시컬 환경은 다릅니다. 
렉시컬 스코프 : 컴파일시 결정되는 범위,
렉시컬 환경 : 프로그램 실행중에 변수가 저장되는 장소

lexicalEnvironment = { 
  a : 25, 
  obj : 객체의 참조 값
}

새로운 렉시컬 환경은 각 렉시컬 스코프에 대해 작성되지만, 해당 범위의 코드가 실행될 때만 작성됩니다.

렉시컬 환경은 외부 렉시컬 환경에대한 참조값을 가지고 있습니다.
lexicalEnvironment = {
  a: 25,
  obj: 객체의 참조 값
  
  outer: 외부 렉시컬 환경
}
