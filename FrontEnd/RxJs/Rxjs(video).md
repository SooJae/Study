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

<<<<<<< HEAD
=======
course-dialog.component.ts에서 input과 save 버튼을 viewchild로 한 이유 : 

# exhaustMap

데이터를 보내면 데이터가 완료될 때까지 그 이후의 값들이 들어와도 실행되지 않는다.


```js
 fromEvent(this.saveButton.nativeElement, 'click')
        .pipe(
          exhaustMap(() => this.saveCourse(this.form.value))
        )
        .subscribe();
``` 

```js
const interval1$ = interval(1000);
const sub = interval1$.subscribe(console.log);
setTimeout(() => sub.unsubscribe(), 5000);
```
을 다음과 같이 바꿀 수 있다.

```js
const http$ = createHttpObservable('/api/courses');
const sub = http$.subscribe(console.log);
setTimeout(() => sub.unsubscribe(), 0);
```
구독 취소를 할 수 있다.


# Rxjs 보는 곳 
https://stackoverflow.com/questions/52317494/is-it-good-way-to-call-subscribe-inside-subscribe
>>>>>>> a972105f061e7abde7a2eebb2aefe1d0dfc14bb3
IO, 시간과 관련된 일은 대부분 비동기 처리이다.

```js
function asyncFunc(param){
    return new Promise ((resolve, reject) =>{
        setTimeout(() => {
            if(param) resolve({data:'resolve!'});
            else reject(new Error('reject!'));
        }, 1000)
    })
}

asyncFunc(true)
.then(v => {
    console.log(v.data);
    return v.data.length
    })
.then( length =>
    console.log(length);
<<<<<<< HEAD
)
=======
)
>>>>>>> a972105f061e7abde7a2eebb2aefe1d0dfc14bb3
