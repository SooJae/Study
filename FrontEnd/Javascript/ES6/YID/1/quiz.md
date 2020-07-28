숫자 배열이 주어졌을 때 10보다 큰 숫자의 갯수를 반환하는 함수
```js

function countBiggerThanTen(numbers){
    numbers.filter(v => v >10);
            .reduce( acc => acc + 1 ,0);
}

const count = countBiggerThanTen([1,2,3,4,5,10,20,30,40,50,60]);
console.log(count);
```