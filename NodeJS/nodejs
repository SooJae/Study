
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
\n\을 해주면 된다. 근데 굉장히 불편..
그래서 template literal을 이용한다.

`을 이용
var letter =`Lorem ipsum ${name}

dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut ${name}labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex e'+name+'a commodo consequat. 
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla paria${name}tur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;


http:// < - 프로토콜 (통신규칙)
http://github.com : 도메인(호스트) 특정한 인터넷에 연결되어있는 컴퓨터
http://github.com:3000 : 포트번호 80번포트는 생략해줘도 된다. 80은 웹서버를 쓴다는 뜻이기 때문에
http://github.com:3000/main : path 어떤디텍토리에 어떤 파일인지
http://github.com:3000/main?id=html&page=12 : 쿼리스트링, 값과 값은 &, 값은 =로 구분
