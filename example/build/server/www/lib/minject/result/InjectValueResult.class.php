<?php

class minject_result_InjectValueResult extends minject_result_InjectionResult {
	public function __construct($value) {
		if(!php_Boot::$skip_constructor) {
		parent::__construct();
		$this->value = $value;
	}}
	public $value;
	public function getResponse($injector) {
		return $this->value;
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
	function __toString() { return 'minject.result.InjectValueResult'; }
}
