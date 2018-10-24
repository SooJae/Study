엘리먼트의 크기를 알아내는 방법을 살펴보자.


```html
<style>
    body{
        padding:0;
        margin:0;
    }
    #target{
        width:100px;
        height:100px;
        border:50px solid #1065e6;
        padding:50px;
        margin:50px;
    }
</style>
<div id="target">
    Coding
</div>
<script>
var t = document.getElementById('target');
console.log(t.getBoundingClientRect());
</script>
```

![findElementSize](images/findElementSize.png)

view포트의 좌표

위의 그림처럼 뷰포트는 문서의 내용 중 사용자에게 보여주는 영역을 의미한다. 이에 따라서 문서의 좌표가 있고 뷰포트의 자표가 있다. 우리가 위에서 살펴본 getBoundingClientRect는 viewport의 좌표를 사용한다. 

아래 예제를 실행해보면 1초에 한번씩 getBoundingClientRect의 top 속성과 window.pageYOffset의 값이 출력된다


```html
<style>
    body{
        padding:0;
        margin:0;
    }
    div{
        border:50px solid #1065e6;
        padding:50px;
        margin:50px;
    }
    #target{
        width:100px;
        height:2000px;
    }
</style>
    <div>
        <div id="target">
            Coding
        </div>
    </div>
 
<script>
var t = document.getElementById('target');
setInterval(function(){
    console.log('getBoundingClientRect : ', t.getBoundingClientRect().top, 'pageYOffset:', window.pageYOffset);
}, 1000)
</script>

```


스크린의 크기는 모니터의 크기와 브라우저 뷰포트의 크기가 있다. 이를 알아내는 방법은 아래와 같다.

```html
<script>
console.log('window.innerWidth:', window.innerWidth, 'window.innerHeight:', window.innerHeight);
console.log('screen.width:', screen.width, 'screen.height:', screen.height);
</script>
```


이벤트(event)는 어떤 사건을 의미한다. 브라우저에서의 사건이란 사용자가 클릭을 했을 '때', 스크롤을 했을 '때', 필드의 내용을 바꾸었을 '때'와 같은 것을 의미한다. 

```html
<!DOCTYPE html>
<html>
<body>
    <input type="button" onclick="alert(window.location)" value="alert(window.href)" />
    <!-- 현재 url을 보여줌 -->
    <input type="button" onclick="window.open('bom.html')" value="window.open('bom.html')" />
</body>
</html>
```


인라인(inline) 방식으로 이벤트를 등록하는 방법을 알아보자. 인라인 방식은 이벤트를 이벤트 대상의 태그 속성으로 지정하는 것이다. 다음은 버튼을 클릭했을 때 Hello world를 경고창으로 출력한다.
```html
<!--자기 자신을 참조하는 불편한 방법-->
<input type="button" id="target" onclick="alert('Hello world, '+document.getElementById('target').value);" value="button" />
<!--this를 통해서 간편하게 참조할 수 있다-->
<input type="button" onclick="alert('Hello world, '+this.value);" value="button" />
```

프로퍼티 리스너

프로퍼티 리스너 방식은 이벤트 대상에 해당하는 객체의 프로퍼티로 이벤트를 등록하는 방식이다. 인라인 방식에 비해서 HTML과 JavaScript를 분리할 수 있다는 점에서 선호되는 방식이지만 뒤에서 배울 addEventListener 방식을 추천한다. 



```html
<input type="button" id="target" value="button" />
<script>
    var t = document.getElementById('target');
    t.onclick = function(){
        alert('Hello world');
    }
</script>
```

이벤트 객체
이벤트가 실행된 맥락의 정보가 필요할 때는 이벤트 객체를 사용한다. 이벤트 객체는 이벤트가 실행될 때 이벤트 핸들러의 인자로 전달된다. 

```html
<body>
    <input type="button" id="target" value="button" />
<script>
    var t = document.getElementById('target');
    t.onclick = function(event){
        alert('Hello world, '+event.target.value)
    }
</script>

```


