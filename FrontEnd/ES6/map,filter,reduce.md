```js
 const products = [
    {name: '반팔티', price: 15000},
    {name: '긴팔티', price: 20000},
    {name: '핸드폰케이스', price: 15000},
    {name: '후드티', price: 30000},
    {name: '바지', price: 25000}
  ];
```
# Map
```js
const map = (f, iter) => {
    let res = [];
    for(const a of iter){
        res.push(f(a));
    }
    return res;
}

console.log(map(p => p.name, products));

// let names = [];
//     for(const p of products){
//         names.push(p.name);
//     }
//     console.log(names);

// let prices = [];
//     for(const p of products){
//         prices.push(p.price);
//     }
//     console.log(prices);

console.log(map(p => p.price, products));
```

# 이터러블 프로토콜을 따른 map의 다형성
```js
log([1, 2, 3].map(a => a + 1)); // 가능

// document.querySelectorAll은 Array를 상속받은 것이 아니어서 prototype에 map이 구현이 안되어 있다.
console.log(document.querySelectorAll('*').map());


const map = (f, iter) => {
    let res = [];
    for(const a of iter){
        res.push(f(a));
    }
    return res;
}

//밑의 식은 동작이 잘 된다. 이터러블 프로토콜을 사용하는 FOR OF문을 사용했기 때문에
console.log(map(el => el.nodeName, document.querySelectorAll('*')));

const it = document.querySelectorAll('*')[Symbol.iterator]();
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());

function *gen(){
    yield 2;
    if (false) yield 3;
    yield 4;
}
console.log(map(a=> a*a, gen()));
```

```js
let m = new Map();
m.set('a',10);
m.set('a',20);
const it = m[Symbol.iterator];
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
```

```js
let m = new Map();
m.set('a',10);
m.set('b',20);
console.log(new Map(map(([k,a])=> [k, a*2], m))); // ["a",20] ["b",40]
//{"a"=>20, "b"=>40}
```


# filter

```js



 const products = [
    {name: '반팔티', price: 15000},
    {name: '긴팔티', price: 20000},
    {name: '핸드폰케이스', price: 15000},
    {name: '후드티', price: 30000},
    {name: '바지', price: 25000}
  ];

const filter = (f, iter)=>{
    let res = [];
    for(const a of iter){
        if(f(a)) res.push(a);
    }

    return res;
};

// let under20000 = [];
// for(const p of products){
//     if(p.price<20000) under20000.push(p);
// }
// console.log(...under20000);



// let over20000 = [];
// for(const p of products){
//     if(p.price>=20000) over20000.push(p);
// }
// console.log(...over20000);


console.log(...filter(p=>p.price<20000, products));
console.log(filter(p=>p.price<20000, products));

//{ name: '반팔티', price: 15000 } { name: '핸드폰케이스', price: 15000 }
// [ { name: '반팔티', price: 15000 }, { name: '핸드폰케이스', price: 15000 } ]
// rest는 대 괄호가 없는 것을 알 수 있다. 대괄호 안의 값을 전부 return
```

# reduce
```js
const reduce = (f, acc, iter) => {
    for(const a of iter){
        acc = f(acc, a);
    }
    return acc;

}

const add = (a, b) => a + b;
console.log(reduce(add, 0, [1,2,3,4,5]));
// 15

//reduce는 재귀함수이다.
console.log(add(add(add(add(add(0, 1), 2), 3),4),5));
//15
```
```js
  log(
    reduce(
      add,
      map(p => p.price,
        filter(p => p.price < 20000, products))));

  log(
    reduce(
      add,
      filter(n => n >= 20000,
        map(p => p.price, products))));
```
오른쪽에서 왼쪽으로 읽어나가면 된다.
함수형적으로 사고를 하려면

reduce를 하고싶은데 add를 하려면

```js
console.log(
    reduce(
    add,
    [10,20,30,40] // 미리 더미값을 만든 후, 이 자리에 숫자들이 들어 갈 것이라는 기대를 가진다.
    // 그 후에 
    map(p => p.price, products) // 가 특정 숫자를 반환 할 것이라는 기대 값을 가지면 된다.
));
```
## 함수형 프로그래밍은 ~~ 할 것이다라는 생각을 가지면서 프로그래밍 한다.
