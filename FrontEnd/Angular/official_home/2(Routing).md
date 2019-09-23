# 라우팅(Routing)

---

# 라우터의 동작
1 . 주소표시줄에 **URL을 새로 입력해서 새로운 페이지로 이동**할 때   
2 . 페이지에 있는 **링크를 클릭해서 새로운 페이지로 이동**할 때   
3 . 브라우저의 뒤로가기, 앞으로 가기 버튼을 눌러서 **브라우저 히스토리에 있는 페이지로 이동**할 때

---
## 라우터의 규칙 등록
1 . 앱 모듈에 path 등록
```js
RouterModule.forRoot([
      { path: '', component: ProductListComponent },
    //   products/:productId  Path Variable로 받는다.
      { path: 'products/:productId', component: ProductDetailsComponent },
    ])
```

2 . 라우터 링크 바인딩하기
```html
<!-- index를 추가해서 활용할 수 있게 해주었다. alias productId -->
<div *ngFor="let product of products; index as productId">

  <h3>
                                                        <!-- 클릭하면 products/productId로 이동한다. -->
    <a [title]="product.name + ' details'" [routerLink]="['/products', productId]">
      {{ product.name }}
    </a>
  </h3>
<!-- . . . -->
```


## 라우터 규칙 활용하기
1 . 외부 파일에서 제품 데이터를 가져온다.
### product-details.component.ts
```js
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { products } from '../products';
```
2 . product 프로퍼티를 선언하고 컴포넌트 클래스의 생성자에 ActivatedRoute를 의존성으로 주입한다.
### product-details.component.ts
```js
export class ProductDetailsComponent implements OnInit {
  product;

  constructor(
    private route: ActivatedRoute,
  ) { }
}
//ActivatedRoute은 Angular 라우터가 컴포넌트를 로드할 때 사용한 라우팅 규칙을 의미한다. 
//이 객체에는 현재 사용된 라우팅 규칙, 라우팅 변수 등의 데이터가 들어있다.
```
3 . ngOnInit() 메소드에서 라우팅 변수를 구독(subscribe) 한 후에 옵저버에서 productId를 참조.
```js
ngOnInit() {
  this.route.paramMap.subscribe(params => {
    this.product = products[+params.get('productId')];
  });
}
```

4 . 제품의 상세보기 표시
```html
<h2>Product Details</h2>
<div *ngIf="product">
  <h3>{{ product.name }}</h3>
  <h4>{{ product.price | currency }}</h4>
  <p>{{ product.description }}</p>
</div>
```

# 컴포넌트 기반 어플리케이션인 앵귤러는 화면을 하나 또는 더 많은 컴포넌트를 이용한다.
> Routing in Angular is also refereed to as component routing because the Router maps a single or a hierarchy of components to a specific URL.

앵귤러에서 route는 객체이다.
route는 정보를 제공하는데 특정 path의 맵을 제공한다.
path는 URL의 조각이다. path는 확실하게 어디에 리소스(혹은 페이지)가 있는지 결정한다.
사용자는 URL으로 부터나온 도메인에서 path를 받을 수 있다.

`path` 는 라우트의 특정 path를 명시하는 문자열이다.
`pathMatch`는 특정한 목적지를 명시하는 문자열이다. 그것은 prefix 혹은 전체를 받을 수 있다.
`component`는 경로에 매핑되어야하는 구성 요소를 지정하는 구성 요소이다.
`redirectTo`는 URL 조각이다. 그 URL조각은 route에 매칭이 되면 리다이렉트 한다.

/my/path/경로를 MyComponent에 매핑시켜보자
```js
{ path: 'my/path/', component: MyComponent }
```
`''`요거는 main URL이다. `**`요거는 페이지가 존재하지 않을 때를 대비하여 사용한다.

# 라우트 매칭의 목적
앵귤러 라우터는 강력한 매칭 알고리즘을 갖고있다. 알고리즘은 많은 built-in과 커스텀 매칭의 목적을 갖고있다.

빌트인 매칭의 전략은 prefix와 full이다.

라우트의 matching strategy가 prefix일때, 라우터는 간단하게 체크한다. 브라우저의 URL이 route'path의 prefixed인지 아닌지.
만약에 맞다면, 관련 컴포넌트를 렌더링한다.

항상 원하는 동작은 아닐경우. 일부 시나리오에서는 구성 요소를 렌더링하기 전에 라우터가 전체 경로와 일치하기를 원한다. pathMatch 경로 속성을 사용하여 전체 전략을 설정할 수 있다.
```js
{ path: 'products', pathMatch: 'full', component: ProductListComponent} 
```

이 full속성 을 사용하는 특별한 경우 는 빈 경로를 일치시키려는 경우입니다 . full 프로퍼티를 사용하는 특별한 경우는 empty path에 매칭하려는 경우이다. 빈 경로는 모든 경로에 접두사이므로 접두사 전략을 사용하면 모든 경로와 일치한다.

예를들어 사용자가가 /products에 리다이렉트 되길 원하면 아래와 같이 설정 하면 됩니다.
```js
{path : '', redirectTo:'/products', pathMatch: 'full'}
```
또한 커스텀으로 변경할 수도 있다. (UrlMatcher)[https://angular.io/api/router/UrlMatcher#description]를 이용해서.

# 라우터 파라미터
동적 경로는 종종 웹 응용 프로그램에서 데이터 (매개 변수) 또는 상태를 응용 프로그램으로 전달하거나 다양한 구성 요소와 페이지간에 전달하는 데 사용됩니다. Angular 라우터는 동적 경로를 지원하며 API를 사용하여 경로 매개 변수에 쉽게 액세스 할 수 있습니다.

### 예
```js
 {path: 'product/:id' , component: ProductDetailComponent}
```

## ActivatedRoute
outlet에 로드된 구성 요소와 연관된 경로에 대한 정보에 대한 액세스를 제공합니다. RouterState트리를 탐색하고 노드에서 정보를 추출 하는 데 사용합니다.

## ParamMap
경로와 관련된 필수 및 선택적 매개 변수에 대한 액세스를 제공하는 맵입니다. 맵은로 단일 값 get() 또는 여러 값을 검색하는 것을 지원합니다 getAll().