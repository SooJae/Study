import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `<button (click)="increment()">증가</button>
  <button (click)="decrement()">감소</button>
  `
})
export class ChildComponent implements OnInit {

  @Input() count:number =0;
//  @Output() change = new EventEmitter();


  @Output('update')
  change: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  increment() {
    this.count++;
    this.change.emit(this.count);
  }

  decrement(){
    this.count--;
    this.change.emit(this.count);
  }
  

}
