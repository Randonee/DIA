<?php

class minject_result_InjectClassResult extends minject_result_InjectionResult {
	public function __construct($responseType) {
		if(!php_Boot::$skip_constructor) {
		parent::__construct();
		$this->responseType = $responseType;
	}}
	public $responseType;
	public function getResponse($injector) {
		return $injector->instantiate($this->responseType);
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
	function __toString() { return 'minject.result.InjectClassResult'; }
}
