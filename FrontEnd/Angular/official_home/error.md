# Constructor
생애주기 훅을 사용해야 하는 경우도 있지만 constructor를 사용해야 적합한 시나리오도 있다. 이 생성자는 의존적인 코드를 컴포넌트에 전달하는 의존성 주입을 하기 위해서는 필수적으로 필요하다.

constructor는 자바스크립트 엔진에 의해 초기화 되는데 타입스크립트에서는 Angular에 의존성이 어느 프로퍼티에 적용되는지 직접 지정 안하고도 사용할 수 있다.
# Constuctor vs ngOnInit의 차이점
## 참고
https://edykim.com/ko/post/difference-between-angular-constructor-and-ngoninit/   
https://minami-choi.github.io/2018/04/26/constructorVsNgOnInit/

ngOnInit은 순수하게 Angular가 컴포넌트 초기화를 완료했다는 점을 전달하기 위해 존재한다.
이 단계는 컴포넌트에 프로퍼티를 지정하고 첫 변경 감지가 되는 범위까지 포함되어 있다. @Input() 데코레이터를 사용하는 경우를 예로 들 수 있다.

@Input() 프로퍼티는 ngOnInit 내에서 접근 가능하지만 constructor에서는 undefined를 반환하는 방식으로 디자인되어 있다.

contructor에서는 의존성 주입에 대한 작업을 하고, 변수 초기화 작업은 ngOnInit()에서 하도록 하자.

# 변경감지(Change Detection)가 일어나는 순서
1. update bound properties for all child components/directives
2. call ngOnInit, OnChanges and ngDoCheck lifecycle hooks on all child components/directives
3. update DOM for the current component
4. run change detection for a child component call ngAfterViewInit lifecycle hook for all child components/directives


# NgModule
Angular 응용프로그램은 컴포넌트와 디렉티브, 파이프, 서비스 등의 조합으로 이루어진다.

응용프로그램의 규모가 커질 수록, 이러한 구성요소들을 특정 기준에 따라 그룹화시켜 관리하는 것이 좋은데 이를 위해 Angular에서는 @NgModule이라는 decorator를 통해 모듈화 구성을 지원한다.

Angular의 모듈 구성을 사용하면, 컴포넌트들을 논리적으로 그룹핑하여 관리할 수 있으며
라우팅과 연계하면 모듈 단위 Lazy Loading을 구현할 수도 있다.

전달된 메타데이터 정보에 기반해서 현재 모듈로 구성해야할 컴포넌트와 디렉티브, 파이프 등의 정보를 식별하고 외부로 노출할 컴포넌트를 결정한다.

# Router Module
RouterModule.forRoot(...) 메서드는 appRoutes의 라우터 설정 정보에 담긴 지시자나 컴포넌트의 정보를 합해서, 어플리케이션 단위의 모듈로 만드는 역할.



# Angular Guide 이해 안되는 부분
버튼이 클릭되었을 때 동작할 로직을 작성합니다. **이 로직은 제품할인 알림 컴포넌트가 아니라 부모 컴포넌트인 제품 목록 컴포넌트에 작성합니다**. product-list.component.ts 파일에 onNotify() 메소드를 추가하고 share() 메소드와 비슷하게 다음과 같이 정의합니다
==> 부모 컴포넌트인 제품목록 컴포넌트에 작성하는 이유는?


### ES6 모듈 vs Angular 모듈
#### ES6 모듈  
어떤 스크립트 파일에 있는 **함수나 변수를 외부로 공개하고 다른 스크립트 파일에 불러오기 위해 사용**
#### Angular 모듈 
애플리케이션을 **기능 단위로 구분**하기 위해 사용한다.   
Angular 프레임워크에 사용할 모듈을 정의할 때 Angular 모듈 문법을 사용한다고 해도 이 모듈을 스크립트 외부로 공개할 때는 ES6 모듈 문법을 사용할 것이다.

템플릿에서 다른 엘리먼트의 프로퍼티를 참조할 때 **#으로 시작하는 템플릿 지역 변수를 사용할 수 있으며**, 이 변수는 **DOM 객체에 저장되어 객체를 사용하듯이 접근**할 수 있다.
```html
<input #title type="text">
<span>{{ title.value }}</span>
```

---

# 템플릿 문법
템플릿 문법을 사용하면 **HTML과 JavaScript**를 확장할 수 있다.


3 . ngOnInit() 메소드에서 라우팅 변수를 구독(subscribe) 한 후에 옵저버에서 productId를 참조.
```js
ngOnInit() {
  this.route.paramMap.subscribe(params => {
    this.product = products[+params.get('productId')];
  });
}
```

# async 파이프가 뭐야?
```html
<h3>Shipping Prices</h3>

<div class="shipping-item" *ngFor="let shipping of shippingCosts | async">
  <span>{{ shipping.type }} </span>
  <span>{{ shipping.price | currency }}</span>
</div>
```

# 폼 빌더 메서드가 뭐야?
FormBuilder는 FormControl 인스턴스 생성을 syntactic sugar로 짧게 줄여주는것.

```js
// 폼 빌더 메소드
    this.checkoutForm = this.formBuilder.group({
      name: '',
      address: ''
    });
  }
```