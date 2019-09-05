# Angular
Angular는 SPA(Single Page Application) 개발을 위한 구글의 오픈소스 자바스크립트 프레임워크입니다. 웹 애플리케이션은 물론 모바일 웹, 네이티브 모바일과 데스크탑 애플리케이션까지 프론트엔드 개발에 필요한 대부분의 기능을 갖추고 있습니다. 정적 타입을 제공하는 TypeScript를 주력 언어로 채택하여 대규모 애플리케이션 개발에 보다 적합한 환경을 제공합니다.

# Angular vs AngularJS
Angular는 정적 타이핑과 ECMAScript6 스펙을 충족시키기 위해 TypeScript로 재작성되었고 AngulaJS와는 호환성이 없는 브레이킹 체인지를 다수 포함하고 있습니다.

Angular와 AngulaJS의 차이점을 정리하면 아래와 같습니다.

1. AngularJS의 Controller와 $scope 기반 개발에서 컴포넌트 기반 개발(CBD, Component Based Development)로 전환되었다.

2. AngularJS의 angular.module과 jQlite보다 향상된 모듈 시스템과 DOM 제어 기능을 제공하며 API 또한 단순화되었다.

3. 선택적 데이터 바인딩(one-way, two-way *Angular는 더 이상 양방향 데이터 바인딩을 빌트인으로 제공하지 않는다.)을 지원하고 디렉티브(directive)와 서비스, 의존성 주입(dependency injection)은 간소화 되었다.

4. 주력 개발 언어로서 TypeScript를 도입하여 대규모 개발에 적합한 정적 타입과 인터페이스, 제네릭 등 타입 체크 지원 기능을 제공한다.

5. ECMAScript6에서 새롭게 도입된 모듈, 클래스 등과 ECMAScript7의 데코레이터를 지원한다.

6. 강력한 개발환경 지원 도구인 Angular CLI를 제공한다.

7. Angular은 AngularJS의 후속 버전이기는 하지만 호환성이 없는 새로운 프레임워크로 이해하는 것이 좋다. Angular는 AngularJS보다 배우기 쉬우며 성능은 향상되었고 애플리케이션 구조는 보다 단순해졌다.