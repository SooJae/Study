```ts
interface Props {
    name:string;
    [key:string]: string;
}

const p: Props = {
    name: 'hello',
    a: 'd',
    b: 'e',
    c: 3 // Error!
    0:'d',
    1:'b'
}

console.log(p[0]);

let keys: keyof Props;

interface User {
    name: string;
    age: number;
    hello(msg:string): void;
}

let keysOfUser: keyof User;