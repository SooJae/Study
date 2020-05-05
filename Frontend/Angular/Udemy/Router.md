```html
<li role="presentation" routerLinkActive="active"><a routerLink="/">Home</a></li>
<li role="presentation" routerLinkActive="active"><a routerLink="/servers">Servers</a></li>
<li role="presentation" routerLinkActive="active"><a routerLink="/users">Users</a></li>
```

이때 root는 항상 포함되므로 (루트로 부터 시작해서 하위 디렉토리로 가니까) CSS가 루트에 항상 적용된 것을 볼수 있다.

그래서 다음과 같이 옵션을 추가 해줘야한다.
```html
<li role="presentation" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}"><a routerLink="/">Home</a></li>
<li role="presentation" routerLinkActive="active"><a routerLink="/servers">Servers</a></li>
<li role="presentation" routerLinkActive="active"><a routerLink="/users">Users</a></li>
```
이렇게 되면 full path로 검사를 해서 정상적으로 css가 반영된 것을 확인 할수 있다.

routerLink는 현재위치를 기억하고 있기때문에, '/'를 쓰지않고 servers, users를 사용하면 상대경로로 /servers/servers이런식으로 주소가 바뀌므로 에러가 발생한다.
하지만 `this.router.navigate(['servers'])`를 사용할 경우에는 현재 위치를 파악하지 않기때문에, /servers로 간다.

현재위치를 알게하려면(그리고 상대경로로 가게 하려면)
`this.router.navigate(['servers'], {relativeTo: this.route});`로 쓰면된다. 여기서 this.route는 activateRoute이다.
