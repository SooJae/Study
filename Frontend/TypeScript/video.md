타입스크립트는 컴파일 시간을 가진다.
type을 검사하는 시간이 있는 것.

타입스크립트의 장점 
1. 강력한 타입으로 대규모 애플리케이션 개발에 용이
2. 유명한 자바스크립트 라이브러리와의 편리한 사용
3. 개발 도구에서의 강력한 지원

# Typescirpt 환경 만들기
$ tsc --init
$ node init -Y
후에 tsconfig.jso에서 exclude에 node_modules를 제외 시켜준다.

이제 tsc만으로 컴파일이 된다!

tsconfig의 sourceMap을 사용하면 js파일과 연결되어있는 ts파일을 볼 수 있다.(없으면 js파일만 볼 수 있다.)

# Interface
인터페이스는 **속성**, **행위**를 정한다. 
인터페이스는 구현을 하지 않는다.
인터페이스는 구현체랑 관련없는 기능들을 쓴다.(LG TV건 삼성TV건 티비를 켜고 끄는 것은 같다.)
```ts
interface TV {
    turnOn(); // default void
    turnOff(): boolean; 
}

const myTV: TV ={
    turnOn(){

    },
    turnOff(){
        return true
    }
}

function tryTurnOn(tv: TV){
    tv.turnOn();
}

tryTurnOn(myTV);
```

## 속성
```js
interface Cell {
    row: number;
    col: number;
    piece?: Piece; //Optional한 속성이다.
}

interface Piece {
    move(from:Cell, to:Cell):boolean;
}

function createBoard(){
    const cells: Cell[] = [];
    for(let row=0; row<4; row++){
        for(let col=3; col<3; col++){
            cells.push({
                row:row, // 변수와 속성이 같으면 row만 써도 된다.(es6)
                col:col // 변수와 속성이 같으면 col만 써도 된다.(es6)
            })
        }
    }
    return cells;
}

const board = createBoard();
// 보드의 0번째에 피스를 올린다.
board[0].piece = {
    //piece는 move 속성을 꼭 갖고 있어야 한다.
    move(from: Cell, to:Cell){
        return true;
    }
}
```
인터페이스를 보고 어떤 기능과 어떤 속성이 있는지 알 수 있다.

컴파일을 하면 interface 부분은 사라진다. 즉 interface 코드의 양이 많다고 해서 실제로 끼치는 영향은 없다.
견고하게 코드를 만들 수 있다.

서버에서 회원가입을 할 때, 꼭 있어야 할 것들 (아이디, 패스워드 등)을 interface를 이용하여 정의할 수 있다.

# 함수형 타입

```ts
function buildUserInfo(name?:string, email?:string){
    return {name, email}
}

const user = buildUserInfo();
```

## Default 값이 있을 경우
```ts
function buildUserInfo(name = "soojae" , email ="soojae@"){
    return {name, email}
}

const user = buildUserInfo();
```

## 함수형
```ts
const add2 = (a: number, b:number): number => a+b;
```

## 오버로딩
```ts
interface Storage {
    a: string;
}
interface ColdStorage {
    b: string;
}
// 함수 시그니처를 여러개 만들면 함수 오버로딩이라 한다.
function store(type: "통조림"): Storage;
function store(type: "아이스크림"): ColdStorage;
// |을 Union Type이라 한다.
function store(type: "통조림" | "아이스크림"){
    if(type === "통조림"){
        return { a: "통조림" } 
    } else if (type ==="아이스크림"){
        return { b: "아이스크림" }
    } else {
        throw new Error('unsurpported type');
    }
}

const s = store('통조림');
s.b
```

# Enum
Enum을 열거할 때 사용한다.
```ts
enum StarbucksGrade {
    WELCOME, // 0 이 생략되어 있다.
    GREEN, // 1 이 생략되어 있다.
    GOLD // 2 가 생략되어 있다.
}

function getDiscount(v: StarbucksGrade): number {
    switch(v) {
        case StarbucksGrade.WELCOME:
            return 0;
        case StarbucksGrade.GREEN:
            return 5;
        case StarbuksGrade.GOLD:
            return 10;
    }
}

console.log(getDiscount(StarbucksGrade.GREEN));
console.log(StarbucksGrade["0"])
```

Enum Default값 대신 직접 값을 정해놓는 것이 유지보수 측면에서 좋다.
```ts
enum StarbucksGrade{
    WELCOME = 0,
    BRONZE = 3, // 직접 값을 할당했기 때문에 나중에 등급이 중간에 추가되더라도 문제가 없다.
    GREEN = 1,
    GOLD = 2
}
```
문자열로 할당해주는 것도 좋다. (대문자)
```ts
enum StarbucksGrade{
    WELCOME = "WELCOME",
    BRONZE = "BRONZE", // 직접 값을 할당했기 때문에 나중에 등급이 중간에 추가되더라도 문제가 없다.
    GREEN = "GREEN",
    GOLD = "GOLD"
}
```