
WEB Application        Node.js Application
HTML                   JavaScript
WEB Browser            node.js runtime




var http = require('http');
var fs = require('fs');

var app = http.createServer(function(request,response){
    var url = request.url;
    if(request.url == '/'){
      url = '/index.html';
    }
    if(request.url == '/favicon.ico'){
      return response.writeHead(404);
    }
    response.writeHead(200);
    console.log(__dirname+url);
    response.end(fs.readFileSync(__dirname + url)); // 이 부분에따라 사용자에게 전송하는 데이터가 바뀐다.


});

app.listen(3000);


줄바꿈 하려면 \n\ 
\n\을 해주면 됩니다. 근데 굉장히 불편..
그래서 template literal을 이용합니다.

`을 이용
var letter =`Lorem ipsum ${name}

dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut ${name}labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex e'+name+'a commodo consequat. 
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla paria${name}tur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;


http:// < - 프로토콜 (통신규칙)
http://github.com : 도메인(호스트) 특정한 인터넷에 연결되어있는 컴퓨터
http://github.com:3000 : 포트번호 80번포트는 생략해줘도 됩니다. 80은 웹서버를 씁니다는 뜻이기 때문에
http://github.com:3000/main : path 어떤디텍토리에 어떤 파일인지
http://github.com:3000/main?id=html&page=12 : 쿼리스트링, 값과 값은 &, 값은 =로 구분


npm install module(A) --save
특정 A모듈을 install 할때 --save 옵션을 넣으면 package.json에 depencies 목록에 포함. 즉 npm모듈이 A모듈없이 사용할 수 없다
즉 A모듈 없이는 동작 X

npm install module(A) --save-dev 
특정 A모듈을 install 할때 --save-dev옵션을 넣으면  package.json에 devDepencies 목록에 포함. 이건 현재 npm 모듈은 A모듈과는 dependency가 없지만
개발 환경에는 연관성이 있습니다는 뜻입니다.

package.json 파일 내의 dependencies, devDependencies의 차이를 알기 위해서 구글링을 하던 중, 보아도 잘 모르겠는 부분이 있어서 우리 drfts프로젝트인 lib-tz의 package.json파일을 보았지만.. 잘 모르겠어서 구글링의 도움을 받았습니다.

결과 1 => 프로젝트를 개발/테스트하려는 것이 아니라 활용만 하려는 목적이라면 개발의존성을 설치하는 것이 불필요하므로, devDependencies의 패키지를 제외하고 설치할 수도 있습니다. 

결과 2 => dependencies, devDependencies는 해당 패키지가 다른 패키지에 의존할 경우 의존성에 대한 항목입니다

결과 3 => dependencies와 devDependencies의 차이는 배포용 패키지(실제 상품에서 사용할 패키지)와 개발용 패키지(목, 테스트 패키지 등)의 차이입니다.

결과 4 => dependencies 는 이 패키지에 의존하는 다른 프로젝트에서 구동시키기 위한 의존성입니다. 즉, 이 패키지를 활용할 때 필요한 의존성을 명시합니다. npm install --save 명령을 통해 패키지를 설치하면 이 항목에 프로젝트 정보가 저장됩니다. devDependencies 에는 이 패키지를 테스트하거나 개발할 때 필요한 패키지들을 명시합니다. npm install --save-dev 명령을 통해 패키지를 설치하면 이 항목에 프로젝트 정보가 저장됩니다.

용어가 어렵습니다... 그러던 중, 우리 lib-tz의 package.json 파일에서 다시 한 번 힌트를 얻고자 보았는데, devDependencies에 'Babel'이라는 애를 보았고(이건 종빈님께서 저번에 설명해주셨는데, 그 때 당시 잘 이해가 가지 않았던 걸로 기억..), 'Babel'이 무엇인가 궁금해져서 구글링을 바로 해봤죠.(이름도 귀엽고..)

