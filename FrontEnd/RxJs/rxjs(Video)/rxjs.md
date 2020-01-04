# RXJS를 배워야 하는 이유
```js
document.addEventListener('click', event => {
      console.log(event);
    });

// 외부 변수를 적어야 한다.
    let counter = 0;
    setInterval(() => {
      console.log(counter);
      counter++;

    }, 1000);
    setTimeout(() => {
      console.log('finished...');

    }, 3000);
  }


```
1. 여러 비동기 함수가 사용되면 복잡해진다.
2. 콜백 헬을 피하기 위해서


```js
ngOnInit() {
    fetch('/api/courses');

// observable로 만들기
    const http$ = Observable.create(observer => { //deprecated => new Observable
      fetch('api/courses')
        .then(response => {
        return response.json();
        })
        .then( body => {
          observer.next(body);

          observer.complete();
// observer.next();를 또 적으면 안된다.
        })
        .catch(err => {
          observer.error(err);
        });
    });

    http$.subscribe(
      courses => console.log(courses),
      noop, //()=> {}
      () => console.log('completed')
    )
```



## 개선한 Observable(httpObservable을 만드는 함수를 따로 빼 놓는다.)
```js
ngOnInit(){

    const http$ = this.createHttpObservable('api/courses');
    http$.subscribe(
      courses => console.log(courses),
      noop, //()=> {}
      () => console.log('completed'),
    );
  }

  private createHttpObservable (url: string) {
    return new Observable(observer => {
      fetch(url)
        .then(response => {
          return response.json();
        })
        .then( body => {
          observer.next(body);
          observer.complete();
// observer.next();를 또 하면 안된다.
        })
        .catch(err => {
          observer.error(err);
        });
    });
  }
```


## result['payload']일 경우
[{},{},{},{}]

## Object.Values(result['payload'])



```js
 ngOnInit() {

      const http$: Observable<Course[]> = createHttpObservable('api/courses');

      const courses$ = http$
        .pipe(
          // map(res => res['payload']),
          map(res => Object.values(res['payload'])),
          // map(res => res.description )
        );

      // 중복 발생!!
      this.beginnerCourses$ = courses$
        .pipe(
        map( courses => courses
          .filter(course => course['category'] === 'BEGINNER'))
      );

      this.advancedCourses$ =  courses$
        .pipe(
          map( courses => courses
            .filter(course => course['category'] === 'ADVANCED'))
        );

    }
```

위의 결과를 보면 같은 요청을 두번 한다. 어떻게 처리해야 할까?

```js
 const courses$ = http$
        .pipe(
          map(res => Object.values(res['payload'])),
          shareReplay(), // <---- 추가
          
        );
```
ShareReplay를 추가하면 한번만 호출하게 된다!

## concat
하나의 옵저버블이 **끝나면** 다음 옵저버블이 시작된다.
```js
    const source1$ = of(1, 2, 3);
    const source2$ = of(4, 5, 6);
    const source3$ = of(7, 8, 9);
    const result$ = concat(source1$, source2$, source3$);
    
    //subscribe에 console.log를 바로 쓸 수 있다.
    result$.subscribe(console.log);
```


