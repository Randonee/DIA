<?php

class mcore_util_Reflection {
	public function __construct(){}
	static function setProperty($object, $property, $value) {
		Reflect::setProperty($object, $property, $value);
		return $value;
	}
	static function hasProperty($object, $property) {
		$properties = Type::getInstanceFields(Type::getClass($object));
		return Lambda::has($properties, $property);
	}
	static function getFields($object) {
		{
			$_g = Type::typeof($object);
			switch($_g->index) {
			case 6:{
				$c = $_g->params[0];
				return Type::getInstanceFields($c);
			}break;
			default:{
				return Reflect::fields($object);
			}break;
			}
		}
	}
	static function here($info = null) {
		return $info;
	}
	static function callMethod($o, $func, $args = null) {
		if($args === null) {
			$args = (new _hx_array(array()));
		}
		try {
			return Reflect::callMethod($o, $func, $args);
		}catch(Exception $__hx__e) {
			$_ex_ = ($__hx__e instanceof HException) ? $__hx__e->e : $__hx__e;
			$e = $_ex_;
			{
				throw new HException(new mcore_exception_Exception("Error calling method " . _hx_string_or_null(Type::getClassName(Type::getClass($o))) . "." . Std::string($func) . "(" . _hx_string_or_null($args->toString()) . ")", $e, _hx_anonymous(array("fileName" => "Reflection.hx", "lineNumber" => 111, "className" => "mcore.util.Reflection", "methodName" => "callMethod"))));
			}
		}
	}
	function __toString() { return 'mcore.util.Reflection'; }
}
