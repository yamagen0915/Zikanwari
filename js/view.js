$(function(){
	
	$(document).ready(function(){

		var class_id = $("#class_id").text();
		console.log(class_id);
		Timetable.Subjects.class_id = class_id;

		Timetable.API.getTimetables(
			Timetable.Subjects.class_id,
			Timetable.View.init);
	});

	$(window).scroll(function(){
		var scrollTop = $(window).scrollTop();
		var height = $(".week_of_day_name").eq(1).offset().top - $(".week_of_day_name").eq(0).offset().top;
		for(var i = 0;i < 5;i ++){
			//ヘッダー分足す
			if(scrollTop + 44 >= $(".week_of_day_name").eq(i).offset().top 
				&& scrollTop + 44 <= ($(".week_of_day_name").eq(i).offset().top + height / 2)){
				$(".week").removeClass("active");
				$(".week").eq(i).addClass("active");
				break;
			}
		}
	});

	$(document).on("click",".week",function(){
		var week_of_day = $(".week").index(this);
		var offset_top = $(".week_of_day_name").eq(week_of_day).offset().top - 44;
		$('html,body').animate({ scrollTop: offset_top }, 'fast');
	});

});