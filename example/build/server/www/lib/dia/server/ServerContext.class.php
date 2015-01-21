<?php

class dia_server_ServerContext {
	public function __construct() {
		if(!php_Boot::$skip_constructor) {
		$this->injector = new minject_Injector();
		$this->injector->mapValue(_hx_qtype("minject.Injector"), $this->injector, null);
		$this->_urlMappings = new _hx_array(array());
		$this->init();
	}}
	public $injector;
	public $_urlMappings;
	public function init() {
	}
	public function addURLMapping($urlReg, $controllerClass, $preconditions = null) {
		if($preconditions === null) {
			$preconditions = (new _hx_array(array()));
		}
		$this->_urlMappings->push(new dia_server_url_ERegURLMapping($urlReg, $controllerClass, $preconditions));
	}
	public function dispatchURL($url) {
		$url = $this->appendSlash($url);
		{
			$_g = 0;
			$_g1 = $this->_urlMappings;
			while($_g < $_g1->length) {
				$urlMapping = $_g1[$_g];
				++$_g;
				if($urlMapping->resolve($url)) {
					{
						$_g2 = 0;
						$_g3 = $urlMapping->preconditions;
						while($_g2 < $_g3->length) {
							$preconditionClass = $_g3[$_g2];
							++$_g2;
							$precondition = $this->injector->instantiate($preconditionClass);
							if(!$precondition->canHandle($url)) {
								$failController = $precondition->get_failController();
								$controller = $this->injector->instantiate($precondition->get_failController());
								$controller->handleRequest();
								return;
								unset($failController,$controller);
							}
							unset($preconditionClass,$precondition);
						}
						unset($_g3,$_g2);
					}
					$controller1 = $this->injector->instantiate($urlMapping->getControllerClass());
					$controller1->handleRequest();
					return;
					unset($controller1);
				}
				unset($urlMapping);
			}
		}
	}
	public function appendSlash($url) {
		if(_hx_char_at($url, strlen($url) - 1) !== "/") {
			$url .= "/";
		}
		return $url;
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
	function __toString() { return 'dia.server.ServerContext'; }
}
