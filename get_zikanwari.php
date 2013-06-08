<?php
	require_once("./common.php");
	if(!isset($_GET["class_id"])){
		echo "there is not 'class_id'";
		exit;
	}


	$class_id_str = $_GET["class_id"];
	$class_id = get_class_ids($class_id_str);

	$zikanwari = $db->select(TABLE_ZIKANWARI,"*",array("class_id" => $class_id));

	echo json_encode($zikanwari);
?>