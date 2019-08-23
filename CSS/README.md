웹페이지 안에 CSS를 삽입하는 방법
1. style 태그를 씁니다. 
2. style 속성을 씁니다.

  <style>
    a {
      color:black;
      text-decoration : none; // 밑줄이 없어진다.
    }
  </style>

</head>
<body>
  <h1><a href="index.html">WEB</a></h1>
  <ol>
    <li><a href="1.html">HTML</a></li>
    <li><a href="2.html" style="color:red"(CSS속성을 씁니다는 뜻.)>CSS</a></li>
    <li><a href="3.html">JavaScript</a></li>
  </ol>
  
  
  <style>
    a {
      color:black;
      text-decoration : none; // 밑줄이 없어진다.
    }
  </style>
  
  a{} = 선택자 selector (태그 a가 들어가있는 곳을 지정)
  color:black = 효과 declaration
  color = 속성 property
  black = 값 value
  
  
  
  <style>
    #active {
      color:red;
    }
    .saw {
      color:gray;
    }
    a {
      color:black;
      text-decoration: none;
    }
    
  </style>
  
  <li><a href="1.html" class="saw">HTML</a></li>
    <li><a href="2.html" class="saw" id="active">CSS</a></li>
    <li><a href="3.html">JavaScript</a></li>
  
  saw{}: 태그 saw가 들어가 있는 곳을 지정
  .saw{} : saw라는 class를 지정
    #saw{} : id가 들어가있는 곳을 지정
  
 CSS는 뒤에 쓴것이 오버라이딩 됨.
 그래서 우선순위를 위해 id 선택자를 씀
 id > class > tag 선택자
 
 id 선택자는 단 한번만 쓰게 되어있습니다.
 id값은 중복 X. 유일무이
 
 
 
 박스모델 
 
 block level element : 화면 전체를 씀 ex)h1
 inline element : 자기 자신의 크기만큼 씀 ex)a

block level element 에서 display:inline 하면 inline element가 됨.
반대도 가능
display : none 하면 화면에서 사라짐. 

h1 ,a{
    border-width :5px;
    border-color:red;
    border-style : solid;
  }
 
-> 
h1 ,a{
    border : 5px solid red;
  }



  h1 ,a{
      border : 5px solid red;
      padding : 20px;
      margin : 0;
      display:block
    }
    
    padding : border와 글자 사이
    margin : border와 border 사이
    폭 width 높이 height
    
    
    block 단위일때 inline을 안쓰고 width로 조절 할수 있습니다.
    
    
    grid
    <h1>태그 같은경우 제목이라는 뜻을 가지고 있어서 그냥 사용하기는 어색하다.
    그럴때 쓰는 것이 div인데 div는 무색무취와 같은 아무 의미없는 태그입니다.
    
    div 는 block level element
    span은 inline element
    

#grid{
    border:5px solid pink;
    display:grid;
    grid-template-columns: 2fr 1fr; 
  }
  
 2fr,1fr은 화면 크기가 3fr이라고 했을때 2:1로 나눈다.


ul li
ul 밑의 li
ul>li
ul 바로 밑의 li

flukeout.github.io
들어가서 선택자 연습해보기
특정 태그안의 class 지정
태그.class

* 
전체

plate * 
plate 밑에있는 모든 태그

A+B
태그 A 인접한 바로 뒤의 B

A~B
A의 인접한 바로뒤의 태그부터 B까지 전부

plate orange: first-child

plate태그 안에있는 orange 태그 중 첫번째 태그

A,B 
둘 다 선택하는 선택자

plate *:only-child
plate 밑의 포함된 태그가 하나일 경우만 해당됩니다.

.small:last-child
small이라는 class안에 마지막인 태그만 뽑아낸다.

plate:nth-child(3)
 전체에서 3번째이면서 plate태그를 뽑아낸다.

bento:nth-last-child(3)
뒤에서 3번째이고 벤또인것을 뽑아낸다.

apple:first-of-type
apple 태그가 처음 등장하는 것을 선택합니다.

plate:nth-of-type(even)
태그가 짝수로 있는 것만 뽑아낸다.

plate:nth-of-type(2n+3)
컴퓨터가 0,1,2,3,... 계속 넣어본다.
(수열) 그 값을 뽑아낸다.

