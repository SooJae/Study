
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


