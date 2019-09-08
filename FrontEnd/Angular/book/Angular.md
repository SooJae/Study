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

# 앵귤러 어플리케이션의 구성 요소
## 모듈
모듈은 관련된 컴포넌트나 서비스, 디렉티브 등을 편하게 사용하기 위해 하나로 모은 것이다. 컴포넌트나 서비스, 특정 업무를 위해 구현된 함수를 묶어 라이브러리로 만든 것이라고 생각해도 좋다.

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