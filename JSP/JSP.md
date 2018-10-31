
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




joinOk.jsp
```js
<jsp:setProperty name="dto" property="*" />
```
property를 *로 둬서 인자가 자동으로 세팅되게 하려면

MemberDto.java
```java
public class MemberDto {

	private String id;
	private String pw;
	private String name;
	private String eMail;
	private Timestamp rDate;
	private String address;
...}
```
MemberDto.java에서의 변수값과

join.jsp
```html
<form action="joinOk.jsp" method="post" name="reg_frm">
		아이디 : <input type="text" name="id" size="20"><br />
		비밀번호 : <input type="password" name="pw" size="20"><br />
		비밀번호 확인 : <input type="password" name="pw_check" size="20"><br />
		이름 : <input type="text" name="name" size="20"><br />
		메일 : <input type="text" name="eMail" size="20"><br />
		주소 : <input type="text" name="address" size="50"><br />
		<input type="button" value="회원가입" onclick="infoConfirm()">
```
join.jsp의 name값이 같아야 한다.

그렇지 않을경우 joinOk.jsp에서 일일이 하나씩 집어 넣어야한다.





싱글톤패턴

```js
public class MemberDao {

	public static final int MEMBER_NONEXISTENT  = 0;
	public static final int MEMBER_EXISTENT = 1;
	public static final int MEMBER_JOIN_FAIL = 0;
	public static final int MEMBER_JOIN_SUCCESS = 1;
	public static final int MEMBER_LOGIN_PW_NO_GOOD = 0;
	public static final int MEMBER_LOGIN_SUCCESS = 1;
	public static final int MEMBER_LOGIN_IS_NOT = -1;
	
	private static MemberDao instance = new MemberDao();
	
	private MemberDao() {
	}

	public static MemberDao getInstance(){
		return instance;
	}
```

자세히보면 MemberDao.java의 생성자가 싱글톤인 것을 알수 있다.

싱글톤 패턴 특징 : 클래스로부터 바로 객체를 get할 수 있다.
이 객체는 유일하게 하나만 만들어짐. 그래서 모든 곳에서 공유하면서 사용할 수 있다.


파일 업로드 라이브러리 설치

http://www.servlets.com 접속후 com.oreilly.servlet 클릭
다운받은 후에 cos.jar라이브러리를 프로젝트 안의 lib폴더에 삽입

fileForm.jsp
```html 
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>

	<form action="fileFormOk.jsp" method="post" enctype="multipart/form-data">
		파일 : <input type="file" name="file"><br />
		<input type="submit" value="File Upload">
	</form>

</body>
</html>
```

fileFormOk.jsp

```html
<%@page import="java.util.Enumeration"%>
<%@page import="com.oreilly.servlet.multipart.DefaultFileRenamePolicy"%>
<%@page import="com.oreilly.servlet.MultipartRequest"%>
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%
	String path = request.getRealPath("fileFolder");

	int size = 1024 * 1024 * 10; //10M
	String file = ""; //똑같은 이름의 파일을 올릴때 변경되는 파일 이름
	String oriFile = ""; // 똑같은 이름의 파일을 올릴때 원래의 파일이름
	
	try{
		MultipartRequest multi = new MultipartRequest(request, path, size, "EUC-KR", new DefaultFileRenamePolicy());
		
		Enumeration files = multi.getFileNames();
		String str = (String)files.nextElement();
		
		file = multi.getFilesystemName(str);
		oriFile = multi.getOriginalFileName(str);
		
	} catch (Exception e) {
		e.printStackTrace();
	}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
 	file upload success!
</body>
</html>
```


# EL이란?
Expression Language로 표현식 또는 액션 태그를 대신해서 값을 표현하는 언어이다.

<%= value %> => ${value}
  표현식			EL

모든 연산자를 이용 할수 있다.
<%= (1>2) ? 1 : 2 %>  => { (1>2) ? 1 : 2 }

액션태그로 사용되는 EL

<jsp:getProperty name="member" property="name"/> => ${member.name}

내장객체로 사용
pageScope, requestScope, sessionScope, applicationScope

param: 요청 파라미터를 참조하는 객체
paramValue: 요청 파라미터(배열)을 참조하는 객체
initParam : 초기화 파라미터를 참조하는 객체
cookie : cookie객체를 참조하는 객체

