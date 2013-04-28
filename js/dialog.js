$(function(){

	var timetable_id = -1;

	$(document).on("click","#timetable li",function(){
		timetable_id = $("#timetable ol li").index(this);
		dialog_show();
	});

	$(document).on("click","#dialog_close_btn",function(){
		dialog_dissmiss();
	});

	$(document).on("click","#submit",function(){
		if(timetable_id >= 0){
			console.log($("#homework_text").val());
			var subject = timetables[timetable_id];
			subject.name = $("#title_edit").val();
			$(".subject_title").eq(timetable_id).html(subject.name);
			console.log(subject.name);
			subject.homework = $("#homework_text").val();
			$.post(
				REGIST_HOMEWORK_URL,
				{
					subject : subject.name,
					homework : subject.homework,
					day_id : subject.day_id,
					period_id : subject.period_id,
				},
				function(data){
					console.log(data);
					dialog_dissmiss();
				});
			$("#timetable li").eq(timetable_id).children("button").remove();
			if(subject.homework !== ""){
				$("#timetable li").eq(timetable_id).append("<button class='subject'></button>");
			}
		}
	});

	$(document).on("click","#title",function(){
		$(this).hide();
		$("#title_edit").show();
		$("#title_edit").focus();
	});

	function dialog_dissmiss(){
		$("#dialog_content").animate( { height: 'hide' , opacity: 'hide' },{
			"duration" : "slow",
			"complete" : function(){
				$("#dialog").hide();
				$("#title_edit").hide();
				$("#title").show();
			}
		} );
	}

	function dialog_show(){
		var subject = timetables[timetable_id];
		$("#homework_text").val(subject.homework);
		if(subject.name == ""){
			subject.name = "未登録";
		}
		$("#title_edit").val(subject.name);
		$("#title").html(subject.name);
		$("#dialog").show();
		$("#dialog_content").animate( { height: 'show' ,opacity: 'show'}, 'slow' );
	}

});