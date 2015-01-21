<?php

class mcore_util_Arrays {
	public function __construct(){}
	static function toString($source) {
		return $source->join(",");
	}
	static function shuffle($source) {
		$copy = $source->copy();
		$shuffled = (new _hx_array(array()));
		while($copy->length > 0) {
			$shuffled->push(_hx_array_get($copy->splice(Std::random($copy->length), 1), 0));
		}
		return $shuffled;
	}
	static function lastItem($source) {
		return $source[$source->length - 1];
	}
	function __toString() { return 'mcore.util.Arrays'; }
}