```html
<input type="button" id="target" value="button" />
<script>
    var t = document.getElementById('target');
    t.onclick = function(event){
        var event = event || window.event; //event 값이 없다면 window.event를 사용하겠다.
        var target = event.target || event.srcElement;
        //두개가 같은 뜻이다.
        alert('Hello world, '+target.value)
    }
</script>
```
하지만 현업에서는 라이브러리(jQuery등)를 사용하기 때문에 큰 문제가 없다.(라이브러리에 이러한 것들이 고려되어있기 때문에)

addEventListener은 이벤트를 등록하는 가장 권장되는 방식이다. 이 방식을 이용하면 여러개의 이벤트 핸들러를 등록할 수 있다.
```html
<input type="button" id="target" value="button" />
<script>
    var t = document.getElementById('target');
    t.addEventListener('click', function(event){
        alert('Hello world, '+event.target.value);
    });
</script>
```

이 방식의 중요한 장점은 하나의 이벤트 대상에 복수의 동일 이벤트 타입 리스너를 등록할 수 있다는 점이다. 


이벤트 객체를 이용하면 복수의 엘리먼트에 하나의 리스너를 등록해서 재사용할 수 있다. 
```html
<input type="button" id="target1" value="button1" />
<input type="button" id="target2" value="button2" />
<script>
    var t1 = document.getElementById('target1');
    var t2 = document.getElementById('target2');
    function btn_listener(event){
        switch(event.target.id){
            case 'target1':
                alert(1);
                break;
            case 'target2':
                alert(2);
                break;
        }
    }
    t1.addEventListener('click', btn_listener);
    t2.addEventListener('click', btn_listener);
</script>
```

HTML 태그는 중첩되어 있다. 따라서 특정한 태그에서 발생하는 이벤트는 중첩되어 있는 태그들 모두가 대상이 될 수 있다. 이런 경우 중첩된 태그들에 이벤트가 등록 되어 있다면 어떻게 처리 될까? 


```html
<html>
    <head>
        <style>
            html{border:5px solid red;padding:30px;}
            body{border:5px solid green;padding:30px;}
            fieldset{border:5px solid blue;padding:30px;}
            input{border:5px solid black;padding:30px;}
        </style>
    </head>
    <body>
        <fieldset>
            <legend>event propagation</legend>
            <input type="button" id="target" value="target">          
        </fieldset>
        <script>
        function handler(event){
            var phases = ['capturing', 'target', 'bubbling']
            console.log(event.target.nodeName, this.nodeName, phases[event.eventPhase-1]);
        }
        document.getElementById('target').addEventListener('click', handler, true);
        document.querySelector('fieldset').addEventListener('click', handler, true);
        document.querySelector('body').addEventListener('click', handler, true);
        document.querySelector('html').addEventListener('click', handler, true);
        </script>
    </body>
</html>

```
실행결과

```
INPUT HTML capturing
INPUT BODY capturing
INPUT FIELDSET capturing
INPUT INPUT target
```

코드를 아래와 같이 변경해보자. 
```js
document.getElementById('target').addEventListener('click', handler, false);
document.querySelector('fieldset').addEventListener('click', handler, false);
document.querySelector('body').addEventListener('click', handler, false);
document.querySelector('html').addEventListener('click', handler, false);
```

실행결과
```
INPUT INPUT target
INPUT FIELDSET bubbling
INPUT BODY bubbling
INPUT HTML bubbling
```

3번째 인자의 뜻 : capturing이라는 뜻. true로 주면 capturing사용. false로 주면 bubbling사용

버블링은 모든 브라우져에서 사용할 수 있지만, 캡쳐링은 옛날브라우저에서는 작동하지 않을수도 있다. 그래서 사용을 지양한다.
```js
phases = ['capturing', 'target', 'bubbling']
            console.log(event.target.nodeName, this.nodeName, phases[event.eventPhase-1]);
```

event.eventPhase
capturing이면 1이라는 값을 갖는다. bubbling이면 3을 갖는다.
가장 깊숙한 element에 설치된 handler라고 한다면 2를 갖는다. 모드가 무엇인지를 알기위해서 사용한 함수이다.

