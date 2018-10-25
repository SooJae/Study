
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
```jsp
<%@ page errorPage = "errorPage.jsp"%> 
// 오류 발생시 errorPage.jsp로 감
//에러페이지에는 밑과같이 적어줘야 한다.
<%@ page isErrorPage="true"%>
<% response.setStatus(200); %> // 정상적으로 완료된 페이지
```
web.xml 파일을 이용한 예외처리
```xml
<error-page>
	<error-code>404</error-code>
	<location>/error404.jsp</location>
</error-page>

<error-page>
	<error-code>500</error-code>
	<location>/error500.jsp</location>
</error-page>
```
xml또한 에러페이지에는 밑과같이 적어줘야한다.
```jsp
<%@ page isErrorPage="true" %>
<% response.setStatus(200); %>
```

빈이란?
반복적인 작업을 효율적으로 하기위해 빈을 사용한다.
빈이란 JAVA언어의 데이터(속성)와 기능(메소드)으로 이루어진 클래스이다.
jsp페이지를 만들고, 액션태그를 이용하여 빈을 사용합니다. 그리고 빈의 내부 데이터를 처리합니다.
Student.java파일
```java
package com.javalec.ex;

public class Student {
	
	private String name;
	private int age;
	...
```
beanEx.jsp파일
```html
<jsp:useBean id="student" class="com.javalec.ex.Student" scope="page" />
<!-- id = 빈 이름 -->
<jsp:setProperty name="student" property="name" value="홍길동"/> 
<!-- name은 id값 -->
<jsp:setProperty name="student" property="age" value="13"/>
<jsp:setProperty name="student" property="grade" value="6"/>
<jsp:setProperty name="student" property="studentNum" value="7"/>
이름 : <jsp:getProperty name="student" property="name" /><br />
나이 : <jsp:getProperty name="student" property="age" /><br />
학년 : <jsp:getProperty name="student" property="grade" /><br />
번호 : <jsp:getProperty name="student" property="studentNum" /><br />
```
new연산자를 이용해 생성하는 것이 아니라, action 태그로 쉽게 사용이 가능하다.

Scope
page: 생성된 페이지 내에서만 사용 가능   
request : 요청된 페이지 내에서만 사용 가능   
session : 웹 브라우저의 생명주기와 동일하게 사용 가능   
application : 웹 어플리케이션 생명주기와 동일하게 사용 가능.


데이터베이스 연결 순서

1. JDBC 드라이버 로드 (Driver Manager)
Class.forName("oracle.jdbc.driver.OralceDriver");
메모리에 OracleDriver가 로드됩니다.

2. 데이터베이스 연결 (Connection)
DriverManager.getConnection(JDBC, URL, 계정아이디, 비밀번호)
:Connection 객체 생성합니다.

3. SQL문 실행 (Statement)
connection.createStatement();
:Statement객체를 통해 SQL문이 실행됩니다.

4. 데이터베이스 연결 해제(ResultSet)
statement.executeQuery, statement.executeUpdate()
:SQL문의 결과값을 ResultSet객체로 받습니다.


DB는 에러가 은근 잘 발생하기 때문에, try catch문을 사용한다.

executeUpdate(query);  
몇개의 값이 수정됐는지 리턴한다.


Tomcat은 사실 서버가 아니라 컨테이너이다.

# 커넥션 풀

DAO(Data Access Object) : WAS가 DB로 접근해서 데이터를 받아올때, 관련된 일을 하는 것이 DAO. 데이터를 직접 접속을 해서 로직을 수행한다. 데이터 베이스에 접속해서 데이터 추가, 삭제, 수정등의 작업을 하는 클래스이다. JSP 혹은 Servlet 페이지 내에 함께 기술할 수도 있지만 유지보수 및 코드의 모듈화를 위해 별도의 DAO 클래스를 만들어 사용한다.

DTO(Data transfer Object) : 데이터가 다른 jsp와 서블릿에 섞여 들어간다. 데이터만 따로 모아서 하나의 오브젝트로 따로 관리하자는 것이 DTO. 데이터베이스에서 가져온 DATA를 객체 데이터로 바꿔주는 클래스 . DAO를 이용하여, 데이터베이스에서 데이터를 관리할 때 데이터를 일반적인 변수에 할당하여 작업을 할 수도 있지만, 해당 데이터의 클래스를 만들어 사용한다.

웹브라우져 -> Servlet이나 JSP에서 받음 -> DAO에게 요청 -> DB에 요청 -> ResultSet을 받아서 DTO에 저장 -> DTO가 Servlet이나 JSP에 저장. -> 웹 브라우저에게 뿌림

memberSelect.jsp
```html
<%@page import="com.javalec.daotoex.MemberDTO"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.javalec.daotoex.MemberDAO"%>
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>

	<%
		MemberDAO memberDAO = new MemberDAO();
		ArrayList<MemberDTO> dtos = memberDAO.memberSelect();
		
		for(int i=0; i<dtos.size(); i++) {
			MemberDTO dto = dtos.get(i);
			String name = dto.getName();
			String id = dto.getId();
			String pw = dto.getPw();
			String phone = dto.getPhone1() + " - "+ dto.getPhone2() + " - " + dto.getPhone3();
			String gender = dto.getGender();
			
			out.println("이름 : " + name + ", 아이디 : " + id + ", 비밀번호 : " + pw + ", 연락처 : " + phone + ",  성별 : " + gender + "<br />" );
		}
		
	%>

</body>
</html>
```
페이지가 굉장히 간단 해졌다. 원래는 DB도 연결하는 코드도 있어야 하는데.

