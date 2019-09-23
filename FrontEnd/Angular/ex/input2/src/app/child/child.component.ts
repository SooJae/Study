import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <div>
      ㄴㄴ{{ parentCount }}
    </div>
  `
})
export class ChildComponent implements OnInit {

  @Output()
  change: EventEmitter<number> = new EventEmitter();

  
  @Input('parentCount') count :number;

  

  constructor() { }

  ngOnInit() {
    this.change.emit(11);
  }

}
