input을 쓸때 
```html
  <app-server-element
    *ngFor="let serverElement of serverElements"
    [srvElement]="serverElement"></app-server-element>
```
이런식으로 서버 엘리먼트라는 것을 명확하게 표현하고 싶어서 srvElement로 했는데, 자식 컴포넌트 입장에서는
굳이 서버에서 온 컴포넌트라 인식하지 않고 element라고 하는게 좋다.
그래서 @Input('srvElement') element라고 쓴다.  

_ngcontent-ejo-2 가 태그에 달린걸 확인 할 수 있는데, 

ViewEncapsulation.Emulated : Angular가 제공하는 방식으로 DOM을 캡슐화한다. 
                             
Native일 때는 브라우저가 지원하는 Shadow DOM을 사용한다.

@ViewChild에서 static을 사용하는 이유?

일반적으로 동적으로 뷰를 생성하고, TemplateRef에서 접근하려면  ExpressionHasChangedAfterChecked 에러가 발생한다.
https://stackoverflow.com/questions/56359504/how-should-i-use-the-new-static-option-for-viewchild-in-angular-8
https://medium.com/sjk5766/expressionchangedafterithasbeencheckederror-%EC%97%90%EB%9F%AC%EC%97%90-%EB%8C%80%ED%95%B4-79dac955cfa1
https://dev.to/danielpdev/how-to-use-viewchild-decorator-in-angular-9-i0
