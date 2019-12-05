## 타입 스크립트 설치
$ npm install -g typescript
## tslint 플러그인 설치

## 타입 스크립트 실행
$ tsc FrontEnd/TypeScript/main

후에 main.js가 생긴다
## 타입 스크립트 실시간 변화 적용
$ tsc FrontEnd/TypeScript/main --w

### 실시간 변화 적용으로 인해 에러를 바로 발견
```js
let x = 10;
const y = 20;

//let x =30; // error! 를 바로 발견해서 알려준다.
let sum;
const title; // error! const를 할당해주지 않아서 에러가 난다.
```

## 제네릭 기능
```js
let isbeginner = true;//가능! 하지만 나는 true값만 받고 싶어! 다른건 에러나오게 해줘!
let isbeginner: boolean = true;

//이하동문
let total: number = 0;
let name: string ="soojae";
name = true; //error! boolean 타입이 아니므로

let sentence : string = `My name is ${name}`;
console.log(sentence);

// 배열
let list1: number[] = [1, 2, 3];
let list1: Array<number> = [1, 2, 3];
//튜플 : 짝맞추기
let person1: [string, number] = ['Chris', 22];


enum Color {Red =5, Green, Blue};
let c: Color = Color.Green;
console.log(c); // 값은 6이 나온다. 자신이 판단해서 전 값이 5이니 6으로 알아서 할당한다.
//Red값도 할당을 안하면? 0, 1 ,2 ... 이런식이기 때문에 1이 할당된다.

//모든 타입을 허용
let randomValue: any = 10;
```
:number :string :boolean에 따라 자동완성 기능도 변화된다!

```js
function hasName(obj: any): obj is { name: string }{
    return !!obj &&
        typeof obj === "object" &&
        "name" in obj
}
if(hasName(myVariable)){
    console.log(myVariable.name);
}
```

```js
//Union 타입은 특정 타입을 제한한다.
let multiType: number | boolean;
multiType = 20;
multiType = true;

// any타입은 특정 타입을 따로 제한을 두지 않는다.
let anyType: any;
anyType = 20;
anyType = true;

//또한 anyType은 intellisence가 작동하지 않는다.

```

```js
//return 타입도 number다
function add(num1: number, num2: number): number{
    return num1 + num2;
}
add(5,10); // 15


// ? 는 undefined를 반환한다.
function add(num1: number, num2?: number): number{
    return num1 + num2;
}
add(5,10); // 15
add(5); //NaN
```

```js
//응용하면 오버라이딩 기능 가능!
//num2: number =10 으로 default 값도 줄수 있다.
function add(num1: number, num2?: number): number{
    if(num2){
        return num1 + num2;
    } else {
        return num1;
    }
}
add(5,10); // 15
add(5); // 5
```

```js
function fullName(person: {firstName: string, lastName: string}){
    console.log(`${person.firstName} ${person.lastName}`);
}

let p = {
    firstName: 'Bruce',
    lastName : 'Wayne'
};

fullName(p);
```
모양새가 영 좋지 않다... interface를 활용해보자!

```js
interface Person {
    firstName: string;
    lastName: string;
    // lastName?: string; 물론 여기도 ?가 사용이 가능하다!
}

function fullName(person: Person){
    console.log(`${person.firstName} ${person.lastName}`);
}

let p = {
    firstName: 'Bruce',
    lastName : 'Wayne'
};

fullName(p);
``` 
이런 선택적 프로퍼티는 등록폼에서 사용할 수 있다! 옵션 문항일때 사용!

```js
class Employee{
    employeeName: string;
    // private employeeName: string; 

    constructor(name: string){
        this.employeeName = name;
    }

    greet(){
        console.log(`Good Morning ${this.employeeName}`);
    }
}

let employee = new Employee('SooJae');
console.log(employee.employeeName);
employee.greet();

class Manager extends Employee {
    constructor(managerName: string){
        super(managerName);
    }
    delegateWork(){
        console.log(`Manager tasks`);
    }
}

let m1 = new Manager('Bruce');
m1.delegateWork();
m1.greet();
console.log(m1.employeeName);
```
public : 전부 접근 가능!
private : 클래스 안에서만 접근 가능
protected : 클래스를 상속받은 클래스까지만 가능



참고 https://ivvve.github.io/2019/10/09/js/ts/typescript-eslint&airbnb/