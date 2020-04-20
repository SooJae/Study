# 배열과 객체의 차이!
배열은 값을 가지며 각 값에는 숫자형 인덱스가 있습니다.
객체는 프로퍼티를 가지며 각 프로퍼티에는 문자열이나 심볼 인덱스가 있습니다.

배열에는 순서가 있습니다. 즉, arr[0]은 항상 arr[1]보다 앞에 있습니다. 반면 객체에는 그런 순서가 보장되지 않습니다. obj.a가 obj.b보다 앞에 있다고 말할 수는 없습니다.
객체를 정말 객체답게 만드는 프로퍼티에 대해 생각해 봅시다. 프로퍼티 키(문자열 또는 심볼)과 값으로 구성됩니다. 객체의 진짜 특징은 키를 통해 프로퍼티에 접근할 수 있다는 점입니다.

# 프로퍼티 나열
프로퍼티 나열에서 기억해야 할 것은 **순서가 보장되지 않는다.**는 점입니다. 여러번 테스트를 해 봤는데도 프로퍼티가 입력한 순서대로 나열될 수도 있습니다. 거의 항상 그렇게 될 수도 있습니다.


```js
const SYM = Symbol();

const o = {a:1, b:2, c:3, [SYM]:4};

for(let prop in o){
    if(!o.hasOwnProperty(prop)) continue;
    console.log(`${prop}:${o[prop]}`);
}
```


```js
class Car {
    constructor(make, model){
        this.make = make;
        this.model = model;
        this._userGears = ['P','N','R','D'];
        this._userGear = this._userGears[0];
    }

    get userGear() { return this._userGear; }
    set userGear(value) {
        if(this._userGears.indexOf(value)<0)
            throw new Error(`Invalid gear : ${value}`);
        this._userGear=value;
    }
    shift(gear) { this.userGear = gear;}
}

```
_변수 : private이라는 뜻입니다. (실제 private으로 동작하진 않습니다.)
하지만 _은 가짜 접근 제한자 이기때문에 다른 방안을 생각해야합니다.

프로퍼티를 꼭 보호해야 한다면 스코프를 이용해 보호하는 WeakMap 인스턴스를 사용할 수 있습니다. Car 클래스를 다음과 같이 고치면 기어 프로퍼티를 완벽하게 보호할 수 있습니다.

```js
const Car = (function(){
    const carProps = new WeakMap();

    class Car{
        constructor(make, model){
            this.make = make;
            this.model = model;
            this._userGears = ['P','N','R','D'];
            carProps.set(this, {userGear:this._userGears[0]});
        }
        get userGear() { return this._userGear; }
        set userGear(value) {
            if(this._userGears.indexOf(value)<0)
                throw new Error(`Invalid gear : ${value}`);
            this._userGear=value;
        }
        shift(gear) { this.userGear = gear;}
    }
    return Car;
})();
```
여기서는 즉시 호출하는 함수 표현식을 써서 WeakMap을 클로저로 감싸고 바깥에서 접근할 수 없게 했습니다.
WeakMap은 클래스 외부에서 접근하면 안 되는 프로퍼티를 안전하게 저장합니다.

# 프로토타입
**클래스의 인스턴스에서 사용할 수 있는 메서드**라고 하면 그건 프로토타입 메서드를 말하는 것입니다.

예를 들어 Car의 인스턴스에서 사용할 수 있는 shift 메서드는 프로토타입 메서드입니다.
프로토타입 메서드는 Car.prototype.shift처럼 표기할 때가 많습니다. **Array의 forEach를 Array.prototype.forEach**라고 쓰는 것과 마찬가지로 말입니다. 자바스크립트가 프로토타입 체인을 통해 어떠헤 동적 디스패치를 구현하는지 알아봅시다.


모든 함수에는 prototype이라는 특별한 프로퍼티가 있습니다. 

