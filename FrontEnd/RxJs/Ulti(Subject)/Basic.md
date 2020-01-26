Observable은 1:1 통신이다.
예를 들어 옵저버블은 3개의 subscribe를 하면 세개가 각각 독립적이다.

3개중 하나가 완료되더라도 나머지 2개에 영향을 끼치지 않는다.

Observable   =   Subject  =   Observable
pipe                           next
subscribe                      error
                               complete

Subject는 세가지의 Observer들이 subscribe를 하면 하나의 Subject에 접근할 수있다.