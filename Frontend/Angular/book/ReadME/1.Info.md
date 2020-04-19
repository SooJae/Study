# 메타데이터란?
일반적으로 메타데이터는 데이터에 추가되는 정보를 의미한다.
예를 들면 MP3 파일의 경우에는 음원이 데이텉고 가수, 제목 앨범커버 등이 메타데이터라고 할 수 있다.

클래스의 경우에는 클래스에 추가되는 정보를 의미한다.
@Component 어노테이션이 사용된 클래스는 보통 클래스가 아니라 Angular 프레임워크에서 컴포넌트 역할을 하는 클래스라는 정보가 더해진다.

애플리케이션 실행하기
http-server나 live-server가 필요하다

### http-server 설치하기
$ npm i -g http-server
### 실행하기
$ http-server 

### live-server 설치
$ npm i -g live-server
$ live-server

8080서버 사용중일시 바꿔준다.
```
$ live-server --port=8090 
```

# 크롬 개발자도구 Augury 설치

# 앵귤러 어플리케이션의 구성 요소
## 모듈
모듈은 관련된 컴포넌트나 서비스, 디렉티브 등을 편하게 사용하기 위해 **하나로 모은 것**이다. 컴포넌트나 서비스, 특정 업무를 위해 구현된 함수를 묶어 라이브러리로 만든 것이라고 생각해도 좋다.

```
ES6 모듈과 Angular 모듈은 이름이 비슷하지만 역할은 다르다. 
ES6 모듈 : 어떤 스크립트 파일에 있는 함수나 변수를 외부로 공개하고 다른 스크립트 파일에 불러오기 위해 사용
Angular 모듈 : 애플리케이션을 기능 단위로 구분하기 위해 사용한다.
Angular 프레임워크에 사용할 모듈을 정의할 때 Angular 모듈 문법을 사용한다고 해도 이 모듈을 스크립트 외부로 공개할 때는 ES6 모듈 문법을 사용할 것이다.
```

## 컴포넌트
컴포넌트는 Angular 애플리케이션을 구성하는 기본 요소.
화면을 정의하는 **뷰와 컴포넌트의 동작**을 정의하는 클래스로 구성

Angular 애플리케이션은 모듈안에 컴포넌트로 계층을 구성해서 만들기 때문에 모든 앱은 최소한 하나의 모듈(루트 모듈)과 하나의 루트 컴포넌트를 갖는다.

컴포넌트는 클래스에 @Component 어노테이션을 붙여서 선언한다.

```js
@Component ({
    selector : 'app-component',
    template : '<h1>Hello ! </h1>'
})
class HelloComponent{}
```
컴포넌트가 위치할 selector와 렌더링도리 내용인 template은 @Component 어노테이션 안에 반드시 선언되어야 한다.

ES5로 변환
```js
var HelloWorldComponent = (function (){
    function HelloWorldComponent(){
        this.name = 'Angular';
    }
    return HelloWorldComponent;
}())

HelloWorldComponent = __decorate([
    Component({
        selector : 'hello-world',
        template : '<h1>Hello {{name}}!</h1>'
    })
], HelloWorldComponent)
```

## 디렉티브
Angular의 디렉티브를 사용하면 HTML 엘리먼트에 사용자가 원하는 동작을 추가할 수 있으며, @Directive 어노테이션을 클래스에 붙여서 선언한다. 
일반적으로 컴포넌트는 **뷰가 있는 디렉티브**라고 생각할 수 있지만, 디렉티브가 **뷰를 갖지 않는 경우도** 있으므로 디렉티브는 컴포넌트라고 할 수 없다. 

```js
@Directive({
    selector : 'input[log-directive]',
    host : {
        '(input)' : 'onInput:($event)'
    }
})

class LogDirective {
    onInput(event){
        console.log(event.target.value);
    }
}
```
## 디렉티브와 컴포넌트의 차이 ( 내 생각 )

