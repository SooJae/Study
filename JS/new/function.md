# 함수 
## 함수 선언식
```js
function sayHello(){
    console.log("Hello world");
}

sayHello(); // Hello world
```

## 반환 값
```js
function getGreeting(){
    return "Hello world";
}

console.log(getGreeting()); // Hello world
```

## 호출과 참조
자바 스크립트에서 함수도 **객체**입니다. 
### 함수 식별자 뒤에 괄호()를 쓸 때
자바스크립트는 **함수를 호출하려 한다고 이해**하고, 함수 바디를 실행합니다.
그리고 함수를 호출한 표현식은 반환 값이 됩니다.
### 괄호()를 쓰지 않을 때
다른 값과 마찬가지로 **함수를 참조**하는 것이며, 그 함수는 **실행되지 않습니다.**

함수를 호출하지 않고 다른 값과 마찬가지로 참조하기만 할 수 있다는 특징은 자바스크립트를 매우 유연한 언어로 만듭니다. 예를 들어 함수를 변수에 할당하면 다른 이름으로 함수를 호출할 수 있습니다.
```js
const f = getGreeting;
f()
```

함수를 객체 프로퍼티에 할당할 수도 있습니다.
```js
const o ={};
o.f = getGreeting;
o.f(); // "Hello, world"
```

배열의 요소로 할당할 수도 있습니다.
```js
const arr = [1, 2, 3]; 
arr[1] = getGreeting; // [1, getGreeting, 2]
arr[1](); // "Hello World"
```

## 값 뒤에 괄호를 쓰면 자바스크립트는 이 값이 함수라고 간주하고 호출합니다.
"soojae"()는 TypeError:"whoops" is not a function 에러를 일으킵니다.

함수를 호출하면 함수 매개변수는 **변수 자체**가 아니라 **그 값**을 전달받습니다.

```js
function f(x){
    console.log(`f 내부: x=${x}`);
    x = 5;
    console.log(`f 내부: x=${x} (할당 후)`);
}

let x = 3;
console.log(`f를 호출하기 전 : x=${x}`);
f(x);
console.log(`f를 호출한 다음 : x =${x}`);

// x =3
// f내부 x =3
// 할당후 5
// x =3;
```

중요한 것은 x에 값을 할당하더라도 함수 바깥의 변수 x에는 아무 영향도 없다는 것입니다. 이름은 같지만, 둘은 다른 개체입니다.

함수 안에서 **매개변수에 값을 할당해도 함수 바깥에 있는 어떤 변수에도 아무런 영향이 없습니다**. 하지만 함수 안에서 객체 자체를 변경하면, 그 객체는 함수 바깥에서도 바뀐 점이 반영됩니다.

```js
function f(o){
    o.message = `f안에서 수정함`;
}

let o = {
 message: "초기 값"
};
console.log(`f를 호출하기 전: o.message ="${o.message}"`);
f(o);
console.log(`f를 호출한 다음: o.message ="${o.message}"`);

// 초기 값
// f안에서 수정함
```

이 예제를 보면 함수 f안에서 객체 o를 수정했고, 이렇게 바꾼 내용은 **함수 바깥에서도 o에 그대로 반영되어 있음**을 알 수 있습니다.
이것이 원시 값과 객체의 핵심적인 차이입니다. **원시값은 불변**이므로 수정할 수 없습니다. **원시 값을 담은 변수는 수정할 수 있지만 원시값 자체는 바뀌지 않습니다**. 반면 **객체는 바뀔 수 있습니다**.

함수 안의 o와 함수 바깥의 o는 서로 다른 개체입니다. 하지만 **둘은 같은 객체를** 가리키고 있습니다. 할당을 이용해서 차이점을 알아봅시다.

```js
function f(o){
    //o.message 의 순서가 f함수의 o객체 뒤에 있으면 f함수의 o의 프로퍼티만 바뀐다.
    o.message = "f에서 수정함";
    o = {
        message:"새로운 객체!"
    };
    console.log(`f내부 : o.message ="${o.message}"(할당 후)`);
}

let o = {
    message:"초기 값"
};

console.log(`f를 호출하기 전 : o.message="${o.message}"`);
f(o);
console.log(`f를 호출한 다음 : o.message="${o.message}"`);

// f를 호출하기 전 : o.message = "초기 값"
// f 내부 : o.message = "새로운 객체!" (할당 후)
// f를 호출 한 다음 : o.message = "f에서 수정함"
```

이 예제를 이해하는 핵심은 함수 내부의 매개변수 o와 함수 바깥의 변수 o가 **다르다**는 겁니다.
f를 호출하면 **둘은 같은 객체**를 가리키지만, f내부에서 o에 **할당한 객체는 새로운, 전혀 다른 객체**입니다. 함수 바깥의 **o는 여전히 원래 객체**를 가리키고 있습니다.


## 매개변수가 함수를 결정하는가?
## 여러 언어에서 함수의 시그니처에는 매개변수가 포함됩니다.(오버로딩)
f() 함수와  f(x) 함수는 다른함수
f(x,y) 함수와 f(x) 함수는 다른함수

## 하지만 자바스크립트에서는
f()와 f(x)는 같은 함수 (띠용!)

예시
```js
function f(x){
    return `in f : x =${x}`;
}
f(); // "in f: x=undefined"
```