중간에 이벤트 전파가 되지 않게 하는것도 있다.
다음과 같이 수정하자.
```js
function handler(event){
    var phases = ['capturing', 'target', 'bubbling']
    console.log(event.target.nodeName, this.nodeName, phases[event.eventPhase-1]);
}
function stophandler(event){
    var phases = ['capturing', 'target', 'bubbling']
    console.log(event.target.nodeName, this.nodeName, phases[event.eventPhase-1]);
    event.stopPropagation(); // 이 이후에 등장하는 이벤트 핸들러를 끊어버린다.
}
document.getElementById('target').addEventListener('click', handler, false);
document.querySelector('fieldset').addEventListener('click', handler, false);
document.querySelector('body').addEventListener('click', stophandler, false);
// 여기서 이벤트가 멈추게 된다.
document.querySelector('html').addEventListener('click', handler, false);
```


웹브라우저의 구성요소들은 각각 기본적인 동작 방법을 가지고 있다.

텍스트 필드에 포커스를 준 상태에서 키보드를 입력하면 텍스트가 입력된다.
폼에서 submit 버튼을 누르면 데이터가 전송된다.
a 태그를 클릭하면 href 속성의 URL로 이동한다.
이러한 기본적인 동작들을 기본 이벤트라고 하는데 사용자가 만든 이벤트를 이용해서 이러한 기본 동작을 취소할 수 있다.


inline방식

이벤트의 리턴값이 false이면 기본 동작이 취소된다.
```html
<p>
    <label>prevent event on</label><input id="prevent" type="checkbox" name="eventprevent" value="on" />
</p>
<p>
    <a href="http://opentutorials.org" onclick="if(document.getElementById('prevent').checked) return false;">opentutorials</a>
</p>
<p>
    <form action="http://opentutorials.org" onsubmit="if(document.getElementById('prevent').checked) return false;">
            <input type="submit" />
    </form>
</p>
```

property 방식
리턴 값이 false이면 기본동작이 취소된다.

```html
<p>
    <label>prevent event on</label><input id="prevent" type="checkbox" name="eventprevent" value="on" />
</p>
<p>
    <a href="http://opentutorials.org">opentutorials</a>
</p>
<p>
    <form action="http://opentutorials.org">
            <input type="submit" />
    </form>
</p>
<script>
    document.querySelector('a').onclick = function(event){
        if(document.getElementById('prevent').checked)
            return false;
    };
     
    document.querySelector('form').onclick = function(event){
        if(document.getElementById('prevent').checked)
            return false;
    };
 
</script>
```
addEventListener 방식

이 방식에서는 이벤트 객체의 preventDefault 메소드를 실행하면 기본 동작이 취소된다.
```html
<p>
    <label>prevent event on</label><input id="prevent" type="checkbox" name="eventprevent" value="on" />
</p>
<p>
    <a href="http://opentutorials.org">opentutorials</a>
</p>
<p>
    <form action="http://opentutorials.org">
        <input type="submit" />
     </form>
</p>
    <script>
        document.querySelector('a').addEventListener('click', function(event){
            if(document.getElementById('prevent').checked)
                    event.preventDefault();
            });
             
        document.querySelector('form').addEventListener('submit', function(event){
            if(document.getElementById('prevent').checked)
                    event.preventDefault();
            });
 
    </script>
```
submit
submit은 폼의 정보를 서버로 전송하는 명령인 submit시에 일어난다.

form 태그에 적용된다.

아래 예제는 전송 전에 텍스트 필드에 값이 입력 되었는지를 확인한다. 만약 값이 입력되지 않았다면 전송을 중단한다.

```html
<form id="target" action="result.html">
    <label for="name">name</label> <input id="name" type="name" />
    <input type="submit" />
</form>
<script>
var t = document.getElementById('target');
t.addEventListener('submit', function(event){
    if(document.getElementById('name').value.length === 0){
        alert('Name 필드의 값이 누락 되었습니다');
        event.preventDefault();
    }
});
</script>
```

change
change는 폼 컨트롤의 값이 변경 되었을 때 발생하는 이벤트다.
input(text,radio,checkbox), textarea, select 태그에 적용된다.

```html
<p id="result"></p>
<input id="target" type="name" />
<script>
var t = document.getElementById('target');
t.addEventListener('change', function(event){
    document.getElementById('result').innerHTML=event.target.value;
});
</script>
```

