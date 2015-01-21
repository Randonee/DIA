<?php

class minject_ClassHash {
	public function __construct() {
		if(!php_Boot::$skip_constructor) {
		$this->hash = new haxe_ds_StringMap();
	}}
	public $hash;
	public function set($key, $value) {
		$this->hash->set(Type::getClassName($key), $value);
	}
	public function get($key) {
		return $this->hash->get(Type::getClassName($key));
	}
	public function exists($key) {
		return $this->hash->exists(Type::getClassName($key));
	}
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
	function __toString() { return 'minject.ClassHash'; }
}
