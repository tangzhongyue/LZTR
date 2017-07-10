<%@ page import="java.util.ArrayList"%>
<%@ page import="model.User"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
<title>LZTR 问卷平台后台管理</title>

<%
	String path = request.getContextPath();
%>
<link href="<%=path%>/questionnaire/css/bootstrap.min.css" 			rel="stylesheet">
<link href="<%=path%>/questionnaire/css/dataTables.bootstrap.css" 	rel="stylesheet">
<link href="<%=path%>/questionnaire/css/dataTables.responsive.css" 	rel="stylesheet">
<link href="<%=path%>/questionnaire/css/questionnaire.css" 			rel="stylesheet">
<link href="<%=path%>/questionnaire/css/font-awesome.min.css" 		rel="stylesheet" type="text/css">
</head>

<body>
	<%
		ArrayList<User> userList = new ArrayList<User>();
		if (request.getAttribute("Users") != null) {
			userList = (ArrayList<User>) request.getAttribute("Users");
		}
	%>
	<div id="wrapper">
		<!-- Navigation -->
		<nav class="navbar navbar-default navbar-static-top" role="navigation"
			style="margin-bottom: 0">
			
		<div class="navbar-header">
			<a class="navbar-brand" href="#">问卷系统后台</a>
		</div>

		<div class="navbar-default sidebar" role="navigation">
			<div class="sidebar-nav navbar-collapse">
				<ul class="nav" id="side-menu">
					<li><a href="#" class="active"><i 
							class="fa fa-user fa-fw"></i> 用户管理</a></li>
					<li><a href="allQuestionnaire"><i
							class="fa fa-book fa-fw"></i> 问卷管理</a></li>
					<li><a href="FrontPage"><i 
							class="fa fa-university fa-fw"></i> 首页</a></li>
					<li><a href="logoutPro"><i 
							class="fa fa-power-off fa-fw"></i> 登出</a></li>
				</ul>
			</div>
			<!-- /.sidebar-collapse -->
		</div>
		<!-- /.navbar-static-side --> </nav>

		<div id="page-wrapper">
			<div class="row">
				<div class="col-lg-12">
					<h1 class="page-header">用户</h1>
				</div>
			</div>
			<!-- /.row -->
			<div class="row">
				<div class="col-lg-12">
					<div class="panel panel-default">
						<!-- /.panel-heading -->
						<div class="panel-body">
							<div class="dataTable_wrapper">
								<table class="table table-striped table-bordered table-hover"
									id="dataTables">
									<thead>
										<tr>
										    <th>ID</th>
											<th>User Name</th>
											<th>Age</th>
											<th>Sex</th>
											<th>Job</th>
											<th>City</th>
											<th>Country</th>
											<th>Email</th>
											<th>Mobile</th>
											<th>QQ</th>
											<th>Wechat</th>
											<th>Role</th>
											<th>Operation</th>
										</tr>
									</thead>
									<tbody>
										<%
											for (int i = 0; i < userList.size(); i++) {
																				User user = userList.get(i);
										%>
										<tr>
										    <td><%=user.getId()%></td>
											<td><%=user.getUsername()%></td>
											<td><%=user.getAge()%></td>
											<td><%=user.getSex()%></td>
											<td><%=user.getJob()%></td>
											<td><%=user.getCity()%></td>
											<td><%=user.getCountry()%></td>
											<td><%=user.getEmail()%></td>
											<td><%=user.getMobile()%></td>
											<td><%=user.getQq()%></td>
											<td><%=user.getWechat()%></td>
											<td><%=user.getRole()%></td>
											
											<td>
												<button class="btn btn-default delete" type="button"
													data-id="<%=user.getId()%>">
													<i class="fa fa-trash"></i>
												</button>
												<button class="btn btn-default edit" type="button"
													data-id="<%=user.getId()%>"
													data-username="<%=user.getUsername()%>"
													data-age="<%=user.getAge()%>"
													data-sex="<%=user.getSex()%>"
													data-job="<%=user.getJob()%>"
													data-city="<%=user.getCity()%>"
													data-country="<%=user.getCountry()%>"
													data-email="<%=user.getEmail()%>"
													data-mobile="<%=user.getMobile()%>"
													data-qq="<%=user.getQq()%>"
													data-wechat="<%=user.getWechat()%>"
													data-role="<%=user.getRole()%>"
													>
													<i class="fa fa-edit"></i>
												</button>
											</td>
										</tr>
										<%
											}
										%>
									</tbody>
								</table>
							</div>
						</div>
						<!-- /.panel-body -->
					</div>
					<!-- /.panel -->
				</div>
				<!-- /.col-lg-12 -->
			</div>
			<!-- /.row -->
		</div>
		<!-- /#page-wrapper -->
	</div>
	<!-- /#wrapper -->

	<div class="modal fade" id="modal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">
						<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
					</button>
					<h4 class="modal-title" id="modalTitle"></h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-lg-12">
							<form role="form">
								<div class="form-group">
									<label>ID</label> <input class="form-control" name="id" readonly=true>
								</div>
								<div class="form-group">
									<label>Username</label> <input class="form-control" name="username">
								</div>
								<div class="form-group">
									<label>Age</label> <input class="form-control" name="age">
								</div>
								<div class="form-group">
									<label>Sex</label> <input class="form-control" name="sex">
								</div>
								<div class="form-group">
									<label>Job</label>
									<select class="form-control" name = "job">
											<option>teacher</option>
											<option>student</option>
											<option>IT</option>
										</select>
								</div>
								<div class="form-group">
									<label>City</label> <input class="form-control" name="city">
								</div>
								<div class="form-group">
									<label>Country</label> <input class="form-control" name="country">
								</div>
								<div class="form-group">
									<label>Email</label> <input class="form-control" name="email">
								</div>
								<div class="form-group">
									<label>Mobile</label> <input class="form-control" name="mobile">
								</div>
								<div class="form-group">
									<label>QQ</label> <input class="form-control" name="qq">
								</div>
								<div class="form-group">
									<label>WeChat</label> <input class="form-control" name="wechat">
								</div>
								
								<div class="form-group">
									<label>Role</label> 
										<select class="form-control" name = "role">
											<option>admin</option>
											<option>user</option>
										</select>
								</div>
	  						</form>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					<button type="button" class="btn btn-primary" id="save">Save</button>
				</div>
			</div>
		</div>
	</div>

	<script src="<%=path%>/questionnaire/js/jquery.min.js"></script>
	<script src="<%=path%>/questionnaire/js/bootstrap.min.js"></script>
	<script src="<%=path%>/questionnaire/js/jquery.dataTables.min.js"></script>
	<script src="<%=path%>/questionnaire/js/dataTables.bootstrap.min.js"></script>
	<script src="<%=path%>/questionnaire/js/bootbox.min.js"></script>
	<script src="<%=path%>/questionnaire/js/questionnaire.js"></script>

	<script src="<%=path%>/questionnaire/js/admin_user.js"></script>

	<script>
		$(document).ready(function() {
			$('#dataTables').DataTable({
				responsive : true
			});
		});
	</script>

</body>

</html>

