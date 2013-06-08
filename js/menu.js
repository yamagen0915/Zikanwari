(function(){
	$(document).on("click","#menu",function(){
		var menu = $("#menu_list");

		menu.css('display') == 'block' ?
			menu.animate( { height: 'hide' ,opacity: 'hide'}, 'normal' ) :
			menu.animate( { height: 'show' ,opacity: 'show'}, 'normal' ) ;
	});

	$(document).on("click","#menu1",function(){
		var menu_str = ["テスト日程","通常日程"];
		Timetable.Subjects.class_id = (Timetable.Subjects.class_id + 1 )% 2;
		
		Timetable.API.getTimetables(
			Timetable.Subjects.class_id,
			Timetable.View.init);

		$("#menu_list").animate( 
			{ height: 'hide' ,opacity: 'hide'},
			{ 
				duration : "normal" , 
				complete : function(){
					$("#menu1").html(menu_str[Timetable.Subjects.class_id]);
				} 
			}
		);
		
	});

})();