```
최근에는 프로토 타입 메서드를 #으로 표시하는 법이 널리 쓰입니다.
Car.prototype.shift를 Car#shift로 쓰는 겁니다.
```

**모든 함수에는 prototype이라는 특별한 프로퍼티**가 있습니다.
함수의 prototype 프로퍼티 중요해지는 시점은 **new 키워드로 새 인스턴스를 만들었을 때**입니다. new 키워드로 만든 새 객체는 생성자의 prototype 프로퍼티에 접근할 수 있습니다.
 객체 인스턴스는 생성자의 prototype 프로퍼티를 \_\_proto__ 프로퍼티에 저장합니다.
```
__proto__ 프로퍼티는 자바스크립트의 내부 동작 방식에 영향을 미칩니다. 밑줄 두개로 둘러싼 프로퍼티는 모두 그렇습니다. 
이런 프로퍼티를 수정하는 것은 정말로 위험합니다! 자바스크립트를 충분히 이해하기 전에는 이들 프로퍼티를 살펴보기만 하고 손대지는 말아야합니다.
```

프로토타입에서 중요한 것은 **동적 디스패치**라는 매커니즘입니다. 여기서 디스패치는 **메서드 호출**과 같은 의미입니다. 
객체의 프로퍼티나 메서드에 접근하려 할 때 그런 프로퍼티나 메서드가 존재하지 않으면 자바스크립트는 객체의 **프로토타입에서 해당 프로퍼티나 메서드를 찾습니다**. 
**클래스의 인스턴스는 모두 같은 프로토타입을 공유하므로 프로토타입에 프로퍼티나 메서드가 있다면 해당 클래스의 인스턴스는 모두 그 프로퍼티나 메서드에 접근할 수 있습니다.**


자바스크립트 동작 : 인스턴스를 체크 -> 없을 시 -> 프로토타입 체크

```js
// Car 클래스는 이전에 만든, shift 메서드가 있는 클래스입니다.
const car1 = new Car();
const car2 = new Car();

//car1 인스턴스나 car2 인스턴스에 따로 shift함수를 만들어 주지 않아서 클래스의 프로토 타입을 체크한다.
car1.shift === Car.prototype.shift ; // true
car1.shift('D');
car1.shift('d'); //error
car1.userGear; // 'D'
car1.shift === car2.shift // true

car1.shift = function(gear) {this.userGear = gear.toUpperCase();}
car1.shift === Car.prototype.shift // false
car1.shift == car.shift //false
car1.shift('d');
car1.userGear; // 'D'
```

# 정적 메서드
## 메서드 종류
인스턴스 메서드 : 인스턴스에서 사용하게끔 만든 메서드
정적 메서드 : this인스턴스가 아니라 **클래스 자체**에 묶입니다.
하지만 일반적으로 정적 메서드에는 this 대신 클래스 이름을 사용하는 것이 좋은 습관입니다.

## 정적 메서드란
정적메서드는 클래스에 관련되지만 인스턴스와는 관련이 없는 범용적인 작업에 사용됩니다.
예제로 자동차 식별 번호(VIN)을 붙이는 메서드를 생각해 봅시다.
개별 자동차가 자신만의 VIN을 생성하는 것은 불가능 합니다. VIN을 할당한다는 것은 자동차 전체를 대상으로 하는 추상적인 개념이므로 정적 메서드로 사용하는게 어울립니다. 
 정적 메서드는 여러 인스턴스를 대상으로 하는 작업에도 종종 쓰입니다.
 

```js
class Car{
    static getNextVin(){
        return Car.nextVin++; // this대신 Car를 앞에 쓰면 정적메서드라는 점을 알기쉽다.
    }

    constructor(make, model){
        this.make = make;
        this.model = model;
        this.vin = Car.getNextVin();
    }

    static areSimilar(car1, car2){
        return car1.make === car2.make && car.model === car2.model;
    }
    static areSame(car1, car2){
        return car1.vin === car2.vin;
    }
}

Car.nextVin = 0;
const car1 = new ("Tesla", "S");
const car2 = new ("Mazda", "3");
const car3 = new ("Mazda", "3");

car1.vin; // 0
car2.vin; // 1
car3.vin; // 2

Car.areSimilar(car1, car2) // false
Car.areSimilar(car2, car3) // true
Car.areSame(car2, car3) //false
Car.areSame(car2, car2) //true
```

