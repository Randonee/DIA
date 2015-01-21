<?php

class minject_point_PostConstructInjectionPoint extends minject_point_InjectionPoint {
	public function __construct($meta, $injector = null) {
		if(!php_Boot::$skip_constructor) {
		$this->order = 0;
		parent::__construct($meta,$injector);
	}}
	public $order;
	public $methodName;
	public function applyInjection($target, $injector) {
		mcore_util_Reflection::callMethod($target, Reflect::field($target, $this->methodName), (new _hx_array(array())));
		return $target;
	}
	public function initializeInjection($meta) {
		$this->methodName = $meta->name[0];
		if(_hx_field($meta, "post") !== null) {
			$this->order = $meta->post[0];
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
	function __toString() { return 'minject.point.PostConstructInjectionPoint'; }
}
