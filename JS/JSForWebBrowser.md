
# 자바스크립트

- HTML : 정보
- CSS : 디자인
- JavaScript : 웹브라우저, HTML을 프로그래밍적으로 제어
---
<br>

# JS 사용방식 (4가지)
 ### 1. inline방식 : 태그에 HTML과 JS가 혼합되어 있다. 좋은방식 X
```html
<input type="button" onclick="alert('Hello world')" value="Hello World">

onclick자체는 html인데 속성을 자바스크립트(alert)로 쓴다고 정의 되어있다.
```

### 2. script 태그방식 
```html
<script type="text/javascript">에서 type부분은 이제 없어도 된다.

<script>
        var hw = document.getElementById('hw')
        hw.addEventListener('click', function(){
            alert('Hello World');
        })
    </script> // 이것 자체는 HTML이다.
```

### 3. 외부파일 로드
```html
<body>
    <input type="button" id="hw" value="Hello World">
    <script src="ex_load.js"></script>
</body>
//HTML만 있다!


ex_load.js를 열어보면,
        var hw = document.getElementById('hw')
        hw.addEventListener('click', function(){
            alert('Hello World');
        })
가 있다.

외부파일을 로드하면 실행시 .js파일을 다운로드 한다.
캐시를 가지고 있어 한번만 받으면 된다!
```
### 4. 온 로드
```html
스크립트 태그를 body태그가 아닌 head태그에 위치 시킨다.하지만 body태그 밑으로 해주는게 좋다.
<head>
    <script src="ex_load.js"></script>
</head>
```
head태그에 자바스크립트 태그를 넣으면 브라우저가 head에 있는 자바스크립트 태그를 보자마자 다운로드를 시작한다. 그리고 이 자바 스크립트가 끝난 다음 나머지 를 실행한다.
```html
<head>
    <script>
    var hw = document.getElementById('hw')
        hw.addEventListener('click', function(){
            alert('Hello World');
        })
    </script>
</head>

<body>
    <input type="button" id="hw" value="Hello World">
</body>
```
**위의 코드와 완벽히 똑같다**. 브라우저에서는 아직 id가 "hw"라는 것을 알 수 없다.( 아직 body 부분을 내려오기 전이므로 그래서 hw값은 null이 된다. ) 
그래서 오류가 난다.
<br>
<br>

이것을 해결하려면
```html
<head>
    <script>
        window.onload = function () {
            var hw = document.getElementById('hw')
            hw.addEventListener('click', function () {
                alert('Hello World');
            })
        }
    </script>
</head>
```
onload라는 것은 현재 웹페이지의 모든 코드가 다 읽히고, 웹브라우저는 window객체의 onload 함수가 실행 된다. 
즉 body태그 마지막에 놓으면 window.onload를 쓸 필요가 없다.
또 **body태그가 head태그보다 빠르다.**

---
<br>

# BOM
BOM(Browser Object Model)이란 웹브라우저의 창이나 프래임을 추상화해서 프로그래밍적으로 제어할 수 있도록 제공하는 수단이다. BOM은 전역객체인 Window의 프로퍼티와 메소드들을 통해서 제어할 수 있다. 따라서 BOM에 대한 수업은 Window 객체의 프로퍼티와 메소드의 사용법을 배우는 것이라고 해도 과언이 아닐 것이다. 

<br>

<p align="center">
<img src="images/window-dom-bom-js.png">
</p>

<!-- <img src="window-dom-bom-js.png" style= "align: center"> -->


##  window
모든 것은 window 객체 밑에 있다. window - DOM, BOM, JS
document도 window 객체에 소속이 되어있다. window.document
변수도 마찬가지이다. window.a == a

`alert` : 경고창의 확인을 누르기 전까지 그 다음 동작이 진행되지 않는다.

`confirm` : 확인, 취소 창 (true false값 반환))
confirm 창의 확인을 누르면 true값을 반환. 취소를 누르면 false값을 반환.
if를 이용해 분기시킬 수 있다.

`prompt` : 텍스트 값과 같이 뜨며 사용자의 입력을 받아 그 값을 반환한다.

<br>

## Location 
현재 브라우저의 주소값을 알아 낼 수 있다.
자바스크립트가 브라우저를 제어하기 위해서는 모든 것이 객체여야 한다.

```html
<script> alert(location.toString(), location.href);</script>
```
두 인자 전부 똑같다. 정확하게는 **location.href를 쓰는게 선호된다.**
console.log(location)이면 location에 관한 많은 정보가 나온다.
```javascript
console.log(location.protocol, location.host, location.port, location.pathname, location.search, location.hash);
```
를 통해 필요한 프로퍼티를 뽑아 낼 수 있다.

