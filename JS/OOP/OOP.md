## 프로토타입
생성자에 있는 것은 생성할 때 만들어지는 것이고, 생성한 이후에 변경작업을 하지 않는다면 프로토타입이 갖는 유지보수의 편의성은 존재하지 않는다.

function은 그냥 함수지만 **new**를 붙여주면 객체를 반환한다.


##상속의 필요성
다른누군가 짠 라이브러리를 직접 수정하면, 그 라이브러리의 업데이트를 할 시에 다시 그 코드를 짜야한다.
또한 해당 기능을 거의 사용하지 않는 경우가 있을 때, 상속을 사용한다.


## 자바 vs 자바스크립트

자바는 class라는 공장에서 instace가 만들어진다. 이때 instace 객체는 상속을 받을 수 없고, 이 모든것은 class단에서 결정된다.
자바스크립트는 class없이 객체가 직접 상속을 받을 수 있다. 또한 그 상속관계를 바꿀 수 있다. (prototype link를 이용해서)


자바스크립트는 함수를 호출할 때 **new**를 붙이면 객체를 생성한다.


call은 실행되는 함수의 this값을 원하는 객체로 바꿔서 실행할 수 있게 해준다. 
bind는 실행되는 함수의 this값을 원하는 객체로 고정시키는 새로운 함수를 만들어낸다.


prototype vs __proto__

function Person(){} == var Person = new Function();



prototype 속성은 함수만 가지고 있던 것과는 달리(Person.prototype 기억나시죠?) 
__proto__속성은 모든 객체가 빠짐없이 가지고 있는 속성입니다.

__proto__는 객체가 생성될 때 조상이었던 함수의 Prototype Object를 가리킵니다. kim객체는 Person함수로부터 생성되었으니 Person 함수의 Prototype Object를 가리키고 있는 것이죠.


call,apply는 그냥 함수가 실행되도록 "도와"주는 것이고 bind 는 "새로운" 함수를 "만들어" 준다.



## arguments

함수가 정의한 파라미터 수 보다 인자를 많이 전달한 경우, 초과된 인자들을 버리지 않고 arguments라는 객체에 할당합니다.

arguments는 모든 함수에서 사용 가능한 지역변수 입니다.

arguments객체를 통하여 전달된 인자를 참조 할 수 있습니다.