apple:only-of-type
자기 자신과 같은 타입의 sibling이 존재하지 않는 것. (자기 자신만 존재할때)
타입이 다른건 ok!

apple:last-of-type
apple의 마지막 타입을 뽑아낸다.

bento:empty
bento 중에서 아무것도 갖고있지 않은 태그.

apple:not(.small)
apple 태그중 .small 클래스가 아닌 태그.




a:active 
anchor를 마우스로 누르고 있을때
a:hover 
anchor 위에 있을때
a:visited
방문 했던곳(보안 때문에 쓸수있는 속성이 제한되어 있습니다.)
a:link
방문 안했던 곳
a:focus
tab키를 누르면 focus됩니다. (마지막에 써주는게 좋습니다. (input창일때 색깔바뀌게 가능)


font-size 제일 많이 사용됨.
px vs em vs rem
rem이 최근에 추가된 단위.
px은 크기가 고정되어있습니다.
em,rem은 브라우저의 설정에 따라서 폰트의 크기가 달라진다.
오늘날에는 rem이라는 것만 쓰면 됩니다.

줌인, 줌아웃 말고
설정화면에서 폰트 크기를 설정할 수 있는데, rem은 바뀌고 px는 바뀌지 않는다.

폰트사이즈를 바꾼다는 것은 html의  폰트사이즈를 바꾼다는 것이고, 우리가 rem단위를 사용하면 html태그의 폰트 크기에 비례하게 됩니다. 
css가 2rem이면 
html의 폰트사이즈 * 2

color 속성
1. color-name(blue)
2. hex (#FFFFFF)
3. rgb (255,255,255)

text-align:justify;
를 하게되면 왼쪽과 오른쪽이 공평하게 화면을 차지하게 됩니다. 텍스트와 텍스트 사이의 간격이 달라지기 때문(역효과가 일어날 수도 있습니다.)

font-family:arial, verdana, "Helvetica Neue" ,serif;
arial 폰트체가 없으면 verdana. verdana도 없으면 Helvetica Neue.

Sans-serif : 글자에 장식이 없는 것
Serif : 글자에 장식이 있는 것
monospace : 고정폭. 우리가 데이터를 볼때(고딩할때)
위의 3개중 하나는 써줘야 합니다.

font-weight : bold;
글짜 두께
line-height: 2;(2배)
자간 (라인의 간격)


font
폰트와 관련된 여러 속성을 축약형으로 표현하는 속성입니다. 형식은 아래와 같습니다. 순서를 지켜서 기술하셔야 합니다. 

font: font-style font-variant font-weight font-size/line-height font-family|caption|icon|menu|message-box|small-caption|status-bar|initial|inherit; 
 
 webfont는 사용자가 해당 사용자가 없을때 서버에서 다운로드해서 사용자가 사용할 수 있게 해줍니다.
한국어는 폰트는 용량이 크다. 

https://fonts.google.com/ 여기가면 폰트가 공짜입니다.

검사후에 network탭에 들어가면 구글에서 font를 받습니다는 것을 알 수 있습니다.

웹폰트를 만드는 법.
인터넷에 없는 폰트가 내 컴퓨터에만 있으면 font generator을 검색해서 폰트를 업로드 하고 다운받아서 쓰면 됩니다.

    li{color:red;}
    h1{color:red;}
    html{
        color:red;
    }

    html은 제일 조상입니다.(object)
    li, h1 은 자식들 
    즉 자식들을 계속 쓰는 것보다.
    조상을 한번 써주고 필요한 부분만 자식들이 변경해주는게 더 효율적입니다. 이것을 상속이라 합니다.
    상속 덕분에 효율적으로 이용할 수 있습니다.
    그러나 css마다 상속되고 안되고의 차이가 있습니다.
    폰트의 컬러는 상속이 됩니다. 테두리는 상속이 되지 않는다.


    CSS: Cascading Style Sheet
웹브라우저, 사용자, 저자(컨텐츠 생산자)
우선순위 : 웹브라우저 < 사용자 < 저자
사실 사용자가 우선순위가 제일 높아야 합니다고 생각합니다.
cascading 우선순위 규칙:

<style>
        li{color:red;}
        #idsel{color:blue;}
        .classsel{color:green;}
    </style>
</head>
<body>
    <ul>
        <li>html</li>
        <li id="idsel" class="classsel" style="color:powderblue">css</li>
        <li>javascript</li>
    </ul>

    tag selector <class selector < id selector < style attribute

그러나 
li{color:red !important;}
!important를 써주면 우선순위가 제일 높아진다. 하지만 좋은 방법은 아니다.


inline vs block level element
자기 글자만 표현하는 것이 inline
전체를 이용하는 것이 block
그러나 inline에서 block으로 그 반대로도 가능하다.

h1{display : inline;} //h1은 원래 block이지만 inline으로 바꿔줍니다.
a{display:block;}


 border:10px solid red;
 을써서 박스의 사이즈를 보면서 개발하는 것이 좋습니다


 padding : 텍스트와 테두리 사이의 간격.
 margin : 테두리와 다른요소들 사이의 간격.
 p태그는 블록단위라 width,height값에 영향을 받지만
 a는 inline단위 이므로 width,height 값에 영향을 받지 않는다. 

 div{
        margin:10px;
        width:150px;
    }
    #small{
        border:10px solid black;
    }
    #large{
        border:30px solid black;
    }

