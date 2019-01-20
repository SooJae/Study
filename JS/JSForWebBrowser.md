
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
Navigator 객체는 브라우저 호환성을 위해서 주로 사용하지만 모든 브라우저에 대응하는 것은 쉬운 일&이 아니므로 아래와 같이 기능 테스트를 사용하는 것이 더 선호되는 방법이다. 

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

## Dom tree

<p align="center">
<img src="images/dom_tree.png">
</p>

[출처](https://web.stanford.edu/class/cs98si/slides/the-document-object-model.html "dom_tree")

Dom을 이해하는 것이 웹페이지를 이용하는 것의 중추이다. 아주 중요!!!!!!!

## HTML COllECTION

```html
<html>
<body>
<ul>
    <li>HTML</li>
    <li>CSS</li>
    <li id="active">JavaScript</li>
</ul>
<script>
console.group('before');// 그룹핑 시작
var lis = document.getElementsByTagName('li');
//HTMLCollection 유사배열이다.

for(var i = 0; i < lis.length; i++){
    console.log(lis[i]);
}
console.groupEnd();// 그룹핑 끝
console.group('after');//그룹핑 시작
lis[1].parentNode.removeChild(lis[1]); //<li>CSS</li> 삭제
for(var i = 0; i < lis.length; i++){
    console.log(lis[i]);
}
console.groupEnd(); //그룹핑 끝
</script>
</body>
</html>
```

결과.
```
- before //group('before') 
    - li
    - li
    - li#active
//groupEnd()
- after
    - li
    - li#active
```
그룹별로 볼 수 있어서 보기 편하다.

HTMLCollection은 실시간으로 반영이 되어서 재 조회 할 필요가 없다.

```javascript
    var li      =    $('li');  
//jQeury 객체        jQuery함수
```         
`li.css('text-decoration','underline');` 
설정.
내부적으로 반복문을 수행하기 때문에 코드가 짧아진다.

`li.css('text-decoration');`

text-decoration의 설정값 가져오기
(첫번째 element만 가져옴)

## jQuery 룰
2개의 인자를 사용하면 설정하기.
1개의 인자를 사용하면 가져오기.

`.` : chaining 연속적으로 작업을 실행.

`var li =  $('li');`
배열처럼 되어있다.   
li[0], li.length 등 사용가능
그러나 li[i]는 jquery의 객체가 아니고 DOM의 객체이기 때문에 `li[i].css()`은 에러가 발생한다.
그래서 이것을 한번 더 jQuery객체로 감싸준다.

`$(li[i]).css()`;


jQuery함수 사용방법
1. $('li')

> n.fn.init(3) [li, li, li, prevObject: n.fn.init(1), context: document, selector: "li"]

2. var t= document.getElementsByTagName('li');
t.constructor
>ƒ HTMLCollection() { [native code] }
해보면 Dom객체라는 것을 알 수 있다.
var li = $(t); // jQuery객체로 감싸줌
>n.fn.init(3) [li, li, li]

3. jQuery의 map을 이용하는 방법(추천!)

li.map(function(index, elem){
    console.log(index,elem);
    $(elem).css(`color`,`red`);
})
map은 jQuery 객체의 method이다. function을 호출하는데 index에는 index값, elem은 객체 값(여기서는 DOM객체의 HTMLLiElement)이 들어간다. 위에서 언급했듯이 내부적으로 반복문이 실행된다.

elem이 DOM 객체값이기 때문에 jQeury 객체로 감싸줘야한다. $(elem)

# HTMLElement
모든 HTML 태그들을 대표하는, 공통적으로 가지고 있는 속성을 가지고 있는 객체
대표적인 특성은 style이라고 하는 property가 있다.  style은 해당되는 element의 css를 제어하는 역할을 가지고 있다.

 HTMLElement는 Element라는 부모객체가 있다.
 HTMLElement 도 있는데 왜 ELement를 쓸까? 그 이유는 DOM이 꼭 HTML만을 프로그래밍적으로 제어하기위한 규격이 아니기 때문이다.
 markup language(
     
예) 
 ```html 
 <html></html>
 ```
 )를 제어하기 위한 규격이 DOM이기 때문에 DOM라는 규격 표준은 HTML 뿐만 아니라 XML, SVG, XUL등등 많은 markup langauge를 제어하기 위한 표준이기 때문에 HTML, XML, SVG, XUL 을 전부 제어하기 위한 객체가 Element이다.