blur, focus
focus는 엘리먼트에 포커스가 생겼을 때, blur은 포커스가 사라졌을 때 발생하는 이벤트다. 

다음 태그를 제외한 모든 태그에서 발생한다. 
```
<base>, <bdo>, <br>, <head>, <html>, <iframe>, <meta>, <param>, <script>, <style>, <title>
```
```html
<input id="target" type="name" />
<script>
var t = document.getElementById('target');
t.addEventListener('blur', function(event){
    alert('blur');  
});
t.addEventListener('focus', function(event){
    alert('focus'); 
});
</script>
 ```
문서 로딩
 웹페이지를 프로그래밍적으로 제어하기 위해서는 웹페이지의 모든 요소에 대한 처리가 끝나야 한다. 이것을 알려주는 이벤트가 load, DOMContentLoaded이다.

아래 코드의 실행결과는 null이다. <p id="target">Hello</p>가 로딩되기 전에 자바스크립트가 실행되었기 때문이다.

```html
<html>
    <head>
        <script>
        window.onload=function(){ //이걸 넣어준다.
        var t = document.getElementById('target');
        console.log(t);
        }
        </script>
    </head>
    <body>
        <p id="target">Hello</p>
    </body>
</html>
```

```html
<html>
    <head>
        <script>
        window.addEventListener('load',function(){ //이벤트리스너를 사용하는 것이 더 낫다.
        var t = document.getElementById('target');
        console.log(t);
        })
        </script>
    </head>
    <body>
        <p id="target">Hello</p>
    </body>
</html>
```

이미지 파일은 화면이 전부 출력 된 다음에 출력되는게 좋다.(다 다운받는동안 화면이 멈춰있기 때문에.) 솔직히 나중에 출력되도 상관 없잖아?
그럴때 사용하는게 DOMContentLoaded DOM에 해당하는 컨텐트가 전부 다운될때

```html
<html>
    <head>
        <script>
        window.addEventListener('DOMContentLoaded',function(){ 
        var t = document.getElementById('target');
        console.log(t);
        })
        </script>
    </head>
    <body>
        <p id="target">Hello</p>
        <img src ="#"/>
    </body>
</html>
```

사실 라이브러리가 알아서 해줌 ^^

### 이벤트 타입

click
클릭했을 때 발생하는 이벤트. 
dblclick
더블클릭을 했을 때 발생하는 이벤트
mousedown
마우스를 누를 때 발생
mouseup
마우스버튼을 땔 때 발생
mousemove
마우스를 움직일 때
mouseover
마우스가 엘리먼트에 진입할 때 발생
mouseout
마우스가 엘리먼트에서 빠져나갈 때 발생
contextmenu
컨텍스트 메뉴가 실행될 때 발생

### 키보드 조합
마우스 이벤트가 호출될 때 특수키(alt, ctrl, shift)가 눌려진 상태를 감지해야 한다면 이벤트 객체의 프로퍼티를 사용한다. 이 때 사용하는 프로퍼티는 아래와 같다.

event.shiftKey
event.altKey
event.ctrlKey

### 마우스 포인터 위치
마우스 이벤트와 관련한 작업에서는 마우스 포인터의 위치를 알아내는 것이 중요할 때가 있는데 이런 경우 이벤트 객체의 clientX와 clientY를 사용한다.

