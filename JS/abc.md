자바스크립트를 선언(?)하는 방법은 
제가 알고 있기로는 3가지가 있습니다. 
```javascript
<script type="text/javascript"> 
<script language="javascript"> 
<script> 
이렇게요.  
```


저 3가지의 차이점이 있을까요? 그리고 셋중 무엇을 쓰는게 옳은 표현인가요? 

셋다 작동은 하는거 같은데 굳이 가려 쓸 필요도 있을까요?

script 선언은 브라우저의 기본 설정에 맞추어갑니다.     
혹시나 script 내부의 내용이 vb가 기본인 브라우저가있다면 그 안의 내용을 vb에 맞추어 파싱하려들겁니다.       
안써도, 혹은 대충 써도 동작하는 이유는 대부분의 브라우저의 script 선언의 기본이 자스로 파싱하라고되어있기 때문입니다.       
 명시적으로 써준다고 했을때 올바른 구문은 맨 위에꺼입니다.

```javascript
 <script type="text/javascript" language="javascript"> 하위 브라우저와 호완성등 생각하면 위와같이 써야 하지만 보통은 <script type="text/javascript"> 이렇게 쓰는게 맞고 지금 이렇게쓰고있고 js 원래 mine type 이 text/javascript 라고 어디서 보았던듯.

// html 5 부터는 디폴트로 script 는 js로 쓰기때문에 <script> 로만 사용하셔도 무방합니다. 아니라면 <script type="text/javascript"> 이렇게 써주시는게 맞겠죠. style 태그의 경우에도 type="text/css" 이렇게 명시해줘야 합니다만 html 5 부터는 디폴트로 <style> 을 적으면 css를 의미하죠.

// 현재 표준은 <script type="text/javascript"> 라고 만든 개발자가 이야기 했어요.ㅋ
```