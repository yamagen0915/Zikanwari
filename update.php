<?
	require_once("./common.php");
	$db->update(
		TABLE_ZIKANWARI,
		array("class_id" => "1"),
		array("class_id" => "2"));

	echo $db->get_sql();
?>