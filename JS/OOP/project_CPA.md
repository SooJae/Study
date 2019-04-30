

```js
//callback
if($checkFocus==="id"){
	console.log("키업가능?");
	joinCheckService.checkID($checkVal,  function(result){
		alert(result);
	});
}

function checkID(form, callback, error){
	console.log("안녕하셍용");
	var ex = '수재';
	if(callback){
		callback(ex);
	}
```
```js
//Promise
if($checkFocus==="id"){
    console.log("키업가능?");
    joinCheckService.checkID(true, $checkVal)
    .then(function(result){
        alert(result);
    });
}

var checkID = function(flag, form){
	    return new Promise(function (resolve, reject) {
	        if (flag) {
	            resolve("안녕하세요 이수재에요");
	        } else {
	            reject("실패");
	        }
	    });
	};
```
```js
//await