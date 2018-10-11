1. 빨강 자바스크립트는 사용자와 상호작용을 하는 언어이다.
2. 웹브라우저는 한번 화면에 출력되면 자기자신을 바꿀수 없다.
BUT 자바스크립트를 이용하면 body 태그를 바꿔줄수 있다.
즉 JS가 HTML을 제어하는 언어이다. 
```html
<input type="button" value="hi" onclick="alert('hi')">
    <input type="text" onchange="alert('changed')">
    <input type="text" onkeydown="alert('key down!')">
```

 on~ 이벤트 약 20개정도 있다.


1=="1" 
> true

1==="1"
> false

위의 예를 보면 알 수 있듯이 ===은 데이터타입까지 완전히 같다는 의미이다. ===의 사용이 강력히 권장.

---
```javascript
coworkers.showAll=function(){
        for(var key in coworkers){
          document.write(key+':'+coworksers[key]+'<br>');
        }
      }

      coworkers.showAll();
```
coworkers가 바뀌면 동작을 안할테니 coworkers = this로 바꿔준다.
      
      
의존성 (dependency): 프로젝트에 설치하고 사용하는 모듈
     
--save , --save-dev 옵션 : 패키지 설치 + package.json에 등록을 해준다.

--save-dev is used to save the package for development purpose. Example: unit tests, minification..
--save is used to save the package required for the application to run

package.json을 쓰는 이유
1. Managing dependencies of your project
2. Scripts, that helps in generating builds, running tests and other stuff in regards to your project.

자세한 내용은
https://medium.com/beginners-guide-to-mobile-web-development/why-package-json-npm-basics-cab3e8cd150
      
      
      JavaScript의 this는 기존 언어에서 사용하던 this와는 다릅니다. 비슷한 의미로 사용될 때도 있지만, JavaScript의 this는 여러 가지 함수가 호출되는 방식(호출 패턴)에 따라 참조(바인딩)하는 객체가 다르기 때문입니다.

자바에서의 this는 인스턴스 자신을 가리키는 참조변수입니다. this가 객체 자신에 대한 참조 값을 가지고 있다는 것입니다. 주로 매개변수와 객체 자신이 가지고 있는 변수의 이름이 같을 경우 이를 구분하기 위해서 사용됩니다.

javascript의 this가 해당 함수 호출 패턴에 따라 어떻게 객체를 참조(바인딩)하는지에 대한 규칙

1. 기본적으로 this는 전역 객체를 참조한다.
2. 메소드 내부의 this는 해당 메소드를 호출한 부모 객체를 참조한다.
3. 생성자 함수 코드 내부의 this는 새로 생성된 객체를 참조한다.
4. call()과 apply() 메소드로 함수를 호출할 때, 함수의 this는 첫 번째 인자로 넘겨받은 객체를 참조한다.
5. 프로토타입 객체 메소드 내부의 this도 해당 메소드를 호출한 부모 객체를 참조한다.
6. JavaScript의 this 키워드는 접근제어자 public 역할을 한다.

JavaScript에서는 내부 함수 호출 패턴을 정의해 놓지 않기 때문입니다. 내부 함수도 결국 함수이므로 이를 호출할 때는 함수 호출로 취급되어 함수 호출 패턴 규칙에 따라 내부 함수의 this는 전역 객체를 참조하게 됩니다.



