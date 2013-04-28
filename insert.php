<?php
	require_once("./common.php");

	for($i = 1;$i <= 5;$i ++){
		for($j = 1;$j <= 4;$j ++){
			$db->insert(TABLE_ZIKANWARI,get_columns(TABLE_ZIKANWARI),array("null",$i,$j,"abc",""));
		}
	}