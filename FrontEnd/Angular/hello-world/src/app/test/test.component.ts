import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test', // .app-test를 사용하면 class로 사용가능
  templateUrl: './test.component.html', 
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
