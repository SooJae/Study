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