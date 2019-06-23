index.jsp -> 로그인 -> 로그인 액션 -> 회원가입 ->회원가입 액션 -> 로그아웃 -> 로그인.jsp를 복사해서 main.jsp를 만들어 줍니다. -> main.jsp 복사한후 bbs.jsp를 만들어줌.(데모) -> write.jsp 를 만들고 write 액션을 만들어줌 -> bbs.jsp 만들어줌 -> view.jsp 만듬
updateAction은 writeAction과 비슷함.
deleteAction은 updateAction과 비슷함.
DAO에 기능 추가 => 페이지 => 액션페이지
웹 호스팅 할때 버젼이 맞지 않는다면, 속성에 들어가 Project Facets으로 들어가 버전을 다운그레이드 해줘야 합니다. 
그 뒤에 속성에서 Resource 탭에 있는 로케이션으로 들어가 해당 폴더를 이동합니다.
알 드라이브를 실행하여 서버와 연결해줍니다. www/BBS 폴더에 WebContent폴더 안에 있는 meta-inf와 web-inf 폴더를 제외한
모든 파일을 업로드합니다. 또한 build폴더 안의 classes파일들을 www/WEB-INF폴더에 넣어줍니다. lib폴더에 있는것 또한 또한 www/WEB-INF/lib폴더에 넣어줍니다.

putty와 같은 프로그램으로 웹서버를 재시작 할 수 있습니다.
호스트 IP를 입력하고 SSH로 접속
$ ./tomcat/bin/shutdown.sh
$ ./tomcat/bin/startup.sh

Ajax 고급 웹 프로그래밍,
Ajax는 UTF-8통신 그러므로 WAS(tomcat)server.xml안에
<Connector URIEncoding="EUC-KR" connectionTimeout="20000" port="9090" protocol="HTTP/1.1" redirectPort="8443"/>
에서 URIEncoding="EUC-KR" 을 URIEncoding="UTF-8"로 바꿔주면 됩니다.

style="display: none;
alert.show(); 를 하면 none으로 했던 것도 보이게됩니다.



Gmail 코드를 작성 한 후에 내 계정 들어간 후,
보안 수준이 낮은 앱 허용: 사용
을 해주면 됩니다.

```
ALTER TABLE LIKEY ADD PRIMARY KEY(userID, evaluationID);
```
특정한 사용자(userID)가 특정한 강의를 한번만 추천할 수 있게 둘다 PRIMARY KEY를 설정해줍니다.

```java
String userID = request.getParameter("userID3");


=> <tr>
<td style="width: 110px;"><h5>아이디</h5></td>
<td colspan="2"><input class="form-control" type="text"
id="userID" name="userID3" //이 name 필드값인 userID3이 위의 getParameter의 userID3에 해당합니다.
maxLength="20"></td>
<td style="width: 110px;"><button class="btn btn-primary"
onclick="registerCheckFunction()">중복체크</button>
</tr>
```

```java
	UserDAO userDAO = new UserDAO(); 
	return userDAO.register(user);
	=> return new UserDAO().register(user); 로 바꿀수 있습니다.
```

```java
document.getElementById("registerEmail").value); //ID값이 registerEmail인 경우
$('input[name=registerGender]:checked').val();	// ID값이 없고 name값만 있을때 jquery를 이용해 위와같은 효과를 줄 수 있습니다.

$('#registerEmail').val(); // 첫번째 있는 것을 jquery를 이용했을때.
```


