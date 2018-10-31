<%@ page import="java.sql.*"%>
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
	<%!
		Connection connection;
		Statement statement;
		ResultSet resultSet;
	
		String driver = "oracle.jdbc.driver.OracleDriver";
		String url = "jdbc:oracle:thin:@localhost:1521:xe";
		String uid = "scott";
		String upw = "tiger";
		String query = "select * from MEMBER";
	%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
	이수재입니다.
	<%
		try{
			
			Class.forName(driver);	//oracle.jdbc.driver.OracleDriver
			connection = DriverManager.getConnection(url, uid, upw);	//jdbc:oracle:thin:@localhost:1521:xe
			statement = connection.createStatement();
			resultSet = statement.executeQuery(query);	//select * from member
			
			while(resultSet.next()){
				String id = resultSet.getString("NAME");
				String pw = resultSet.getString("ID");
				String name = resultSet.getString("GENDER");
				String phone = resultSet.getString("phone1");
				
				out.println("아이디 : " + id + ", 비밀번호 : " + pw + ", 이름 : " + name + ", 전화번호 : " + phone + "<br />");
			}
			
		} catch(Exception e) {
		} finally {
			try{
				if(resultSet != null) resultSet.close();
				if(statement != null) statement.close();
				if(connection != null) connection.close();
			} catch(Exception e){}
		}
	%>
	
</body>
</html>