```html
<html>
    <head>
        <style>
            body{
                background-color: black;
                color:white;
            }
            #target{
                width:200px;
                height:200px;
                background-color: green;
                margin:10px;
            }
            table{
                border-collapse: collapse;
                margin:10px;
                float: left;
                width:200px;
            }
            td, th{
                padding:10px;
                border:1px solid gray;
            }
        </style>
    </head>
    <body>
        <div id="target">
 
        </div>
        <table>
            <tr>
                <th>event type</th>
                <th>info</th>
            </tr>
            <tr>
                <td>click</td>
                <td id="elmclick"></td>
            </tr> 
            <tr>
                <td>dblclick</td>
                <td id="elmdblclick"></td>
            </tr>
            <tr>
                <td>mousedown</td>
                <td id="elmmousedown"></td>
            </tr>         
            <tr>
                <td>mouseup</td>
                <td id="elmmouseup"></td>
            </tr>         
            <tr>
                <td>mousemove</td>
                <td id="elmmousemove"></td>
            </tr>         
            <tr>
                <td>mouseover</td>
                <td id="elmmouseover"></td>
            </tr>         
            <tr>
                <td>mouseout</td>
                <td id="elmmouseout"></td>
            </tr>
            <tr>
                <td>contextmenu</td>
                <td id="elmcontextmenu"></td>
            </tr>         
        </table>
        <table>
            <tr>
                <th>key</th>
                <th>info</th>
            </tr>
            <tr>
                <td>event.altKey</td>
                <td id="elmaltkey"></td>
            </tr>
            <tr>
                <td>event.ctrlKey</td>
                <td id="elmctrlkey"></td>
            </tr>
            <tr>
                <td>event.shiftKey</td>
                <td id="elmshiftKey"></td>
            </tr>
        </table>
        <table>
            <tr>
                <th>position</th>
                <th>info</th>
            </tr>
            <tr>
                <td>event.clientX</td>
                <td id="elemclientx"></td>
            </tr>
            <tr>
                <td>event.clientY</td>
                <td id="elemclienty"></td>
            </tr>
        </table>
        <script>
        var t = document.getElementById('target');
        function handler(event){
            var info = document.getElementById('elm'+event.type);
            var time = new Date();
            var timestr = time.getMilliseconds();
            info.innerHTML = (timestr);
            if(event.altKey){
                document.getElementById('elmaltkey').innerHTML = timestr;
            }
            if(event.ctrlKey){
                document.getElementById('elmctrlkey').innerHTML = timestr;
            }
            if(event.shiftKey){
                document.getElementById('elmshiftKey').innerHTML = timestr;
            }
            document.getElementById('elemclientx').innerHTML = event.clientX;
            document.getElementById('elemclienty').innerHTML = event.clientY;
        }
        t.addEventListener('click', handler);
        t.addEventListener('dblclick', handler);
        t.addEventListener('mousedown', handler);
        t.addEventListener('mouseup', handler);
        t.addEventListener('mousemove', handler);
        t.addEventListener('mouseover', handler);
        t.addEventListener('mouseout', handler);
        t.addEventListener('contextmenu', handler);
        </script>
    </body>
</html>
```

jQuery는 이벤트와 관련해서 편리한 기능을 제공한다.  아래 예제는 직접 이벤트 프로그래밍을 하는 것과 jQuery를 이용하는 것의 차이점을 보여준다. 
```html
<input type="button" id="pure" value="pure" />
<input type="button" id="jquery" value="jQuery" />
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script>
    // 순수하게 구현했을 때
    var target = document.getElementById('pure');
    if(target.addEventListener){
        target.addEventListener('click', function(event){
            alert('pure');
        });
    } else {
        target.attachEvent('onclick', function(event){
            alert('pure');
        });
    }
 
    // jQuery를 사용했을 때
    $('#jquery').on('click', function(event){
        alert('jQuery');
    })
</script>
```
코드 분량에 큰차이가 있다. jQuery는 크로스 브라우징을 알아서 처리해주고, 이벤트를 보다 적은 코드로 구현할 수 있도록 해준다. 이런 이유 때문에 jQuery와 같은 라이브러리를 사용하는 것이다. 

on은 jQuery에서 가장 중요한 이벤트 API이다. on API를 통해서 jQuery에서 이벤트를 다루는 방법을 알아보자.
on의 기본적인 문법은 아래와 같다.
```js
.on( events [, selector ] [, data ], handler(eventObject) )
```
event : 등록하고자 하는 이벤트 타입을 지정한다. (예: "click")
selector : 이벤트가 설치된 엘리먼트의 하위 엘리먼트를 이벤트 대상으로 필터링함
data : 이벤트가 실행될 때 핸들러로 전달될 데이터를 설정함
handler : 이벤트 핸들러 함수

selector 파라미터는 이벤트 대상을 필터링한다. 아래 예제를 보자.
```html
<ul>
    <li><a href="#">HTML</a></li>
    <li><a href="#">CSS</a></li>
    <li><a href="#">JavaScript</a></li>
</ul>
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script>
    $('ul').on('click','a, li', function(event){
        console.log(this.tagName);
    })
</script>
```

