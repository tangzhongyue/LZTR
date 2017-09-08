var Q = {};
var QUESID = 0;
var initrelelist = [];
function getQ(id){
	QUESID = id;
	jQuery.ajax({
		url : 'getQuestionnaire',
		processData : true,
		dataType : "json",
		data : {
			id:id,
			status:"need"
		},
		success : function(data) {
			if(data['status']=="notexist"){
				var btn = document.getElementsByTagName("BUTTON")[0];
				var div = btn.parentNode;
				div.removeChild(btn);
				var info = document.createElement("P");
				info.innerHTML = "问卷不存在";
				div.append(info);
				return;
			}
			if(data['status']=="notpub"){
				var btn = document.getElementsByTagName("BUTTON")[0];
				var div = btn.parentNode;
				div.removeChild(btn);
				var info = document.createElement("P");
				info.innerHTML = "本问卷已结束填写或被禁止填写，请返回主页或关闭本页面";
				div.append(info);
				return;
			}
			formQ(data);
			
		}
	});
}
function formQ(data){
	Q = data;
	var title = data['title'];
	var introduction = data['introduction'];
	var questions = data['questions'];
	var length = questions.length;
	var result = [];
	//create title & introduction
	$("#questionnaire").html("<h1 class='text-muted' style='color:black' align='center'><font size='10'>" + title + "</font></h1>" +
			"<p align='center'>" + introduction + "</head>");
	//create questions
	for(var i = 0 ; i < length ; i++){
		var question = questions[i];
		addStem(question, i);
		var type = question['type'];
		if(type=="Subjective") result[i] = addSubjective(question, i);
		else if(type=="Single") result[i] = addSingle(question, i);
		else if(type=="Multiple") result[i] = addMultiple(question, i);
		else if(type=="Slider") result[i] = addSlider(question, i);
	}
	var len = initrelelist.length;
	var bin = document.getElementById("bin");
	var form = document.getElementById("form");
	for(j=0;j<len;j++){
		var ques = document.getElementById(initrelelist[j]-1);
		var substitute = document.createElement("div");
		substitute.id = ques.id+"_tmp";
		substitute.setAttribute("value", "5")
		form.replaceChild(substitute,ques);
		bin.appendChild(ques);
	}
}
function addStem(question, i){
	var form = document.getElementById("form");
	//create stem
	var div = document.createElement("div");
	div.id = i;
	div.className = "container";
	form.appendChild(div);
	if(question['type']=="Multiple"&&question['min']!=undefined&&question['min']!=null&&question['min']!=""){
		$("#"+i).html("<p2><font size='4'>" + (i+1)  + " "+ question['stem'] + "("+question['min']+"~"+question['max']+"项)</font>");
	}
	else $("#"+i).html("<p2><font size='4'>" + (i+1)  + " "+ question['stem'] + "</font>");
	if(question['required']==true){
		$("#"+i).append("<font color='red' size='4'>&nbsp*</font>");
	}
	$("#"+i).append("</p2>");
}
function addSubjective(question, i){
	var div = document.getElementById(i);
	div.setAttribute("value", 0);
	var newDiv = document.createElement("div");
	newDiv.id = i + "div";
	newDiv.className = "container";
	div.appendChild(newDiv);
	if(question['required']==true){
	$("#"+i + "div").html("<div class='col-lg-10'><div><input class='form-control' required name=" + i + "></input></div></div>" +
			"");
	}
	else{
		$("#"+i + "div").html("<div class='col-lg-10'><input class='form-control' name=" + i + "></input></div>" +
		"");
	}
	return;
}
function addSingle(question, i){
	var div = document.getElementById(i);
	var thisrele = [];
	div.setAttribute("value", 1);
	var newDiv = document.createElement("div");
	newDiv.id = i + "div";
	newDiv.className = "container";
	div.appendChild(newDiv);
	$("#"+i + "div").append("<strong><div id='" + i + "message' class='error'></div></strong>")
	for(var j = 0 ; j < question['options'].length; j++){
		if(question['options'][j]["relevancy"]==undefined){
			var rele = "";
		}
		else{
			var rele = question['options'][j]["relevancy"];
			for(var p=0;p<rele.length;p++){
				if(initrelelist.indexOf(rele[p])==-1){
					initrelelist.push(rele[p]);
				}
			}
			for(var p=0;p<rele.length;p++){
				if(thisrele.indexOf(rele[p])==-1){
					thisrele.push(rele[p]);
				}
			}
		}
		if(question['options'][j]['hasWords']==true){
			if(question['required']==false){
	$("#"+i + "div").append("<p><div class='radio' ><label  style='float:left'><input type='radio' value=" + j +" name=" + i + " rele='"+rele+"' onclick='releEffect("+i+")'>" +
			"<font size='4'><strong>" + question['options'][j]['option'] + "</strong></font></label>");
		$("#"+i + "div").append("<div><input  name='" + i + "_" + j + "words'></div>");
	}else{
		$("#"+i + "div").append("<p><div class='radio' ><label  style='float:left'><input required type='radio' value=" + j +" name=" + i + " rele='"+rele+"' onclick='releEffect("+i+")'>" +
				"<font size='4'><strong>" + question['options'][j]['option'] + "</strong></font></label>");
			$("#"+i + "div").append("<div><input  name='" + i + "_" + j + "words'></div>");
	}
			}
		else{
			if(question['required']==false){
			$("#"+i + "div").append("<p><div class='radio' ><label><input type='radio' value=" + j +" name=" + i + " rele='"+rele+"' onclick='releEffect("+i+")'>" +
					"<font size='4'><strong>" + question['options'][j]['option'] + "</strong></font></label>");
			}
			else{
				$("#"+i + "div").append("<p><div class='radio' ><label><input required type='radio' value=" + j +" name=" + i + " rele='"+rele+"' onclick='releEffect("+i+")'>" +
						"<font size='4'><strong>" + question['options'][j]['option'] + "</strong></font></label>");
			}
		}
	$("#"+i + "div").append("</div></p>");
	}
	div.setAttribute("allrele", thisrele);
	return;
}
function addMultiple(question, i){
	var div = document.getElementById(i);
	var thisrele = [];
	div.setAttribute("value", 2);
	var newDiv = document.createElement("div");
	newDiv.id = i + "div";
	newDiv.className = "container";
	div.appendChild(newDiv);
	$("#"+i + "div").append("<strong><div id='" + i + "message' class='error'></div></strong>")
	for(var j = 0 ; j < question['options'].length; j++){
		if(question['options'][j]["relevancy"]==undefined){
			var rele = "";
		}
		else{
			var rele = question['options'][j]["relevancy"];
			for(var p=0;p<rele.length;p++){
				if(initrelelist.indexOf(rele[p])==-1){
					initrelelist.push(rele[p]);
				}
			}
			for(var p=0;p<rele.length;p++){
				if(thisrele.indexOf(rele[p])==-1){
					thisrele.push(rele[p]);
				}
			}
		}
		if(question['options'][j]['hasWords']==true){
			if(question['required']==false){
			$("#"+i + "div").append("<p><label  style='float:left'><input type='checkbox' value=" + j +" name=" + i + 
					 " rele='"+rele+"' onclick='releEffect("+i+")'>" +
					"<font size='4'><strong>" + question['options'][j]['option'] + "</strong></font></label>");
				$("#"+i + "div").append("<div><input  name='" + i + "_" + j + "words'>");
			}
			else{
				$("#"+i + "div").append("<p><label  style='float:left'><input required type='checkbox' value=" + j +" name=" + i +
						" rele='"+rele+"' onclick='releEffect("+i+")'>" +
						"<font size='4'><strong>" + question['options'][j]['option'] + "</strong></font></label>");
					$("#"+i + "div").append("<div><input  name='" + i + "_" + j + "words'>");
			}
			}
				else{
					if(question['required']==false){
					$("#"+i + "div").append("<p><label><input type='checkbox' value=" + j +" name=" + i +
							" rele='"+rele+"' onclick='releEffect("+i+")'>" +
							"<font size='4'><strong>" + question['options'][j]['option'] + "</strong></font></label>");
					}
					else{
						$("#"+i + "div").append("<p><label><input required type='checkbox' value=" + j +" name=" + i + 
								" rele='"+rele+"' onclick='releEffect("+i+")'>" +
								"<font size='4'><strong>" + question['options'][j]['option'] + "</strong></font></label>");
					}
				}
			$("#"+i + "div").append("</p>");
			}
	div.setAttribute("allrele", thisrele);
	return;
}
function addSlider(question, i){
	var div = document.getElementById(i);
	div.setAttribute("value", 3);
	var newDiv = document.createElement("div");
	newDiv.id = i + "div";
	newDiv.className = "container";
	div.appendChild(newDiv);
	if(question['required']==true){
	$("#"+i + "div").append("<p><div class='row'><div class='col-lg-6'  style='padding-top:10px'><div id='"+ i + "slider' style='padding-up:100px'></div>" +
			"<div class='col-lg-6'>" + question['min'] + "  " + question['mintext'] + "</div>" +
			"<div class='col-lg-6' align='right'>" + question['maxtext'] + "  " + question['max'] + "</div>" +
			"</div>" +
			"<div class='col-lg-1'><input class='form-control' id='"+ i +"input' name=" + i +" type='number' step='1' min=" + question['min'] + " max=" + question['max'] +"></div></div>" +
			"</p>");
	}
	else{
		$("#"+i + "div").append("<p><div class='row'><div class='col-lg-6'  style='padding-top:10px'><div id='"+ i + "slider' style='padding-up:100px'></div>" +
				"<div class='col-lg-6'>" + question['min'] + "  " + question['mintext'] + "</div>" +
				"<div class='col-lg-6' align='right'>" + question['maxtext'] + "  " + question['max'] + "</div>" +
				"</div>" +
				"<div class='col-lg-1'><input class='form-control' id='"+ i +"input' name=" + i +" type='number' step='1' min=" + (question['min']*1-1) + " max=" + question['max'] +"></div></div>" +
				"</p>");
	}
    var slider = $( "#"+i+"slider" ).slider({
        range: "min",
        min: question['min'] * 1,
        max: question['max'] * 1,
        value: question['min'],
        slide: function( event, ui ) {
            $( "#"+i+"input" ).val(ui.value );
          }
    });
    $( "#"+i+"input" ).val(question['min']*1 -1);
    $( "#"+i+"input" ).change(function() {
        slider.slider( "value", this.value );
      });
	return;
}
function submit(){
	var form = document.getElementById("form");
	var questions = form.childNodes;
	var hidequestions = document.getElementById("bin").childNodes;
	var length = questions.length;
	var result=[];
	var report = "<p>本次提交中，以下题号的问题回答有缺漏或回答格式不正确，请查看修改并重新提交：</p><p>";
	var ids = new Array();
	for(var i = 0; i < length; i++){
		var answer = {};
		var type = document.getElementById(i).getAttribute("value");
		switch(type){
		case'0':
			answer['words'] = $("input[name='" + i +"'").val();
			break;
		case'1':
			var optionid = $("input[name='" + i +"']:checked").val();
			answer['option'] = optionid;
			if(optionid == null) {
				answer['option'] = "";
				break;
			}
			if(Q['questions'][i]['options'][optionid*1]['hasWords']==true){
				answer['words'] = $("input[name='" + i +"_" + optionid + "words']").val();
				if(answer['words']==""){
					document.getElementById(i + "message").innerText = "请输入第"+(optionid*1+1)+"选项中需填写的内容 " ;
					ids.push((i*1)+1);
				}
			}
			break;
		case'2':
	    	var a = document.getElementsByName(i);
	    	answer['option']="";
	    	answer['words']=[];
	    	var count = 0;
	    	document.getElementById(i + "message").innerText="";
	    	for(var j=0; j<a.length; j++){
	    		if(a[j].checked){
	    			answer['option'] += j +",";
	    			if(Q['questions'][i]['options'][j*1]['hasWords']==true){
	    				var word = {};
	    				word['optionid'] = j;
	    				word['word'] = $("input[name='" + i +"_" + j + "words']").val();
	    				answer['words'].push(word);
	    				if(word['word']==""){
	    					document.getElementById(i + "message").innerText = "请输入第"+(j*1+1)+"选项中需填写的内容 ";
	    					ids.push((i*1+1));
	    				}
	    			}
	    			count += 1;
	    		}
	    	}
	    	if(count < Q['questions'][i]['min'] && count > 0){
	    		document.getElementById(i + "message").innerText = "请选择不少于 " + Q['questions'][i]['min'] + "个选项";
	    		ids.push((i*1+1));
	    	}
	    	if(count > Q['questions'][i]['max']){
	    		$(i + "message").innerText = "请选择不多于" + Q['questions'][i]['max'] + "个选项";
	    		ids.push((i*1+1));
	    	}
	    	break;
		case'3':
			var num = $("input[name='" + i +"'").val();
			answer['number'] = num;
		}
		result.push(answer);
	}
	if(!$("#form").validate().form()){
		var form = document.getElementById("form");
		var quess = form.childNodes;
		for(var i=0;i<quess.length;i++){
			var labels = quess[i].getElementsByTagName("label");
			var errors = 0;
			for(var j=0;j<labels.length;j++){
				if(labels[j].className=="error"&&labels[j].innerHTML!=""){
					errors+=1;
				}
			}
			if(errors!=0){
				ids.push(i+1);
			}
		}
	}   
	if(ids.length>0){
		var len = document.getElementById("form").childNodes.length;
		for(var i=1;i<=len;i++){
			if(ids.indexOf(i)!=-1){
				report+=i+" ";
			}
		}
		report+="</p>";
		$("#errors").html(report);
		return;
	}
	$("#errors").html("");
	var t = new Date();
	var time = t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate()
						+" "+t.getHours()+":"+t.getMinutes()+":"+t.getSeconds();     
	jQuery.ajax({
		 type: "post",
		url : 'addAnswer',  //get content
		processData : true,
		dataType : "text",
		data : {
			quesid : QUESID,
			time : time,
			content : encodeURI(encodeURI(JSON.stringify(result)))
		},
		success : function(data) { //把title，id都放在里面
			if(data=="dupIp"){
				$("#errors").html("本问卷在本ip地址已提交过，不可重复提交");
			}
			else{bootbox.alert({
				message : '提交成功',
			    callback : function() {
			    	location.href = 'FrontPage';
				}
			});}
		}
	});
}
function releEffect(i){
	var ques = document.getElementById(i);
	var selected = [];
	var notselected = [];
	var opts = document.getElementsByName(i);
	var reletext = ques.attributes.getNamedItem("allrele").textContent;
	if(reletext==""){
		var allrele = [];
	}
	else var allrele = reletext.split(",");
	for(var j=0;j<opts.length;j++){
		var rele = opts[j].attributes.getNamedItem("rele").textContent;
		if(rele!=""){
			rele = rele.split(",");
			if(opts[j].checked==true){
				for(var k=0;k<rele.length;k++){
					if(selected.indexOf(rele[k])==-1){
						selected.push(rele[k]);
					}
				}
			}
		}
	}
	for(var j=0;j<selected.length;j++){
		allrele.splice(allrele.indexOf(selected[j]),1);
	}
	notselected = allrele;
	var bin = document.getElementById("bin");
	var form = document.getElementById("form");
	var quess = form.childNodes;
	for(var j=0;j<selected.length;j++){
		if(quess[selected[j]-1].getAttribute("value")=='5'){
			var tmp = quess[selected[j]-1];
			var ques = document.getElementById(selected[j]-1);
			form.replaceChild(ques,tmp);
			bin.appendChild(tmp);
		}
	}
	for(var j=0;j<notselected.length;j++){
		if(quess[notselected[j]-1].getAttribute("value")!='5'){
			var ques = quess[notselected[j]-1];
			var tmp = document.getElementById(notselected[j]-1+"_tmp");
			var content = $("#"+(notselected[j]-1)).html();
			form.replaceChild(tmp,ques);
			bin.appendChild(ques);
			$("#"+(notselected[j]-1)).html(content);
		}
	}
}
function donothing(){
	var btn = document.getElementsByTagName("BUTTON")[0];
	var div = btn.parentNode;
	div.removeChild(btn);
	var info = document.createElement("P");
	info.innerHTML = "问卷不存在";
	div.append(info);
}
