# 스코프
스코프는 변수와 상수, 매개변수가 언제 어디서 정의되는지 결정합니다.
```js
function f(x){
    return x + 3;
}
f(5); // 8
x; // ReferenceError : x is not defined
```
x가 아주 잠시나마 존재했었으니 x+3을 계산할 수 있었습니다. 하지만 함수 바디를 벗어나면 x는 존재하지 않는 것처럼 보입니다.
따라서 우리는 **x의 스코프**가 **함수 f**라고 말합니다.

변수의 스코프가 어떤 함수라고 말할 때는, 함수를 실제 호출할 때까지는**함수 바디의 정해진 매개변수가 존재하지 않음**을 반드시 상기해야 합니다.
함수는 여러 번 호출할 수 있습니다. 그리고 함수를 호출할 때마다 매개변수가 나타나고, **함수가 제어권을 반환하면 스코프 밖으로 사라집니다.**

## 스코프와 존재
변수가 스코프 안에 있지 않다면, 그 변수는 존재하지 않는다는 말일까요? 꼭 그런 건 아닙니다. 그리고 여기서 **스코프와 존재**를 반드시 구별해야 합니다.
'가시성'이라고도 불리는 스코프는 프로그램의 현재 실행 중인 부분, 즉 **실행 컨텍스트에서 현재 보이고 접근할 수 있는 식별자**들을 말합니다.

반면 존재한다는 말은 그 식별자가 메모리가 할당된 무언가를 가리키고 있다는 뜻입니다. 존재하지만 스코프 안에 없는 변수의 예를 곧 살펴보겠습니다.

무언가가 더는 존재하지 않는다고 해도 자바스크립트는 메모리를 바로 회수하지는 않습니다. 그것을 계속 유지할 필요가 없다고 표시해두면, 주기적으로 일어나는 **가비지 컬렉션 프로세스**에서 메모리를 회수합니다.

## 정적 스코프와 동적 스코프
자바스크립트의 스코프는 정적입니다. 소스 코드만 봐도 변수가 스코프에 있는지 판단할 수 있다는 뜻입니다. 다만, 소스 코드만 봐도 즉시 스코프를 분명히 알 수 있다는 뜻은 아닙니다.

정적 스코프는 어떤 변수가 함수 스코프 안에 있는지 함수를 정의할 때 알 수 있다는 뜻입니다. 호출할 때 알 수 있는 것은 아닙니다.
```js
const x = 3;
function f(){
    console.log(x);
    console.log(y);
}

{ // 새 스코프
    const y = 5;
    f();
}
```
변수 x는 함수 f를 정의할 때 존재하지만, y는 그렇지 않습니다. y는 다른 스코프에 존재합니다. 다른 스코프에서 y를 선언하고 그 스코프에서 f를 호출하더라도, f를 호출하면 x는 그 바다안의 스코프에 있지만 y는 그렇지 않습니다. 이것이 정적 스코프입니다. 함수 f는 **자신이 정의 될 때 접근할 수 있었던 식별자에는 여전히 접근할 수 있지만, 호출할 때 스코프에 있는 식별자에 접근할 수 없습니다.** 매우 중요!!!!!!!!!!!!!!

### 자바스크립트의 정적 스코프
전역스코프, 블록 스코프, 함수 스코프

## 전역 스코프
스코프는 계층적이며 트리의 맨 아래에는 바탕이 되는 무언가가 있어야 합니다. 즉, 프로그램을 시작할 때 암시적으로 주어지는 스코프가 필요합니다. 이 스코프를 전역 스코프라고 합니다. 
자바스크립트 프로젝트를 시작할 때, **즉 어떤 함수도 호출하지 않았을 때 실행 흐름은 전역 스코프에 있습니다.** 바꿔 말해, 전역 스코프에서 선언한 것은 무엇이든 프로그램의 모든 스코프에서 볼 수 있습니다.

전역 스코프에서 선언된 것을 전역 변수라고 합니다. **전역 변수는 아주 안 좋습니다.**

```js
let name = "Irena"; // 전역
let age = 25; // 전역

function greet(){
    console.log(`Hello, ${name}!`);
}

function getBirthYear(){
    return new Date().getFullYear() - age;
}
```

이 방법의 문제는 함수가 호출하는 컨텍스트(스코프)에 대단히 의존적이라는 겁니다. 어떤 함수든, 프로그램 어디에서든 상관없이 name 값을 (의도적이든, 실수로든) 바꿀 수 있습니다.

개선해 봅시다
```js
let user = {
    name = "Irena",
    age = 25,
};

function greet(){
    console.log(`Hello, ${user.name}!`);
}

function getBirthYear(){
    return new Date().getFullYear() - user.age;
}
```

## 더 개선 하려면?
getter, setter사용하기?

