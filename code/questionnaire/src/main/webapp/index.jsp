<html>
<body>
<h2>Hello World!</h2>
<%@ page import="model.User"%>
<%
	User user = (User)session.getAttribute("user");
	if(user.getRole().equals("admin")){
		response.sendRedirect("allQuestionnaire");
	}
	else{
		response.sendRedirect("loginPage");
	}
%>
</body>
</html>
