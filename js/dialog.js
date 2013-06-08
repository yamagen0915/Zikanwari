(function(){

	var timetable_id = -1;

	$(document).on("click","#timetable li",function(){
		timetable_id = $("#timetable ul li").index(this);
		dialog_show(timetable_id);
	});

	$(document).on("click","#cancel",function(){
		dialog_dissmiss();
	});

	//教科名の変更のためのテキストボックスを表示する。
	$(document).on("click","#title",function(){
		$(this).hide();
		$('#caution').hide();
		$("#title_edit").show();
		$("#title_edit").focus();
	});

	//送信ボタンのイベント
	$(document).on("click","#submit",function(){
		if(timetable_id < 0 || is_incorrect_value()){
			alert("日付の値が不正です。");
		}else{
			//教科オブジェクトの取得
			var subject = Timetable.Subjects.get(timetable_id);

			//教科名の取得
			var name = htmlEscape($("#title_edit").val());
			$(".subject_title").eq(timetable_id).html(name);//表示の変更
			subject.name = name;

			//宿題の取得
			var homework = htmlEscape($("#homework_text").val());
			subject.homework = homework;

			//期日の設定
			var limite =  null;
			if(homework){
				var year = $("#limite_year").val();
				var month = $("#limite_month").val() -1;
				var day = $("#limite_day").val();

				limite = new Date(year, month, day);
				
			}
			subject.limite_date = limite;

			//宿題の印を消したり表示したり
			var row = $("#timetable li").eq(timetable_id);
			row.children(".homework").remove();
			if(homework){
				row.append("<div class='homework'></div>");
			}

			//変更を保存
			Timetable.Subjects.set(timetable_id,subject);

			Timetable.API.postHomework(
				Timetable.Subjects.class_id,
				Timetable.Subjects.get(timetable_id));

			dialog_dissmiss();
		}
	});

	
	function dialog_dissmiss(){
		$("#dialog_content").animate( { height: 'hide' , opacity: 'hide' },{
			"duration" : "slow",
			"complete" : function(){
				$("#dialog").hide();
				$("#title_edit").hide();
				$("#title").show();
				$('#caution').show();
			}
		} );
	}

	function dialog_show(index){
		var subject = Timetable.Subjects.get(index);
		$("#homework_text").val(subject.homework);
		if(subject.name == ""){
			subject.name = "未登録";
		}

		//タイトルの設定
		$("#title_edit").val(subject.name);
		$("#title").html(subject.name);

		//提出期限の設定
		var limite = subject.limite_date;

		//宿題の期日がない場合は１週間後の日付を入力
		if(limite == null){
			limite = new Date();
			var baseSec = limite.getTime();
			var addSec = 7 * 24 * 60 * 60 * 1000;
			limite.setTime(baseSec + addSec);
		}

		$("#limite_year").val(limite.getYear() + 1900);
		$("#limite_month").val(limite.getMonth() + 1);
		$("#limite_day").val(limite.getDate());

		$("#dialog").show();
		$("#dialog_content").animate( { height: 'show' ,opacity: 'show'}, 'slow' );
	}

	function is_incorrect_value(){
		var year = $("#limite_year").val();
		var month = $("#limite_month").val();
		var day = $("#limite_day").val();

		return (isNaN(year) || isNaN(month) || isNaN(day));
	}

	function htmlEscape(s){
		s=s.replace(/&/g,'&amp;');
		s=s.replace(/>/g,'&gt;');
		s=s.replace(/</g,'&lt;');
		return s;
	}
})();