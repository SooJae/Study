바뀌지 않을 부분은 냅두고, 바뀔수 있는 부분은 -> Ajax로 변경


<input type = "button" value="fetch" onClick="  
fetch('html').then(function(response){
      response.text().then(function(text){
        alert(text);
      })
    })
    ">
    
  서버에 html파일을 요청하고 응답이 끝나면 alert(text); 이 실행되면서 서버가 응답해준 데이터가 text라는 변수에 담겨있습니다. 
  
  
  ==>
  
  <article>
</article>



  <input type = "button" value="fetch" onClick="  fetch('html').then(function(response){
      response.text().then(function(text){

        document.querySelector('article').innerHTML = text;
      })
    })
    ">
    
    
    를 해주면 동적으로 변환합니다.
    
    동작원리 
    https://www.youtube.com/watch?v=qy3M0Cp0ios&index=7&list=PLuHgQVnccGMA9-1PvblBehoGg7Pu1lg6q
    
   //Asynchronous
function callbackme(){
  console.log('response end');
}

    fetch('html').then(callbackme);
    console.log(1);
    console.log(2);
    
    
    fetch('html'); 는 서버에 html파일을 요청하는 문
    then 은 서버 응답이 1시간동안 걸린다면(오래걸린다면) 서버가 응답할 때까지 다른일을 할수있게해줌
    fetch('html').then(callbackme)
    웹브라우저야 응답이 끝나면 callbackme라는 함수를 실행시켜줘! (그러면서 자기는 콘솔창에 log(1),log(2) 찍는중)
    
    
    function callbackme(){} === callbackme = function(){}
    
    
    
    
    
    function callbackme(){
  console.log('response end');
}

    fetch('html').then(callbackme);
    console.log(1);
    console.log(2);
    
    
    ===
    

    fetch('html').then(function callbackme(){
  console.log('response end');
});
    console.log(1);
    console.log(2);
    
    
    
    fetch('html').then(function(response){
    }))
    
    response : 서버에 요청했을 때 서버가 응답한 결과를 담고있는 객체(여러가지 속성이 있습니다. 서버와 통신하는 귀중한 단서있습니다)
    
    
    
    
    hash = 북마크
    
    # hash ! bang 
   href="#!html"
   !는 관습적으로 붙여줍니다.
   
   jax는 다시 공부할 것...
    
    
