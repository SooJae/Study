<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%
	String id = getServletContext().getParameter("con_name");
String pw = getServletContext().getParameter("con_id");
String path = getServletContext().getParameter("con_pw");
%>

<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>

</head>

<body>
	
	<%
		String id = request.getParameter("id");
		String pw = request.getParameter("pw");
	%>
	
	아이디 : <%= id %> <br />
	비밀번호 : <%= pw %>
	
	<hr />
	
	아이디 : ${ param.id } <br />
	비밀번호 : ${ param.pw } <br />
	아이디 : ${ param["id"] } <br />
	비밀번호 : ${ param["pw"] }
	
	<hr />
	
	applicationScope : ${ applicationScope.application_name }<br />
	sessionScope : ${ sessionScope.session_name }<br />
	pageScope : ${ pageScope.page_name }<br />
	requestScope : ${ requestScope.request_name }
	
	<hr />
	
	context 초기화 파라미터<br />
	${ initParam.id } <br />
	${ initParam.pw } <br />
	${ initParam.path } <br />
	<%
	String id = getServletContext().getParameter("id");
	String pw = getServletContext().getParameter("pw");
	String path = getServletContext().getParameter("path");
%>

<%=id %>
<%=pw %>
	


</body>
</html>