<input id="night_day" type="button" value="night" onclick=" 
if(document.queruySelector('#night_day').value === "night") 
{
document.queruySelector(body).style.backgroundColor = 'black'; 
document.queruySelector(body).style.color = 'white'; 
document.queruySelector(''#night_day").value = 'day'; 

}else{ 
document.queruySelector(body).style.backgroundColor = 'white';
document.queruySelector(body).style.color = 'black';
document.queruySelector('#night_day').value = night
}



document.queruySelector(#night_day) 라는 태그는 id="night_day" 와 의미가 같다.
의미가 같은 코드가 중복이 되므로 이것은 매우 비효율적인 일이므로
해당 코드를 = this로 바꾸게되면 더 효율적인 코딩이 가능하다 

<input id="night_day" type="button" value="night" onclick="

이 코드안에 있는 onclick 과 같이 이벤트로 실행되는 이 코드들은
이 코드가 속해 있는 태그(ex: input) 의 인덱스 태그
( 인덱스 태그는 해당 태그의 선택자(ex: id , class 등등) 를 의미한다.)
를 대신할수 있는 태그는
this 이다.

그러므로

<input type="butten" value="night" onclick"
if(this.value === "night"){
document.querySelector('body').style.color = 'white'';

이렇게 인덱스 코드를 생략 가능하다.


출처: http://k9e4h.tistory.com/141 [Kim's :D]


var Body = {
  SetColor : function(color){
    document.querySelector('body').style.color = color;
  },
  SetBackgroundColor : function(color){
    document.querySelector('body').style.backgroundColor =color;
  }
}


Body, document : 객체
SetColor, SetBackgroundColo, querySelector('body') : 메소드

라이브러리 : 내가 프로그램을 만들기 위해 필요한 소프트웨어. 부품
프레임워크 : 만들고자 하는 것이 무엇이냐에 따라서 그것을 만들려고 할때 공통적인 부분을 프레임 워크가 만들어 놓고, 
우리가 필요한 부분을 살짝살짝 바꿈(완제품)

라이브러리는 필요한 것을 갖고 와서 작업. 프레임 워크는 안에 들어가서 작업함.

CDN : Content Delivery Network

$('a') : a태그를 J쿼리로 제어하겠다.
UI - 사용자 (User) 가 목적달성을 위해 마주하는 조작체계
API - 프로그래머 (Programmer) 의 개발을 돕기위해 마련된 도구 및 환경


const logCitySkyline = ()=>{
  
};


function logCitySkyline (){
  
}

초ㅛ
function greeting (name = 'stranger') {
  console.log(`Hello, ${name}!`)
}

greeting('Nick') // Output: Hello, Nick!
greeting() // Output: Hello, stranger!


자바스크립트를 선언(?)하는 방법은 
제가 알고 있기로는 3가지가 있습니다. 
<script type="text/javascript"> 
<script language="javascript"> 
<script> 
이렇게요. 

저는 그냥 짧은 <script>로 써서 사용합니다. 
저 3가지의 차이점이 있을까요? 그리고 셋중 무엇을 쓰는게 옳은 표현인가요? 
셋다 작동은 하는거 같은데 굳이 가려 쓸 필요도 있을까요?
script 선언은 브라우저의 기본 설정에 맞추어갑니다. 혹시나 script 내부의 내용이 vb가 기본인 브라우저가있다면 그 안의 내용을 vb에 맞추어 파싱하려들겁니다. 안써도, 혹은 대충 써도 동작하는 이유는 대부분의 브라우저의 script 선언의 기본이 자스로 파싱하라고되어있기 때문입니다. 명시적으로 써준다고 했을때 올바른 구문은 맨 위에꺼입니다.

<script type="text/javascript" language="javascript"> 하위 브라우저와 호완성등 생각하면 위와같이 써야 하지만 보통은 <script type="text/javascript"> 이렇게 쓰는게 맞고 지금 이렇게쓰고있고 js 원래 mine type 이 text/javascript 라고 어디서 보았던듯.

html 5 부터는 디폴트로 script 는 js로 쓰기때문에 <script> 로만 사용하셔도 무방합니다. 아니라면 <script type="text/javascript"> 이렇게 써주시는게 맞겠죠. style 태그의 경우에도 type="text/css" 이렇게 명시해줘야 합니다만 html 5 부터는 디폴트로 <style> 을 적으면 css를 의미하죠.

현재 표준은 <script type="text/javascript"> 라고 만든 개발자가 이야기 했어요.ㅋ


push :배열 마지막에 넣기
pop : 배열 마지막 꺼내기
shift : 배열 첫번째 꺼내기
unshift: 배열 첫번째에 넣기
slice(1,4) : 인덱스 1에서 3까지 substring 함 (본 배열에 변화는 안생김. 조회용.)
groceryList.indexOf('pasta') : 해당 변수의 인덱스 번호 알려줌
splice(1,0): 끼워넣기
splice(1,3): 인덱스 1에서 3개를 replace한다.

console.log(secretMessage.join()); 한줄로 
console.log(secretMessage.join(' ')); 쉼표 안쓰고 





const checkThatTwoPlusTwoEqualsFourAMillionTimes = () => {
  for(let i = 1; i <= 1000000; i++) {
    if ( (2 + 2) != 4) {
      console.log('Something has gone very wrong :( ');
    }
  }
};

// Write your code below
const is2p2 = checkThatTwoPlusTwoEqualsFourAMillionTimes;
is2p2();
console.log(is2p2)          //[Function: checkThatTwoPlusTwoEqualsFourAMillionTimes]
console.log(is2p2.name);  //checkThatTwoPlusTwoEqualsFourAMillionTimes


화살표함수에 call, apply 메서드를 사용할 수 없다.
this키워드 에 효과적이다.

함수하나당 ()하나씩 붙여주면 된다.

'


// ES5에서 Array인지 아닌지 구분하는 표준화된 방법이 없다.  
// typeof 연산자를 써도 object를 반환하기 때문에 구분해낼 방법이 없다.  
// 따라서 아래와 같이 함수화시켜서 라이브러리로 제작 후에 많은 사람에게 배포했다고 가정해보자.  
// 예제기 때문에 Boolean 대신에 String을 반환하게 했다는 점은 감안해주길 바란다.
Array.isArray = function(arg) {
  return (Object.prototype.toString.call(arg) === '[object Array]') ? 'Array' : 'Not Array';
};

이 라이브러리는 전 세계의 수백만 개발자들이 쓰게 되었고, 많은 사람들이 아래와 같이 코드를 짜기 시작했다.


var arr = [1, 2, 3];
if(Array.isArray(arr) === 'Array') console.log('나는 배열이당!');
else console.log('나는 배열이 아니당!');
하지만 ES6 들어서 위에 우리가 사용한 Array.isArray 메소드가 표준 메소드로 지정되었다!
그리고 그 메소드는 우리가 예측한 문자열들이 아닌 Boolean 값을 반환하는 메소드다!
따라서 우리 라이브러리를 사용해서 개발한 사용자들의 코드가 의도한 대로 작동하지 않을 가능성이 있다!
하지만 다행히도 위 메소드는 덮어쓰기가 가능하다.
그래도 우리 라이브러리를 쓰는 개발자가 ES6의 표준 메소드 작동 방식으로 Array.isArray를 썼다간 낭패를 볼 것이다.

1
console.log(Object.getOwnPropertyDescriptor(Array, 'isArray').writable); // true
하지만 모든 프로퍼티가 덮어쓰기가 가능한 게 아니다.
아래와 같이 상수(네이밍이 UPPER_SNAKE_CASE로 돼있다.) 프로퍼티도 존재하기 때문이다.

1
console.log(Object.getOwnPropertyDescriptor(Number, 'MAX_SAFE_INTEGER').writable); // false

각각의 웹 페이지는 자신의 문서(document) 객체를 갖는다. Document 인터페이스는 웹 페이지의 컨텐츠(DOM 트리, 즉 <body> 또는 <table>와 같은 요소(Element) 등)에 대한 진입점으로서의 역할을 하며, 또한 해당 문서에 대한 전역 기능(페이지의 URL 가져오기, 문서 내에 새 요소 생성하기 등)을 제공한다.

자바스크립트의 객체는 자바의 맵과 같다. 인덱스를 first, lee 등 자기 마음대로 정할 수 있다. (key)
grades.lee === grades['lee'] 

서로 연관되어 있는 값과, 처리를 하나에 그릇안에 담아서 그룹핑 하는것이 객체지향 프로그래밍이다.


모듈(module)
수 많은 로직을 재사용할 수 있는 단위로 나누어,
별도의 모듈이 라는 형태로 떼어내 다른 프로그램에 부품으로 사용하는 기법.
그 기법을 모듈화(Modularization), 결과물을 모듈이라 한다.

- 호스트 환경
javascript가 구동되는 환경.
웹브라우저를 위한 언어로 시작했지만(클라이언트), 서버측에서 실행되는 javascript도 있다(서버사이드).
또한 구글의 App위에서도 돌아가는 것이 있으므로, 호스트 환경에 따라 모듈화 하는 방법을 알아야 한다.

- 모듈과 라이브러리의 차이 
모듈이 프로그램의 작은 부품이라 하면,
라이브러리는 자주 사용되는 부품을 재사용하기 편하게 잘 정리한 코드의 집합.
특히 라이브러리는 많은사람들의 노력과 돈, 노우하우를 집중해 만들어 놓아 아주 완성도가 높다.

- 라이브러리를 쓰는 이유
자기혼자서 만드는 것이 여러가지 이유로 필연적이지 않으면,
다른사람이 이미 만들어 놓은것을 부품으로 조립해서 만들어 가는것이 소프트웨어를 만드는 '기본중의 기본'이다.

정규표현식
JS뿐만 아니라, JAVA, Perl에 쓰인다.

let pattern = /a/;
let pattern = new RegExp('a');
두개가 같은 뜻이다.

THIS
함수에서의 this

```javascript
function func(){
    if(window === this){
        document.write("window === this");
    }
}
func(); 
```

this가 의미하는 것은 window이다.

메소드와 this

객체의 소속인 메소드의 this는 그 객체를 가르킨다. 


var o = {
    func : function(){
        if(o === this){
            document.write("o === this");
        }
    }
}
o.func();   