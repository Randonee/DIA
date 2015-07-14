<?php

class php_db__PDO_PHPNativeStrategy extends php_db__PDO_TypeStrategy {
	public function __construct() { if(!php_Boot::$skip_constructor) {
		parent::__construct();
	}}
	public function map($data) {
		if(!isset($data["native_type"])) {
			if(isset($data["precision"])) {
				return "int";
			} else {
				return "string";
			}
		}
		$pdo_type_str = PDO::PARAM_STR;
		$pdo_type = $data["pdo_type"];
		$type = $data["native_type"];
		$type = strtolower($type);
		switch($type) {
		case "float":case "decimal":case "double":case "newdecimal":{
			return "float";
		}break;
		case "date":case "datetime":case "timestamp":{
			return "date";
		}break;
		case "bool":case "tinyint(1)":{
			return "bool";
		}break;
		case "int":case "int24":case "int32":case "long":case "longlong":case "short":case "tiny":{
			return "int";
		}break;
		case "blob":{
			if($pdo_type === $pdo_type_str) {
				return "string";
			} else {
				return "blob";
			}
		}break;
		default:{
			return "string";
		}break;
		}
	}
	function __toString() { return 'php.db._PDO.PHPNativeStrategy'; }
}