Babel => Transform Complier, 업데이트가 자주되는 트랜스파일러 중 하나. 여기서 ‘트랜스파일러' 라는 애도 모르는 애라서 검색을 해보았습니다. 트랜스파일러란, ES2015 이후의 문법으로 적힌 JavaScript를 지금 사용 중인 브라우저에서도 사용할 수 있게 변환하는 도구... 뭐 각각 버전에 맞게 변환(컴파일...? 맞으려나요..?) 해주는 Transfer라고 보면 될 거 같네요. ’ES2015’도 모르는 애라서 검색을 해보았습니다.(모르는 게 넘나 많은 롬..) ES2015란 ES가 ECMA(European Computer Manufacturers Association)Script니까, ECMAScript2015 => 자바스크립트의 스펙 중 하나(버전 중 하나라고 봐도 될 것).

결과적으로 'Bable'을 우리 Drfts_ 프로젝트에서 사용하는 React를 예로 들어본다면, React를 사용하는 우리는 React에서 적용되는 문법인 JSX를 사용하게 되는데(자바스크립트문법이 아닌 문법이죠), 이를 자바스크립트 엔진에서 동작 가능한 코드로 변환해주는 역할을 해주는, 즉 트랜스파일러가 바벨인 것 입니다.

돌고 돌아 제가 원하던 답이었던 dependencies, devDependencies의 차이를 알 수 있었습니다.

::: 결론 ::: 우리가 개발 시 필요한 (컴파일러 같은) 라이브러리들은 devDependencies에 적어주고, 진짜 우리 프로젝트에서 기술스펙으로 사용되어야할 라이브러리들은 dependencies에 적어줍니다.

출처 : https://github.com/saeromCho/shumblr/wiki/package.json-%ED%8C%8C%EC%9D%BC-%EB%82%B4%EC%9D%98-dependencies%EC%99%80-devDependencies%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90%EA%B3%BC-%EC%B6%94%EA%B0%80%EC%A0%81%EC%9D%B8-%EA%B3%B5%EB%B6%80(About-Babel)






반복작업을 자동화하는 빌드 도구 : 걸프와 그런트 ( 걸프를 더 많이 씁니다.)

콘솔에서의 입력값.
var args = process.argv;


C:\nodejs\syntax> node .\program1.js lee
[ 'C:\\Program Files\\nodejs\\node.exe',        ->nodejs의 런타임 위치
  'C:\\nodejs\\syntax\\program1.js',
  'lee' ]
  
  
  
url.parse(_url, true).pathname

pathname ( '/' )을 가져온다. 이것은 해당 페이지가 있는지 없는지의 여부를 알수있게 해줍니다.

undefined = 아무값도 없는 것 (null?)



배열에 값을 넣으려면 arr.push(data);를 하면 됩니다.


function sum(x,y){ // parameter
  console.log(x+y));
}

sum(2,4); //argument


syncronous 끝날때까지 기다리는 것

asyncronous 끝날때까지 다른일을 하는 것



console.log('A');
var result = fs.readFileSync('syntax/sample.txt','utf8');
console.log(result);
console.log('C');

A
B
C


console.log('A');
fs.readFile('syntax/sample.txt','utf8',function(err,result){
  console.log(result);
});

console.log('C');

A
C
B

: 작업이 끝나면 function(err,result)를 실행시켜~ (나중에 전화해~ : call back)
파일을 읽은 다음 함수로 나를 호출해~



function a(){
  console.log('A');
}
a();


var a = function(){
  console.log('A');
}
a();

----> JavaScript에서는 함수가 값입니다!

pm2 -> 1.서버가 꺼지면 다시켜줌 2. 서버를 수정할때마다 알아서 껐다켜줌

npm install module -g ----> 내가 설치하는 소프트웨어는 독립적이라서 내 컴퓨터 어디서든지 사용할수 있습니다.

pm2 start main.js --watch --> 시작

pm2 monit -> 프로그램 관리ㅡ