MemberDAO.java
```java
package com.javalec.daotoex;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;

public class MemberDAO {

	private String url = "jdbc:oracle:thin:@localhost:1521:xe";
	private String uid = "scott";
	private String upw = "tiger";
	
	
	public MemberDAO() {
		try {
			Class.forName("oracle.jdbc.driver.OracleDriver");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public ArrayList<MemberDTO> memberSelect() {
		
		ArrayList<MemberDTO> dtos = new ArrayList<MemberDTO>();
		
		Connection con =null;
		Statement stmt = null;
		ResultSet rs = null;
		
		try {
			con = DriverManager.getConnection(url, uid, upw);
			stmt = con.createStatement();
			rs = stmt.executeQuery("select * from member");
			
			while (rs.next()) {
				String name = rs.getString("name");
				String id = rs.getString("id");
				String pw = rs.getString("pw");
				String phone1 = rs.getString("phone1");
				String phone2 = rs.getString("phone2");
				String phone3 = rs.getString("phone3");
				String gender = rs.getString("gender");
				
				MemberDTO dto = new MemberDTO(name, id, pw, phone1, phone2, phone3, gender);
				dtos.add(dto);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if(rs != null) rs.close();
				if(stmt != null) stmt.close();
				if(con != null) con.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		
		return dtos;
	}
	
}
```

```java
Class.forName(driver);
	connection = DriverManager.getConnection(url, uid, upw);
	int n;
	String query = "insert into memberforpre (id, pw, name, phone) values (?, ?, ?, ?)";
	//Statement와 다르게 query문을 따로 먼저 선언해준다.
	preparedStatement = connection.prepareStatement(query);
	preparedStatement.setString(1, "abc");
	preparedStatement.setString(2, "123");
	preparedStatement.setString(3, "홍길동");
	preparedStatement.setString(4, "010-1234-5678");
	n = preparedStatement.executeUpdate();
			
	preparedStatement.setString(1, "def");
	preparedStatement.setString(2, "456");
	preparedStatement.setString(3, "홍길자");
	preparedStatement.setString(4, "010-9012-3456");
	n = preparedStatement.executeUpdate();

	if(n == 1) {
		out.println("insert success");
	} else { 
		out.println("insert fail");
	}

```

커넥션 풀(DBCP)
클라이언트에서 다수의 요청이 발생할 경우 데이터베이스에 부하가 발생하게 됩니다.
이러한 문제를 해결하기 위해서 커넥션 풀 (DataBase Connection Pool) 기법을 이용합니다.
미리미리 데이터베이스에 접속을 해 놓는다.


server폴더에 있는 tomcat파일의 context.xml 에 
```xml
<Resource auth="Container" driverClassName="oracle.jdbc.driver.OracleDriver" maxActive="50" maxWait="1000" name="jdbc/Oracle11g" username="scott" password="tiger" type="javax.sql.DataSource" url="jdbc:oracle:thin:@localhost:1521:xe"/>
```
을 추가해준다.

MemberDAO.java
```java
public class MemberDAO {

//	private String url = "jdbc:oracle:thin:@localhost:1521:xe";
//	private String uid = "scott";
//	private String upw = "tiger";
	
	private DataSource dataSource;
	
	public MemberDAO() {
		
//		try {
//			Class.forName("oracle.jdbc.driver.OracleDriver");
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
		
		try {
			Context context = new InitialContext();
			dataSource = (DataSource)context.lookup("java:comp/env/jdbc/Oracle11g");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	public ArrayList<MemberDTO> memberSelect() {
		
		ArrayList<MemberDTO> dtos = new ArrayList<MemberDTO>();
		
		Connection con =null;
		Statement stmt = null;
		ResultSet rs = null;
		
		try {
//			con = DriverManager.getConnection(url, uid, upw);
			con = dataSource.getConnection(); //미리 만들어 놓은걸 갖다쓴다.
			stmt = con.createStatement();
			rs = stmt.executeQuery("select * from member");
```



DOM이건 BOM이건 JS이건 모든 객체가 WINDOW의 자식 객체들이다.

우리가 alert이라고 적어주는 내장함수는 사실은 앞에 window가 붙은 alert이다. alert만 적어도 내부적으로 window.alert로 변환해준다. 우리가 적어주는 모든 메소드,변수는 window라는 객체의 메소드,변수다.
window.a == a





Build의 3요소
Compile : 소스를 바이너리 코드로 바꿔줌.
package : 그것을 라이브러리로 묶어줌.
deploy : 그것을 서버나 서비스되는 위치로 운반해줌.



https://www.youtube.com/watch?v=5dN1WTj222Y

https://www.youtube.com/watch?v=p7-U1_E_j3w