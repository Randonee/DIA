<?php

class minject_point_ParameterInjectionConfig {
	public function __construct($typeName, $injectionName) {
		if(!php_Boot::$skip_constructor) {
		$this->typeName = $typeName;
		$this->injectionName = $injectionName;
	}}
	public $typeName;
	public $injectionName;
	public function __call($m, $a) {
		if(isset($this->$m) && is_callable($this->$m))
			return call_user_func_array($this->$m, $a);
		else if(isset($this->__dynamics[$m]) && is_callable($this->__dynamics[$m]))
			return call_user_func_array($this->__dynamics[$m], $a);
		else if('toString' == $m)
			return $this->__toString();
		else
			throw new HException('Unable to call <'.$m.'>');
	}
	function __toString() { return 'minject.point.ParameterInjectionConfig'; }
}
