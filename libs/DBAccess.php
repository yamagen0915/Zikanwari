<?php
	class DBAccess{
		
		private $host;//localhost
		private $user;//root
		private $pass;
		private $dbname;
		private $sql;
		
		public function __construct($host,$user,$pass,$dbname){
			$this->host = $host;
			$this->user = $user;
			$this->pass = $pass;
			$this->dbname = $dbname;
		}
		
		public function selectAll($table){
			return $this->select($table,"*");
		}
		
		public function select($table,$columns,$where="",$option=""){
			$connection = $this->connection();
			
			$cols = $this->renderColumns($columns);
			
			$sql = "SELECT ".$cols." FROM ".$table;
			
			if($where){
				$sql .= " WHERE ".$this->renderWhere($where);
			}
			if($option){
				$sql .= " ".$option;
			}
			
			$data = null;
			$result = $connection->query($sql);
			if($result){
				//連想配列で結果を返す
				//普通の配列の場合はMYSQLI_NUM
				//両方の場合はMYSQLI_BOTH
				while($row = $result->fetch_array(MYSQLI_ASSOC)){
					$data[] = $row;
				}
			}
			
			$result->free();
			$connection->close();
			$this->sql = $sql;
			
			return ($data) ? $data : null;
		}
		
		public function update($table,$datas,$where){
			$con = $this->connection();
			
			$data = $this->renderUpdate($datas);
			$sql = "UPDATE ".$table." SET ".$data." WHERE ".$this->renderWhere($where);
			
			$result = $con->query($sql);
			$this->sql = $sql;
			
			$con->close();
			
			return $result;
			
		}
		
		public function insert($table,$columns,$datas){
			$con = $this->connection();
			
			$cols = $this->renderColumns($columns);
			$data = $this->renderData($datas);
			
			$sql = "INSERT INTO ".$table." (".$cols.") VALUES (".$data.")";
			$result = $con->query($sql);
			$this->sql = $sql;
			
			$con->close();
			
			return $result;
		}
		
		public function delete($table,$where){
			$con = $this->connection();
			
			$sql = "DELETE FROM ".$table." WHERE ".$this->renderWhere($where);
			$result = $con->query($sql);
			$con->close();
			$this->sql = $sql;
			return $result;
		}
		
		public function get_sql(){
			//直前に実行したSQL文を返す
			return $this->sql;
		}
		
		private function connection(){
			$con = new mysqli(
							$this->host,
							$this->user,
							$this->pass,
							$this->dbname);
			
			if($con->connect_error){
				echo "接続エラー";
				exit;
			}
			
			return $con;
		}
		
		private function renderColumns($columns){
			$type = gettype($columns);
			if($type === "string"){
				$cols = $columns;
			}else if($type === "array"){
				$cols = "";
				for($i = 0;$i < count($columns);$i++){
					if($i)$cols .=",";//一番最初だけコロンをつけない
					$cols .= $columns[$i];
				}
			}
			return $cols;
		}
		
		private function renderWhere($where){

			$w = "";
			$i = 0;
			foreach ($where as $key => $value) {
				if(gettype($value) === "string") $value = "'".$value."'";
				if($i != 0) {
					if(array_key_exists("type", $where))
						$w .= $w["type"]." ";
					else
						$w .= " AND ";
				}
				if($key !== "type"){
					$w .= $key."=".$value;
				}
				
				$i ++;
			}

			return $w;
		}

		private function renderUpdate($datas){
			$data = "";

			$i = 0;
			foreach ($datas as $key => $value) {
				if($i != 0) $data .= ",";
				if(gettype($value) === "string") $value = "'".$value."'";
				$data .= $key ."=".$value;
				$i ++;
			}

			return $data;
		}

		
		private function renderData($datas){
			$type = gettype($datas);
			if($type == "string"){
				$data = $datas;
			}else if($type == "array"){
				$data = "";
				for($i = 0;$i < count($datas);$i ++){
					if($i)$data .=",";//一番最初だけコロンをつけない
					if(gettype($datas[$i]) === "string"){
						$datas[$i] = "'".$datas[$i]."'";
					}
					$data .= $datas[$i];
				}
			}
			return $data;
		}
		
	}