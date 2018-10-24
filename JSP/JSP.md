
[서블릿이란?](http://mangkyu.tistory.com/14)

스크립트릿 코드 : `<% 자바코드 %>` 사이에 실행할 자바코드가 위치
표현식 : <%= sum %>  어떤값을 출력 결과에 포함시키고자 할때 사용
선언부 : <%! %> JSP 페이지의 스크립트릿이나 표현식에서 사용할 수 있는 함수를 작성할 때 사용.

forward : 완전 넘김
include : 갔다가 다시 옴

http 특징 : 클라이언트에서 서버로 request을하면 서버측에서는 알맞는 로직을 수행한후 그 데이터를 웹브라우저에 response합니다. 그리고 서버는 클라이언트와의 연결을 종료합니다. 즉 값들을 일일이 기억하지 않습니다. 이것을 무상태 서버 라고 합니다.

 1. 4kb로 용량이 제한적이며, 
 2. 300개까지 데이터정보를 가질 수 있습니다.
 3. 웹브라우저를 닫아도 정해진 시간만큼 쿠키가 살아있다.

Cookie
```java
Cookie cookie = new Cookie("변수명","값");
cookie.setMaxAge(60); 
//  60초라는 뜻 
response.addCookie(cookie);
//  주는것이므로 response이다.
```



Session
1. 보안에 강하다.
2. 라이프 사이클이 웹 브라우져를 닫는 순간까지이다.
3. 용량의 제한이 없다.
```java
Enumeration enumeration = session.getAttributeNames();

while(enumeration.hasMoreElements()){
	sName=enumeration.nextElement().toString();
	sValue=session.getAttribute(sName).toString();
	out.println("sName : " + sName +"<br>");
	out.println("sValue: "+ sValue +"<br>");
}
```


값 set 비교

Cookie

```jsp
Cookie cookie = new Cookie("id", id);		
			//앞의 요소는 getName()으로 가져올수 있고 뒤의 인자는 getValue()로 가져올 수 있다.		
cookie.setMaxAge(60);	//1분				
response.addCookie(cookie);
```
Session
```jsp
session.setAttribute("id", id);	
```

값 get 비교   
Cookie
```jsp
<%
	Cookie[] cookies = request.getCookies();
	
	for(int i=0; i<cookies.length; i++) {
		String id = cookies[i].getValue();
		if(id.equals("abcde")) out.println(id + "님 안녕하세요." +"<br />");
	}
%>
```
	
Session
```java
<%
	
	Enumeration enumeration = session.getAttributeNames();
	while(enumeration.hasMoreElements()){
		String sName = enumeration.nextElement().toString();
		String sValue = (String)session.getAttribute(sName);
		
		if(sValue.equals("abcde")) out.println(sValue + "님 안녕하세요." + "<br />");
	}
%>
```


특정한 값 삭제 비교  
Cookie
```java

<%
	Cookie[] cookies = request.getCookies();
	for(int i=0; i<cookies.length; i++) {
		String str = cookies[i].getName();
		if(str.equals("cookieN")) {//해당하는 값 삭제
			out.println("name : " + cookies[i].getName() + "<br />");
			cookies[i].setMaxAge(0);
			response.addCookie(cookies[i]);
		}
	}
%>
	
```
Session
```java
session.removeAttribute("mySessionName");
```


로그아웃 비교
```java
<%
	Cookie[] cookies = request.getCookies();
	
	if(cookies != null) {
		for(int i=0; i<cookies.length; i++) {
			if(cookies[i].getValue().equals("abcde")){
				cookies[i].setMaxAge(0);
				response.addCookie(cookies[i]);
			}
		}
	}
	//response.sendRedirect("login.html");
	response.sendRedirect("cookietest.jsp");
%>
```

```java
<%
	Enumeration enumeration = session.getAttributeNames();

	while(enumeration.hasMoreElements()) {
		String sName = enumeration.nextElement().toString();
		String sValue = (String)session.getAttribute(sName);
		
		if(sValue.equals("abcde")) session.removeAttribute(sName);
	}
		
%>

```
모든 id의 세션을 로그아웃 시키는 메소드
session.invalidate();


예외처리
```html
<%@ page errorPage = "errorPage.jsp"%> 
// 오류 발생시 errorPage.jsp로 감
<%@ page isErrorPage="true"%>
<% response.setStatus(200); %> // 정상적으로 완료된 페이지
```
외우기!

DTO : 데이터베이스에서 가져온 DATA를 객체 데이터로 바꿔주는 클래스 ( DATABASE transfer Object)
DAO : 데이터를 직접 접속을 해서 데이터를 관리, 수정하는 클래스

DOM이건 BOM이건 JS이건 모든 객체가 WINDOW의 자식 객체들이다.

우리가 alert이라고 적어주는 내장함수는 사실은 앞에 window가 붙은 alert이다. alert만 적어도 내부적으로 window.alert로 변환해준다. 우리가 적어주는 모든 메소드,변수는 window라는 객체의 메소드,변수다.
window.a == a





Build의 3요소
Compile : 소스를 바이너리 코드로 바꿔줌.
package : 그것을 라이브러리로 묶어줌.
deploy : 그것을 서버나 서비스되는 위치로 운반해줌.



https://www.youtube.com/watch?v=5dN1WTj222Y

https://www.youtube.com/watch?v=p7-U1_E_j3w