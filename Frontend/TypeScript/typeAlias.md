```ts
interface User {
    name: string;
}

interface Action {
    do(): void;
}

type UserAction = User & Action;

function createUserAction(): UserAction {
    return {
        do() {},
        name: ''
    }
}

type StringOrNumber = string | number;
type Arr<T> = T[];
type P<T> = Promise<T>;

type User2 = {
    user: string;
    login(): boolean;
}

class UserImpl implements User2 {
    name: string;
    login(){

    }
}

type UserState = "PENDING" | "APPROVED" | "REJECTED";

function checkUser(user: User2): UserState {
    if(user.login()){
        return "APROVED";
    } else {
        return "REJECTED";
    }

}

```


https://medium.com/@alexsung/typescript-type%EA%B3%BC-interface-%EC%B0%A8%EC%9D%B4-86666e3e90c