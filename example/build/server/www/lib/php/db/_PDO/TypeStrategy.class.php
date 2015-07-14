<?php

class php_db__PDO_TypeStrategy {
	public function __construct() {}
	public function map($data) { if(!php_Boot::$skip_constructor) {
		throw new HException("must override");
	}}
	static function convert($v, $type) {
		if($v === null) {
			return $v;
		}
		switch($type) {
		case "bool":{
			return (bool)($v);
		}break;
		case "int":{
			return intval($v);
		}break;
		case "float":{
			return floatval($v);
		}break;
		case "date":{
			return Date::fromString($v);
		}break;
		case "blob":{
			return haxe_io_Bytes::ofString($v);
		}break;
		default:{
			return $v;
		}break;
		}
	}
	function __toString() { return 'php.db._PDO.TypeStrategy'; }
}
