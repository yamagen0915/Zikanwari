<?php
	require_once("./common.php");

	$zikanwari = $db->select(TABLE_ZIKANWARI,"*");

	echo json_encode($zikanwari);
?>