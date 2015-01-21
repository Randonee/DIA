<?php

class minject_result_InjectionResult {
	public function __construct() { 
	}
	public function getResponse($injector) {
		return null;
	}
	function __toString() { return 'minject.result.InjectionResult'; }
}
