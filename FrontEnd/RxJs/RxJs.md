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

출처 :https://medium.com/@pks2974/rxjs-%EA%B0%84%EB%8B%A8%EC%A0%95%EB%A6%AC-41f67c37e028


https://d2.naver.com/helloworld/12864
https://beomseok95.tistory.com/32
https://softwaree.tistory.com/30