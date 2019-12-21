import { Component } from '@angular/core';

// 컴포넌트는 메타데이터와 템플릿(뷰를 나타내는)
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hello-worldㄴ';
}
