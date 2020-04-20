별표(*) 문법이 사용된 엘리먼트는 Angular가 <ng-template>으로 변환한다는 것을 알고 넘어가는 것이 중요합니다. <ng-template>은 커스텀 구조 디렉티브를 정의할 때도 활용됩니다.

```html
<div *ngFor="let hero of heroes; let i=index; let odd=odd; trackBy: trackById" [class.odd]="odd">
  ({{i}}) {{hero.name}}
</div>

<ng-template ngFor let-hero [ngForOf]="heroes" let-i="index" let-odd="odd" [ngForTrackBy]="trackById">
  <div [class.odd]="odd">({{i}}) {{hero.name}}</div>
</ng-template>
```
.

 ng-container는 항상 view에 렌더링 됩니다.
 두 번째 차이점은 *ngIf 구문을 사용합니다. 따라서 위에서 ng-template에서는 템플릿 참조 변수를 사용하라고 했지만, 동일하게 ng-container에서 *ngIf로 표현할 수 있습니다.
 
 ng-container는 언제 쓰는 걸까요? 가령 우리가 *ngIf나 *ngFor 같은 Angular 구조 디렉티브를 사용할 때, HTML 태그가 필요한 순간이 있습니다. 보통 그런 경우 우리는 <div> 나 <span> 태그를 사용합니다.

.

 디렉티브를 작성하는 방법은 컴포넌트를 작성하는 것과 비슷합니다.

Component 데코레이터를 불러오는 것처럼 Directive 데코레이터를 로ㄷ합니다.

Input, TemplateRef, ViewContainerRef 심볼을 로드합니다. 구조 디렉티브가 DOM을 조작하려면 이 심볼들이 필요합니다.

데코레이터를 디렉티브 클래스에 적용합니다.

템플릿 엘리먼트에 적용할 때 사용하는 CSS 어트리뷰트 셀렉터를 지정합니다.



Both of them are at the moment (2.x, 4.x) used to group elements together without having to introduce another element which will be rendered on the page (such as div or span).

template, however, requires nasty syntax. For example,
```html
<li *ngFor="let item of items; let i = index; trackBy: trackByFn">...</li>
would become

<template ngFor let-item [ngForOf]="items" let-i="index" [ngForTrackBy]="trackByFn">
  <li>...</li>
</template>
You can use ng-container instead since it follow the nice * syntax which you expect and are probably already familiar with.

<ng-container *ngFor="let item of items; let i = index; trackBy: trackByFn">
  <li>...</li>
</ng-container>
```

Use

<ng-container> if you need a helper element for nested structural directives like *ngIf or *ngFor or if you want to wrap more than one element inside such a structural directive;
<ng-template> if you need a view "snippet" that you want to stamp at various places using ngForTemplate, ngTemplateOutlet, or createEmbeddedView().


```js
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[appUnless]'})
export class UnlessDirective {
}
```
디렉티브의 셀렉터 는 일반적으로 디렉티브의 어트리뷰트 이름을 대괄호로 감싼 형태가 되기 때문에 이 예제에서는 [appUnless]를 지정했습니다. 대괄호는 CSS 어트리뷰트 셀렉터를 의미합니다.