위의 예제는 ul 엘리먼트의 하위 엘리먼트 중에  a, li 엘리먼트들에 대해서만 이벤트가 발생한다. 주의 할 것은 ul 엘리먼트는 이벤트가 발생하지 않는다는 점이다. 이것은 jQuery에서 이벤트 버블링을 구현하는 방법이기도 하다.

late binding
jQuery는 존재하지 않는 엘리먼트에도 이벤트를 등록할 수 있는 놀라운 기능을 제공한다. 아래 코드를 보자. 

```html
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script>
    $('ul').on('click','a, li', function(event){
        console.log(this.tagName);
    })
</script>
<ul>
    <li><a href="#">HTML</a></li>
    <li><a href="#">CSS</a></li>
    <li><a href="#">JavaScript</a></li>
</ul>
```html

위의 코드는 실행되지 않는다. ul 엘리먼트가 존재하지 않을 때 이벤트 설치를 시도하고 있기 때문이다. 존재하지 않는 엘리먼트에 이벤트를 달 수 없다는 것은 이미 배운 바가 있다. 그런데 jQuery는 존재하지 않는 엘리먼트에게도 이벤트를 설치할 수 있다. 
```html
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script>
    $('body').on('click','a, li', function(event){
        console.log(this.tagName);
    })
</script>
<ul>
    <li><a href="#">HTML</a></li>
    <li><a href="#">CSS</a></li>
    <li><a href="#">JavaScript</a></li>
</ul>
```

하나의 엘리먼트에 여러개의 이벤트 타입을 동시에 등록하는 방법을 알아보자. 

```html
<input type="text" id="target" />
<p id="status"></p>
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script>
    $('#target').on('focus blur', function(e){
        $('#status').html(e.type);
    })
</script>

```

한번에 여러개의 이벤트 타입을 선택했다. 만약 이벤트에 따라서 다른 핸들러를 실행하고 싶다면 아래와 같이 코드를 변경한다.

```html

<input type="text" id="target" />
<p id="status"></p>
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script>
    var handler = function(e){
    $('#status').html(e.type);
    }

    $('#target').on('focus', handler).on('blur', handler);
    /*
    $('#target').on(
        {
        'focus' : handler, 
        'blur' : handler        
        }
    )
    */
</script>


```


이벤트를 제거할 때는 off를 사용한다. 
```html
<input type="text" id="target"></textarea>
<input id="remove"  type="button" value="remove" />
<p id="status"></p>
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script>
  var handler = function(e){
    $('#status').text(e.type+Math.random());
  };
  $('#target').on('focus blur', handler)

  $('#target').on('focus',function(e){
      alert(1);
  });

  $('#remove').on('click' , function(e){
    $('#target').off('focus');
    // 둘다 지울때
    $('#target').off('focus', handler);
    // handler를 가지고 있는 이벤트만이 삭제가 된다.
    console.log(32);
  })
</script>
```

time.php

아래 코드는 현재 시간을 출력한다.
```php
<?php
$d1 = new DateTime;
$d1->setTimezone(new DateTimezone("asia/seoul"));
echo $d1->format('H:i:s');
?>
```

demo.html
```html
<p>time : <span id="time"></span></p>
<input type="button" id="execute" value="execute" />
<script>
document.querySelector('input').addEventListener('click', function(event){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', './time.php');
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            document.querySelector('#time').innerHTML = xhr.responseText;
        }
    }
    xhr.send(); 
}); 
</script> 
```

코드를 분석해보자.

var xhr = new XMLHttpRequest();
XMLHttpRequest 객체를 생성한다.

xhr.open('GET', './time.php');
접속하려는 대상을 지정한다. 첫번째 인자는 form 태그의 method에 대응하는 것으로 GET/POST 방식을 주로 사용한다. 두번째 인자는 접속하고자 하는 서버쪽 리소스의 주소로 form 태그의 action에 해당한다.

