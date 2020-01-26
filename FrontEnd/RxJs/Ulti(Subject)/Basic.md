Observable은 1:1 통신이다.
예를 들어 옵저버블은 3개의 subscribe를 하면 세개가 각각 독립적이다.

3개중 하나가 완료되더라도 나머지 2개에 영향을 끼치지 않는다.

Observable   =   Subject  =   Observable
pipe                           next
subscribe                      error
                               complete

Subject는 세가지의 Observer들이 subscribe를 하면 하나의 Subject에 접근할 수있다.


## asObservable이란
Subject 기능을 없애기 위해 사용하는 메소드 이다.
예를들어 subject.asObserble을 하고 나서부터는 해당 메소드로
result.next('Hello')등을 사용하면 에러가 발생한다. 
https://stackoverflow.com/questions/36986548/when-to-use-asobservable-in-rxjs
https://medium.com/@rkdthd0403/rxswift-subject-99b401e5d2e5

asObservable 보다 subject를 노출하는 것이 좋다?(타입스크립트에서 Observable로 return)
https://stackoverflow.com/questions/48448364/should-rxjs-subjects-be-public-in-the-class
