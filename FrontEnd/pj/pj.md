Property 'assign' does not exist on type 'ObjectConstructor'

declare파일 뒤에 초기화를 하면 안된다.


### proxy.conf.js

```js
var PROXY_CONFIG = [
  {
    context: [
      "/api"
    ],
    target: "http://localhost:8080",
    secure: false

  }
];

module.exports = PROXY_CONFIG;

```


### proxy.conf.json
```json
 {
   "/api/*":
   {
     "target":"http://localhost:8080",
     "secure":false,
     "logLevel":"debug"
   }
 }
```

REST는 데이터 값만 왔다갔다 해야한다. 필요정보는 Header에 작성해서 보낸다. 그리고 통째로 보내고 통째로 받는다.


# filter, map
https://webclub.tistory.com/563