xhr.onreadystatechange = function(){
    if(xhr.readyState === 4 && xhr.status === 200){
        document.querySelector('#time').innerHTML = xhr.responseText;
    }
}
onreadystatechange 이벤트는 서버와의 통신이 끝났을 때 호출되는 이벤트이다. readyState는 통신의 현재 상태를 알려준다. 4는 통신이 완료되었음을 의미한다. status는 HTTP 통신의 결과를 의미하는데 200은 통신이 성공했음을 의미한다. responseText 프로퍼티는 서버에서 전송한 데이터를 담고 있다. 이것을 id가 time 엘리먼트의 하위로 삽입한다. 이를 통해서 현재 서버에서 가져온 현재시간을 페이지 리로딩 없이 가져올 수 있다.

demo2.html

아래 예제는 시간대와 시간의 출력 형식을 지정하는 예제다. 
```html
<p>time : <span id="time"></span></p>
<select id="timezone">
    <option value="Asia/Seoul">asia/seoul</option>
    <option value="America/New_York">America/New_York</option>
</select>
<select id="format">
    <option value="Y-m-d H:i:s">Y-m-d H:i:s</option>
    <option value="Y-m-d">Y-m-d</option>
</select>
<input type="button" id="execute" value="execute" />
<script>
document.querySelector('input').addEventListener('click', function(event){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', './time2.php');
    xhr.onreadystatechange = function(){
        document.querySelector('#time').innerHTML = xhr.responseText;
    }
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var data = '';
    data += 'timezone='+document.getElementById('timezone').value;
    data += '&format='+document.getElementById('format').value;
    xhr.send(data); 
});
</script> 
```
중요한 부분을 살펴보자. 데이터 전송방법을 GET에서 POST로 변경했다. 
xhr.open('POST', './time2.php');

서버로 전송할 데이터 타입의 형식(MIME)을 지정한다. 
서버에서는 HTML Form으로 전송한것처럼 인식하게된다.
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");


서버로 전송할 데이터를 형식에 맞게 만든다. 이름=값&이름=값... 의 형식을 지켜야 한다. 

var data = '';
data += 'timezone='+document.getElementById('timezone').value;
data += '&format='+document.getElementById('format').value;
send 메소드의 인자로 전송할 데이터를 전달한다.


xhr.send(data); 


time2.php

아래는 Ajax를 이용해서 전송한 데이터를 받아서 현재 시간을 출력해주는 서버쪽 구현이다. 

```php
<?php
$d1 = new DateTime;
$d1->setTimezone(new DateTimezone($_POST['timezone']));
echo $d1->format($_POST['format']);
?>
```

JSON이란?
JSON(JavaScript Object Notation)의 약자로 JavaScript에서 객체를 만들 때 사용하는 표현식을 의미한다. 이 표현식은 사람도 이해하기 쉽고 기계도 이해하기 쉬우면서 데이터의 용량이 작다. 이런 이유로 최근에는 JSON이 XML을 대체해서 설정의 저장이나 데이터를 전송등에 많이 사용된다. JSON에 대한 자세한 내용은 아래 JSON의 공식홈페이지를 참조한다. 

```js
var person ={"height":174, "job":"programmer"}
// 객체
var members = ["egoing", "k9905", "sorialgi"];
// 배열
```
하지만 jsp나 php에서 객체나 배열 그대로 사용할 수 없다.
이를 해결하기 위해 표준화를 시킨다.

vscode 유저 세팅도 json으로 되어있다.

JSON.parse()
인자로 전달된 문사열을 자바스크립트의 데이터로 변환한다.

JSON.stringify()
인자로 전달된 자바스크립트의 데이터를 문자열로 변환한다


time.php
```php
<?php
$timezones = ["Asia/Seoul", "America/New_York"];
echo implode(',', $timezones);

//"Asia/Seoul, America/New_York"
?>
```

결과
Asia/Seoul,America/New_York
클라이언트 측에서는 이를 받아서 처리한다.

demo2.html
<p id="timezones"></p>
<input type="button" id="execute" value="execute" />
<script>
document.querySelector('input').addEventListener('click', function(event){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', './time.php');
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            var _tzs = xhr.responseText;
            var tzs = _tzs.split(',');
            //split으로 유사 배열화를 시킴
            var _str = '';
            for(var i = 0; i< tzs.length; i++){
                _str += '<li>'+tzs[i]+'</li>';
            }
            _str = '<ul>'+_str+'</ul>';
            document.querySelector('#timezones').innerHTML = _str;
        }
    }
    xhr.send(); 
}); 
</script>
주목해야 할 부분은 아래와 같다.