하면 두개의 사이즈가 달라보입니다.
그 이유는 css의 초창기에는 padding과 border가 없이 width값으로만 지정했기 때문에
content영역 크기만 같다. 하지만 border값이 생기면서 까다로워 졌다. 그래서 box-sizing이 나왔다.

box-sizing:border-box;
하는 순간 두개의 크기가 border값을 포함해서 같게됩니다. 그래서 보통*{}을 사용해서 모든 element가 border의 크기를 width와 height값으로 사용할 수 있게 해서 코딩을 수월하게 해줍니다.

마진겹침 : 두개의 마진 중에 더 큰값이 두개의 태그사이의 간격이됩니다.

마진겹침 2 :부모 element아래에 자식 element가 있고 부모와 자식 모두 margin값이 있을때 생기는 경우 
즉 부모태그가 시각적으로 아무런 효과가 없는 상태가 되면, 자식태그와 부모태그의 마진값이 합쳐지는 결과를 낳는다.
부모 엘리멘트의 마진값과 자식 엘리멘트의 마진값의 큰쪽의 마진값이 자식 엘리먼트의 마진값으로 사용됩니다. 즉 부모가 투명하고 부모와 자식의 마진값중 큰것을 마진값으로 이용합니다.

시각적인 요소: border건 글자건 눈에 보이면 시각적인 요소가 있는 것 입니다.

마진겹침3: 만약 태그에 시각적인 요소가 없다면
그 태그의 마진값은 위쪽에 있는 마진값과 아래쪽에 있는 마진값중에 더 큰 값이 그 태그의 마진 값이 됩니다. 
margin-top이 80이면 margin-bottom이 

tip: 
#parent>#child + tab키를 누르면
=>
<div id="parent">
        <div id="child"></div>
    </div>

  
POSITION
position은 html의 태그들 element들이 화면상 어디에 위치해 있을 것인가? box model이 부피감 또 element와 element의 간격을 지정하는 것이었다면 포지션은 각각의 엘리먼트의 위치를 지정하는 정말 중요한 것.

position_1.html 참고
CSS의 element들은 포지션의 기본값을 가지고 있습니다. 그 값은 static입니다. static이라고 지정하면 left,top,bottom,right 등 offset값을 무시하고 static하게 위치해 있는다. 자기가 있어야 할 위치를 (부모 element의 아래)기준으로 해서 상대적으로 100px만큼 왼쪽으로 가고싶다 하면 relative로 지정하면 됩니다.

absolute
html element를 기준으로 위치를 조정하고 싶을때
relative는 부모 element를 기준으로
그러나 absolute여도 left, top을 지우면 부모 element기준으로 합니다.
그러나 부모나 그 위의 부모의 position을 static이 아닌 값을 주면(default값은 static) 그 부모element를 기준으로 offset이나 top의 값을 적용합니다.

