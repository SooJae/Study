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
