# RxJS는 Reactive Extensions For JavaScript 라이브러리이다.
여기서 Reactive Extensions 는 ReactiveX 프로젝트에서 출발한 리액티브 프로그래밍을 지원하기위해 확장했다는 뜻이다.
ReactiveX 는 Observer 패턴, Iterator 패턴, 함수형 프로그래밍을 조합하여 제공한다.
RxJS는 **이벤트 스트림을 Observable 이라는 객체로 표현한 후 비동기 이벤트 기반의 프로그램 작성을 돕는다.**
이벤트 처리를 위한 API로 다양한 연산자를 제공하는 함수형 프로그래밍 기법도 도입되어 있다.

## Pull 시나리오
외부에서 명령하여 응답받고 처리한다.
데이터를 가지고 오기 위해서는 계속 호출해야 한다.
## Push 시나리오
외부에서 명령하고 기다리지 않고, 응답이 오면 그때 반응하여 처리한다
데이터를 가지고 오기 위해서 구독해야 한다.

Reactive Programming은 Push 시나리오를 채택하고 있다.


# RxJS Observable Lifecycle
## 생성
Observable.create()
생성시점에는 어떠한 이벤트도 발생되지 않는다.
## 구독
Observable.subscribe()
구독시점에 이벤트를 구독할 수 있다.
## 실행
observer.next()
실행시점에 이벤트를 구독하고 있는 대상에게 값을 전달한다.
## 구독 해제
observer.complete()
Observable.unsubscribe()
구독 해제 시점에 구독하고 있는 모든 대상의 구독을 종료한다.


## RactiveX는 Observer패턴과 Iterator패턴, 그리고 함수형 프로그래밍을 결합한 것이다.
functional reactive programming은 시간이 지남에 따라 **지속적으로 변하는 값**에서 작동한다.
ReactiveX는 시간이 지남에 따라 **emit되는 불연속 값**에서 작동한다.


Observable을 사용함으로써 배열과 같은 콜렉션의 단순하거나 복잡한 연산 작업을 비동기 이벤트 스트림으로 처리를 할 수 있다.

Observables Are Composable
Observables Are Flexible
Observables Are Less Opinionated
Callbacks Have Their Own Problems
ReactiveX Is a Polyglot Implementation


# Observable 생성
새로운 Observable을 만드는 연산자들

## Create
직접적인 코드 구현을 통해 옵저버 메서드를 호출하여 Observable을 생성한다
RxJava의 javadoc에 다르면 create()는 RxJava에 익숙한 사용자만 활용하도록 권고합니다. 이유는 개발자가 하나하나 수동으로 잡아줘야 하는 옵션들이 많아지기 때문입니다.

## Defer
옵저버가 구독하기 전까지는 Observable 생성을 지연하고 구독이 시작되면 **옵저버 별로 새로운 Observable을 생성**한다

## Empty/Never/Throw 
아주 정확하고 제한된 행동을 하는 Observable을 생성한다
## From 
다른 객체나 자료 구조를 Observable로 변환한다
## Interval 
특정 시간별로 연속된 정수형을 배출하는 Observable을 생성한다
## Just 
객체 하나 또는 객채집합을 Observable로 변환한다. 변환된 Observable은 원본 객체들을 발행한다
## Range 
연속된 범위(Range)의 정수를 발행하는 Observable을 생성한다

## Repeat 
특정 항목이나 연속된 항목들을 반복적으로 배출하는 Observable을 생성한다
## Start
함수의 실행 결과를 배출하는 Observable을 생성한다
## Timer 
지정된 시간이 지나고 난 후 항목을 하나 배출하는 Observable을 생성한다


# RXJS 여러개를 쓰고싶을때,
1. 서로간의 의존성이 없을 때
Promise.all === forkJoin (서로 의존성 없이 한번에 다 일어날 때)

2. 서로간의 의존성이 있을때. (Promise.then()) **중괄호 쓰지 않도록 조심!!**
this.service.service1().pipe(
  flatMap((res1) => this.service.service2(res1)),
  flatMap((res2) => this.service.service3(res2))
).subscribe((res3) => {
  // Do something with res3.
});

출처 :https://medium.com/@pks2974/rxjs-%EA%B0%84%EB%8B%A8%EC%A0%95%EB%A6%AC-41f67c37e028
https://d2.naver.com/helloworld/12864
https://brunch.co.kr/@tilltue/6
https://javaexpert.tistory.com/794?category=678737
https://huns.me/development/2051
https://gracefullight.dev/2019/04/30/RxJS%EC%9D%98-%EB%AA%A8%EB%93%A0-%EA%B2%83/
https://beomseok95.tistory.com/32
                                                                                                                                                                                                                                                                                                                                                                           https://softwaree.tistory.com/30
https://jungwoon.github.io/rxjava2/2019/07/05/RxJava-1/

http://reactivex.io/documentation/ko/operators.html


# reduce와 concat으로 flat()하는 방법 
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/flat