contextParam 전 서블릿에서 사용할 수 있는 param	


web.xml
```xml
<context-param>
  	<param-name>id</param-name>
  	<param-value>abcd</param-value>
  </context-param>
  <context-param>
  	<param-name>pw</param-name>
  	<param-value>adsw</param-value>
  </context-param>
  <context-param>
  	<param-name>path</param-name>
  	<param-value>C:\javalec\workspace</param-value>
  </context-param>
```

원래 초기화 파라미터를 불러오려면
String id = getServletContext().getParameter("id");
String pw = getServletContext().getParameter("pw");
String path = getServletContext().getParameter("path");
<%=id >
<%=pw >
<%=path >

=>EL 표기법
${ initParam.id }
${ initParam.pw } 
${ initParam.path } 


JSTL(JSP standard Tag Library)
Sevlet은 순수 자바코드로 이루어져있어 가독성이 좋지만
JSP의 경우 HTML 태그와 같이 사용되어 전체적인 코드의 가독성이 떨어진다.
그래서 JSTL로 이러한 단점을 보안한다.
JSTL의 경우 우리가 사용하는 Tomcat컨테이너에 포함되어 있지 않으므로 설치를 하고 사용 합니다.

jstl에서는 다섯가지의 라이브러리를 제공
1. Core
core 라이브러리는 기본적인 라이브러리로 출력, 제어문, 반복문 같은 기능이 있다.
```
<%@ taglib uri =http://java.sun.com/jsp/jstl/core prefix="c"%>
```
```jstl
출력태그
<c:out value="출력값", default="기본값" escapeXml="true or false">
변수설정 태그
<c:set var="변수명" value="설정값" target="객체" property="값" scope="범위">
변수를 제거하는 태그
<c:remove var="변수명" scope="범위">
예외처리 태그
<c:catch var="변수명">
제어문 태그 (if)
<c:if test="조건" var="조건처리변수명" scope="범위">
제어문 태그2 (switch)
<c:choose>
<c:when test="조건"> 처리내용 </c:when>
<c:otherwise> 처리내용 </c:otherwise>
</c:choose>
반복문 태그
<c:forEach items="객체명" begin="시작 인덱스" end="끝 인덱스" step="증감식" var="변수명" varStatus="상태변수">
페이지 이동 태그
<c:redirect url="url">
파라미터 전달 태그
<c:param name="파라미터명" value="값">
```
jstlcore.jsp
```jsp
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>

	<c:set var="vatName" value="varValue"/>
	vatName : <c:out value="${vatName}"/>
	<br />
	<c:remove var="vatName"/>
	vatName : <c:out value="${vatName}"/></h3>
	
	<hr />
	
	<c:catch var="error">
		<%=2/0%>
	</c:catch>
	<br />
	<c:out value="${error}"/>
	
	<hr />

	<c:if test="${1+2==3}">
		1 + 2 = 3
	</c:if>
	
	<c:if test="${1+2!=3}">
		1 + 2 != 3
	</c:if>
	
	<hr />

	<c:forEach var="fEach" begin="0" end="30" step="3">
		${fEach}
	</c:forEach>

</body>
</html>
```
FrontController 패턴, Command 패턴

# url-pattern
## 디렉터리 패턴
디렉터리 형태로 서버의 해당 컴포넌트를 찾아서 실행하는 구조
http://localhost:8181/jsp_21_1_ex1/Hello	/Hello 서블릿
http://localhost:8181/jsp_21_1_ex2/World	/World 서블릿

## 확장자패턴
확장자 형태로 서버의 해당 컴포넌트를 찾아서 실행하는 구조
http://localhost:8181/jsp_21_1_ex1/hello*do
http://localhost:8181/jsp_21_1_ex2/world*do
*.do 서블릿






Build의 3요소
Compile : 소스를 바이너리 코드로 바꿔줌.
package : 그것을 라이브러리로 묶어줌.
deploy : 그것을 서버나 서비스되는 위치로 운반해줌.




https://www.youtube.com/watch?v=5dN1WTj222Y

https://www.youtube.com/watch?v=p7-U1_E_j3w  


cos.jar
jstl.jar
standard.jar 라이브러리 설치하기