var _tzs = xhr.responseText;
var tzs = _tzs.split(',');
var _str = '';
메소드 split는 인자의 값을 기준으로 문자를 잘라서 배열로 만든다. 서버에서 전송한 Asia/Seoul,America/New_York를 split(',')하면 배열 ['Aasia/Seoul','America/New_York']가 만들어진다.

PHP의 배열을 클라이언트로 전송하기 위해서 콤마로 구분된 문자열을 만들었다. 자바스크립트에서는 이를 받아서 콤마를 구분자로 다시 배열로 만들었다. 

만약 PHP의 배열을 그대로 자바스크립트에서 사용할 수 있다면? 반대로 자바스크립트의 배열을 그대로 PHP에서 사용할 수 있다면 얼마나 편리할까? 이 때 사용하는 것이 JSON이다. 

위의 예제를 JSON화시켜보자.




time2.php
```php
<?php
$timezones = ["Asia/Seoul", "America/New_York"];
header('Content-Type: application/json');
echo json_encode($timezones);
?>
```
json_encode는 PHP의 데이터를 JSON 형식으로 전환해주는 PHP의 내장함수다.

결과
["Asia\/Seoul","America\/New_York"]
이를 처리하는 JavaScript 코드를 보자.

<p id="timezones"></p>
<input type="button" id="execute" value="execute" />
<script>
document.querySelector('input').addEventListener('click', function(event){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', './time2.php');
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            var _tzs = xhr.responseText;
            var tzs = JSON.parse(_tzs);
            var _str = '';
            for(var i = 0; i< tzs.length; i++){
                _str += '<li>'+tzs[i]+'</li>';
            }
            _str = '<ul>'+_str+'</ul>';
            document.querySelector('#timezones').innerHTML = _str;
        }
    }
    xhr.send(); 
}); 
</script> 
아래 코드를 통해서 서버에서 전송한 JSON 데이터를 JavaScript의 배열로 만들수 있었다.


var tzs = JSON.parse(_tzs);
서버로 데이터 전송
서버로 JSON 데이터를 전송하는 것도 가능하다. 아래 예제를 참고하자.

demo4.html

```html
<p>time : <span id="time"></span></p>
<select id="timezone">
    <option value="Asia/Seoul">asia/seoul</option>
    <option value="America/New_York">America/New_York</option>
</select>
<select id="format">
    <option value="Y-m-d H:i:s">Y-m-d H:i:s</option>
    <option value="Y-m-d">Y-m-d</option>
</select>
<input type="button" id="execute" value="execute" />
<script>
document.querySelector('input').addEventListener('click', function(event){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', './time3.php');
    xhr.onreadystatechange = function(){
        document.querySelector('#time').innerHTML = xhr.responseText;
    }
    var data = new Object();
    data.timezone = document.getElementById('timezone').value;
    data.format = document.getElementById('format').value;
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data)); 
});
</script>



```

time3.php
```php
<?php
$data = json_decode(file_get_contents('php://input'), true);
$d1 = new DateTime;
$d1->setTimezone(new DateTimezone($data['timezone']));
echo $d1->format($data['format']);
?>
```

$.ajax의 문법은 아래와 같다.

jQuery.ajax( [settings ] )
setting는 Ajax 통신을 위한 옵션을 담고 있는 객체가 들어간다. 주요한 옵션을 열거해보면 아래와 같다.

data
서버로 데이터를 전송할 때 이 옵션을 사용한다. 
dataType
서버측에서 전송한 데이터를 어떤 형식의 데이터로 해석할 것인가를 지정한다. 값으로 올 수 있는 것은 xml, json, script, html이다. 형식을 지정하지 않으면 jQuery가 알아서 판단한다.
success
성공했을 때 호출할 콜백을 지정한다.
Function( PlainObject data, String textStatus, jqXHR jqXHR )
type
데이터를 전송하는 방법을 지정한다. get, post를 사용할 수 있다.
위의 내용을 바탕으로 Ajax 통신을 해보자. 다음 예제는 Ajax 수업의 예제를 JQuery화한 것이다.