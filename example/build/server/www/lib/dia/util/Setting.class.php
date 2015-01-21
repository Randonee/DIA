<?php

class dia_util_Setting {
	public function __construct($name = null, $value = null) {
		if(!php_Boot::$skip_constructor) {
		if($value === null) {
			$value = "";
		}
		if($name === null) {
			$name = "";
		}
		$this->name = $name;
		$this->value = $value;
		$this->children = new haxe_ds_StringMap();
	}}
	public $name;
	public $value;
	public $children;
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
	function __toString() { return 'dia.util.Setting'; }
}
