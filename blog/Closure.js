function whatYourName() {
  var name = "soojae"; // name은 init에 의해 생성된 지역 변수이다.
  function showName() { // displayName() 은 내부 함수이며, 클로저다.
    this.name = 'js'
    console.log(name); // 부모 함수에서 선언된 변수를 사용한다.
  }
  showName();
  // console.log('name',this);
}

whatYourName();
console.log(this.name);