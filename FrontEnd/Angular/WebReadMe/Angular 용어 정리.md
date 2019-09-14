# @NgModule 데코레이터
@NgModule 데코레이터는 함수이며 모듈의 설정 정보가 기술된 **메타데이터 객체를 인자로 전달받아 모듈을 생성**한다. 메타데이터는 아래와 같다.

## providers	
주입 가능한 객체(injectable object) 즉 서비스의 리스트를 선언한다. 루트 모듈에 선언된 서비스는 애플리케이션 전역에서 사용할 수 있다.
## declarations	
컴포넌트, 디렉티브, 파이프의 리스트를 선언한다. 모듈에 선언된 구성 요소는 모듈에서 사용할 수 있다.
## imports	
의존 관계에 있는 Angular 라이브러리 모듈, 기능 모듈(Feature module)이라 불리는 하위 모듈, 라우팅 모듈, 서드 파티 모듈을 선언한다.
## bootstrap	
루트 모듈에서 사용하는 프로퍼티로서 애플리케이션의 진입점(entry point)인 루트 컴포넌트를 선언한다.

# 라이브러리 모듈
Angular의 라이브러리 모듈 패키지는 모듈의 집합체이다. 따라서 라이브러리 모듈 패키지에서 필요한 모듈만을 선택하여 임포트한다. 예를 들어 **@angular/platform-browser 패키지에서 BrowserModule 모듈을 임포트하는 경우**, 아래와 같이 기술한다.
```js
// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
```

# BrowserModule
브라우저 환경에서 동작하는 애플리케이션을 위한 필수 기능을 제공하는 모듈로서 브라우저에서 동작하는 웹 애플리케이션의 경우, 반드시 BrowserModule을 임포트하여야 한다. 
BrowserModule은 **NgIf 및 NgFor**와 같은 **빌트인 디렉티브**와 빌트인 파이프를 제공하는 CommonModule을 내부에서 import한다. 따라서 BrowserModule을 import하면 별도의 추가적인 import없이 CommonModule을 사용할 수 있게 되어 모든 애플리케이션의 컴포넌트 템플릿에서 빌트인 디렉티브와 빌트인 파이프를 사용할 수 있다.