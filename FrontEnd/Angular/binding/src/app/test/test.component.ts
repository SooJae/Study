import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  template: `
    <h2>
      Welcome {{name}}
    </h2>
    <h2>{{2+2}}</h2>
    <h2>{{"Welcom" + name}}</h2>
    <h2>{{name.length}}</h2>
    <h2>{{name.toUpperCase()}}</h2>
    <h2>{{greetUser()}}</h2>
    <h2>{{siteUrl}}</h2>
    <input [id]="myId" type="text" value="Vishwas">
    <input disabled="{{isDisabled}}" id="{{myId}}" type="text" value="Vishwas">
    <input [disabled]="isDisabled" id="{{myId}}" type="text" value="Vishwas">
    <h2 class ="text-success">Codevolution</h2>
    <h2 [class]="successClass">Codevolution</h2>
    <h2 class="text-special" [class]="successClass">Codevolution</h2>
    <h2 [class.text-danger]="hasError">Code</h2>
    <h2 [ngClass]="messageClasses">Codevolution</h2>

    <h2 [style.color]="hasError ? 'red' : 'green'">Style Binding</h2>
    <h2 [style.color]="highlightColor">Style Binding2</h2>
    <h2 [ngStyle]="titleStyles">Style Binding3</h2>
    <button (click)="onClick($event)">Greet</button>
    <button (click)="greeting='Welcome Vishias'">Greet</button>
    {{greeting}}
    <input #myInput type ="text">
    <button (click)="logMessage(myInput)">Log</button>
  `, styles: [
    `
    .text-success{
      color:green;
    }
    .text-danger{
      color:red;
    }
    .text-special{
      font-style: italic;
    }
  `
  ]
})
export class TestComponent implements OnInit {

  public name = 'Vishwas';
  public myId = 'testId';
  public isDisabled = false;
  public siteUrl = window.location.href;
  public successClass = 'text-success';
  public hasError = true;
  public isSpecial = true;
  public highlightColor = 'orange';
  public titleStyles = {
    color: 'blue',
    fontStyle: 'italic'
  };
  public messageClasses = {
    'text-success': !this.hasError,
    'text-danger' : this.hasError,
    'text-special' : this.isSpecial
   };

   public greeting = '';
  constructor() { }

  ngOnInit() {
  }

  greetUser() {
    return 'Hello ' + this.name;
  }

  onClick(event){
    console.log(event);
    this.greeting = event.type;
  }

  logMessage(value){
    console.log(value);
  }
}
