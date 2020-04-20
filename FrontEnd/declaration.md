# declarations 배열에 추가하지 말아야 할 클래스는 어떤 것이 있나요?
NgModule의 declarations 배열에는 declarable 클래스만 추가해야 합니다.

그래서 다음과 같은 항목은 추가하면 안됩니다:

다른 모듈, 서드파티 모듈에 이미 추가된 클래스

다른 모듈에서 가져온 디렉티브. 예를 들어 @angular/forms 라이브러리에서 FormsModule 모듈을 로드했다면, 이 모듈에 있는 FORMS_DIRECTIVES는 추가하면 안됩니다.

모듈 클래스

서비스 클래스

Angular 구성요소가 아닌 클래스나 객체 : 문자열, 숫자, 함수, 데이터 모델, config 설정, 업무 로직 클래스, 헬퍼 클래스

