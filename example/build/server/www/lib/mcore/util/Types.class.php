<?php

class mcore_util_Types {
	public function __construct(){}
	static function isSubClassOf($object, $type) {
		return Std::is($object, $type) && !_hx_equal(Type::getClass($object), $type);
	}
	static function createInstance($forClass, $args = null) {
		if($args === null) {
			$args = (new _hx_array(array()));
		}
		try {
			return Type::createInstance($forClass, $args);
		}catch(Exception $__hx__e) {
			$_ex_ = ($__hx__e instanceof HException) ? $__hx__e->e : $__hx__e;
			$e = $_ex_;
			{
				throw new HException(new mcore_exception_Exception("Error creating instance of " . _hx_string_or_null(Type::getClassName($forClass)) . "(" . _hx_string_or_null($args->toString()) . ")", $e, _hx_anonymous(array("fileName" => "Types.hx", "lineNumber" => 65, "className" => "mcore.util.Types", "methodName" => "createInstance"))));
			}
		}
	}
	function __toString() { return 'mcore.util.Types'; }
}
