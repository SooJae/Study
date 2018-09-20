
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