```html
https://opentutorials.org/course/1375/6634?id=10#bookmark
```

`protocol` : 
https           
`host` : 
opentutorials.org // 컴퓨터를 식별하는 정보         
`port` : 서버컴퓨터의 여러가지 어플리케이션을 식별하는 정보.            
`pathname ` :
course/1375/6634 서버 애플리케이션이 갖고있는 특정한 정보   
`search` : ?id=10 쿼리정보       
`hash` : 
#bookmark

<br>

## URL 변경하기
`location.href = 'http://egoing.net';`          
`location = 'http://egoing.net';`           
아래와 같은 방법도 같은 효과를 낸다. 하지만 위에 방식이 더 명시적/
아래는 현재 문서를 리로드하는 간편한 방법을 제공한다.           
`location.reload();` :
새로고침!


<br>

## Navigator
브라우저의 정보를 제공하는 객체다. 주로 호환성 문제등을 위해서 사용한다.

`console.dir(navigator)` : 
navigator객체의 모든 프로퍼티를 볼 수 있다.

`appName` : 
웹브라우저의 이름이다. IE는 Microsoft Internet Explorer, 파이어폭스, 크롬등은 Nescape로 표시한다.

`appVersion` : 
브라우저의 버전을 의미한다. 

`userAgent` : 
브라우저가 서버측으로 전송하는 USER-AGENT HTTP 헤더의 내용이다. appVersion과 비슷하다. 

`platform` : 
브라우저가 동작하고 있는 운영체제에 대한 정보다.


<br>

## 기능테스트
Navigator 객체는 브라우저 호환성을 위해서 주로 사용하지만 모든 브라우저에 대응하는 것은 쉬운 일&nb이 아니므로 아래와 같이 기능 테스트를 사용하는 것이 더 선호되는 방법이다. 

예를 들어 Object.keys라는 메소드는 객체의 key 값을 배열로 리턴하는 Object의 메소드다. 이 메소드는 ECMAScript5에 추가되었기 때문에 오래된 자바스크립트와는 호환되지 않는다. 아래의 코드를 통해서 호환성을 맞출 수 있다. 

```javascript
// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
if (!Object.keys) {
  Object.keys = (function () {
    'use strict';
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
        dontEnums = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        dontEnumsLength = dontEnums.length;
 
    return function (obj) {
      if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
        throw new TypeError('Object.keys called on non-object');
      }
 
      var result = [], prop, i;
 
      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }
 
      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }());
}
```


<br>

## 창 제어
window.open 메소드는 새 창을 생성한다. 현대의 브라우저는 대부분 탭을 지원하기 때문에 window.open은 새 창을 만든다.          

`_self` : 
현재 창 열기            
`_blank` : 
새로운 창 열기          
`ot` : 
동일한 이름의 창이 있으면 새로운 창이 열리지 않는다.

`window.open == \<a target="_blank">\</a>` 똑같다.

### 보안
내가 클릭하면 팝업이 열리고,
script를 통해(즉 웹페이지를 만든사람이 의도한 것이면)팝업이 열리지 않는다.

#Document
문서를 자바스크립트로 제어하려면 제어의 대상에 해당되는 객체를 찾는 것이 제일 먼저 할 일이다. 문서 내에서 객체를 찾는 방법은 document 객체의 메소드를 이용한다. 

`document.getElementsByTagName`
document: 문서 전체에서
elements:태그의 또 다른 이름(들)
ByTagName 태그이름을 통해 가져온다.
```javascript
let lis= document.getElementsByTagName('li');
    for(let i=0; lis.length; i++){
        lis[i].style.color='red';
    }
```
li에 해당하는 각각의 객체들을(Element's') 담은 유사배열을 가져온다 (배열은 아니지만 배열과 유사하게 
작동)

```javascript
var ul = document.getElementsByTagName('ul')[0]; //ul태그중 첫번째 태그
    var lis = ul.getElementsByTagName('li');
    for(var i=0; lis.length; i++){
        lis[i].style.color='red';   
    }
```

class = 자바스크립트에서는 ClassName을 쓴다.
```javascript
var lis = document.getElementsByClassName('active'); //class에 active라는 이름이 element
    for(var i=0; i < lis.length; i++){
        lis[i].style.color='red';   
    }
```

`getElementById`
가장 많이 쓰는 메소드이다.
Element뒤에 s가 없으므로 하나만 찾는다는 뜻.(애초에 ID값은 하나만 쓰는게 국룰)