DOM을 공부하면 HTML, XML, SVG, XUL 등 다양한 언어들을 제어하기 쉽다.



## 식별자
문서내에서 특정한 엘리먼트를 식별하기 위한 용도로 사용되는 API 
     
`Element.classList`     
`Element.className`     
`Element.id`        
`Element.tagName`       

## 조회
엘리먼트의 하위 엘리먼트를 조회하는 API

`Element.getElementsByClassName`        
`Element.getElementsByTagName`        
`Element.querySelector`     
`Element.querySelectorAll`

##속성
엘리먼트의 속성을 알아내고 변경하는 API

`Element.getAttribute(name)`        
`Element.setAttribute(name, value)`     
`Element.hasAttribute(name);`       
`Element.removeAttribute(name);`        

```html
<ul>
    <li>html</li>
    <li>css</li>
    <li id="active" class="important current">JavaScript</li>
</ul>
<script>
console.log(document.getElementById('active').tagName)
</script>
```

### Element.tagName

document.getElementById('active')
이부분은 HTMLLIElement라는 객체를 갖게되는데, HTMLElement의 속성을 상속받고, 이것은 Element의 속성중 tagName을 상속받는다. 

  *tagName은 읽기 전용이라 `document.getElementById('active').tagName = 'a'` 등 임의로 바꾸지 못한다.

  ### Element.id

  문서에서 id는 단 하나만 등장할 수 있는 식별자이다.

```javascript
<ul>
    <li>html</li>
    <li>css</li>
    <li id="active">JavaScript</li>
</ul>
<script>
var active = document.getElementById('active');
console.log(active.id);
active.id = 'deactive'; 
//변경가능
console.log(active.id);
</script>
```

### Element.className
클래스는 여러개의 엘리먼트를 그룹핑할 때 사용한다.
```html
<ul>
    <li>html</li>
    <li>css</li>
    <li id="active">JavaScript</li>
</ul>
<script>
var active = document.getElementById('active');
// class 값을 변경할 때는 프로퍼티의 이름으로 className을 사용한다.
active.className = "important current";
console.log(active.className);
// 클래스를 추가할 때는 아래와 같이 문자열의 더한다.
active.className += " readed"
</script>
```

그러나 classList가 더 편리하다.

### Element.classList
classList에 저장되어있는 객체는 DOMTokenList이다.
DOMTokenList는 
class ="a b c d"등 클래스 4개가 있을때 이것들이 담겨있는 것이 DOMTokenList이다.

DOMTokenList는 유사배열이다.

즉 조회할때

```js
let active = document.getElementById('active');
function loop(){
    for(var i=0; i<active.classList.length; i++){
        console.log(i, active.classList[i]);
    }
```
추가할때 : 
`
active.classList.add('abc');
`

제거할때 : 
`
active.classList.remove('abc');
`

토글 (실행할때 사라졌다 없어졌다 하는 것.) : 
`
active.classList.toggle('abc');
`


# 조회 API
지금까지 document.getElementBy* 메소드를 통해서 엘리먼트를 조회했다. 이것은 문서 전체에서 찾을 때 쓰고, 어떤 객체의 하위 element를 대상으로 조회할때 (즉 조회 범위를 좁힐때) element객체가 갖고있는 getElementBy*를 쓰면 된다.


```html
<ul>
    <li class="marked">html</li>
    <li>css</li>
    <li id="active">JavaScript
        <ul>
            <li>JavaScript Core</li>
            <li class="marked">DOM</li>
            <li class="marked">BOM</li>
        </ul>
    </li>
</ul>
<script>
    var list = document.getElementsByClassName('marked');
    console.group('document');
    for(var i=0; i<list.length; i++){
        console.log(list[i].textContent);
    }
    console.groupEnd();
     
    console.group('active');
    var active = document.getElementById('active');     
    var list = active.getElementsByClassName('marked');
    for(var i=0; i<list.length; i++){
        console.log(list[i].textContent);
        //textContent 메소드는 태그에 속한 text를 리턴해준다.
    }
    console.groupEnd();
</script>
```