## 변수 숨기기
```js
{
 //block 1
 const x = 'blue';
 console.log(x); // "blue"
}
console.log(typeof x); //"undefined" x는 스코프 밖에 있습니다.

{
    //block 2
    const x = 3;
    console.log(x); // "3"
}
console.log(typeof x); //"undefined" x는 스코프 밖에 있습니다.
```
```js
{
//외부블록
    let x ={color : "blue"};
    let y = x;  // y와 x는 같은 객체를 가리킵니다.
    let z = 3;
    {
        //내부블록
        let x = 5; // 이제 바깥의 x는 가려졌습니다.
        console.log(x); // 5
        console.log(y.color) // "blue"; y가 가리키는 외부 스코프의 x가 가리키는 객체는 스코프 안에 있습니다.
        y.color = "red"
        console.log(z) // 3; z는 숨겨지지 않았습니다.
    }
    console.log(x);
    console.log(x.color); // "red"; 객체는 내부 스코프에서 수정됐습니다.
    console.log(y.color); // "red"; x와 y는 같은 객체를 가리킵니다.
    console.log(z); // 3
}

```
# 클로저
**스코프를 함수 주변으로 좁히는 것**이라고 생각해도 됩니다.
```js
let globalFunc;
{
    let blockVar = 'a';
    globalFunc = function(){
        console.log(blockVar);
    }
}

globalfunc(); //a
```

globalFunc는 블록안에서 값을 할당 받았습니다. 이 블록 스코프와 그 부모인 전역 스코프가 클로저를 형성합니다.
globalFunc를 어디에서 호출하든 이 함수는 클로저에 있는 식별자에 접근할 수 있습니다.

globalFunc을 호출하면 이 함수는 스코프에서 빠져나왔음에도 불구하고 blockVar에 접근할 수 있습니다. 일반적으로 **스코프에서 빠져나가면 해당 스코프에서 선언한 변수는 메모리에서 제거해도 안전**합니다.
하지만 여기서는 스코프 안에서 함수를 정의했고, 해당 함수는 스코프 밖에서도 참조할 수 있으므로 자바스크립트는 스코프를 계속 유지합니다.
또한 일반적으로 접근할 수 없는 것에 접근하는 효과도 있습니다.
```js
let f;
{
    let o = {note : "Safe"};
    f = function(){
        return o;
    }
}

console.log(f()); //  {note : "Safe"}
let oRef = f();
oRef.note = "Not so safe after all!";
console.log(oRef); //  {note : "Not so safe after all!"}
```

# 즉시 호출하는 함수 표현식

6장에서 함수 표현식에 대해 설명했습니다. 함수 표현식을 사용하면 **즉시 호출하는 함수표현식(IIFE)**이라는 것을 만들 수 있습니다.
```js
(function(){
    //IIFE 바디
})();
```

함수 표현식으로 익명 함수를 만들고 그 함수를 즉시 호출합니다. IIFE의 장점은 내부에 있는 것들이 모두 자신만의 스코프를 가지지만, IIFE자체는 함수이므로 그 스코프 밖으로 무언가를 내보낼 수 있다는 겁니다.
```js
const message = (function() {
    const secret = "I'm a secret!";
    return `The secret is ${secret.length} characters long.`;
})();
console.log(message);
```

변수 secret은 IIFE의 스코프 안에서 안전하게 보호되며 외부에서 접근할 수 없습니다.
IIFE는 함수이므로 무엇이든 반환할 수 있습니다. 
```js
const f =(function(){
    let count = 0;
    return function(){
        return `${++count} times`;
    }
})();
f();// 1 times
f();// 2 times
```

# 함수 스코프와 호이스팅
ES6에서 let을 도입하기 전에는 var를 써서 변수를 선언했고, 이렇게 선언된 변수들은 함수 스코프라 불리는 스코프를 가졌습니다.
let으로 변수를 선언하면, 그 변수는 선언하기 전에는 존재하지 않습니다.
아직 선언되지 않은 변수와 값이 undefined인 변수는 다릅니다.

```js
let var1;
let var2 = undefined;
var1 ; // undefined;
var2; //undefined
undefindVar // Error
```
let을 쓰면 변수를 선언하기 전 사용하려 할 때 에러가 일어납니다.
```js
x // Error
let x =3 // 에러가 일어났으므로 여기까지 도달할 수 없습니다.
```
```js
x; //undefined
var x =3;
x; //3
```
## 자바스크립트는 함수나 전역 스코프 전체를 살펴보고 var로 선언한 변수를 맨 위로 끌어올립니다.
```js
var x; // var x= 3에서 var를 인식하고 맨 위로 올립니다.
x;
x=3;
x; // 3
```

# 함수 호이스팅
var로 선언된 변수와 마찬가지로, 함수 선언도 스코프 맨 위로 끌어올려집니다.
```js
f();
function f(){
    console.log('f');
}
```
변수에 할당된 함수표현식은 끌어올려지지 않습니다.
```js
f(); // error
var f = function(){ // var건 let이건 다 에러가 난다.
    console.log('f');
}
```

## 사각지대
사각지대란 let으로 선언하는 변수가 선언하기 전까지 존재하지 않는다는 직관적 개념을 잘 나타내는 표현입니다.
스코프 안에서 변수의 사각지대는 변수가 선언되기전의 코드입니다.
하지만 변수를 선언하기 전에 사용할 일은 거의 없습니다.

### typeof
typeof 연산자는 변수가 선언됐는지 알아볼 때 널리 쓰이고 존재를 확인하는 안전한 방법으로 알려져 있습니다.
```js
if(typeof x === "undefined"){
    console.log("x는 존재하지 않습니다.");
} else{
    //x를 사용해도 안전한 코드
}
```
ES6에서는 typeof 연산자로 변수가 정의됐는지 확인할 필요가 없으므로 **typeof를 사용할 필요가 없습니다.**

# 스트릭트 모드

스트릭트 모드에서는 암시적 전역변수를 허용하지 않습니다. 

