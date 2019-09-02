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

## 매개변수 해체
```js
function getSentence({subject, verb, object}){
    return `${subject} ${verb} ${object}`;
}

const o = {
    sub : "I",
    verb : "love",
    object : "JavaScript",
};

getSentence(o);
```
배열도 가능합니다.

### 확산 매개변수
ES5에서는 함수 바디 안에서만 존재하는 **특별한 변수 argments를 사용해서 확산과 비슷한 일을 할 수 있습니다**. arguments는 실제 배열이 아니라 **배열 비슷한 객체**이므로 특별 취급하거나 일반적인 객체로 변환해야 했습니다.

# 매개변수 기본값
일반적으로 매개변수에 값을 제공하지 않으면 undefined가 값으로 할당 됩니다.

```js
function f(a, b = "default", c=3){
    return `${a} - ${b} - ${c}`;
}

f(5, 6, 7); //"5 - 6 - 7"
f(5, 6); // "5 - 6 - 3"
f(5); // "5 - default - 3"
f(); // "undefined - default - 3"
```

# this 키워드
일반적으로 this는 객체의 프로퍼티인 함수에서 의미가 있습니다. 메서드를 호출하면 this는 호출한 메서드를 소유하는 객체가 됩니다.
```js
const o = {
    name : 'Wallace',
    speak() {return 'My';},
}

o.speak(); // My Wallace
```

this는 함수를 어떻게 선언했느냐가 아니라 어떻게 호출했느냐에 따라 달라진다는 것을 이해해야 합니다.
즉, this가 o에 묶인 이유는 **speak가 o의 프로퍼티여서가 아니라**, **o에서 speak를 호출**했기 때문입니다.
같은 함수를 변수에 할당하면 어떻게 되는지 봅시다.

```js
const speak = o.speak;
speak == o.speak; // true 같은 함수를 가리킵니다.
speak(); //"My undefined"
```

**(중요)객체의 프로퍼티인 함수 : 메서드**

## 복잡한 this
```js
const o = {
    name : 'Julie',
    greetBackwards : function(){
            function getReverseName(){
            let nameBackwards = '';
            for(let i = this.name.length-1 ; i>=0;i--){
                nameBackwards += this.name[i];
            }
            return nameBackwards;
        }
        return `${getReverseName()} si eman ym`;
    },
};

o.greetBackwards();
```

# 함수 표현식과 익명 함수
함수를 선언하면 함수에 **바디**와 **식별자**가 모두 주어집니다.
**익명 함수**에서는 함수에 식별자가 주어지지 않습니다.
함수에 식별자가 없다면 어떻게 호출할까요? 함수표현식이 있습니다.
함수표현식은 **식별자에 할당**할 수도 있고 **즉시 호출**할 수도 있습니다.

```js
const f = function(){
    ...
};
```
함수 이름을 정하고 다시 변수에 할당
```js
const g = function f(){
    ...
}
```
함수이름을 정하면 우선 g에 우선순위가 있습니다. f로 접근하면 에러가 생깁니다.
그럼 왜 이런 방식을 쓸까요?
**재귀함수를 구현할 때 사용합니다.**
```js
const g = function f(stop){
    if(stop) console.log('f stopped');
    f(true);
};

g(false);
```
이렇게 하면 함수가 어떻게 동작하는지 명확하게 설명할 수 있습니다.
함수 선언과 함수 표현식을 자바스크립트는 어떻게 구분할까요?

답은 **컨텍스트**입니다.
함수 선언이 표현식으로 사용됐다면 그건 함수 표현식입니다. 표현식으로 사용되지 않았다면 함수 선언입니다.

# 화살표 표기법 
화살표 표기법은 간단히 말해 function이라는 단어와 중괄호 숫자를 줄이려고 고안된 단축 문법입니다. 중요한 차이가 하나 있는데, 곧 설명하겠습니다.

- function을 생략해도 됩니다.
- 함수에 **매개변수가 하나 뿐**이라면 **괄호(())도 생략**할 수 있습니다.
- 함수 바디가 **표현식 하나**라면 중괄호와 return 문도 생략할 수 있습니다.

```js
const f1 = function() {return "hello";}
// 또는
f1 = () => "hello";

const f2 = function(name) {return `hello, ${name}`;}
// 또는
f2 = name => `hello, ${name}!`;

const f3 = function(a, b) {return a+b;}
//또는
f2 = (a, b) => a+b;
```