# 상속
```js
const v = new Vehicle();
v.addPassenger("Frank");
v.addPassenger("Judy");
v.passengers; // ["Frank","Judy"]

const c = new Car();
c.addPassenger("Alice");
c.addPassenger("Cameron");
c.passengers; // ["Alice","Cameron"]
c.deployAirbags(); // error
c.deployAirbags(); //"BWOOSH!"
```
c에서는 v를 호출할 수 있지만 반대는 불가능합니다. (당연한 이야기 입니다.)

# 다형성
```js
class Motorcycle extends Vehicle{
    const c = new Car();
    const m = new Motorcycle();

    c instanceof Car; // true
    c instanceof Vehicle; // true
    m instanceof Car; // false
    m instanceof Motorcycle; // ture
    m instanceof Vehicle; // true
}
```
자바스크립트의 모든 객체는 루트 클래스인 Object의 인스턴스입니다.
즉, 객체 o 에서 o instanceof Object는 항상 true입니다. (`__proto__`프로퍼티를 수정한다면 다른 결과가 나올 수도 있습니다.)
**모든 객체가 Object의 인스턴스인 것은 toString 같은 중요한 메서드를 상속하기 위해서**이며, 염두에 둘 만큼 중요한 영향은 없습니다.

# 객체 프로퍼티 나열 보기

```js
class Super{
    constructor(){
        this.name = 'Super';
        this.isSuper = true;
    }
}

// 유효하지만, 권장하지는 않습니다.
Super.prototype.sneaky = 'not recommended!';

class Sub extends Super{
    constructor(){
        super();
        this.name = 'Sub';
        this.isSub = true;
    }
}

const obj = new Sub();

for(let p in obj){
    console.log(`${p} : ${obj[p]}`+(obj.hasOwnProperty(p)? '': '(inherited)'));
}
```
name, isSuper, isSub 프로퍼티는 모두 **프로토타입 체인이 아니라 인스턴스**에 정의됐습니다.
(슈퍼클래스 생성자에서 선언한 프로퍼티는 서브클래스 인스턴스에도 정의 됩니다.) 반면 sneaky 프로퍼티는 **슈퍼클래스의 프로토타입에 직접 정의**했습니다.

Object.keys를 사용하면 프로토타입 체인에 정의된 프로퍼티를 나열하는 문제를 피할 수 있습니다.

# toString
모든 객체는 Object를 상속하므로 Object의 메서드는 기본적으로 모든 객체에서 사용할 수 있습니다.
객체의 기본적인 문자열 표현을 제공하는 toString도 그런 메서드 중 하나입니다.
toString의 기본동작은 "[object Object]"를 반환하는 것인데 이건 거의 쓸모가 없습니다.
toString 메서드에서 객체에 관한 중요한 정보를 제공한다면 디버깅에도 유용하고, 객체를 한눈에 파악할 수 있습니다. Car클래스의 toString 메서드가 제조사, 모델, VIN을 반환하도록 고쳐봅시다.

```js
class Car {
    toString() {
        return `${this.make} ${this.model} : ${this.vin}`;
    }
}
```
이제 Car의 인스턴스에서 toString을 호출하면 객체 식별에 필요한 정보를 얻을 수 있습니다.

# 다중 상속, 믹스인, 인터페이스
일부 객체지향 언어에서는 다중 상속이란 기능을 지원합니다.
이 기능은 클래스가 슈퍼클래스 두개를 가지는 기능이며, 슈퍼클래스의 슈퍼클래스가 존재하는 일반적인 상속과는 다릅니다.
다중 상속에는 충돌의 위험이 있습니다. 그래서 많은 언어가 다중상속을 지원하지 않습니다.( 대신 Interface를 사용합니다. )