디렉티브 : **이미 만들어진** 뷰에 기능을 추가하는 것
컴포넌트 : 뷰를 만들면서 기능을 추가하는 것

Write a component when you want to create a reusable set of DOM elements of UI with custom behaviour. 
Write a directive when you want to write reusable behaviour to supplement existing DOM elements.

# 데이터 바인딩 기초
컴포넌트의 프로퍼티 값을 템플릿에 표시하려면 이중 중괄호를 사용
```html
<h1>Hello {{name}} ! </h1>
```
HTML 엘리먼트의 값을 컴포넌트 프로퍼티로 바인딩하려면 대괄호를 사용
```html
<span [hidden]="isValid"> The field is required</span>
```
엘리먼트에서 발생한 이벤트를 이벤트 핸들러에 연결하려면 괄호를 사용
```html
<button (click)="placeBid()"> Place Bid</button>
```
템플릿에서 다른 엘리먼트의 프로퍼티를 참조할 때 **#으로 시작하는 템플릿 지역 변수를 사용할 수 있으며**, 이 변수는 **DOM 객체에 저장되어 객체를 사용하듯이 접근**할 수 있다.
```html
<input #title type="text">
<span>{{ title.value }}</span>
```

# SystemJS 모듈 로더
대부분의 웹 애플리케이션은 HTML 페이지에서 script 태그를 사용해서 JavaScript 파일을 로드하고 실행한다. Angular 애플리케이션도 같은 방식으로 브라우저에 불러올 수 있지만, SystemJS 라이브러리를 사용해서 불러오는 것을 권장한다.

# 모듈 로더 vs <sciprt> 태그

## script 태그의 문제
개발자가 HTML파일의 script 태그를 관리해야 한다. 어떤 파일은 시간이 지나면서 필요없는 경우가 있는데, 그러면 네트워크 부하를 일으킵니다.
script태그의 순서 문제가 있습니다. head외에 body태그 안의 script는 실행의 순서를 보장하지 않습니다.


## 모듈로더의 장점
1 . 개발 단계에서 애플리케이션 코드를 모듈 단위의 개별파일로 나누는 것이 일반적입니다.
어떤 모듈을 사용하면 모듈 로더가 해당 모듈을 찾아서 다운로드한 뒤에 코드의 다음 부분을 실행한다. 이런 방식은 애플리케이션을 실행할 때 필요한 모듈을 브라우저에 자동으로 불러오기 때문에 프로젝트를 관리하는 데에도 도움이 된다.

2 . 운영단계의 어플리케이션을 준비하고 있다면, 모듈 로더를 사용해서 애플리케이션이 시작하는 파일을 기준으로 애플리케이션에서 사용하는 모든 모듈을 찾아서 파일 하나로 번들링할 수 있다.이때 번들링된 파일은 모듈 전체가 아니고 애플리케이션에서 실제로 사용하는 코드만 포함하여, 스크립트를 불러오는 순서나 순환 참조로 인한 오류를 걱정할 필요가 없다.

이런 장점은 애플리케이션 코드뿐만 아니라 Angular와 같은 서드파티 패키지를 사용할 때도 마찬가지다.

```js
System.import('./my-module.js') // 파일 경로로 지정
System.import('@angular2/core') // 모듈 이름으로 지정
```
경로가 아닌 모듈 이름이 전달되면 먼저 System.config()나 systemjs.config.js에 미리 설정된 정보를 바탕으로 모듈을 찾아보고, 이 정보 안에서 모듈을 찾지 못하면 경로로 인식하고 파일을 찾기 시작한다.
```
System.import('app')과 같은 코드를 보면 app.ts파일을 찾지 말고 SystemJS 설정을 먼저 확인하자.
```
ES6 방식으로 만들어진 모듈은 모듈 안에 있는 함수나 변수에 export 키워드를 사용하면 선택적으로 외부로 공개할 수 있다. 
ES6 문법으로 모듈을 만들고 다른 파일에서 이 모듈을 사용해보자.

