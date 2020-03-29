https://medium.com/sjk5766/angular-change-detection-%EC%84%B1%EB%8A%A5-%ED%96%A5%EC%83%81%EB%B0%A9%EB%B2%95-onpush-changedetectionref-71c9bccf0a42

markForCheck():  Marks all ChangeDetectionStrategy ancestors as to be checked.
detectChanges():  Checks the change detector and its children.

Does it means that markForCheck is **from the root to the calling component** and detectChanges is **from the calling component to all children?**
Doesn’t change detection always happens from root even when calling detectChanges?
I saw markForCheck used with **OnPush when mutating an object or receiving a change outside of angular zone** and detectChanges when **we want to trigger a check in a detached component.**

출처 : https://medium.com/@pablo.platt/can-you-please-explain-when-to-use-markforcheck-and-when-detectchanges-52e281783c6



```js
@Component({
  selector: ‘app-root’,
template: `<button (click)="change()">change</button>
             <br>
             <app-child [data]="data"></app-child>`
})
export class AppComponent {
  data = {name : 'seo'}
  change() {}
}

@Component({
  selector: 'app-child',
  template: `<app-childofchild [data]="data"></app-childofchild>`
})
export class ChildComponent implements DoCheck {
  @Input() data: object;
  ngDoCheck() {
    console.log('child ngDoCheck()')
  }
}
@Component({
  selector: ‘app-childofchild’,
template: ``
})
export class ChildofchildComponent implements  DoCheck {
  @Input() data: object;
  ngDoCheck() {
    console.log('child of child do check')
  }
}
```




Reference checking with immutable data
- this.list = […this.list, element];
No reference checking with mutable data
- this.list.push(element);

The point of this articles is that ngOnChanges lifecyle does not detect change for mutable data, instead it detects reference change with immutable data.
출처 : https://medium.com/@mikyung.lee11/how-angular-detects-change-37ec0661441


detectChanges는 좋지 않은 프로그래밍에서만 사용한다.
출처 : https://stackoverflow.com/questions/57380682/angular-markforcheck-vs-detectchanges


markForCheck는 ChangeDetectionStrategy.OnPush와 쌍으로 다니는것 같다..
https://blog.ninja-squad.com/2018/09/27/angular-performances-part-4/


앵귤러 기본 https://github.com/ChoDragon9/posts/wiki/Angular-%EC%B5%9C%EC%A0%81%ED%99%94

앵귤러 성능 향상 방법 : https://medium.com/sjk5766/angular-change-detection-%EC%84%B1%EB%8A%A5-%ED%96%A5%EC%83%81%EB%B0%A9%EB%B2%95-onpush-changedetectionref-71c9bccf0a42

옵저버블의 위력 : https://vsavkin.com/change-detection-in-angular-2-4f216b855d4c





You might be thinking to yourself that this should work with every asynchronous API that triggers change detection, as we learned at the beginning, but it won’t.
It turns out that the rule applies only to DOM events, so the following APIs will not work.

```js
@Component({
  template: `
      <button (click)="add()">Add</button>
    {{count}}
    `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent {
  count = 0;

  constructor() {
    setTimeout(() => this.count = 5, 0);

    setInterval(() => this.count = 5, 100);

    Promise.resolve().then(() => this.count = 5); 
    
    this.http.get('https://count.com').subscribe(res => {
      this.count = res;
    });
  }

  add() {
    this.count++;
  }

}
```

Note that you are still updating the property so in the next change detection cycle, for example, when we click on the button, the value will be six ( 5 + 1 ).

출처 : https://netbasal.com/a-comprehensive-guide-to-angular-onpush-change-detection-strategy-5bac493074a4

detectChanges() : Angular에게 구성요소와 그의 자식에 대한 변경 감지를 실행하도록 지시한다.
ApplicationRef.tick() Anuglar에게 전체 응용프로그램에 대한 변경감지를 실행하도록 지시한다.
markForch(): 변경감지를 하지 않는다. 대신 Onpush의 현재 또는 다음 변경 감지주기의 일부로 모든 조상을 한번 점검하도록 표시한다.