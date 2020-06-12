```js
this.http
      .post<{ name: string }>(
        'https://ng-complete-guide-43608.firebaseio.com/posts.json',
        postData,
        {
          observe: 'response'
        }
      ).subscribe();
```
observe에 body, response,events를 넣을 수 있다.

```js

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
```
인터셉터의 순서도가 중요하다 ( 위의 코드에서는 AuthInterceptorService 후 LoggingInterceptorService 발생)
