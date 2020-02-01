Rxjs를 공부하다보니 클로저의 개념이 나와서 정확하게 집고 넘어가고자 포스팅을 하려고 합니다.
```js
function whatYourName() {
  var name = "soojae"; // name은 init에 의해 생성된 지역 변수이다.
  function showName() { // displayName() 은 내부 함수이며, 클로저다.
    console.log(name); // 부모 함수에서 선언된 변수를 사용한다.
  }
  showName();
}
//soojae
whatYourName();
```
showName()은 whatYourName() 내의 함수이며, whatYoutName함수에서만 사용할 수 있다.
showName() 안에는 자신만의 지역 변수가 없다.
그런데 **함수 내부**에서 **외부 함수의 변수에 접근할 수 있기때문에** displayName()역시 부모 함수 whatYourName()에서 선언된 변수 name에 접근할 수 있다. 만약 showName()이 자신만의 name 변수를 갖고 있었다면, name대신 this.name을 사용했을 것이다.

REFERENCES
https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Closures