# 속성 제어 API
태그의 이름만으로 정보를 전부 표현하기 힘들때, 정보의 부가적인 정보를 표현하는 것을 속성이라고 한다.

`Element.getAttribute(name)`        
`Element.setAttribute(name, value)`     
`Element.hasAttribute(name);`       
`Element.removeAttribute(name);`        

```html
<a id="target" href="http://opentutorials.org">opentutorials</a>
<script>
var t = document.getElementById('target');
console.log(t.getAttribute('href')); //http://opentutorials.org
t.setAttribute('href', 'http://www.naver.com');// href 값을 수정한다.
t.setAttribute('title', 'opentutorials.org'); // title이라는 속성이 없을 시 title 속성의 값을 설정한다.
console.log(t.hasAttribute('title')); // true, title 속성의 존재여부를 확인한다.
t.removeAttribute('title'); // title 속성을 제거한다.
console.log(t.hasAttribute('title')); // false, title 속성의 존재여부를 확인한다.
</script>
```

`t.id == t.getAttribute('id');`

속성과 프로퍼티
```html
<p id="target">
    Hello world
</p>
<script>
    var target = document.getElementById('target');

    // attribute 방식
    target.setAttribute('class', 'important');
    // property 방식 (className을 직접 지정)
    target.className = 'important';
</script>
```


| Attribute    | Property    |
| ----------- | ----------- |
| class       | className   |
| readonly    | readOnly    |
| rowspan     | rowSpan     |
| colspan     | colSpan     |
| usemap      | userMap     |
| frameborder | frameBorder |
| for         | htmlFor     |
| maxlength   | maxLength   |


심지어 속성과 프로퍼티는 값이 다를수도 있다. 아래 코드를 실행한 결과는 속성과 프로퍼티의 값이 꼭 같은 것은 아니라는 것을 보여준다

```html
<a id="target" href="./demo1.html">ot</a>
<script>
//현재 웹페이지가 http://localhost/webjs/Element/attribute_api/demo3.html 일 때 
var target = document.getElementById('target');
// http://localhost/webjs/Element/attribute_api/demo1.html 
console.log('target.href', target.href);
// ./demo1.html 
console.log('target.getAttribute("href")', target.getAttribute("href"));
</script>
```

Query 객체의 메소드 중 setAttribute, getAttribute에 대응되는 메소드는 attr이다. 또한 removeAttribute에 대응되는 메소드로는 removeAttr이 있다. 

```html
<a id="target" href="http://opentutorials.org">opentutorials</a>
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script>
var t = $('#target');
console.log(t.attr('href')); //http://opentutorials.org
t.attr('title', 'opentutorials.org'); // title 속성의 값을 설정한다.
t.removeAttr('title'); // title 속성을 제거한다.
</script>
```

DOM과 마찬가지로 jQuery도 속성(attribute)과 프로퍼티를 구분한다. 속성은 attr, 프로퍼티는 prop 메소드를 사용한다.

```html
<a id="t1" href="./demo.html">opentutorials</a>
<input id="t2" type="checkbox" checked="checked" />
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script>
// 현재 문서의 URL이 아래와 같다고 했을 때
// http://localhost/jQuery_attribute_api/demo2.html
var t1 = $('#t1');
console.log(t1.attr('href')); // ./demo.html 
console.log(t1.prop('href')); // http://localhost/jQuery_attribute_api/demo.html 
 
var t2 = $('#t2');
console.log(t2.attr('checked')); // checked
console.log(t2.prop('checked')); // true
</script>
```

attr => attribute 방식
prop => property 방식

원래는 property에서는 className이라고 써야하지만 (class는 예약어이기 때문에), jQuery에서 내부적으로 처리해주기때문에 class라고만 써도 된다.

```html
<div id="t1">opentutorials</div>
<div id="t2">opentutorials</div>
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script>
$('#t1').prop('className', 'important'); 
$('#t2').prop('class', 'current');  
</script>
```




