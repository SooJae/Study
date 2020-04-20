takeUntil(click$) // click observable로 멈춘다.

takeWhile(({y}) => y<=200), // y의 좌표가 200이상이면 종료 (y좌표 값을 반환하지 않음)
takeWhile(({y}) => y<=200, true) // y의 좌표가 200이상이면 종료 (y좌표 값을 반환 함)

TakeUntil은 옵저버블, takeWhile은 조건식이라고 생각하면 될 것 같다.


```js
const numbers$ = of(1,'1',2,3,4,4,5);

numbers$.pipe(
    distinctUntilChanged()
).subscribe(console.log);
/*
1
1
2
3
4
5
*/
```
즉 number 1과 string 1이 구분된다는 것을 알 수 있다.

scan.ts를 수정해보자

```js
const user = [
    {name: 'Brian', loggedIn:false, token:null},
    {name: 'Brian', loggedIn:true, token:'abc'},
    {name: 'Brian', loggedIn:true, token:'123'},

]

const totalReducer = (accumulator:any, currentValue:any) => {

    const result = {...accumulator , ...currentValue};
    console.log('result',result);
    return {...accumulator, ...currentValue}; // accumulator = currentValue
    // 예전 값 위에 최근 값을 덮어 씌운다.
};

const state$ = from(user).pipe(
  scan(totalReducer,{})
);

const name$ = state$.pipe(
    distinctUntilChanged((prev,curr) =>{
        return prev.name === curr.name;
    }), 
    distinctUntilKeyChanged('name'),

    map(state => state.name),
    distinctUntilChanged() // 이것으로 Brian을 3번에서 한번만 출력한다.
);

name$.subscribe(console.log);
```
위의 distinct의 관련 세 operator가 전부 동일 기능을 한다.(개인적으로 distinctUntilKeyChanged가 제일 좋아 보인다.)
