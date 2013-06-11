//namespaceの宣言
var Timetable = {};

/**
*	教科オブジェクトをラッピングしたオブジェクト
*/
Timetable.Subjects = {
	//表示しているクラスのID
	class_id : 0,

	//教科オブジェクトを格納する変数
	subjects : [],

	add : function(subject){
		this.subjects.push(subject);
	},

	set : function(index,subject){
		this.subjects[index] = subject;
	},

	get : function(index){
		return this.subjects[index];
	},

	setAll : function(subjects){
		this.subjects = subjects;
	},
	getAll : function(){
		return this.subjects;
	},

	refresh : function(){
		this.subjects = [];
	},

	//新しい教科オブジェクトを返す。
	new : function(){
		return {
			id : 0,
			day_id : 0,
			period_id : 0,
			name : null,
			homework : null,
			limite_date : null,
		};
	}
}

/**
*	jsonデータを取得する。
*	
*	function download後の処理
*/
Timetable.API = {
	URL : {
		get_timetable : "./get_zikanwari.php",
		regist_homework : "./regist_homework.php",
	},

	/*
	*	時間割を取得する。
	*	int class_id クラスID
	*	function 	ダウンロード後の処理
	*/
	getTimetables : function(class_id,downloaded){
		$.post(
			this.URL.get_timetable+"?class_id="+class_id,
			function(data){
				console.log(data);
				//JSON文字列をオブジェクトに変換
				var json = JSON.parse(data);
				downloaded(json);
			});
	},

	/**
	*
	*	宿題を登録する
	*
	*/
	postHomework : function(class_id,subject){
		$.post(
			this.URL.regist_homework,
			Timetable.API.get_post_params(
				class_id.replace("¥s/g",""),subject),
			function(data){
				console.log(data);
			}
		);
	},

	/**
	*
	*/
	get_post_params : function(class_id,subject){
		return {
			subject : subject.name,
			class_id : class_id,
			homework : subject.homework,
			day_id : subject.day_id,
			period_id : subject.period_id,
			limite_date : this.format_date(subject.limite_date),
		};
	},

	format_date : function(limite){
		if(limite == null){
			return "0000-00-00";
		}
		var date = new Date(limite);
		var yyyy = date.getYear() + 1990;
		var mm = date.getMonth() + 1;
		var dd = date.getDate();
		return yyyy + "-" + mm + "-" + dd;
	},
}

Timetable.View = {
	//画面の初期化を行う
	init : function(json){

		//受け取ったjsonデータからSubjectオブジェクトをセットする
		var subjects = Timetable.View.convert_json_subjects(json);
		Timetable.Subjects.setAll(subjects);

		//曜日の分だけループする。
		var html = "";
		for(var i = 1;i <= 5;i ++){
			var subjects_of_day 
					= Timetable.View.get_subjects_of_day( i, Timetable.Subjects.getAll());
			var html_of_day 
					= Timetable.View.get_html_of_day( i, subjects_of_day);

			html += html_of_day;
		}

		$("#timetable").html(html);
	},

	//JSONデータをSubjectオブジェクトに変換する
	convert_json_subjects : function(json){
		var subjects = [];
		for(var i = 0;i < json.length;i ++){
			var subject = Timetable.Subjects.new();
			subject.id 			= json[i].id;
			subject.day_id 		= json[i].day_id;
			subject.period_id 	= json[i].period_id;
			subject.name 		= json[i].subject;
			subject.homework 	= json[i].homework;

			var limite = new Date(json[i].limite_date);
			subject.limite_date 	= limite != "Invalid Date" ? limite : null;

			subjects.push(subject);
		}
		return subjects;
	},

	//指定した曜日のhtmlを返す。
	get_html_of_day : function(day_id,subjects){
		var week_of_day_name = ["","月","火","水","木","金"];
		var ejs = new EJS({url:"./template/week_of_day.ejs"});
		var html = ejs.render({
			week_of_day_name : week_of_day_name[day_id],
			subjects : subjects,
		});
		return html;
	},

	//指定した曜日のSubjectオブジェクトを返す。
	get_subjects_of_day : function(day_id,subjects){
		var subjects_of_day = [];
		for(var i = 0;i < subjects.length;i ++){
			if(subjects[i].day_id == day_id){
				subjects_of_day.push(subjects[i]);
			}
		}
		return subjects_of_day;
	},
};