find를 쓰는 이유는 체인을 끊지 않고 작업의 대상을 변경하고 싶을 때 사용한다. 
```html
<ul>
    <li class="marked">html</li>
    <li>css</li>
    <li id="active">JavaScript
        <ul>
            <li>JavaScript Core</li>
            <li class="marked">DOM</li>
            <li class="marked">BOM</li>
        </ul>
    </li>
</ul>
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script>
    // $( ".marked", "#active").css( "background-color", "red" ); //selector context를 이용
    $(#active .marked).css( "background-color", "red" ); //css 선택자를 이용
    $(`#active`).find(`.marked`).css("background-color","red");
    //위에것들과 같은 뜻.
    $(`#active`).css(`color`,`blue`).find(`.marked`).css(`background-color`,`red`);
    //active밑에는 color를 blue로 acitve밑의 marked 클래스의 backround-color를 red로
</script>
```

Node객체는 DOM에서 시조와 같은 역할을 한다. 다시말해서 모든 DOM객체는 Node객체를 상속 받는다.

![node-image](images/node.png)

```html
<ul>
    <li>js</li>
    <li>html</li>

</ul>
```
```
Node.childNodes     : js,html
Node.firstChild     :   js 
Node.lastChild      :   html   
Node.nextSibling    :   html
Node.previousSibling:   js
Node.contains()     :   자식이 있는지 없는지 확인
Node.hasChildNodes():   자식이 있는지 없는지 확인
```

각각의 구성요소가 어떤 카테고리에 속하는 것인지를 알려주는 식별자를 제공한다. 

`Node.nodeType`
`Node.nodeName`


Node 객체의 값을 제공하는 API

`Node.nodeValue`
`Node.textContent`

Node 객체의 자식을 추가하는 방법에 대한 API

`Node.appendChild()`
`Node.removeChild()`

```html
<body id="start">[공백, 줄바꿈도 자식 노드.]
<ul>
    <li><a href="./532">html</a></li> 
    <li><a href="./533">css</a></li>
    <li><a href="./534">JavaScript</a>
        <ul>
            <li><a href="./535">JavaScript Core</a></li>
            <li><a href="./536">DOM</a></li>
            <li><a href="./537">BOM</a></li>
        </ul>
    </li>
</ul>
<script>
var s = document.getElementById('start');
console.log(1, s.firstChild); // #text (공백문자, 문자열이기때문에 #text로 되어있다.)
var ul = s.firstChild.nextSibling
console.log(2, ul); // ul
console.log(3, ul.nextSibling); // #text
console.log(4, ul.nextSibling.nextSibling); // script
console.log(5, ul.childNodes); //text, li, text, li, text, li, text
console.log(6, ul.childNodes[1]); // li(html)
console.log(7, ul.parentNode); // body
</script>
</body>
```

노드 작업을 하게 되면 현재 선택된 노드가 어떤 타입인지를 판단해야 하는 경우가 있다. 이런 경우에 사용할 수 있는 API가 nodeType, nodeName이다. 

Node.nodeType
node의 타입을 의미한다. 
Node.nodeName
node의 이름 (태그명을 의미한다.)

노드의 종류에 따라서 정해진 상수가 존재한다. 아래는 모든 노드의 종류와 종류에 따른 값을 출력하는 예제다.

```js
for(var name in Node){
   console.log(name, Node[name]);
}
```

ELEMENT_NODE 1          
ATTRIBUTE_NODE 2            
TEXT_NODE 3             
CDATA_SECTION_NODE 4            
ENTITY_REFERENCE_NODE 5             
ENTITY_NODE 6           
PROCESSING_INSTRUCTION_NODE 7           
COMMENT_NODE 8          
DOCUMENT_NODE 9             
DOCUMENT_TYPE_NODE 10           
DOCUMENT_FRAGMENT_NODE 11           
NOTATION_NODE 12            
DOCUMENT_POSITION_DISCONNECTED 1            
DOCUMENT_POSITION_PRECEDING 2           
DOCUMENT_POSITION_FOLLOWING 4           
DOCUMENT_POSITION_CONTAINS 8            
DOCUMENT_POSITION_CONTAINED_BY 16           
DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC 32        


body.firstChild.nodeType === 3
body.firstChild.nodeType === TEXT_NODE
위의 두개는 같은뜻이다.


```html
<!DOCTYPE html>
<html>
<body id="start">
<ul>
    <li><a href="./532">html</a></li> 
    <li><a href="./533">css</a></li>
    <li><a href="./534">JavaScript</a>
        <ul>
            <li><a href="./535">JavaScript Core</a></li>
            <li><a href="./536">DOM</a></li>
            <li><a href="./537">BOM</a></li>
        </ul>
    </li>
