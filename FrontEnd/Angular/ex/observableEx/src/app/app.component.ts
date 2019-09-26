import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'observableEx';

}


type Message = { message: string };

class Subject {
  private _observers: Observer[] = [];
  protected _state: Message = { message: '' };

  // Observer 등록(구독)
  add(observer: Observer) {
    // 예 배열이 [0,1,2]가 있었고 3을 넣으려고 할때 
    // 기존에 있던 옵저버 배열 [(0,1,2)(...this._observers),3(observer)]
    this._observers = [...this._observers, observer];
    console.log('구독', observer);
    console.log('현재 구독 명단', this._observers);
  }

  // Observer 삭제(구독 해지)
  remove(observer: Observer) {
    this._observers 
    //filter는 조건문이라고 보면 된다. 즉 _observers배열을 돌려서(o=>) 인자 o값이 옵저버와 같지 않는 경우만 필터한다(배열 값이 바뀐다)
      = this._observers.filter(o => o !== observer);
    console.log('구독 해지', observer);
    console.log('현재 구독 명단', this._observers);
  }

  // 구독한 모든 Observer의 update 메소드를 호출하여 데이터를 전파
  protected notify(state: Message) {
    // 구독자들 배열 안의 인자를 forEach로 쭉 돌리면서 업데이트를 해준다.
    this._observers.forEach(o => {
      console.log(`${o.constructor.name}에게 데이터를 전파한다!`, state);
      o.update(state);
    });
  }
}

class MySubject extends Subject {
  // 구독한 모든 Observer에게 메시지를 전파 
  setMessage(message: string) {
    this._state.message = message;
    this.notify(this._state);
  }
}

abstract class Observer {
  // Subject에 의해 호출되어 메시지를 전파받는다.
  abstract update(message: Message): void;
}

class Observer1 extends Observer { 
  update(message: Message) {
    console.log(`${this.constructor.name}에게 데이터가 전파되었다!`, message);
  }
}
class Observer2 extends Observer {
  update(message: Message) {
    console.log(`${this.constructor.name}에게 데이터가 전파되었다!`, message);
  }
}

const subject = new MySubject();
console.log(subject);
const o1 = new Observer1();
const o2 = new Observer2();

// 구독
subject.add(o1);
subject.add(o2);

// 데이터 전파
subject.setMessage('👋');

// 구독 취소
subject.remove(o2);

// 데이터 전파
subject.setMessage('😀');