ajax를 이용한 modal 사용하기
```html
	<%
		String messageContent = null;
		if (session.getAttribute("messageContent") != null) {
			messageContent = (String) session.getAttribute("messageContent");
		}
		String messageType = null;
		if (session.getAttribute("messageType") != null) {
			messageType = (String) session.getAttribute("messageType");
		}
		if (messageContent != null) {
	%>
	<div class="modal fade" id="messageModal" tabindex="-1" role="dialog"
		aria-hidden="true">
		<div class="vertical-alignment-helper">
			<div class="modal-dialog vertical-align-center">
				<div
					class="modal-content <%if (messageType.equals("오류메세지"))
					out.println("panel-warning");
				else
					out.println("panel-success");%>">
					<div class="modal-header panel-heading">
						<button type="button" class="close" data-dismiss="modal">
							<span aria-hidden="true">&times;</span> <span class="sr-only">Close</span>
						</button>
						<h4 class="modal-title">
							<%=messageType%>
						</h4>
					</div>
					<div class="modal-body">
						<%=messageContent%>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary" data-dismiss="modal">확인</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<script>
		$('#messageModal').modal("show");
	</script>
	<%
		session.removeAttribute("messageContent");
			session.removeAttribute("messageType");
		}
	%>

```


ajax를 이용한 modal 사용하기(제이쿼리)
```js
function registerCheckFunction(){
		var userID=$('#userID').val();
		$.ajax({
			type:'POST',
			url:'./UserRegisterCheckServlet';
		/* 앞의 userID는 파라미터 변수, 뒤의 userID는 위의 var userID값 */
			data:{userID:userID},
			success: function(result){
				if(result==1){
					$('#checkMessage').html('사용할 수 있는 아이디입니다.');
					/* attr은 속성 */
					$('#checkType').attr('class','modal-content panel-success');
				}
				else{
					$('#checkMessage').html('사용할 수 없는 아이디입니다.');
					/* attr은 속성 */
					$('#checkType').attr('class','modal-content panel-warning');
				}
				$('checkModal').modal('show');
			}
		})
		}



		<div class="modal fade" id="checkModal" tabindex="-1" role="dialog"
		aria-hidden="true">
		<div class="vertical-alignment-helper">
			<div class="modal-dialog vertical-align-center">
				<div class="modal-content panel-info">
					<div class="modal-header panel-heading">
						<button type="button" class="close" data-dismiss="modal">
							<span aria-hidden="true">&times;</span> <span class="sr-only">Close</span>
						</button>
						<h4 class="modal-title">
							확인 메세지
						</h4>
					</div>
					<div class="modal-body" id="checkMessage">
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary" data-dismiss="modal">확인</button>
					</div>
				</div>
			</div>
		</div>
	</div>
```



```
create table chat(
    -> chatID int primary key auto_increment,
    -> fromID varchar(20),
    -> toID varchar(20),
    -> chatContent varchar(100),
    -> chatTime DATETIME
    -> );
```







# 웹서버

웹서버는 웹에서 서버 기능을 수행하는 프로그램으로서 HTTP라는 프로토콜을 기반으로 하여 웹 클라이언트(브라우저)로부터의 요청을 서비스하는 기능을 담당합니다.

웹서버의 역활은 다음과 같다.

클라이언트가 요청한 웹 문서를 찾아서 전달하는 기능을 처리합니다.
요청 파일이 없거나 문제가 발생하면 정해진 코드 값으로 응답합니다.
**클라이언트로부터의 요청**에 대한 **기본 사용자 인증을 처리**합니다.
**서버 프로그램에 대한 요청**을 **웹 애플리케이션 서버에 수행**시키고 그 결과를 응답합니다.

# 웹 애플리케이션 서버(WAS)

WAS(Web Application Server)는 크게 **웹 서버 기능**와 **컨테이너 기능**으로 구성됩니다. WAS는 웹서버나 컨테이너 기능 외에 엔터프라이즈 환경에서 필요한 **트랜잭션, 보안, 트래픽 관리, DB 커넥션 풀, 사용자 관리** 등의 다양하고 강력한 기능을 제공합니다.