</ul>
<script>
function traverse(target, callba   ck){
    if(target.nodeType === 1){
        //if(target.nodeName === 'A')
        callback(target);
        var c = target.childNodes;
        for(var i=0; i<c.length; i++){
            traverse(c[i], callback);       
        }   
    }
}
traverse(document.getElementById('start'), function(elem){
    console.log(elem);
});
</script>
</body>
</html>
```

노드의 추가와 관련된 API들은 아래와 같다.

`appendChild(child)`
노드의 마지막 자식으로 주어진 엘리먼트 추가
`insertBefore(newElement, referenceElement)`
appendChild와 동작방법은 같으나 두번째 인자로 엘리먼트를 전달 했을 때 이것 앞에 엘리먼트가 추가된다.
노드를 추가하기 위해서는 추가할 엘리먼트를 생성해야 하는데 이것은 document 객체의 기능이다. 아래 API는 노드를 생성하는 API이다.

`document.createElement(tagname)`
엘리먼트 노드를 추가한다.
`document.createTextNode(data)`
텍스트 노드를 추가한다. 
```html
<ul id="target">
    <li>HTML</li>
    <li>CSS</li>
</ul>
<input type="button" onclick="callAppendChild();" value="appendChild()" />
<input type="button" onclick="callInsertBefore();" value="insertBefore()" />
<script>
    function callAppendChild(){
        var target = document.getElementById('target');
        var li = document.createElement('li');
        var text = document.createTextNode('JavaScript');
        li.appendChild(text);
        target.appendChild(li);
    }
 
    function callInsertBefore(){
        var target = document.getElementById('target');
        var li = document.createElement('li');
        var text = document.createTextNode('jQuery');
        li.appendChild(text);
        target.insertBefore(li, target.firstChild);
    }
</script>
```

노드 제거

```html
<ul>
    <li>HTML</li>
    <li>CSS</li>
    <li id="target">JavaScript</li>
</ul>
<input type="button" onclick="callRemoveChild();" value="removeChild()" />
<script>
    function callRemoveChild(){
        var target = document.getElementById('target');
        target.parentNode.removeChild(target);
    }
</script>
```

```html
<ul>
    <li>HTML</li>
    <li>CSS</li>
    <li id="target">JavaScript</li>
</ul>
<input type="button" onclick="callReplaceChild();" value="replaceChild()" />
<script>
    function callReplaceChild(){
        var a = document.createElement('a');
        a.setAttribute('href', 'http://opentutorials.org/module/904/6701');
        a.appendChild(document.createTextNode('Web browser JavaScript'));
 
        var target = document.getElementById('target');
        target.replaceChild(a,target.firstChild);
    }
</script>
```

jQuery를 이용해서 노드를 제어하는 방법을 알아보자. jQuery에서 노드를 제어하는 기능은 주로 Manipulation 카테고리에 속해 있다. 


```html
<!-- before -->
<div class="target">
    <!-- prepend -->
    content1
    <!-- append -->
</div>
<!-- after -->
 <!-- before -->
<div class="target">
    <!-- prepend -->
    content2
    <!-- append -->
</div>
 <!-- after -->
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script>
    $('.target').before('<div>before</div>');
    $('.target').after('<div>after</div>');
    $('.target').prepend('<div>prepend</div>');
    $('.target').append('<div>append</div>');
</script>
```

제거와 관련된 API는 remove와 empty가 있다. remove는 선택된 엘리먼트를 제거하는 것이고 empty는 선택된 엘리먼트의 텍스트 노드를 제거하는 것이다.



```html
<div class="target" id="target1">
    target 1
</div>
 
<!-- remove시 위에가 전부 사라짐 -->

<div class="target" id="target2">
    target 2    
    <!-- empty시 target2텍스트만 사라짐 -->
</div>
 
