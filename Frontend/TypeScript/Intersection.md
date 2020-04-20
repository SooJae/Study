```ts
interface User {
    name: string;
}

interface Action {
    do(): void;
}

function createUserAction(u: User, a: Action): User & Action {
    return {...u, ...a};
}

const u = createUserAction({name:'jay'}, {do() {}});

function compare(x:string, y:string);
function compare(x:number, y:number);
function compare(x: string | number, y: string | number){
    if( typeof x === 'number' && typeof ==='number'){
        return x === y ? 0 : x>y?1:-1;
    }

    if(typeof x === 'string' && typeof ==='string'){
        return x.localeCompare(y);
    }

    throw Error('not supported type');
}

const v = compare("1", "2");
console.log([3,2,1].sort(compare)); // 숫자코드
console.log(['c','b','a'].sort(compare));  // 문자코드
```

### localeCompare로 문자열을 비교할 수 있다.

**Generic** commands use the same command in different contexts to achieve conceptually the same outcome, even though details of the specific effects might differ.
**Overloaded** commands use variants of the same command to achieve different outcomes — sometimes depending on the context and other times depending on where the command appears on the screen.

```ts
function process (v:User | Action) {
    // 인터페이스는 자바스크립트에는 없다. 컴파일할때 사라지기 때문에 instanceof로 접근할 수도 없다.
    if((<Action>v).do) {// v는 액션이야!
        (<Action>v.do()) // 일일이 Action을 넣어줘야 하는데 귀찮다. 타입가드를 만들자!
    }
}
```

개선
```ts
//Type Assertion
function isAction(v: User | Action): v is Action { //V는 액션이다.
    return (<Action>v).do !== undefined; // do라는 속성이 있으면 액션이다.
}

function process (v:User | Action) {
    if(isAction(v)) { // 사용자 정의 타입 가드
        v.do() 
    } else { // Action이 아니니 User겠다.
        console.log(v.name)
    }
}
```