```js
//lib.js
export let foo ='foo';

//main.js
System.import('./lib.js').then(libModule => {
    libModule.foo === 'foo'; //true
});
```

# SystemJS 설정
System.config() 함수를 사용하면 SystemJS 동작 방식을 얼마든지 바꿀 수 있다.
그리고 System.config() 함수는 각각 다른 설정으로 여러 번 실행될 수도 있는데, 같은 옵션이 한 번 이상 설정되면 나중에 설정된 값만 유효하다.
SystemJS 설정 함수는 HTML 파일의 script 태그 안에서 실행될 수도 있고, systemjs.config.js와 같이 별개의 파일로 분리되어 script 태그로 불러올 수도 있다.

## baseURL
System.import() 함수에 파일의 이름만 전달되면 이 옵션으로 설정된 위치에서 모듈을 찾는다. import() 함수에 모듈 이름을 지정하거나 상대 주소, 절대 주소를 지정하는 경우에는 무시한다.
```js
System.config({baseURL : '/app'});
System.import('es6module.js'); // GET /app/es6module.js
System.import('./es6module.js'); // GET /es6module.js
System.import('http://example.com/es6module.js'); // GET http://example.com/es6module.js

```
## defaultJSExtensions
.js가 붙는다. .js가 붙은 파일은 붙지 않는다.
```js
System.config({defaultJSExtensions:true});
System.import('./es6module'); // GET /es6module.js
System.import('./es6module.js')// GET /es6module.js
System.import('./es6module.ts.js')// GET /es6module.ts.js
```

## map
map 옵션을 설정하면 미리 지정한 이름으로 모듈을 참조할 수 있는 맵을 만든다.
이 맵은 System.import() 함수에 상대 주소나 절대 주소를 전달하는 경우에는 사용되지 않으며, BaseURL 설정의 영향을 받는다.


```js
System.config({map: {'es6module.js' : 'exSixModule.js'}});
System.import('es6module.js'); // GET /esSixModule.js
System.import('./es6module.js'); // GET /es6module.js

// map + baseURL 사용하기
System.config({
    baseURL:'/app',
    map:{ 'es6module' : 'esSixModule.js'}
});
System.import('es6module'); // GET /app/esSixModule.js
```

## package
packages 옵션을 사용하면 SystemJS의 옵션을 패키지 단위로 설정할 수 있다.
아래 코드는 System.import('app') 명령을 실행하면 TypeScript로 작성된 main_router_sample.ts 파일을 불러오는 예제 코드다.

```js
System.config({
    packages : {
        app : {
            defaultExtension : 'ts',
            main : 'main_router_sample'
        }
    }
});
System.import('app');
```

## paths
paths옵션은 map과 비슷한데, 추가로 특수문자 매칭을 지원한다.
paths 옵션은 baseUrl 옵션 적용 이후에, map 옵션 적용 이전에 적용된다. map과 paths 옵션을 동시에 사용할 수도 있는데, paths는 로더 표준안에 있고 ES6 모듈 로더 구현안에도 있지만, map은 SystemJS에서만 제공하는 방식이라는 것에 주의해야한다.
```js
System.config({
    baseURL : '/app',
    map : {'es6module' : 'esSixModule.js'},
    paths : {'*' : 'lib/*'}
});
System.import('es6module'); //GET /app/lib/esSixModule.js
```
이 책에서는 System.import('app')과 같은 코드를 자주 볼 수 있는데, 미리 map이나 package 항목을 설정해두기위해 이렇게 사용할 수 있다.
```js
import { Component } from '@angular/core';
```
와 같은 코드를 보면 @angular는 Angular 프레임워크가 있는 폴더를 매핑한 이름이라고 이해하면 된다. core는 그 패키지의 하위 폴더이며, 시작점이 되는 파일에 지정한다. 예를 들면 다음과 같이 설정한다.
```js
packages : {
    '@angular/core' : {main : 'index.js'}
}
```