아까 예제를 고쳐봅시당
```js
const o = {
    name : 'Julie',
    greetBackwards : function(){
            function getReverseName(){
            let nameBackwards = '';
            for(let i = this.name.length-1 ; i>=0;i--){
                nameBackwards += this.name[i];
            }
            return nameBackwards;
        }
        return `${getReverseName()} si eman ym, olleH`;
    },
};

=>

const o ={
    name : 'Julie',
    greetBackwards : function () {
        const getReverseName = () => {
            let nameBackwards = '';
            for(let i =this.name.length-1; i>=0 ;i--){
                nameBackwards += this.name[i];
            }
            return nameBackwards;
        };
        return `${getReverseName()} si eman ym, olleH`;
    },
};
```
## 주의
화살표 함수는 객체 생성자로 사용할 수 없습니다.
argments 변수도 사용할 수 없습니다. 어차피 확산연산자(...)가 생겼으니 필요가 없습니다.

# call과 apply, bind
자바스크립트에서는 일반적인 방법 외에도 함수를 어디서 어떻게 호출했냐와 관계없이 this가 무엇인지 지정할 수 있습니다.
## call
```js
const bruce = {name :"Bruce"};
const madeline = {name : "Madeline"};
// 이 함수는 어떤 객체에도 연결되지 않았지만 this를 사용합니다.
function greet(){
    return `Hello, I'm ${this.name}!`;
}

greet(); // "Hello, I'm undefined! - this는 어디에도 묶이지 않았습니다.
greet.call(bruce); // "Hello, I'm Bruce! - this는 bruce
greet.call(madeline); // "Hello, I'm madeline! - this는 madeline
```
함수를 호출하면서 call을 사용하고 this로 사용할 객체를 넘기면 해당 함수가 **주어진 객체의 메서드**인 것처럼 사용할 수 있습니다.
call의 **첫 번째** 매개변수는 this로 사용할 값이고, 매개변수가 **더 있으면** 그 매개변수는 호출하는 함수로 전달됩니다.

```js
function update(birthDay, occupation){
    this.birthYear = birthYear;
    this.occupation = occupation;
}

update.call(bruce, 1949, 'singer');
//bruce 이제 {name : "Bruce", birthYear : 1949, occupation : "singer"} 입니다.
```

## apply
함수 **매개변수를 처리하는 방법**을 제외하면 call과 완전히 같습니다.  call은 일반적인 함수와 마찬가지로 매개변수로 받지만, apply는 **배열**로 받습니다.

```js
update.apply(bruce, [1955, "actor"]); 
//bruce 이제 {name : "Bruce", birthYear : 1955, occupation : "actor"} 입니다.
```

apply는 **배열 요소를 함수 매개변수**로 사용해야 할 때 유용합니다. 흔히 배열의 최댓값, 최솟값을 구할 때 사용합니다.
```js
const arr = [2, 3, -5, 15, 7];
Math.min.apply(null, arr); // -5
Math.max.apply(null, arr); // 15
```
this의 값에 null을 쓴 이유는 Math.min과 Math.max가 this와 관계없이 동작하기 때문입니다. 즉, 무엇을 넘기든 관계없습니다.

ES6의 확산 연산자를 써도 apply와 같은 결과를 얻을 수 있습니다. update메서드는 this값이 중요하므로 call을 사용해야 하지만, Math.min과 Math.max는 this 값이 무엇이든 관계없으므로 확산 연산자를 그대로 사용할 수 있습니다.
```js
const newBruce = [1940, "martial artist"];
update.call(bruce, ...newBruce); // apply(bruce, newBruce)와 같습니다.
Math.min(...arr); // -5
Math.max(...arr); // 15
```

this의 값을 바꿀 수 있는 마지막 함수는 bind 입니다. bind는 this의 값을 **영구**히 바꿀 수 있습니다.
```js
const updateBruce = update.bind(bruce);

updateBruce(1904, "actor");
// bruce는 이제 {name : "bruce", birthYear:1904, occupation : "actor"} 입니다.

updateBruce.call(madeline, 1274, "king");
// bruce는 이제 {name : "bruce", birthYear:1274, occupation : "king"} 입니다. madeline을 바꿨는데?
// madeline은 변하지 않았습니다.
```
bind는 함수의 동작을 영구적으로 바꾸므로 찾기 어려운 버그의 원인이 될 수 있습니다. bind를 사용한 함수는 **call이나 apply, 다른 bind와 함께 사용할 수 없**는거나 마찬가지입니다.
함수를 여기저기서 call이나 apply로 호출해야 하는데, this값이 그에 맞춰 **바뀌어야 하는 경우**를 상상해 보십시오.이럴때는 bind를 사용하면 문제가 생깁니다.

bind에 매개변수를 넘기면 항상 그 매개변수를 받으면서 호출되는 새 함수를 만드는 효과가 있습니다.

```js
//bruce가 태어난 해를 항상 1949로 고정하지만, 직업은 자유롭게 바꿀 수 있는 업데이트 함수
const updateBruce1949 = update.bind(bruce,1949);
updateBruce1949("singer, songwriter"); //bruce는 이제 {name : "bruce", birthYear:1949, occupation : "singer, songwriter"} 입니다.
```