국내 기업의 상용 WAS로는 **제우스(Jeus)**가 있고, 그외 일반적으로 널리 알려진 **톰캣**은 오픈소스 소프트웨어로 상용에 사용해도 상관없다. 톰캣은 일반 상용 WAS처럼 JavaEE 스펙을 모두 갖추고 있지 않고 JSP와 서블릿을 실행하는 **컨테이너와 웹서버**만 제공합니다.

# 컨테이너

컨테이너는 **서블릿의 생명 주기**를 관리하고 **JSP를 서블릿**으로 변환하는 기능을 수행하는 프로그램입니다.

"컨테이너에는 두 종류의 컨테이너가 있습니다."

## 서블릿 컨테이너
 **서블릿 표준 API**에서 제공하는 **추상 클래스와 인터페이스를 구현한 클래스**를 제공하여 기본적인 동작 방식과 API 호환성을 지원합니다. 즉, 개발시의 서블릿컨테이너와 다른 컨테이너에서도 수행 및 유지보수가 가능하다.

## JSP 컨테이너
JSP를 서블릿으로 변환하는 역활을 합니다.

Servlet Container =>  ~.java → ~.class → 메모리 로드



※ 서블릿은 최초 요청시 객체가 생성되고 이때 생성된 객체가 재사용되며, 서버가 중지될 때 서블릿 객체는 삭제됩니다.

# 서블릿의 생명주기

최초의 요청인 경우 서블릿 객체를 메모리에 생성합니다.
init( )
init( ) 메소드는 **서블릿 객체가 생성된 다음에 호출되는 메소드**로서, 재정의가 가능하다.
service( )
service( ) 메소드는 **서블릿 요청이 있을 때 마다 재사용되어 호출되며 재정의**가 가능하다. 하지만 재정의하지 않으면 요청정보 **헤더의 요청방식에 따라 서로 다른 메소드**를 호출합니다. 요청방식에 의해 호출되는 메서드는 아래와 같다.

| 요청방식 | 메소드               |
| ------- | ------------------- |
| GET     | doGet(req,resp)     |
| POST    | doPost(req,resp)    |
| PUT     | doPut(req,resp)     |
| DELETE  | doDelete(req,resp)  |
| HEAD    | doHead(req,resp)    |
| OPTIONS | doOptions(req,resp) |
| TRACE   | doTrace(req,resp)   |

객체의 삭제
서블릿 객체가 삭제되는 시점은 웹서버에서 웹 **애플리케이션 서비스가 중지되는 시점**입니다. 이떄 destory( )메소드가 호출되어 실행되며 **재정의가 가능**하다.



 ## 서블릿 클래스를 작성할때 HttpServlet 클래스를 상속 받도록 합니다.

HttpServlet 클래스는 HTTP 프로토콜 기반으로 브라우저로부터 요청을 전달받아서 처리하도록하는 클래스입니다. **service 메소드**에는 요청방식(GET/POST)에 따라 doGet(), doPost() 등 정해진 사양의 메소드가 호출되도록 구현되어 있습니다.

## 메소드 정의

init( ) service( )를 오버라이딩 하거나 요청방식에 따른 처리를 위한 메소드 doGet( ) 또는 doPost()를 작성합니다.

## 서블릿을 등록합니다. 서블릿을 등록하는 방법은 두 가지가 있습니다.

web.xml을 설정하기
```xml
<servlet>
    <servlet-name>first</servlet-name>
    <servlet-class>job.study.web.firstServlet</servlet-class>
</servlet>
 
<servlet-mapping>
    <servlet-name>first</servlet-name>
    <url-pattern>/hello</url-pattern>
</servlet-mapping>
```

@WebServlet 애노테이션 사용하기
```java
package job.study.web;
 
import java.io;
import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.hrrp.*;
 
@WebServlet("/hello2")
public class FirstServlet extends HttpServlet{
    .....
}
```
---

# 응답정보 처리(HttpServletResponse)
**ServletResponse 인터페이스**는 클라이언트의 요청에 **응답하기** 위한 출력스트림을 추출하거나 버퍼의 크기를 설정하고, 응답할 내용의 타입과 문자셋을 설정하는 등의 작업을 수행할 수있습니다.

