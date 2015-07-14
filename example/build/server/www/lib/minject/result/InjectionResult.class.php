<?php

class minject_result_InjectionResult {
	public function __construct() {}
	public function getResponse($injector) { if(!php_Boot::$skip_constructor) {
		return null;
	}}
	function __toString() { return 'minject.result.InjectionResult'; }
}
