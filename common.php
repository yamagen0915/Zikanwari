<?php
	
	require_once("./libs/DBAccess.php");

	define("TABLE_ZIKANWARI","ZikanwariTable");
	define("COLUMN_ID","id");
	define("COLUMN_CLASS_ID","class_id");
	define("COLUMN_DAY_ID","day_id");
	define("COLUMN_PERIOD_ID","period_id");
	define("COLUMN_SUBJECT","subject");
	define("COLUMN_HOMEWORK","homework");
	define("MONDAY",1);
	define("TUESDAY",2);
	define("WENDSDAY",3);
	define("THURSDAY",4);
	define("FRIDAY",5);

	define("FIFTH_I","09513");
	define("FORTH_I","10413");
	define("THURD_I","11313");
	define("SECOND_I","12213");
	define("FIRST_I","13113");

	$db = new DBAccess("localhost","root","","zikanwari");

	function get_columns($table){
		$columns = array(
			TABLE_ZIKANWARI => array(COLUMN_ID,COLUMN_CLASS_ID,COLUMN_DAY_ID,COLUMN_PERIOD_ID,COLUMN_SUBJECT,COLUMN_HOMEWORK),
		);
		return $columns[$table];
	}

	function get_class_ids($class_id){
		$class_ids = array(
			FIFTH_I => 0,
			FORTH_I => 1,
			THURD_I => 2,
			SECOND_I => 3,
			FIRST_I => 4,
		);
		return $class_ids[(string)$class_id];
	}

?>