fixed
absolute값과 같은 것처럼 보입니다.
하지만 스크롤로부터 완전히 독립되어서 스크롤을 내려도 항상 그자리에 있습니다.
(네비게이션 바 처럼) absolute처럼 width와 height가 없애면 부모가 없어지기 때문에 자신의 content 크기가 됩니다.


FLEX
Layout을 잡을 때 씁니다.
Layout의 흑역사.

TABLE이 있었다.(Grid 모양)
처음에는 table로 layout을 만들어 썼다. 그러나 table이 표로 사용된것인지 layerout으로 사용된 것인지를 구분하기 힘들어졌다. 그리고 table의 용량이 크기때문에 나중에 변경하기가 힘들어졌다.
그래서 table로 layout을 쓰지말자는 운동이 일어났다.
position을 통해서 위치를 변경했다.
float도 layout을 잡는데 사용했다. 하지만 layout을 사용하기위해 만든것은 아니다.
인류는 갈팡질팡~ 그러다 궁극의 layout이 나옴 : FLEX

flex를 사용하기 위해서는 tag가 2단계가 필요하다. 마치 li태그가 ol이나 ul태그가 필요하듯이. 
container의 역할을 하는 태그와 그 안의 item의 역할을 하는 태그

container에게 부여해야 할 속성
display
flex-direction
flex-wrap
flex-flow
justify-content
align-items
align-content

item에게 부여해야 할 속성
order
flex-grow
flex-shrink
flex-basis
flex
align-self


tip: .class>.item{$}*5
 class라는 div안에 class 값이 item을 5개 만드는데 1씩증가해서 만듬

 div는 block level element
 부모 div에 flex를 주면 자식 div는 달라진다. (div는 block level인데 inline으로 됨)

  flex-direction:row-reverse; 속성을 주면 반대쪽으로 갑니다. 
  flex-direction:column; 으로 하면 세로로 정렬이 됩니다.

  height 값이 들어가고 column-reverse를 하면 flex가 있고 없고의 차이가 나타난다. container 바닥으로 부터 올라갑니다.(없으면 맨 위에서 위치만 바뀜)
  또한 block단위도 아니고, inline 단위도 아닌 container단위로 바뀐다.(row로 하면 아래로 쭉, column으로 하면 옆으로 쭉 차지합니다.)

  ||||||| row
  ------- column

  flex-basis :200px;
  플렉스 방향에 따른 크기의 속성(row일 경우 옆으로 퍼지고 column일 경우 아래로 커짐)

  flex-grow : 1
  각각의 아이템에게 grow를 시켜줍니다. (1/n로 나눠갖는다.)

  더 키우고 싶은 아이템에게 flex-grow:2를 주면 5개가 있을때, 다른애들은 1/6을 가져가는데 혼자 2/6만큼 가져가서 커진다.

cascading : 우선순위
flex는 반응형입니다! 화면이 작아졌을때 여유가 있는 아이템은 크기가 줄어든다.
이때 이기적이게 여유가 있어도 줄어들지 않게하는 속성이 있는데 
flex-shrink:0;
입니다. flex-shrink:1을 주면 고통분담을 합니다.
flex-shrink:2를 합니다면 2/3만큼 고통을 분담해서 더 빨리 줄어든다.
즉 flex-basis값이 있을때 줄이는 용도로 shrink을 씁니다 (세트메뉴)


Holy Grail Layout :성배 layout
```
      Hader
Nav   main    AD
      Footer
```
이런 layout을 만들기 위해 많은 사람들이 노력했다. 최적화.
but, flex layout의 등장으로 손쉽게 할수 있습니다!.

Holy Grail Layout 
https://www.youtube.com/watch?v=8DJBCHro-3Q&list=PLuHgQVnccGMDaVaBmkX0qfB45R_bYrV62&index=37

flex의 여러 속성들 연습(강추)
https://opentutorials.org/module/2367/13526

row는 queue모양
column는 stack모양

ALIGN-items
flex는 default가 stretch입니다. (끝까지 펴져있는 상태)
flex-start로 하면 inline 상태로 됩니다.

body에 flex 사용할때 주의할점!
<!Doctype >로 해야합니다 (!Doctype이라고 하면 알아서 최신버젼인 html5로 인식하는듯)

align items는 
row일 때 row의 반대쪽에 있는 축에 정렬방식
justify-content는
direction이 row일때 행 방향의 정렬상태를 지정합니다.

