```js
import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  @Output() serverCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
  @Output() blueprintCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
  // newServerName = '';
  // newServerContent = '';
  @ViewChild('serverContentInput') serverContentInput: ElementRef;

  constructor() {
  }

  ngOnInit(): void {
  }

  onAddServer(nameInput: HTMLInputElement) {
  this.serverContentInput.nativeElement.value = 'abc'; // 이런식으로 DOM을 조작하지 말자.
    this.serverCreated.emit({
      serverName: nameInput.value,
      serverContent: this.serverContentInput.nativeElement.value
    });
  }

  onAddBlueprint(nameInput: HTMLInputElement) {
    this.blueprintCreated.emit({
      serverName: nameInput.value,
      serverContent: this.serverContentInput.nativeElement.value
    });
  }

}
```
직접 ViewChild로 접근해서 Dom을 조작하는 것은 안좋다. (앵귤러에 DOM을 조작하는 것중에 좋은 것들이 얼마나 많은데...) 
DOM 조작은 Directive를 사용하는게 좋다.
