<?php

class minject_point_InjectionPoint {
	public function __construct($meta, $injector) { if(!php_Boot::$skip_constructor) {
		$this->initializeInjection($meta);
	}}
	public function applyInjection($target, $injector) {
		return $target;
	}
	public function initializeInjection($meta) {}
	function __toString() { return 'minject.point.InjectionPoint'; }
}
