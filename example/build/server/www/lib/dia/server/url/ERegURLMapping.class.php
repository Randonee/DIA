<?php

class dia_server_url_ERegURLMapping implements dia_server_url_URLMapping{
	public function __construct($urlReg, $controllerClass, $preconditions) {
		if(!php_Boot::$skip_constructor) {
		$this->_urlReg = $urlReg;
		$this->_controllerClass = $controllerClass;
		$this->preconditions = $preconditions;
	}}
	public $preconditions;
	public $_urlReg;
	public $_controllerClass;
	public function resolve($url) {
		return $this->_urlReg->match($url);
	}
	public function getControllerClass() {
		return $this->_controllerClass;
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
	function __toString() { return 'dia.server.url.ERegURLMapping'; }
}
