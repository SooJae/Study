```ts
interface User{
    name:string
}
interface Product {
    id:string;
    price: number;
}
class Cart {
    // protected user: User;
    private store: Object;
    constructor(protected user: User, private store: object = {}) { // 매개변수와 함께 접근제한자를 쓰게되면 이 속성이 정의됨과 동시에 new키워드로 클래스를 호출할 때 전달받은 값이 속성으로 추가된다.
        // this.user = user;
        this.store = {};
    }
    public put(id: string, product: Product) {
        this.user.name;
        this.store[id] = product;
    }
    get(id: string){
        return this.store[id];
    }
}
class PromotionCart extends Cart {
    addPromotion() {
        this.user.name
    }
}


const cart2 = new PromotionCart({name:'john'});
cart2.put()
cart2.addPromotion();
const cartJohn = new Cart ({name : 'john'});

const cartJay = new Cart ({name : 'jay'});
```

## 클래스2
```ts

interface Person {
    name:string;
    say(message: string): void;
}

interface Programmer {
    writeCode(requirement: string): string;
}

class KoreanProgrammer implements Person, Programmer {
    constructor(public name: string){

    }
    say(message: string): void {
        console.log('hi');
    }

    writeCode(requirement: string): string{
        console.log(requirement);
        return requirement+ '........';
    }

    loveKimchi(){
        console.log('love~ kimchi~');
    }
}

const jay = new KoreanProgrammer('jay');
```



```ts
// abstract는 완성이 되지 않은 클래스 라는 뜻이다.
abstract class Korean implements Person {
    public abstract jumin: number;
    constructor(public name: string){
        
    }

    say(msg: string){
        console.log(msg);
    }

    abstract loveKimchi(): void;
}


class KoreanProgrammer extends Korean implements Programmer {

    // Korean클래스에서 abstract가 정의된 것들은 꼭 구현 해야한다.
    constructor(public name: string, public jumin:number){
        super(name); // Korean의 생성자 함수를 호출
        

    }
    say(message: string): void {
        console.log('hi');
    }

    writeCode(requirement: string): string{
        console.log(requirement);
        return requirement+ '........';
    }

    loveKimchi(): void{
        console.log('love~ kimchi~');
    }
}

const jay = new KoreanProgrammer('jay', 2222);
const jay2 = new Korean('jay') // Error! 추상클래스의 인스턴스는 만들 수 없다.

//abstract와 interface 전부 구현해야 한다.
```