import { Component, OnInit, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-time-display',
  templateUrl: './time-display.component.html',
  styleUrls: ['./time-display.component.scss']
})
export class TimeDisplayComponent implements OnInit {

  //부모의 인풋 값을 받도록
  @Input() inputData: string;

  min: number = 0;
  sec: number = 0;
  ms: number = 0;

  timeInterval;
  
  constructor() {
    // setInterval(() => {
    //   this.test++;

    // }, 1000);
  }

  timeStart(){
   this.timeInterval = setInterval(() => {
    this.ms++;
    }, 10);
  }

  timeStop() {
    clearInterval(this.timeInterval);
  }

  timeReset(){
    this.timeStop();
    this.ms = 0;
  }

  // tslint:disable-next-line: use-lifecycle-interface
  // ngOnChanges(changes: SimpleChange){

  //   for (let propName in changes) {
  //     if (propName === 'inputData') {

  //       switch(changes[propName].currentValue){
  //         case 'start':
  //         this.timeStart();
  //         break;
  //         case 'stop':
  //         this.timeStop();
  //         break;
  //         case 'reset':
  //         this.timeReset();
  //         break;


  //       }
  //       this.timeStart();
  //     }
  //   }
  // }

  ngOnInit() {
  }

}
