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