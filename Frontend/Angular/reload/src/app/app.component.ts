import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }
  public navigationSubscription;
  constructor(private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // RELOAD로 설정했기때문에 동일한 라우트로 요청이 되더라도 
      // 네비게이션 이벤트가 발생한다. 우리는 이 네비게이션 이벤트를 구독하면 된다.
      
      if (e instanceof NavigationEnd) {
        console.log('current route: ', router.url.toString());
        this.initialiseInvites();
      }
    });
  }
  
  initialiseInvites() {
    console.log('안녕');
    // 이곳에 페이지가 리로드되면 바뀔 데이터들이나 로직을 정리한다.
  }
  ngOnDestroy() {
     if (this.navigationSubscription) {  
        this.navigationSubscription.unsubscribe();
     }
   }
}
