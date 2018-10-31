<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>Insert title here</title>
</head>
<body>
<jsp:forward page="fo02.jsp">
		<jsp:param name="id" value="abcde"/>
		<jsp:param name="pw" value="12345"/>
</jsp:forward>
</body>
</html>