justify-content는 align-item 만 썼을때 오른쪽에 공간이 남아도 가운데로 정렬이안되는 상황에서 써주면 가운데로 정렬이 됩니다.

align-items는 container 밑에있는 전체를 정렬
align-content는 같은 행을 그룹으로 묶어서 정렬?

align-self는 align-items로 지정된 상태에서 어떤 특정한 것만 예외적으로 다르게 값을 주고 싶을때 씁니다.

중요!!!
.item {flex: flex-grow [flex-shrink][flex-basis];}

검색엔진이 위쪽에 오는게 중요하다고 생각할때


    nav{
        order:1;
    }
    main{
        order:0;
    }
    aside{
        order:2;
    }

이렇게 하면 main이 nav자리로 오게됩니다.
하지만 더 쉬운방법이 있는데
    main{
      order:-1;
    }
만 해주면 다른 값들보다 작기때문에 무조건 앞으로온다. 즉 다른값을 일일이 order를 써가면서 바꿀필요가 없다.
flex는 점점 더 중요해지고 있습니다.


multi-column
뉴스기사 같이 column을 나눠서 읽기 편하게.

column-count:2;
column 숫자를 2개로 고정

text-align:justify;
텍스트 좌우로 정렬

column-width:200px;
200px;에 맞춰서 단(column의 수)을 줄여줍니다.

column-width:200px;
column-count:4; 
최소 200px을 유지한채 최대 4개의 column을 갖게합니다.
유지가 힘들어지면, column의 갯수를 줄인다.
둘다 써도 되고, 둘중에 하나만 써도 됩니다.

column-gap: 100px;
column에 gap을 줍니다.

column-rule-style: solid / dotted / dashed;
column-rule-width: 5px;
column-rule-color: red;
//column 사이를 구분하는 선을 config합니다. 

h1{
column-span:all;
}
column에 h1을 한줄을 다 차지할 수 있게해줍니다.

핀터레스트 스타일 레이아웃 만들기
https://opentutorials.org/module/2398/13712

media query는 화면의 종류와 크기에 따라서 디자인을 달리 줄 수 있는 CSS기능입니다.

@media(max-width:500px){
            body{
                background-color: red;
            }
        }

최대 500px까지.(즉 0~500)

 @media(max-width:500px){
            body{
                background-color: red;
            }
        }
 @media(max-width:600px){
            body{
                background-color: green;
            }
        }

나머지 모든 cascading이 같다면 나중에 나오는게 우선순위가 높아진다.
즉 ~500은 무시해버리고 ~600이 실행됩니다.
그래서 ~600이 위로 가야하고 ~500이 밑으로 와야합니다.

그러나 태블릿이나 스마트폰에서 크기에따라 색깔이 변하지 않는다. 이때
<meta name="viewport" content="width=device-width, initial-scale=1.0">
을 해주면 스마트폰에서도 색깔이 변합니다.

mediaquery는 적용헸던 content의 밑에 써주는 것이 좋습니다.
(cascading 적용순서 때문에)

flex-basis:auto;라고 하면 화면에 따라 자동적으로 크기가 달라진다.

 display:none;을 하면 특정 조건일 때 화면에 안나오게 할 수 있습니다.

 float
 이미지를 자연스럽게 삽입할때 씁니다. 그리고 flex전에 float를 이용해서 layout을 많이 잡아왔다.

 float를 사용하면 흘러가듯이 그림이 삽입됩니다.

 <p style="clear:both;">라고 하면 float효과가 안 나타난다.

 float는 화면이 거의 고정되어있습니다고 보면됩니다.(JS를 써야함)

 header 태그를 쓰면 이게 본문의 h1인지 헤더의 h1인지를 구별해줄수 있습니다.

 float는 이미지 옆으로 글자가 흐른다는 특성을 가지고 있습니다. 이 효과를 layout에 적용시킬수 있습니다.

   nav{
        float:left;
        width:120px;
        border-right:1px solid gray;
    }
    article{
        float:left;
        width:300px;
        border-left:1px solid gray;
    }
으로하면 2줄로 보입니다.
그래서 margin left:-1px;로 한칸 옆으로 가게 하면 딱 겹친다.

