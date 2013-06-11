<?php
	require_once("./common.php");

	$subject 	= $_POST["subject"];
	$homework 	= $_POST["homework"];
	$limite		= $_POST["limite_date"];
	$day_id 	= $_POST["day_id"];
	$period_id 	= $_POST["period_id"];
	$class_id   = get_class_ids($_POST["class_id"]);

	$db->update(
		TABLE_ZIKANWARI,
		array(
			"homework"		=> $homework,
			"subject" 		=> $subject,
			"limite_date" 	=> $limite),
		//WHERE句
		array(
			"class_id" 	=> $class_id,
			"day_id" 	=> $day_id,
			"period_id"	=> $period_id));

	echo $db->get_sql();

?>