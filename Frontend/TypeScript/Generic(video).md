```ts
function createPromise<T>(x: T, timeout:number){
    return new Promise<T>((resolve, reject) => {
        setTimeout(() => {
            resolve(x);
        },timeout);
    });
}

createPromise("eh", 100)
.then(v => console.log(v));
 
// 제네릭을 이용해서 유동적으로 String이든, Number든 바꿀 수 있다.
```

```ts
function createTuple2<T, U>(v:T, v2:U): [T, U]{
    return[v, v2];
}

function createTuple3<T, U, D>(v:T, v2:U, v2:D): [T, U, D]{
    return[v, v2, v3];
}

const t1 = createTuple2("user1", 1000);
```

## Class에서 제네릭 사용하기
```ts

class LocalDB<T> {
    constructor(private localStorageKey: string){
    }

    add(v : T) {
        localStorage.setItem(this.localStorageKey, JSON.stringify(v));
    }
    get() : T {
        const v = localStorage.getItem(this.localStoragyKey);
        return(v)? JSON.parse(v) : null;
    }
}

interface User {name: string}

const userDb = new LocalDB<User>('user'); //User를 위한 LocalDB이다.
userDb.add({name: 'jay'});
const user1 = userDb.get();
userA.name;

```


## Interface에서 제네릭 사용하기
```ts
interface DB<T> {
    add(v:T): void;
    get(): T;
}

class D implements DB<T> {//Error! Class에서도 <T>를 정의해줘야 interface에서도 T값을 가져올수 있다.

}

class LocalDB<T> implements DB<T> {
    constructor(private localStorageKey: string){
    }

    add(v : T) {
        localStorage.setItem(this.localStorageKey, JSON.stringify(v));
    }
    get() : T {
        const v = localStorage.getItem(this.localStoragyKey);
        return(v)? JSON.parse(v) : null;
    }
}
```
인터페이스에서 타입을 유지한채로 인터페이스를 유지할 수 있고, 클래스에서 받은 타입 파라미터 값을 인터페이스로 보내준다.


```ts
interface JSONSerializer {
    serialize(): string;
}

class LocalDB<T extends JSONSerializer> implements DB<T> {
    constructor(private localStorageKey: string){
    }

    add(v : T) {
        // localStorage.setItem(this.localStorageKey, JSON.stringify(v));
        localStorage.setItem(this.localStorageKey, v.serializer());
    }
    get() : T {
        const v = localStorage.getItem(this.localStoragyKey);
        return(v)? JSON.parse(v) : null;
    }
}
```

```ts
interface Vegetable{
    v: string;
}

interface Meat {
    m: string;
}

interface Cart2<T>{
    getItem():T extends Vegetable? Vegetable : Meat
}

const cart1: Cart2<String> = { // Vegetable이 아니므로 Meat이다.
    ...
}
```
제네릭을 사용하면 함수나 클래스나 인터페이스에서 하나의 타입만 처리하는 것이 아닌 여러 타입을 처리할 수 있게 한다.
또한 타입이 유지되면서 **Type Safe한 코드**를 작성 할 수 있게 해준다.