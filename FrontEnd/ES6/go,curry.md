순서를 바꾸는 go함수
함수를 부분적으로 실행하는 curry함수


```js
const go = () => {};
go(
    0,
    a=>a+1,
    a=>a+10,
    a=>a+100,
    console.log
)

```

curry 함수에 fa 함수를 넣고나면,

fa 함수를 실행할 때 인자 x 를 1개만 넣을 경우,

인자 x를 기억하는 함수 fb 를 리턴하게 됩니다.

함수 fb를 나중에 실행하면서 y를 인자로 전달하면 fb가 fa를 실행하면서 x, y를 전달합니다. 

a => f(a) 라는 함수는 그냥 f와 하는 일이 같습니다.


```js
const add1 = a => a + 1;

const f1 = a => add1(a);

const f2 = add1;
```