pm2 list -> 프로그램 확인
pm2 stop main -> 프로그램 종료
pm2 log -> 에러나 변경사항의 기록을 보여줍니다





<form action="http://localhost:3000/process_create">
<p><input type="text" name="title"></p>
<p>
  <textarea name ="description"></textarea>
</p>
<p>
  <input type="submit">

</p>
</form>

이 폼을 http://localhost:3000/process_create에 보내고싶다.
(쿼리스트링으로 보냄 ex) http://localhost:3000/process_create?title=hi&description=hello)

서버에서 데이터를 갖고올때(get) 쿼리스트링이 좋고,
서버에 데이터를 생성하고 수정하고 삭제할때는 url로 보내면 안됩니다.(보안문제)
그래서 눈에 보이지 않는 방식으로 보내야합니다.
POST를 이용해서 보낸다.(대용량도 가능, URL로 보내면 대용량이 짤릴 수도 있습니다.)
<form action="http://localhost:3000/process_create"method="post">
get의 경우 method="get"이거나 생략되어있습니다.

placeholder="title"는 회색글씨를 희미하게 보여줍니다


http.createServer(function(request, response)
request에는 요청할때 웹부라우저가 보낸 정보들
response는 응답할때 우리가 웹브라우저한테 보낼 정보들 (즉 post정보가 있습니다.)

request.on('data',function(data){
    body= body+data;      
    });

//post방식에 데이터가 많을경우 컴퓨터가 꺼질수도 있습니다. 그래서 이걸씁니다.
100이있으면 조각조각의 양을 서버에서 수신할때마다, 콜백함수를 호출하게 되어있습니다.
호출할때 data라는 인자를 통해서 수신한 정보를 주기로 약속되어있습니다.

request.on('end',function(){
  var post = qs.parse(body); 
  console.log(post);
    });
//더 이상 들어올 정보가 없으면(end) qs.parse(body);로 post정보를 갖고올수 있습니다.

{ title: 'dltnwo', description: 'dltnwosla\r\ndd' }

requst뒤에 .on은 이벤트를 객체에 바인딩합니다. 이벤트가 일어날 경우 사용자의 의도를 표현합니다. 
이런 스타일의 프로그래밍을 Event-driven 프로그래밍이라고 부른다. (위에는 각각 post를 받고, 데이터를 다 받으면
data, end기능을 합니다.)
그 후에 파라미터가 추가된 function을 실행합니다.

  fs.writeFile(`data/${title}`,description, 'utf8',function(err){
        response.writeHead(200);
        response.end('success');
      });
    });
끝나면 success를 호출합니다.

response.writeHead(302, {Location:`/?id=${title}`});
200은 성공이라는 뜻 , 301을 완전 거기로 바뀐것, 302는 리다이렉션.

post를 보내면 자동적으로 id에 해당되는 이지로 갑니다.

<input type="text" name="title" placeholder="title" value="${title}">

input에 value값을 넣으면 자동으로 value값이 들어가게됩니다.

<input type="text" name="title" placeholder="title" value="${title}"> //name에 title이 들어가있고
사용자가 마음대로 수정할 수 있습니다.
<input type = "hidden" name="id" value="${title}"> //id로 바꿔주고 바꾸지 파일이름을 못하게 hidden을 써줍니다.
또한 value에 title을 넣음으로써 나중에 이름을 교체할때 구(id)를 신(title)로 교체 해줄 것 입니다.

      
<a href="/delete?id"=${title}>delete</a>
는 보안상의 문제로(get 방식이기때문에, 주소가 다 보입니다.)
post로 해야합니다.

즉 form을 이용해야 합니다.

<form action="delete_process" method="post">
          <input type ="hidden" name="id" value="${title}">
          <input type ="submit" value="delete">
          </form>
          
          
          
request.on('end',function(){
        var post = qs.parse(body);
        var id = post.id;
        fs.unlink(`data/${id}`, function(err){
          //삭제가 끝난후
          response.writeHead(302, {Location:`/`});
          response.end();
        })