# 그렇다면 자바스크립트는 어떻게 했을까?
자바스크립트는 프로토타입 체인에서 여러 부모를 검색하지는 않으므로 단일 상속 언어라고 해야 하지만, 어떤 면에서는 다중 상속이나 인터페이스보다 더 나은 방법을 제공합니다.
다중 상속이 필요한 문제에 대한 해답으로 내놓은 개념이 `믹스인`입니다.
믹스인이란 기능을 필요한 만큼 섞어 놓은 것입니다. 자바스크립트는 **느슨한 타입**을 사용하고 대단히 관대한 언어이므로 그 어떤 기능이라도 언제든, 어떤 객체에든 추가할 수 있습니다.

```js
class InsurancePolicy {}
function makeInsurable(o) {
    o.addInsurancePolicy = function(p) { this.insurancePolicy = p; }
    o.getInsurancePolicy = function() { return this.insurancePolicy; }
    o.isInsured = function() { return !!this.insurancePolicy; }
}

makeInsurable(Car);

const car1 = new Car();
car1.addInsurancePolicy(new InsurancePolicy()); //error 
```

"addInsureancePolicy가 프로토타입 체인에 존재하지 않으니 당연하지" -> 틀렸습니다.
그렇게 해도 가입할 수 없습니다. 자동차를 추상화한 개념의 보험에 가입할수는 없습니다.
```js
const car1 =new Car();
makeInsurable(car1);
car1.addInsurancePolicy(new InsurancePolicy()) //works
```
이렇게 하면 되긴 하지만 1억개가 있다면 복잡해집니다.

prototype을 사용해 봅시다.
```js
makeInsurable(Car.prototype);
const car1 = new Car();
car1.addInsurancePolicy(new InsurancePolicy()); // works
```
Interface 느낌납니다.
자동차회사 : Car 클래스의 개발과 관리를 담당
보험회사 : InsurancePolicy 클래스와 makeInsurable 믹스인을 관리
두 회사의 업무가 충돌할 가능성을 완전히 없앤 건 아니지만, 모두가 거대한 Car 클래스에 달라붙는 것보다 낫습니다.

shift 메서드를 만들게 된다면 Car클래스의 동작이 이상해질 겁니다. instanceof 연산자로 보험에 가입할 수 있는 객체를 식별할 수도 없습니다.
'addInsurancePolicy 메서드가 있다면 틀림없이 보험에 가입할 수 있다.' 는 식의 짐작만 가능합니다.

심볼을 사용하면 이런 문제 일부를 경감할 수 있습니다. 보험회사에서 범용적인 메서드를 사용해서 우연히 Car클래스의 메서드와 충돌한다면, 보험회사에 키를 **모두 심볼로 사용해 달라**고 할 수 있습니다.

```js
class InsurancePolicy {}
function makeInsurable(o) {
    o.addInsurancePolicy = function(p) { this.insurancePolicy = p; }
    o.getInsurancePolicy = function() { return this.insurancePolicy; }
    o.isInsured = function() { return !!this.insurancePolicy; }
}

// ----------------------- 변화 -------------------------

class InsurancePolicy {}
const ADD_POLICY = Symbol();
const GET_POLICY = Symbol();
const IS_INSURED = Symbol();
const _POLICY = Symbol();
function makeInsurance(o){
    o[ADD_POLICY] = function(p) {this[_POLICY] = p;}
    o[GET_POLICY] = function() {return this[_POLICY];}
    o[IS_INSURED] = function() {return !!this[_POLICY];}
}
```
심볼을 썼으므로 충돌할 가능성은 없습니다.
메서드 이름에는 일반적인 문자열을 쓰고 데이터 프로퍼티에는 _POLICY 같은 심볼을 쓰는 절충안을 생각할 수도 있습니다.