box-sizing:border-box;
border를 기준으로 sizing합니다.


background


  background-color:tomato;
  background-image:url('transparent.png');
  background-repeat:no-repeat;
  background-attachment: fixed;
  background-size:500px 100px;
  background-position:center center;


background-color:azure;background-image:url('bonobono.jpg');

둘 다 쓰면 화면이 가려서 background-color값이 안나온다.
둘다 표시하기 위해서는 transparent 이미지를 쓰면 됩니다.

 background-repeat:no-repeat;
 백그라운드 이미지 반복을 안하겠다.
 repeat-x X축으로만 반복하겠다.
 repeat-y y축으로만 반복하겠다.

 background-attachment: fixed;
 스크롤해도 background는 고정 시키겠다.

  background-size:cover; / contain / 200px 100px;

cover vs contain
cover는 화면 전체를 이미지가 사용하게 됩니다.(그래서 이미지가 살짝 짤릴 수도 있습니다.)

contain은 화면에 모든 이미지가 들어 갈 수 있도록 합니다.(그래서 여백이 남을 수 있습니다.)

background-position:center center;
background-position:left top;
백그라운드 그림을 가운데에 둔다.
백그라운드 그림을 왼쪽 위에 둔다.

중요!
background: background-color url() no-repeat fixed center;


filter
최신기술이라 적용 못할수도 있으므로
vender prefix사용  

-webkit-filter: ; //크롬이나 사파리에서 
-o-filter: ; //오페라에서
filter: ;



 img{
    transition: all 1s;
    }
    img:hover{
        -webkit-filter: grayscale(0%) blur(3px);
        -o-filter: grayscale(0%) blur(3px);
        filter: grayscale(100%) blur(3px);
    }
    h1{
        -webkit-filter: blur(3px);
        -o-filter: blur(3px);
        filter: blur(3px);
    }


transition 화면전환 부드럽게 1초안으로 바뀌게 천천히
글씨에도 blur처리를 할수있습니다.


blend는

filter는 하나의 이미지에 효과를 주는 것 입니다.
blend는 두개의 이미지를 겹쳤을때 다른 색상차이를 여러가지 기준에 따라 혼합해서 생각치못한 EFFECT를 만들 수 있습니다.

  height:400px;
  border:5px solid; background-color: rgba(255, 0,0,0.5);      //투명도 
  background-size:cover; 
  background-image: url('bonobono.jpg');  background-blend-mode: darken;
  transition: background-color 5s;

 .blend:hover{
        background-color: rgba(255,0,0,1);
        //1이면 투명도가 없다는 뜻.
        transition: background-color 5s;
    }


mix-blend-mode
element와 element의 배경으로 존재하는 다른 이미지들 간의 여러 기준에 따라 합성하는 것이 mix-blend입니다.(글자와 background의 image사이에 대한 합성을 하는것.)

background-blend-mode
background들 끼리의 blend(이미지와 색상)

inline-block
block과 inline의 중간 형태라고 볼 수 있는데, 줄 바꿈이 되지 않지만 크기를 지정 할 수 있습니다.

Transform
코드를 통해서 이미지 또는 텍스트를 변형시킬 수 있습니다.

 transform:scaleX(0.5);
 transform:scaleY(0.5);
 은 cascading때문에 밑에것만 실행됩니다.
 그래서
 transfrom : scale(0.5,0.5);로 써줍니다.

 transform 더 알아보기 
 https://opentutorials.org/module/2367/13684
 
 h1:hover{
   transform:
   scale(1.5);
 
 transform-origin: left bottom; (왼쪽 밑을 기준으로 커지게 합니다.) 
 X축 Y축 순이므로 0% 100%으로 해도 똑같다.
 transition: all 1s;
 }

 CSS transform library라는 검색어로 적극적으로 알아보자!



 transition

 transition-property: all;
 (특정 태그에 대해서 모든 효과에 대해서 변화가 일어났을때 전환이 일어난다.)
 transition-property: transform;
 트랜스 폼 효과에 대해서만 장면 전환을 하겠다.
 transition-duration: 1s;
 전환이 1초동안 진행됩니다.


 transition-property: all;
 transition-duration: 1s;
 와
 transition: all 1s;
 는 같은표현(축약형)
 
 복수의 장면효과는 
 transition: font-size 2s, transform 1s;
 이렇게 해줍니다.

 transition-delay:1s;
 delay는 시간을 지연시키는 효과를 가지고 있습니다. (계속 누르고 있어야 됩니다.)


 각종 transition
 https://opentutorials.org/module/2367/13691
 그래프에 이용하면 좋을 것 같다.