<input type="button" value="remove target 1" id="btn1" />
<input type="button" value="empty target 2" id="btn2" />
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script>
    $('#btn1').click(function(){
        $('#target1').remove();
    })
    $('#btn2').click(function(){
        $('#target2').empty();
    })
</script>

```



replaceAll과 replaceWith는 모두 노드의 내용을 교체하는 API이다. replaceWith가 제어 대상을 먼저 지정하는 것에 반해서 replaceAll은 제어 대상을 인자로 전달한다. 
```html
<div class="target" id="target1">
    target 1
</div>
 
<div class="target" id="target2">
    target 2
</div>
 
<input type="button" value="replaceAll target 1" id="btn1" />
<input type="button" value="replaceWith target 2" id="btn2" />
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script>
    $('#btn1').click(function(){
        $('<div>replaceAll</div>').replaceAll('#target1');
    })
    $('#btn2').click(function(){
        $('#target2').replaceWith('<div>replaceWith</div>');
    })
</script>
```
두개가 완전히 같다고 보면되는데
제어의 대상이 뒤에 오는 것이 replaceAll
제어의 대상이 앞에 오는 것이 replaceWith

보통 쓸떼 익숙한게 replaceWith인듯
---

노드를 복사하는 방법을 알아보자. 
```html
<div class="target" id="target1">
    target 1
</div>
 
<div class="target" id="target2">
    target 2
</div>
 
<div id="source">source</div>
 
<input type="button" value="clone replaceAll target 1" id="btn1" />
<input type="button" value="clone replaceWith target 2" id="btn2" />
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script>
    $('#btn1').click(function(){
        $('#source').clone().replaceAll('#target1');
    })
    $('#btn2').click(function(){
        $('#target2').replaceWith($('#source').clone());
    })
</script>
```

dom manipulation API의 인자로 특정 노드를 선택하면 이동의 효과가 난다.
```html
<div class="target" id="target1">
    target 1
</div>
 
<div id="source">source</div>
 
<input type="button" value="append source to target 1" id="btn1" />
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script>
    $('#btn1').click(function(){
        $('#target1').append($('#source'));
    })
</script>
```

innerHTML는 문자열로 자식 노드를 만들 수 있는 기능을 제공한다. 또한 자식 노드의 값을 읽어올 수도 있다. 
```html
<ul id="target">
    <li>HTML</li>
    <li>CSS</li>
</ul>
<input type="button" onclick="get();" value="get" />
<input type="button" onclick="set();" value="set" />
<script>
    function get(){
        var target = document.getElementById('target');
        alert(target.innerHTML);
    }
    function set(){
        var target = document.getElementById('target');
        target.innerHTML = "<li>JavaScript Core</li><li>BOM</li><li>DOM</li>";
    }
</script>
```

outerHTML은 선택한 엘리먼트를 포함해서 처리된다.
```html
<ul id="target">
    <li>HTML</li>
    <li>CSS</li>
</ul>
<input type="button" onclick="get();" value="get" />
<input type="button" onclick="set();" value="set" />
<script>
    function get(){
        var target = document.getElementById('target');
        alert(target.outerHTML);
    }
    function set(){
        var target = document.getElementById('target');
        target.outerHTML = "<ol><li>JavaScript Core</li><li>BOM</li><li>DOM</li></ol>";
    }
</script>
```

innerHtml, outerHTML과 다르게 이 API들은 값을 읽을 때는 HTML 코드를 제외한 문자열을 리턴하고, 값을 변경할 때는 HTML의 코드를 그대로 추가한다.

```html
<ul id="target">
    <li>HTML</li>
    <li>CSS</li>
</ul>
<input type="button" onclick="get();" value="get" />
<input type="button" onclick="set();" value="set" />
<script>
    function get(){
        var target = document.getElementById('target');
        alert(target.innerText);
    }
    function set(){
        var target = document.getElementById('target');
        target.innerText = "<li>JavaScript Core</li><li>BOM</li><li>DOM</li>";
    }
</script>
```

insertAdjacentHTML()            
좀 더 정교하게 문자열을 이용해서 노드를 변경하고 싶을 때 사용한다.
```html
<!-- before begin -->
<ul id="target">
    <!-- after begin -->
    <li>CSS</li>
    <!-- before end -->