## transpiler
transpiler 옵션을 사용하면 애플리케이션 모듈을 불러올 때 어떤 코드 변환기를 사용할지 정할 수 있다. 이때 모듈로 불러오는 파일에 **import나 export 구문이 없다면 변환되지 않는다.**

```js
System.config({
    transpiler : 'traceur',
    map : {
        'traceur' : 'https://unpkg.com/traceur@0.0.111/bin/traceur.js'
    }
});
```

# package.json
script 항목은 커맨드 라인에서 npm 명령을 실행했을 때 수행되는 작업을 정의하며, 위 로드에서는 npm start 명령을 실행하면 live-server를 시작한다. dependencies 항목에서는 애플리케이션이 배포되어 실행되는 환경에 필요한 서드파티 라이브러리나 툴 목록을 정의한다.

```yml
"script" : {
    "start" : "live-server"
},
"dependencies" : {
    "@angular/common" : "^4.1.0",
    "@angular/compiler" : "^4.1.0",
    "@angular/core" : "^4.1.0",
    "@angular/forms" : "^4.1.0",
    "@angular/http" : "^4.1.0",
    "@angular/platform-browse" : "^4.1.0",
    "@angular/platform-browser-dynamic" : "^4.1.0",
    "@angular/router" : "^4.1.0",
    "core-js" : "^2.4.1",
    "rxjs" : "5.3.0",
    "systemjs" : "0.19.47",
    "zone.js" : "0.8.5",
    "bootstrap" : "^3.3.7",
    "jquery" : "^3.2.1"
},
"devDependencies" : {
    "live-server" : "1.2.0",
    "typescript" : "^2.3.3"
}
```
scripts : 커맨드 라인에서 npm 명령을 실행했을 때 수행되는 작업을 정의하며, 위 코드에서는 npm start 명령을 실행하면 live-server를 시작한다.
dependencies : 애플리케이션이 배포되어 실행되는 환경에 필요한 서드파티 라이브러리나 툴 목록을 정의한다.
devDependencies : 개발 환경에는 사용하지만 운영 환경에 사용하지 않는 라이브러리를 따로 정의한다. 
 이렇게 dependencies 항목과 devDependencies에 있는 typescript를 보면 TypeScript
컴파일러도 개발 단계에서만 필요한 것을 확인할 수 있으며, 운영 환경에서는 TypeScript 코드를 JavaScript로 변환해서 배포할 것이라고 짐작할 수 있다.

라이브러리 이름 뒤에는 버젼을 적는다. 버전 숫자 앞에있는 **^ 기호**는 지정된 버전이나 지정된 버전 이상이 필요하다는 것을 의미하며, ^ 기호를 사용하지 않으면 지정된 버전을 설치한다.

Angular를 개발하면서 **모듈 로더**는 SystemJS를 사용한다고 했다. 이 SystemJS를 만든 Guy Bedford는 패키지 매니저인 jspm을 만들기도 했는데, jspm은 내부에서 SystemJS를 사용하기 때문에 SystemJS를 사용한다면 jspm도 쉽게 사용할 수 있다.

```js
var x = require('module1');
var y = require('module2');
var z = require('module3');
```
module2 로딩은 module1 로딩이 끝나지 않으면 시작되지 않으며, module3도 module2가 완전히 로딩되어야 시작된다.

yarn은 기존의 npm 패키지 매니저가 만든 package.json 파일과 node_modules 폴더를 그대로 사용하면서, 실행 속도를 크게 개선했다. yarn은 npm 저장소인 npmjs.org와는 다르게 독자적인 패키지를 저장소를 마련해두고 있지만, 최신버전은 비슷하게 업데이트 된다.
책에서는
yarn : 기본 패키지 매니저
npm : 전역에 패키지를 설치