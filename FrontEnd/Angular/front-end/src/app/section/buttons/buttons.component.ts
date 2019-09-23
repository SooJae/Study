import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {


  @Output() clickEvent = new EventEmitter();


  constructor() { }

  start() {
    //부모객체가 이벤트를 기다리고 있다가
    //자식 컴포넌트가 부모 컴포넌트에게 데이터를 전달해주는 구조로 만든다.
    this.clickEvent.emit();
  }

  ngOnInit() {
  }

  test($event: any) {
    console.log($event);
  }
}
