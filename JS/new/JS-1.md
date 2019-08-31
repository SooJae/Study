# 리터럴과 변수, 상수, 데이터 타입
## 데이터 타입
데이터가 0과 1이 아닌 우리가 익숙한 형태의 숫자, 텍스트, 날짜 등등
## 변수
이름이 붙은 값, 바뀔 수 있습니다.
```js
let targetTempC; // let targetTempC = undefined;와 같다.
```
## 상수
es6에서 생겼습니다. **보통 대문자와 밑줄**만 사용합니다.
변경 X

## 변수 vs 상수?
웬만하면 상수를 써야 합니다. 데이터 값이 아무 때나 막 바뀌는 것보다는, 고정된 값이 더 좋습니다.

## 식별자 이름
변수와 상수, 함수 이름을 식별자(identifier) 라고 부릅니다.
- 식별자는 반드시 글자나 기호($), 밑줄(_)로 시작해야 합니다.
- 식별자에는 글자와 숫자, 달러 기호, 밑줄만 쓸 수 있습니다.
- 파이()같은 유니코드 문자도 쓸 수 있습니다.
- 예약어는 식별자로 쓸 수 없습니다.
- 식별자는 대문자로 시작 X
- 밑줄 한 개 또는 두 개로 시작하는 식별자는 아주 특별한 상황, 또는 '내부' 변수에서만 사용합니다. 자신만의 특별한 변수 카테고리를 만들지 않는 한, 변수나 상수 이름을 밑줄로 시작하지 마십시오.

## 리터럴과 식별자의 차이
room1 변수에 값 "conference_room_a"을 할당한 것을 생각해 봅시다.
room1은 **변수를 가리키는 식별자**입니다.
그리고 "conference_room_a"은 **문자열 리터럴인 동시에 room1의 값**입니다.
자바스크립트는 따옴표를 통해 **리터럴**과 **식별자**를 구별합니다. 식별자는 숫자로 시작할 수 없으므로 숫자에는 따옴표가 필요 없습니다.

```js
let room1 = "conference_room_a" //"conference_room_a"(따옴표 안)은 리터럴이다.
let currentRoom = room1; //이제 currentRoom의 값은 room1의 값("conference_room_a")과 같다.
currentRoom = conference_room_a; //에러가 일어납니다. conference_room_a라는 식별자 존재 X
```

## 원시타입
- 숫자
- 문자열
- 불리언
- null
- undefined
- symbol

## 자바스크립트 내장객체
- Array
- Date
- RegExp
- Map과 WeakMap
- Set과 WeakSet

```js
16진수 : 0x
8진수 : 0o
지수 : 3.0e6 = 3,000,000;
const nan = NaN; // 숫자가 아님
```

```js
const small = Number.EPSILON; // 1에 더했을 때 1과 구분되는 결과를 만들 수 있는 가장 작은 값입니다. 근사치는 2.2e-16입니다.

const bigInt = Number.MAX_SAFE_INTEGER; // 표현할 수 있는 가장 큰 정수
const max = Number.MAX_VALUE; // 표현할 수 있는 가장 큰 숫자
const minInt = Number.MIN_SAFE_INTEGER; // 표현할 수 있는 가장 작은 정수
const min = Number.MIN_VALUE; // 표현할 수 있는 가장 작은 숫자
const nan = Number.NaN; // NaN
const nInf = Number.NEGATIVE_INFINITY; // -Infinity
const nInf = Number.POSITIVE_INFINITY; // Infinity
```

## " vs '
개인의 취향 차이지만 저는
" : 표시될 텍스트
' : 문자열 안에 HTML을 쓸 때. HTML 문자열을 작은따옴표로 감싸면 속성값에 큰 따옴표를 쓸 수 있기 때문입니다.

## 백틱 `
따옴표와 백틱을 섞어써도 됩니다.

## 심볼
Symbol은 유일한 토큰을 나타내기 위해 ES6에서 도입한 **새 데이터 타입**입니다. 심볼은 항상 **유일**합니다. 다른 어떤 심볼과도 일치하지 않습니다. 객체와 유사합니다. **객체는 모두 유일합니다.**
유일하다는 점을 제외하면 **심볼은 원시 값의 특징을 모두 가지고 있으므로** 확장성 있는 코드를 만들 수 있습니다.

심볼은 Symbol() 생성자로 만듭니다. 원한다면 생성자에 간단한 설명을 추가 할 수 있습니다.
**심볼을 만들 때 new 키워드를 사용하지 않는다(원래 대문자로 시작하는 식별자는 new와 함께쓰는게 룰이다.)**

# null과 undefined 규칙

## null 
프로그래머에게 허용된 타입

## undefined
자바스크립트 자체에서 사용합니다. 프로그래머도 사용할 수 있지만, 꼭 필요할 때만 사용해야 합니다. 값이 아직 주어지지 않은 변수일때 입니다.(값이 들어갈 것이라는 뜻)

# 객체
원시타입 : 단 하나의 값만 나타냄, 불변
객체 : 여러 가지 값이나 복잡한 값을 나타낼 수 있다. 변할 수 있다. 본질은 컨테이너. 즉, 내용물이 변해도 컨테이너는 변하지 않음.

# 숫자로 바꾸기
```js
const numStr = "33.3";
const num = Number(numStr); // 이 행은 숫자 값을 만듭니다.
                            // Number 객체의 인스턴스가 아닙니다.
```

parseInt나 parseFloat 함수는 Number생성자와 비슷하게 동작하지만, 몇 가지 다른 점이 있습니다. parseInt를 사용할 때는 기수(radix)를 넘길 수 있습니다. 기수는 변환할 문자열이 몇진수 표현인지 지정합니다. 예를들어 16진수를 변환할 때는 기수 16을 넘깁니다. 
문자열이 들어가있으면 무시합니다.
```js
const a = parseInt("16 volts",10); //10진수 16이 출력됩니다.
const b = parseInt("3a",16); // 16진수 3a를 10진수로 출력합니다. 58이 출력됩니다.
const c = parseFloat("155.5 sadjlew"); // parseFloat은 항상 기수가 10입니다. 155.5 출력
```


