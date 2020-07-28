# Reduce
```js
const numbers = [1,2,3,4,5];

let sum =0;
numbers.forEach( n => {
    sum += n;
});

console.log (sum) //15
// reduce를 이용해서 한줄로 가능하다.

const sum = numbers.reduce((acc, cur) => acc + cur, 0);
//0은 초기 accumulator;
// acc = 0, cur = 1; 
console.log(sum) // 15


```

# Reduce 2
```js

const numbers = [1,2,3,4,5];

const sum = numbers.reduce((acc, cur, index, array) => {
 if( index === array.length -1 ){
     return (acc + cur) / array.length;
 }
 return acc + cur;
}, 0);
//0은 초기 accumulator;
// acc = 0, cur = 1; 
console.log(avg); // 15/5 => 3
```

# Reduce 3

```js
const alphabets = ['a','a','a','b','c','c','d','e'];
const counts =alphabets.reduce((acc, cur)=> {
    if(acc[cur]){
        acc[cur] += 1;
    } else {
        acc[cur] = 1;
    }
    return acc;
}, {})

console.log( counts );
// {a:3,b:1,c:2,d:1,e:1}

```

