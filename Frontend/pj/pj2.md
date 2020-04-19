# 객체 생성 
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/create


## ngIf else
https://blog.smilecat.dev/javascript/2018/02/01/angular-ng-if-else.html

```html
[Angular] ngIf에서 else 구문 사용하기
if(templateName 미사용)
<div *ngIf="flag">
    flag 가 true 이면 보임
</div>
if(templateName 미사용), else(templateName 사용)
<div *ngIf="flag; else templateName">
    flag 가 true 이면 보임
</div>

<ng-template #templateName>
    flag 가 false 이면 보임
</ng-template>
if(templateName 사용)
<div *ngIf="flag; then templateName">
    절대 보이지 않음
</div>

<ng-template #templateName>
    flag 가 true 이면 보임
</ng-template>
if(templateName 사용), else(templateName 사용)
<div *ngIf="flag; then thenTemplateName; else elseTemplateName">
    절대 보이지 않음
</div>

<ng-template #thenTemplateName>
    flag 가 true 이면 보임
</ng-template>

<ng-template #elseTemplateName>
    flag 가 false 이면 보임
</ng-template>
```

# ngModel 유효성검사
https://www.slipp.net/wiki/pages/viewpage.action?pageId=26642729



```ts
this.stream3$ = this.client.get(`http://localhost:8080/api/custom-label/distinct`)

```
콘솔을 찍어보면
```
Observable {_isScalar: false, source: Observable, operator: MapOperator}
operator: MapOperator {thisArg: undefined, project: ƒ}
source: Observable {_isScalar: false, source: Observable, operator: FilterOperator}
_isScalar: false
__proto__:
@@observable: ƒ ()
forEach: ƒ (next, promiseCtor)
lift: ƒ (operator)
pipe: ƒ ()
subscribe: ƒ (observerOrNext, error, complete)
toPromise: ƒ (promiseCtor)
_subscribe: ƒ (subscriber)
_trySubscribe: ƒ (sink)
constructor: ƒ Observable(subscribe)
__proto__: Object
```
```ts
{{libraryItem.updatedDt | amLocal:'ko' | amDateFormat: 'YYYY-MM-DD HH:mm:ss'}}
```
MomentModule이 필요하다.