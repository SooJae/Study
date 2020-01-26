1. 이벤트 바인딩 : 단방향 데이터 바인딩. 컴포넌트의 템플릿에서 컴포넌트 클래스로 보낸다.
2. @HostListener : 호스트 엘리먼트의 이벤트를 처리하는 Angular Decorator
3. Renderer2 : Renderer2의 `.listen()` 메소드를 이용해서 해당 이벤트와 엘리먼트를 처리한다.
4. RxJS의 `.fromEvent()`연산자를 이용해서 Observable로 이벤트를 처리한다.

## 이벤트 바인딩
이벤트 바인딩은 컴포넌트 템플릿에서 반응하는 컴포넌트 클래스로의 플로우를 가지고 있다.
Event 바인딩은 접근과 사용자의 listener를 붙이기 위해 target element의 identifier(식별자)가 필요하지 않다.
왜냐하면 템플릿 안의 target의 이벤트와 target의 element를 직접적으로 다루기 때문이다.

### Example
```html
 <button (click)="handleClick()">Save</button>
 ```

Multiple
```html
<button (click)="handleClick1(); handleClick2(); …">Save</button>
```

만약에 사용자가 이벤트의 적재된(payload) 객체에 접근하고 싶다면, `$event`를 사용자의 handler 함수에 넘겨줄 수 있다. 
```html
<button (click)="handleClick($event)">Save</button>
```
만약에 적재된 객체의 특정한 값을 원한다면(예: target값 ) 직접적으로 넣어 줄 수 있다.
```html
<button (click)="handleClick($event.target)">Save</button>
```

하지만, 이벤트 바인딩은 컴포넌트 템플릿에의해 바운딩 된다. 이것은 사용자가 외부에서 발생(fired)된 이벤트에는 listen할수 없다는 것을 뜻합니다.
또한. 사용자가 컴포넌트를 감싸는(wrap) 컴포넌트 템플릿의 호스트 엘리먼트의 이벤트에 listen 할 수 없습니다.

하지만 모든 규칙은 예외가 있습니다. 사용자가 컴포넌트의 템플릿의 외부 이벤트에 listen할수 없더라도, global element(window, document, body)에 listen 할 수 있습니다.

### Example
```html
<button (document:click)="handleClick()">Save</button>
```
하지만 global element에는 listen을 하지 않는것이 좋습니다. 재사용성의 한계가 있기 때문입니다.
전역 이벤트 중 하나를 처리하는 구성 요소 인스턴스가 여러 개있는 경우 모든 인스턴스는 이벤트가 발생한 후 동시에 이벤트에 응답하려고 시도합니다. 
이는 구성 요소 및 응용 프로그램의 성능에 직접적인 영향을 미칩니다.

일반적이 Angular 이벤트 바인딩은 자식 컴포넌트에서 부모 컴포넌트로 가는 버블링도 다룰 수 있습니다.
만약에 DOM 이벤트가 자식 컴포넌트에서 발생하면 부모 컴포넌트는 이벤트가 전파되는 것을 받을 수 있습니다.

한가지 중요한 점은(One thing to note is that) 오직 DOM 이벤트만 버블링이 발생 합니다.
EventEmitter에서 발생한 커스텀된 앵귤러 이벤트는 버블링이 되지 않습니다.
앵귤러 이벤트(Event Emitter를 이용한)는 일반적으로 커스텀된 DOM과 다르다는 것을 기억해야 합니다.

이벤트 바운딩에서 마지막으로 중요한 점은 사용자가 이벤트 바인딩된 컴포넌트의 템플릿를 **동적으로 이벤트 리스너를 붙이거나 제거할 수 없습니다.** 
이벤트 바인딩들은 DOM에서 렌더링된 엘리먼트를 활성화 시킬 것입니다. 그리고 DOM에서 제거될때까지 활성화 된 상태로 둘 것 입니다.
즉 이벤트 바인딩은 Angular에서 리스너가 시작되거나 중지될 때를 컨트롤 합니다.

Let’s Summarize It — Key Takeaways:
Event binding is the simplest (or the most proper) way of listening to events in a component template.
With event binding, you cannot listen to events fired outside a component’s template with the exceptions of global elements such as window, document, and body.
Listening to global events in a reusable component is not recommended as it could potentially result in poor performance.
Parent component can hear and catch DOM events (not custom Angular events) fired inside child components as the events bubble up.
Event bindings will be active once they are set on an element and they will stay active until the elements are removed from the DOM so that means you cannot control when to add or remove event listeners dynamically.
Stay tuned for the next blog posts on event listeners as I explore the other methods of listening to DOM events in Angular.



https://medium.com/claritydesignsystem/four-ways-of-listening-to-dom-events-in-angular-part-2-hostlistener-1b66d45b3e3d

@HostListener() : 이벤트 리스너
@HostBinding(): 이벤트 리스너로 인해 값이 변경되면 그것에 대한 속성값을 변경한다(배경색 등)

@Input을 받는 자식 컴포넌트에서 ngOnchages에서 인식이 가능하게 설정 가능하다.
(예: 생성 취소 이후 자식에서 줬던 값 3개를 전부 null처리를 해줘야 다시 자식에게 값을 보내준다.)
public ngOnChanges(changes: SimpleChanges) {
    if (
      (changes.app && changes.app.currentValue !== changes.app.previousValue) &&
      (changes.modalType && changes.modalType.currentValue !== changes.modalType.previousValue) &&
      (changes.appName && changes.appName.currentValue !== changes.appName.previousValue)

    ) {
      this.confirm();
    }
  }