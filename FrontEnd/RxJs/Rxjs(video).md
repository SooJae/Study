Iterable


문자열이나 배열과 같이 무언가를 담고있는 것의 행동 규약
순차적으로 값을 빼올 수 있어야 한다.
Symbol.iterator를 키로 갖고 있어야 한다.
Iterator를 실행하면 iterable한 객체가 반환되어야 한다.
Iterable이란?
연속된 값을 만드는 목적을 가지고 한번에 하나의 값을 만들어 낸다.

```js
next : function (){
    return {
        value : 1, // 연속된 값중에서 현재 값
        done : false // 연속된 값의 끝남 여부
    }
}
```

```js
const item = "leesujae";
const leesujaeIterable = {
    [Symbol.iterator]() { 
        // [Symbol.iterator] :  function() {}과 같은 표현
        let i = 0;
        return {
            next() {
                const value = item[i], done;
                i++;
                const done = i> item.length;
                return {
                    value, done
                }
            }
        }

    }
}
for(const v of leesujaeIterable) {
    console.log(v);
    // 'l','e','e' ... 
}
```
