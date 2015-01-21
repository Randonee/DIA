<?php

class dia_model_service_ServiceResponder {
	public function __construct($completeHandler = null, $failHandler = null) {
		if(!php_Boot::$skip_constructor) {
		$this->completeHandler = $completeHandler;
		$this->failHandler = $failHandler;
	}}
	public $response;
	public $error;
	public $completeHandler;
	public $failHandler;
	public function finishSuccess() {
		if($this->completeHandler !== null) {
			$this->completeHandler($this);
		}
	}
	public function finishFail() {
		if($this->failHandler !== null) {
			$this->failHandler($this);
		}
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
	function __toString() { return 'dia.model.service.ServiceResponder'; }
}
