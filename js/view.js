
var timetables = [];

$(function(){

	$(document).ready(function(){
		getZikanwari(function(json){
			for(var i = 0;i < json.length;i ++){
				var subject = TimeTable.new();
				subject.id = json[i].id;
				subject.day_id = json[i].day_id;
				subject.period_id = json[i].period_id;
				subject.name = json[i].subject;
				subject.homework = json[i].homework;
				timetables.push(subject);
			}
			var html = renderHTML(timetables);
			$("#timetable").append(html);
		});
	});

	$(window).scroll(function(){
		var scrollTop = $(window).scrollTop();
		var height = $(".week_of_day_name").eq(1).offset().top - $(".week_of_day_name").eq(0).offset().top;
		for(var i = 0;i < 5;i ++){
			//ヘッダー分足す
			if(scrollTop + 44 >= $(".week_of_day_name").eq(i).offset().top 
				&& scrollTop + 44 <= ($(".week_of_day_name").eq(i).offset().top + height / 2)){
				$(".menu").removeClass("active");
				$(".menu").eq(i).addClass("active");
				$(".menu").css("border-bottom","1px solid #6BBED5");
				$(".menu").eq(i).css("border-bottom","1px solid #208DC3");
				$(".menu").css("box-shadow","0px 5px 5px 2px rgba(0,0,0,0.2)");
				$(".menu").eq(i).css("box-shadow","0px 0px 0px 0px rgba(0,0,0,0.0)");
				break;
			}
		}
	});

	$(document).on("click",".menu",function(){
		var week_of_day = $(".menu").index(this);
		var offset_top = $(".week_of_day_name").eq(week_of_day).offset().top - 44;
		$('html,body').animate({ scrollTop: offset_top }, 'fast');
	});

	function getZikanwari(downloaded){
		$.post(
			ZIKANWARI_URL,
			function(data){
				if(data){
					var json = JSON.parse(data);
					downloaded(json);
				}
			});
	}

	function renderHTML(data){
		var week_of_day_name = ["月","火","水","木","金"];
		var html = "";
		for(var i = 0;i < data.length;i ++){
			if((i % 4) == 0) {
				html +="<div class='week_of_day_name'>"+week_of_day_name[i/4]+"</div>"
				html += "<ol>";
			}
			html +=  "<li>";
			html += "	<div class='subject'>";
			html += "	"+data[i].period_id+". ";
			html += "	<span class='subject_title'>"+data[i].name + "</span>";
			html += "	</div>";
			if(data[i].homework !== ""){
				html += "<button class='subject'></button>";
			}
			html += "</li>";
			if(((i+1) % 4) == 0) html += "</ol>";
		}
		
		return html;
	}
});