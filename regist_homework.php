<?php
	require_once("./common.php");

	$subject = $_POST["subject"];
	$homework = $_POST["homework"];
	$day_id = $_POST["day_id"];
	$period_id = $_POST["period_id"];

	$db->update(
		TABLE_ZIKANWARI,
		array("homework"=> $homework,
			  "subject" => $subject),
		array("day_id" => $day_id,
			  "period_id"=> $period_id));

	echo $db->get_sql();;

?>