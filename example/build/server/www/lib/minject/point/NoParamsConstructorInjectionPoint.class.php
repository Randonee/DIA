<?php

class minject_point_NoParamsConstructorInjectionPoint extends minject_point_InjectionPoint {
	public function __construct() { if(!php_Boot::$skip_constructor) {
		parent::__construct(null,null);
	}}
	public function applyInjection($target, $injector) {
		return mcore_util_Types::createInstance($target, (new _hx_array(array())));
	}
	function __toString() { return 'minject.point.NoParamsConstructorInjectionPoint'; }
}