<body onload="document.querySelector('body').style.backgroundColor='white';">
 이 페이지가 화면에 표시되는 것이 끝났을때 화면을 하얗게 바꾸자.

 codepen을 가까이 하자.
 
 중복을 제거하는게 제일 중요하다!
 코드가 반복되면 사용자는 웹페이지에 들어갈때마다 데이터를 더 받게됩니다.

 <link rel="stylesheet" href="style.css">
 link를 만나면 링크의 href에 해당되는 style.css파일을 다운로드 받고, stylesheet(css의 문법)에 따라서 디자인을 해줍니다.

웹브라우저는 캐시가 있기때문에 한번 받은 CSS는 웹브라우저는 그것을 임시저장 폴더에 저장해놓았다가, 똑같은 CSS를 사용하려할때 이미 저장되어있는 임시 디렉토리의 CSS를 사용합니다.즉 경량화가 됩니다.
또한 같은 링크를 하는 페이지는 같은 의도를 가진 페이지라는 것을 알 수 있습니다.

<head>
    <link rel="stylesheet" href="style.css">
    <style>
        @import url("style.css");
    </style>
</head>

두개는 같은 의미가 있습니다.
link라는 태그는 html태그를 이용해서 css를 이용할때 사용하고,  @import는 css안에서 또 css를 가져올때 사용합니다.

minify
css중에 css 앞에 min이 붙어있으면 minify가 됐다는 것을 알 수 있습니다.
(ex:minify.min.css)


CSS뛰어넘기 preprocessor
CSS는 뛰어난 언어입니다. 하지만 CSS가 모든 면에서 좋을수는 없습니다.  그래서 어떤 이들은 CSS에 편리한 기능을 더한 새로운 언어를 만들고 이 언어에 따라서 작성한 코드를 어떤 프로그램으로 실행시키면 결과적으로 CSS를 만들어주는 도구들을 개발했는데요. 이런 도구를 preprocessor이라고 합니다. 여기서는 이런 도구들의 개념과 간단한 사용법을 알아봅니다. 

아래는 대표적인 preprocessor들입니다. 

http://lesscss.org/  (온라인 변환기)
http://sass-lang.com/
http://stylus-lang.com/ (온라인 변환기)




 fontello.com
 앞의 0을 없애고 &#로 하면 됩니다.
 ex)0xe841 => &#xe841


  font-family: "fontello";
  color : red;
  font-size: 100px;

  이미지처럼 생겼지만 폰트로 취급합니다.

<style>
font-family: "fontello";
</style>
&#xe841
=> <i class="icon-chrome"></i>
한줄로 가능하다.

 #test:before{
           content:"s"
           // 해당 id 글자 앞에 s가 생긴다. (단지 시각적으로만, 검색엔진들은 이걸 신경쓰지 않는다.)
           font-size:30px;
       }

before = pseudo 선택자


<i class="icon-chrome"></i>
는 이 before가 생성해줍니다.

fontello.css파일을 보면
.icon-chrome:before { content: '\e841'; }
이 있어서 클래스 값이 icon-chrome인 태그를 생성하면 태그 앞에 문자모양이 생긴다. 

! https://thenounproject.com/
에 들어가서 자신이 마음에 드는 그림을 다운 받은 뒤에 
fontello 사이트에 들어가서 custom Icons에 드래그 하면 아이콘에 해당되는 이미지를 만들어 줍니다! 그걸 쓰면 됩니다.

fontello 사이트는 회원가입을 할수없다. 
그래서 다른 컴퓨터나 다른 웹 브라우저에서 fontello를 사용할 시, 내가 선택했던 이미지들이 체크해제가 되어있는걸 볼 수 있습니다.
연장을 누른후에 import버튼을 누르고 config.json을 import해주면 내가 선택했던 이미지들이 선택되어있습니다.
