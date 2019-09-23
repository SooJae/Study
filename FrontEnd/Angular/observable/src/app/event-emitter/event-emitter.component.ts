import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'zippy',
  template: `
  <div class="zippy">
    <div (click)="toggle()">Toggle</div>
    <div [hidden]="!visible">
      안녕하세요
    </div>
  </div>`
})
export class EventEmitterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  visible: boolean = true;
  @Output() open: EventEmitter<any> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();
 
  toggle() {
    this.visible = !this.visible;
    if (this.visible) {
      this.open.emit(null);
    } else {
      this.close.emit(null);
    }
  }

}
