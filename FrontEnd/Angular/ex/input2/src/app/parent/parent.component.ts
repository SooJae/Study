import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `
  <app-child 
  [parentCount]="count" 
  (change)="updateFromChild($event)"></app-child>
  `
})
export class ParentComponent {
  count: number = 0; //initial value of count
  
  //This is the event that we subscribe to the child's selector
  //We will receive the data from child in this function
  updateFromChild($event){
    this.count++;
  }
}