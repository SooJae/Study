scrollbar 관련
https://stackblitz.com/edit/rxjs-yw4jld
스크롤 맨 아래로 고정시키기
element.scrollTop = element.scrollHeight - element.clientHeight;


앵귤러에 스크롤 관련 api가 있다?
https://medium.com/angular-in-depth/reactive-scroll-position-restoration-with-rxjs-792577f842c
https://stackoverflow.com/questions/35232731/angular-2-scroll-to-bottom-chat-style


tap은 함수에 전혀 영향을 끼치지 않는다.
return을 하더라도...
또한 tap에 next와, error 그리고 complete를 사용하여 각각 상황에 맞게 로그를 확인 할수 있다.

주의! tap을 이용해서 DOM객체를 조작하게되면(예 :
tap(code => {
        codeElem.innerHTML = code;
    })
)
**적용**되기 때문에, tap에 DOM 관련한 것들은 작성하지 말자!
debug-your-observable-streams-with-tap 강의 참고
