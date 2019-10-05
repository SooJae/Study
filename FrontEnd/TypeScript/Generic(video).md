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