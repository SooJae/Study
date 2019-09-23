import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  template:`<div class="app">
  Parent: {{ myCount }}
  <app-child
    [count]="myCount"
    (update)="countChange($event)">
  </app-child>
</div>`
})
export class ParentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  myCount: number = 10;
  countChange(event) {
    this.myCount = event;
  }

}
