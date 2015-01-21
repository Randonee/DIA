<?php

class dia_util_UriUtil {
	public function __construct(){}
	static function getId($uri) {
		$index = _hx_last_index_of($uri, "/", null);
		if($index < 0) {
			return -1;
		}
		$uri = _hx_substr($uri, $index + 1, null);
		$eReg = new EReg("^\\d+", "");
		if($eReg->matchSub($uri, 0, null)) {
			return Std::parseInt($eReg->matched(0));
		}
		return -1;
	}
	function __toString() { return 'dia.util.UriUtil'; }
}
