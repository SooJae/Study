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

여러 비동기 함수가 사용되면 복잡해진다.
```



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







