<?php

class minject__Injector_InjecteeSet {
	public function __construct() {
		if(!php_Boot::$skip_constructor) {
		$this->store = new mdata_Dictionary(true);
	}}
	public $store;
	public function add($value) {
		$this->store->set($value, true);
	}
	public function contains($value) {
		return $this->store->exists($value);
	}
	public function delete($value) {
		$this->store->delete($value);
	}
	public function iterator() {
		return $this->store->iterator();
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
	function __toString() { return 'minject._Injector.InjecteeSet'; }
}