**HttpServletResponse**는 ServletResponse 인터페이스를 **상속** 받아 웹 애플리케이션을 개발하면서 응답 관련 작업을 수행하기 위한 **HTTP 프로토콜 통신 기반의 응답 관련 메소드**들도 확장하여 포함하고 있습니다.

```java
package job.study.web;
 
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.anotation.WebServlet;
 
@WebServlet("/second")
public class ThirdServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) 
    throws ServletExpcetion,IOException {
    resp.setContentType("text/html;charset=UTF-8");
        System.out.println("ThirdServlet!!");
        PrintWriter out = resp.getWriter();
        out.println("<h1>좋은 하루!<h1>");
        out.close()
    }
}
```
`setContentType( )`은 클라이언트에게 보내는 데이터의 문서타입과 문자셋을 응답정보 헤더에 설정하는 메소드입니다. 만약 문서타입와 문자셋을 명시하지 않으면 기본적으로 text/html, 문자셋은 8859_1으로 처리하게됩니다. 그런데 8859_1은 한글을 지원하지 않기 떄문에 한글이 깨지는 현상이 나타납니다.

`getWriter( )`은 클라이언트에 응답하기 위한 **출력 스트림을 반환합니다.** 그리고 이 출력 스트림을 이용해 클라이언트에게 응답을 보내게 됩니다.

마지막으로, 모든 응답을 마친 후에 출력스트림 객체의 close( )메소드를 이용해 스트림을 닫아 줌으로써 클라이언트와 웹서버간에 연결된 출력 스트림을 끊어 줍니다.

자바의 입출력 스트림에 관해 더 알고자 합니다면 책의 99페이지를 참고하자.

[Docs] HttpServletResponse 인터페이스의 메소드 

https://docs.oracle.com/javaee/7/api/javax/servlet/http/HttpServletResponse.html

 

요청정보처리(HttpServletRequest)
클라이언트에서 웹서버로 요청을 보내면 HTTP 요청 규약에 알맞게 다양한 요청 정보들을 전달합니다. 이때 클라이언트가 서버로 전달하는 요청정보들은 다음과 같다.

클라이언트의 IP 주소, 포트번호
클라이언트가 전송한 요청 헤더 정보(클라이언트에서 처리 가능한 문서 타입의 종류, 클라이언트 프로그램 정보, 처리 가능한 문자셋, 쿠키정보
요청 방식, 요청 프로토토콜의 종류와 버전, 요청하는 파일의 URI, 요청받은 서버의 정보
서버의 호스트이름, 포트 번호
사용자가 서블릿 요청시 추가로 전달한 정보
질의 문자열

package job.study.web;
 
import java.io.*;
import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
 
@WebServlet("/urlInfo")
public class URLInfoServlet extends HttpServlet {
    public void doGet(HttpServletRequest req, HttpServletResponse res)
    throws ServletException, IOException {
        res.setContentType("text/html;charset=EUC-KR");
        PrintWriter out = res.getWriter();
        out.println("<html>");
        out.println("<head><title>Request 정보출력 Servlet</title></head>");
        out.println("<body>");
        out.println("<h3>요청 방식과 프로토콜 정보</h3>");
        out.println("Request URI : " + req.getRequestURI()+"<br/>");
        out.println("Request URL : " + req.getRequestURL()+"<br/>");
        out.println("Request Path : " + req.getContextPath()+"<br/>");
        out.println("Request Protocol : " + req.getProtocol()+"<br/>");
        out.println("Servlet Path : " + req.getServletPath()+"<br/>");
        out.println("</body></html>");
        out.close();        
    }
}

[Docs] HttpServletRequest 인터페이스의 메소드 

https://docs.oracle.com/javaee/7/api/javax/servlet/http/HttpServletRequest.html