</ul>
<!-- after end -->
<input type="button" onclick="beforebegin();" value="beforebegin" />
<input type="button" onclick="afterbegin();" value="afterbegin" />
<input type="button" onclick="beforeend();" value="beforeend" />
<input type="button" onclick="afterend();" value="afterend" />
<script>
    function beforebegin(){
        var target = document.getElementById('target');
        target.insertAdjacentHTML('beforebegin','<h1>Client Side</h1>');
    }
    function afterbegin(){
        var target = document.getElementById('target');
        target.insertAdjacentHTML('afterbegin','<li>HTML</li>');
    }
    function beforeend(){
        var target = document.getElementById('target');
        target.insertAdjacentHTML('beforeend','<li>JavaScript</li>');
    }
    function afterend(){
        var target = document.getElementById('target');
        target.insertAdjacentHTML('afterend','<h1>Server Side</h1>');
    }
</script>

```

Document 객체는 DOM의 스팩이고 이것이 웹브라우저에서는 HTMLDocument 객체로 사용된다. HTMLDocument 객체는 문서 전체를 대표하는 객체라고 할 수 있다. 아래 코드는 이를 보여준다.
```html
<script>
//document 객체는 window 객체의 소속이다.
console.log(window.document);
//document 객체의 자식으로는 Doctype과 html이 있다. 
console.log(window.document.childNodes[0]);
console.log(window.document.childNodes[1]);
</script>
```

document객체는 window 객체의 프로퍼티이다.
document === window.document

document객체는 문서에서 사용 될 노드를 만들어 주는 역할이다.
element = tag로 보면된다.


텍스트 객체는 텍스트 노드에 대한 DOM 객체로 CharcterData를 상속 받는다. 

아래는 텍스트 노드를 찾는 예제다. 주목할 것은 DOM에서는 **공백이나 줄바꿈**도 텍스트 노드라는 점이다.

```html
<p id="target1"><span>Hello world</span></p>
<p id="target2">
    <span>Hello world</span>
</p>
<script>
var t1 = document.getElementById('target1').firstChild;
var t2 = document.getElementById('target2').firstChild;
 
console.log(t1.firstChild.nodeValue);
try{
    console.log(t2.firstChild.nodeValue);   
} catch(e){
    console.log(e);
}
console.log(t2.nextSibling.firstChild.nodeValue);
 
</script>
```

실행결과
Hello world
TypeError {stack: (...), message: "Cannot read property 'nodeValue' of null"}
Hello world


```html
<ul>
    <li id="target">html(firstChild가 가리킴)</li> 
    <li>css</li>
    <li>JavaScript</li>
</ul>
<script>
    var t = document.getElementById('target').firstChild;
    console.log(t.nodeValue);
    console.log(t.data);
</script>
```

```html
<!DOCTYPE html>
<html>
<head>
    <style>
    #target{
        font-size:77px;
        font-family: georgia;
        border-bottom:1px solid black;
        padding-bottom:10px;
    }
    p{
        margin:5px;
    }
    </style>
</head>
<body>
<p id="target">Cording everybody!</p>
<p> data : <input type="text" id="datasource" value="JavaScript" /></p>
<p>   start :<input type="text" id="start" value="5" /></p>
<p> end : <input type="text" id="end" value="5" /></p>
<p><input type="button" value="appendData(data)" onclick="callAppendData()" />
<input type="button" value="deleteData(start,end)" onclick="callDeleteData()" />
<input type="button" value="insertData(start,data)" onclick="callInsertData()" />
<input type="button" value="replaceData(start,end,data)" onclick="callReplaceData()" />
<input type="button" value="substringData(start,end)" onclick="callSubstringData()" /></p>
<script>
    var target = document.getElementById('target').firstChild;
    var data = document.getElementById('datasource');
    var start = document.getElementById('start');
    var end = document.getElementById('end');
    function callAppendData(){
        target.appendData(data.value);
    }
    function callDeleteData(){
        target.deleteData(start.value, end.value);
    }
    function callInsertData(){
        target.insertData(start.value, data.value); 
    }
    function callReplaceData(){
        target.replaceData(start.value, end.value, data.value);
    }
    function callSubstringData(){
        alert(target.substringData(start.value, end.value));
    }
</script>
</body>
</html>


```