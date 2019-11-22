별표(*) 문법이 사용된 엘리먼트는 Angular가 <ng-template>으로 변환한다는 것을 알고 넘어가는 것이 중요합니다. <ng-template>은 커스텀 구조 디렉티브를 정의할 때도 활용됩니다.

```html
<div *ngFor="let hero of heroes; let i=index; let odd=odd; trackBy: trackById" [class.odd]="odd">
  ({{i}}) {{hero.name}}
</div>

<ng-template ngFor let-hero [ngForOf]="heroes" let-i="index" let-odd="odd" [ngForTrackBy]="trackById">
  <div [class.odd]="odd">({{i}}) {{hero.name}}</div>
</ng-template>
```


 ng-container는 항상 view에 렌더링 됩니다.
 두 번째 차이점은 *ngIf 구문을 사용합니다. 따라서 위에서 ng-template에서는 템플릿 참조 변수를 사용하라고 했지만, 동일하게 ng-container에서 *ngIf로 표현할 수 있습니다.
 
 ng-container는 언제 쓰는 걸까요? 가령 우리가 *ngIf나 *ngFor 같은 Angular 구조 디렉티브를 사용할 때, HTML 태그가 필요한 순간이 있습니다. 보통 그런 경우 우리는 <div> 나 <span> 태그를 사용합니다.