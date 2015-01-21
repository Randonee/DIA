<?php

class minject_point_ConstructorInjectionPoint extends minject_point_MethodInjectionPoint {
	public function __construct($meta, $forClass, $injector = null) { if(!php_Boot::$skip_constructor) {
		parent::__construct($meta,$injector);
	}}
	public function applyInjection($target, $injector) {
		$ofClass = $target;
		$withArgs = $this->gatherParameterValues($target, $injector);
		return mcore_util_Types::createInstance($ofClass, $withArgs);
	}
	public function initializeInjection($meta) {
		$this->methodName = "new";
		$this->gatherParameters($meta);
	}
	function __toString() { return 'minject.point.ConstructorInjectionPoint'; }
}