```javascript
 var li = document.getElementById('active');
    li.style.color='red';
```
`querySelector`
html에도 선택자가 있다(.(class) #(id등)
js도 있다!
해당되는 엘리먼트중 하나만 리턴한다!
전체 리턴을 하려면 querySelectorAll을 사용해야한다
```javascript
<script>
        let li = document.querySelector('li');
        li.style.color='red';
        let li2 = document.querySelector('.active');
        li2.style.color='blue';
</script>
```

`querySelectorAll`을 사용한 경우
```javascript
<script>
    var lis = document.querySelectorAll('li');
    for(var name in lis){
        lis[name].style.color = 'blue';
    }
```
유사배열에 Selector들을 전부 담아 리턴한다.
모든 li 색깔이 blue가 된다.


#jQuery
DOM을 이용해서 문서를 조회할 수 있지만, jQuery를 통해 더 쉽게 조회 할 수 있다.
DOM과 jQuery를 같이 병행하면서 공부하는게 좋다.

##라이브러리 
DOM, BOM, JScore을 통해 만드는 것이기때문에, 저것들이 못하는 일은 라이브러리도 할 수 없다. 코딩할 때 쓰는 효율적인 도구이다.

CDN : content delivery network
파일을 다운받을 필요없이 코드만 copy하면 된다.

```javascript
// 항상 써줘야 하는것
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
 <script>
    jQuery(document).ready(function($){
        //
    
    //  내가 작성할 코드를 담는곳 
        $('body').prepend('<h1>hello world</h1>');
    //

    });
</script>
```
##jQuery의 기본문법
`$('li').css('color','red');`

`$()` : 함수라는 것을 의미한다. jQuery function
li : css 선택자가 들어온다. (조회하려고) li 태그를 가지고있는 element들

`$('li').css` : jquery함수가 리턴한 jquery객체
css라고 하는 메소드를 호출하면 이 메소드는 jqeury객체를 만든 jquery함수의 인자에 해당되는 element들, 리스트 전체에 대해서 css라는 메소드를 실행하는 결과를 가져온다. 

`.` chaining
(chain처럼 연결되어서 연속적으로 메소드를 호출해서 작업 할 수 있다.)

`css('color','red');`
$('li')통해 조회한 각각의 element의 color를 red를 바꿔준다.

##DOM과 jQeury의 코드 차이
```javascript
var lis = document.getElementsByClassName('active');
for(var i=0; i < lis.length; i++){
    lis[i].style.color='red';   
}
```
위와 아래 코드는 같은 뜻이다.
```javascript
$('.active').css('color', 'red')
```
jQuery가 훨씬 쉽다. document.getElementsByClassName 메소드를 사용할 필요가 없고, 반복문을 사용할 필요도 없다.

```javascript
var li = document.getElementById('active');
li.style.color='red';
li.style.textDecoration='underline';</pre>
        <pre>
$('$active').css('color', 'red').css('textDecoration', 'underline');
```

웹브라우저를 제어하기 위해서는 제어해야할 태그의 객체를 찾아야 한다.
그 객체의 property를 이용해서 조작할 수 있다.

```html
<ul>
    <li>HTML</li>
    <li>CSS</li>
    <li id="active">JavaScript</li>
</ul>
<script>
    var li = document.getElementById('active');
    console.log(li.constructor.name);
    //HTMLElement 카테고리(단수 리턴)
    var lis = document.getElementsByTagName('li'); //HTMLCollection 카테고리 (복수 리턴, 유사배열)
    console.log(lis.constructor.name);
</script>
```
li.constructor.name
li 객체의 이름을 할 수 있다. 

```html
<a id="anchor" href="http://opentutorials.org">opentutorials</a>
<ul>
    <li>HTML</li>
    <li>CSS</li>
    <li id="list">JavaScript</li>
</ul>
<input type="button" id="button" value="button" />
<script>
    var target = document.getElementById('list');
    console.log(target.constructor.name); //HTMLLIelement
 
    var target = document.getElementById('anchor');
    console.log(target.constructor.name); //HTMLAnchorElement
 
    var target = document.getElementById('button');
    console.log(target.constructor.name); //HTMLInputElement
 
</script>
```

interface HTMLAnchorElement : HTMLElement{}
           //자식 객체       //상속받은 부모객체

상속받으려면 : 을 쓴다?

<p align="center">
<img src="images/dom_tree.png">
</p>

[출처](https://web.stanford.edu/class/cs98si/slides/the-document-object-model.html "dom_tree")





[2페이지](JSForWebBrowser.md)

