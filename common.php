<?php
	
	require_once("./libs/DBAccess.php");

	define("TABLE_ZIKANWARI","ZikanwariTable");
	define("COLUMN_ID","id");
	define("COLUMN_DAY_ID","day_id");
	define("COLUMN_PERIOD_ID","period_id");
	define("COLUMN_SUBJECT","subject");
	define("COLUMN_HOMEWORK","homework");
	define("MONDAY",1);
	define("TUESDAY",2);
	define("WENDSDAY",3);
	define("THURSDAY",4);
	define("FRIDAY",5);

	$db = new DBAccess("localhost","root","","zikanwari");

	function get_columns($table){
		$columns = array(
			TABLE_ZIKANWARI => array(COLUMN_ID,COLUMN_DAY_ID,COLUMN_PERIOD_ID,COLUMN_SUBJECT,COLUMN_HOMEWORK),
		);
		return $columns[$table];
	}

?>