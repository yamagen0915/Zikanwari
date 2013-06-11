<?php
	require_once("./common.php");
	//デフォルトで5Iのid
	$class_id = (isset($_GET["class_id"])) ? $_GET["class_id"] : FIFTH_I;
?>
<!doctype html>
<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
	<meta charset="UTF-8">
	<link rel="stylesheet/less" type="text/css" href="./css/style.less">
	<script type="text/javascript" src="./libs/less-1.3.3.min.js"></script>
</head>
<body>
	<p style="display:none;" id="class_id"><?php echo $class_id; ?></p>
	<div id="header">
		<ul id="weeks_tab">
			<li class="week active">月</li>
			<li class="week">火</li>
			<li class="week">水</li>
			<li class="week">木</li>
			<li class="week">金</li>
		</ul>
	</div>

	<div id="timetable">

	</div>

	<img id="menu" src="./img/menu_btn.png">
	<ul id="menu_list">
		<li id="menu1">テスト日程</li>
	</ul>

	<div id="fotter">
		<p>このアプリはクラス内の課題を共有するアプリです。</p>
		<p>ユーザー認証等は行っていないのでモラルを持って使用しましょう。</p>
		<p>開発者：5I 山元翔太</p>
	</div>
	<div id="dialog">
		<div id="dialog_content">
			<div id="dialog_header">
				<span id="title"></span>
				<span id="caution">※タップして編集</span>
				<input type="text" style="display:none;" id="title_edit"/>
			</div>
			<div id="dialog_body">
				<input id="limite_year" type="text" />
				提出期限
				<input id="limite_month" type="text"/>月
				<input id="limite_day" type="text" />日
				<textarea id="homework_text"></textarea>
			</div>
			<div id="dialog_fotter">
				<button id="submit">決定</button>
				<button id="cancel">キャンセル</button>
			</div>
		</div>
	</div>
	<script type="text/javascript" src="./libs/jquery-1.9.1.min.js"></script>
	<script type="text/javascript" src="./libs/ejs_production.js"></script>
	<script type="text/javascript" src="./js/timetable.js"></script>
	<script type="text/javascript" src="./js/dialog.js"></script>
	<script type="text/javascript" src="./js/menu.js"></script>
	<script type="text/javascript" src="./js/view.js"></script>
</body>
</html>