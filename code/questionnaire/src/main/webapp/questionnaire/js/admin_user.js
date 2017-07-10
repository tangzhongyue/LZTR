/**
 * 
 */
$(function() {

	$("#save").click(function(e) {
		var dataset = e.currentTarget.dataset;
		var id = dataset.id;
		var username = $("input[name='username']").val();
		var age = $("input[name='age']").val();
		var sex = $("input[name='sex']").val();
		var job = $("select[name='job']").val();
		var city = $("input[name='city']").val();
		var country = $("input[name='country']").val();
		var email = $("input[name='email']").val();
		var mobile = $("input[name='mobile']").val();
		var qq = $("input[name='qq']").val();
		var wechat = $("input[name='wechat']").val();
		var role = $("select[name='role']").val();
		
		console.log(id,username,age,sex,job,city,country,email,qq,wechat,role);

		jQuery.ajax({
			url : 'updateUser',
			processData : true,
			dataType : "text",
			data : {
				        id 	: id,
				        username : username,
				        age:age,
				        sex:sex,
				        job:job,
				        city:city,
				        country:country,
				        email:email,
				        mobile:mobile,
				        qq:qq,
				        wechat:wechat,
				        role:role
			},
			success : function(data) {
				console.log(id);
				bootbox.alert({
					message : 'Change successfully!',
					callback : function() {
						location.reload();
					}
				});
			}
		});
		$('#modal').modal('hide');
	});

	$(".delete").click(function(e) {
		bootbox.confirm({
			buttons : {
				confirm : {
					label : 'Delete'
				},
				cancel : {
					label : 'Cancel'
				}
			},
			message : 'Sure to delete?',
			callback : function(result) {
				if (result) {

					var dataset = e.currentTarget.dataset;
					var id = dataset.id;
					jQuery.ajax({
						url : 'deleteUser',
						processData : true,
						dataType : "text",
						data : {
							id : id
						},
						success : function(data) {
							console.log(id);
							bootbox.alert({
								message : 'Delete Successfully! ',
								callback : function() {
									location.reload();
								}
							});
						}
					});

				}
			}
		});
	});

	$(".edit").click(function(e) {
		$('#modalTitle').html("修改用户信息");
		var dataset = e.currentTarget.dataset;
		$("input[name='id']").val(dataset.id);
		$("input[name='username']").val(dataset.username);
		$("input[name='age']").val(dataset.age);
		$("input[name='sex']").val(dataset.sex);
		$("select[name='job']").val(dataset.job);
		$("input[name='country']").val(dataset.country);
		$("input[name='city']").val(dataset.city);
		$("input[name='email']").val(dataset.email);
		$("input[name='mobile']").val(dataset.mobile);
		$("input[name='qq']").val(dataset.qq);
		$("input[name='wechat']").val(dataset.wechat);
		$("select[name='role']").val(dataset.role);
		console.log(dataset.id,dataset.username,dataset.age,dataset.sex,dataset.job,dataset.city,dataset.country,dataset.email,dataset.qq,dataset.wechat,dataset.role);

		$("#save").attr("data-id", dataset.id);
		$('#modal').modal('show');
	});

});
