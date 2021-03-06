# 함수형 프로그래밍의 장점
1. Race Condition이 적다.
멀티스레딩에서 간섭현상이 생기는 경우가 적다.
바꾼거를 뽑아내는 방식. 

===========함수==========함수==========함수============ 인풋된거를 바꾸지 않고 아웃풋만 바꿀꺼야. (Immutable)

1인 경우
1번째 스레드 : 1을 증가시킴
2번째 스레드 : 1을 증가시킴
3이 되려면 2개의 스레드의 결과 값을 합해야한다. (ex 하둡의 맵 리듀스)
성능상으로는 함수형 프로그래밍이 성능이 낮다.
엄청 많은 컴퓨터를 던져놨을때는 (100대를 퍼부어서 30대의 컴퓨터 성능을 뽑았다.) 함수형 프로그래밍이 더 낫다.

고계함수 : 인자를 함수로 반환도 함수로 할 수 있는
일급함수 : 함수 리터럴?
커링과 부분 적용 : 
재귀와, 꼬리재귀 최적화 : 자기 자신만 부르는 재귀함수 (꼬리 재귀 최적화)

```js
recursive(n){
  if(n===1){
    return 1;
  }
  return n * recursive(n-1); // 재귀함수 (오래걸림)
  }
  
  tailRecursive(n){
    if(n===1){
      return acc;
    }
    return tailRecursive(n-1, n*acc); // 꼬리 재귀
  }
```
스택을 사용하지 않기 때문에 스택오버플로가 발생하지 않는다.(**컴파일러가 해주기 때문에 자바는 해주지 않는다.**)
멱등성 : 같은 인자에 의해서 같은 출력만 나온다.
순수함수와 참조 투명성
불변성
영속성 자료구조(2개를의 값을 합해야 할때, 새로 전체를 복사할 필요없다. 뒤의 함수를 앞의 함수 뒤에 붙이면 된다.)
메모이제이션(캐쉬)


무엇을 하느냐 > 어떻게 하느냐



1. 높은 표현력을 통해 불필요한 코드를 줄일 수 있다.

2. 함수형 프로그래밍 언어군은 프로그래밍 언어론의 최신 연구 결과를 반영하고 있다.

소프트웨어 트랜잭셔널 메모리(Lock 걸고 하는 것), 타입 클래스(자바 인터페이스가 좋아지는 느낌, ), 
대수적 자료형: 다른 자료형의 값으로 구성된 자료형 곱타입: class/ struct와 비슷, 합타입 : enum / union과 유사 한 번에 한 값이 존재함
패턴매칭

# 컨셉
상태와 데이터를 변경하지 않고(Immutable) 프로그래밍을 하는 것. (즉 대입문(assignment statements) 없이 프로그래밍 하는것)

일급시민
일급시민이란? 
1. 함수를 Argument로 전달할 수 있다.
2. Return값이 함수가 될 수 있다.
3. 함수를 값처럼 할당하기도, 수정도 할 수 있다.

일급 시민 : value, type, object ,entity


순수함수 :
함수 자체가 독립적이고 Side-Effect가 없기 때문에 스레드에 안전성을 보장받습니다.
스레드에 안전성이 보장되면 병렬적인 계산을 진행할 수 있습니다.
## 그래서
함수 자체가 독립적이고 Side-Effect가 없기 때문에 스레드에 안전성을 보장받습니다.
스레드에 안전성이 보장되면 병렬적인 계산을 진행할 수 있습니다.

Referential transparency
함수 프로그래밍은 대입이 없는 특성을 가지고 있기 때문에 참조(Reference)에 투명성을 가지고 있습니다.
참조 투명성을 통해 기존의 Value는 변경되지 않고 유지됩니다.

Currying
여러개의 인자를 가진 함수를 호출 할 경우, 파라미터의 수보다 적은 수의 파라미터를 인자로 받으면 누락된 파라미터를 인자로 받는 기법입니다.

함수형 프로그래밍 사용하면 무엇을 얻을 수 있을까요?
“대입문의 사용을 포기하면 자유로운 동시성을 얻을 수 있다.”

현재 우리는 많은 CPU를 가진 컴퓨터를 사용하고 있습니다. 그렇다고 일을 하나의 CPU에만 일을 시키지는 않죠. 어떻게 하면 컴퓨터의 모든 Cycle을 사용할 수 있을까? 많은 프로세스가 동시에 하나의 메모리 값을 변경하는 경우를 방지하기 위해서 Semaphores라는 기술을 사용했지만 함수형 프로그래밍은 더 이상 기술을 사용하지 않아도 됩니다.

즉 병렬처리에 대해 안전하고 빠르게 처리할 수 있습니다

단점은 없을까요?
기본적으로 추상화 단계가 지나치게 높아져서 읽기어려운 코드 즉 Reading이 어렵습니다.
기존의 자료구조를 상당히 들어엎어야 한다는 부담이 있습니다.
함수형 언어의 장점인 병렬/분산 프로그래밍 또한 실제로는 기존 명령형 언어들의 기능을 가지고도 충분히 구현할 수 있습니다.


forEach : forEach가 돌고있을때는 return값이 안 먹히기 때문에 외부 변수가 필요하다. https://www.competa.com/blog/the-javascript-array-foreach-method-doesnt-return-anything/

map : return 안쓰는법 https://gofore.com/en/why-you-should-replace-foreach/
꼬리재귀 : https://maxglassie.github.io/2017/08/24/tail-recursion.html
