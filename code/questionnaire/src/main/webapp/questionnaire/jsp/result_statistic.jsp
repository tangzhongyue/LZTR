<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="model.Answer" %>
<%@ page import="model.Questionnaire" %>
<%@ page import="java.util.ArrayList"%>
<%@ page import="model.User"%>
<!DOCTYPE html>
<%
	String path=request.getContextPath();
Questionnaire ques = new Questionnaire();
ques = (Questionnaire)request.getAttribute("quesinfo");
%>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
	<meta charset="utf-8" />
        <title>LZTR 问卷网</title>
    <!-- Bootstrap core CSS -->
    <link href="<%=path %>/questionnaire/css/bootstrap3.3.7.min.css" rel="stylesheet">
        <link href="<%=path %>/questionnaire/css/font-awesome.min.css" rel="stylesheet">
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]--> 
    <style type="text/css">
        html, body {width:100%;height:100%;}
        .bg {display: table;width: 100%;height: 10%;padding: 20px 0;text-align: center;color: #fff;background: url(questionnaire/img/homepage.jpg) no-repeat bottom center;background-color: #000;background-size: cover;}
        .my-navbar {padding:20px 0;transition: background 0.5s ease-in-out, padding 0.5s ease-in-out;}
        .my-navbar a{background:transparent !important;color:#fff !important}
        .my-navbar a:hover {color:#45bcf9 !important;background:transparent;outline:0}
        .my-navbar a {transition: color 0.5s ease-in-out;}
        .top-nav {padding:0;background:#000;}
        button.navbar-toggle {background-color:#fbfbfb;}
        button.navbar-toggle > span.icon-bar {background-color:#dedede}
        .dropdown-nemu>li>a{color:#333!important;display:block!important;}        
		.mydiv{
		width:250px;height:auto;border:#909090 1px solid;background:#fff;color:#333;
		filter:progid:DXImageTransform.Microsoft.Shadow(color=#909090,direction=120,strength=3);
		-moz-box-shadow: 2px 2px 10px #909090;
		-webkit-box-shadow: 2px 2px 10px #909090;
		box-shadow:2px 2px 10px #909090;
		}
    </style>
</head>
<body style="background:#F5F5F5">
<% 
User user = (User) session.getAttribute("user");
%>
    <nav class="navbar navbar-fixed-top my-navbar" role="navigation">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="FrontPage"><font size=5>LZTR 问卷网</font></a>
            </div>
            <div class="collapse navbar-collapse" id="example-navbar-collapse">
                <ul class="nav navbar-nav">
				<% response.setCharacterEncoding("UTF-8"); 
					if(session.getAttribute("user")!=null){ %>				
				<% String role = user.getRole();
				if(role.equals("admin")){ %>
				<li><a class="navbar-brand" href="<%=path %>/allUser"><span class="glyphicon glyphicon-wrench">系统信息管理</span></a></li>
				<%} }%>
                </ul>               
              <ul class="nav navbar-nav navbar-right">
              <% 
              if(user==null){ %>
              <li data-toggle="modal" data-target="#signin-signup-tab" id="signin-button"><a href="loginPage" class="navbar-brand" >登陆</a></li>
              <li data-toggle="modal" data-target="#signin-signup-tab" id="signup-button"><a href="signupPage" class="navbar-brand" >注册</a></li>
              <li data-toggle="modal" data-target="#signin-signup-tab" id="signup-button"><a href="<%=path %>/HelpContact" class="navbar-brand" >帮助</a></li>
              <%}else{ %>
              	<li><a class="navbar-brand" href="<%=path %>/MyQuestionnaire"><span class="glyphicon glyphicon-list">我的问卷</span></a></li>             
            	<li class="dropdown">
                <a href="#" class="dropdown-toggle navbar-brand" data-toggle="dropdown" role="button" aria-expanded="false">
                    <span class="glyphicon glyphicon-user"><%=((User)session.getAttribute("user")).getUsername()%></span>
                    <b class="caret"></b>
                </a>
                <ul class="dropdown-menu" style="background:#333!important" role="menu" >
                	<li><a href="<%=path %>/SelfInfo">个人信息</a></li>
					<li><a href="<%=path %>/allSendMessage">我的消息</a></li>
					<li role="presentation" class="divider"></li>
					<li><a href="<%=path %>/HelpContact">帮助</a></li>
                </ul>
            	</li>           	
               <li data-toggle="modal" data-target="#signin-signup-tab" id="signin-button"><a href="logoutPro" class="navbar-brand" >登出</a></li>
               <%} %>
              </ul>
            </div>            
        </div>
    </nav>
 <div class="bg jumbotron">
      </div>
      <div class="container">
       	<div class="row" style="float:left"><font size=5><strong>答卷统计数据</strong></font>
       	 <button type='button' class='btn btn-default' onclick='downloadjpeg("<%=ques.getId() %>","<%=ques.getTitle() %>")'>导出页面为jpeg文件</button>
       	  <button type='button' class='btn btn-default' onclick='downloadxml("<%=ques.getId() %>","<%=ques.getTitle() %>")'>导出数据为xls文件</button>
       	<div id="jpegtip"> </div>
       	</div>
       	       	  <a class="btn btn-default"  href="getAnswerByQuesid?quesid=<%=ques.getId() %>" type="button" align="right" style="float:right;">
				<i class="fa fa-bar-chart">查看答卷信息</i> 
		</a>
 	<hr>
<hr style="color:black;border-top:1px solid #C0C0C0" >   
    <div id="container" class="container" style="background-color:#f8f8f8">
    <p><strong>问卷序号：<%=ques.getId() %></strong></p>
      <p><strong>问卷名字：<%=ques.getTitle() %></strong></p>
    </div>  
    	<div class="modal fade" id="modal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">
						<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
					</button>
					<h3 class="modal-title" id="modalTitle"></h3>
					<h4 class="modal-title" id="modalTitle2"></h4>
					<button type='button' class='btn btn-default' onclick='downloadDetailxml()'>数据导出为xls文件</button>
				</div>
				<div class="modal-body">
							<div class="dataTable_wrapper">
								<table class="table table-striped table-bordered table-hover"
									id="dataTable">
									<thead>
										<tr>
										    <th>答卷序号</th>
											<th>详情</th>
										</tr>
									</thead>
									<tbody id="detailbody">
									</tbody>
								</table>
							</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				</div>
			</div>
		</div>
	</div>
	<div class="row" ><font size=5><strong>交叉分析</strong></font></div>
	<hr style="color:black;border-top:1px solid #C0C0C0">
	<div class="container">
	<label>自变量</label>
	<select id="firstques">
	<option>未选择</option>
	</select>
	<label>因变量</label>
	<select id="secondques">
	<option>未选择</option>
	</select>
	<button type="button" class="btn btn-default" onclick="crossAna()">
	生成交叉分析
	</button>
	<button type="button" class="btn btn-default" onclick="downloadXlsCross()">
	导出交叉分析数据为xls文件
	</button>
	<div id="crossAnaTable">
	</div>
	</div>
	<hr>
	<hr style="color:black;border-top:1px solid #C0C0C0">
      <!-- Site footer -->
      <footer class="footer">
        <p>&copy; 2017 LZTR Group.</p>
      </footer>
    </div>
	<!-- js file -->
	<script src="<%=path%>/questionnaire/js/jquery.min.js"></script>
	<script src="<%=path%>/questionnaire/js/bootstrap.min.js"></script>
	<script src="<%=path%>/questionnaire/js/jquery.dataTables.min.js"></script>
	<script src="<%=path%>/questionnaire/js/dataTables.bootstrap.min.js"></script>
	<script src="<%=path%>/questionnaire/js/questionnaire.js"></script>
	<script src="<%=path%>/questionnaire/js/bootbox.min.js"></script>
	<script src="<%=path%>/questionnaire/js/Chart.js"></script>
	<script src="<%=path%>/questionnaire/js/download.js"></script>
	<script src="<%=path%>/questionnaire/js/questionnaireExport.js"></script>
	<script src="<%=path%>/questionnaire/js/html2canvas.js"></script>
	<script src="<%=path%>/questionnaire/js/result_statistic.js"></script>	
	<script>
		$(document).ready(function() {
			$('#dataTables').DataTable({
				responsive : true
			});
		});
		getStatistic(<%=ques.getId() %>);
	</script>
		            <script>
        $(window).scroll(function () {
            if ($(".navbar").offset().top > 50) {$(".navbar-fixed-top").addClass("top-nav");
            }else {$(".navbar-fixed-top").removeClass("top-nav");}
        })
        </script>
</body>
</html>