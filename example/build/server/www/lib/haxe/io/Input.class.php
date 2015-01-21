<?php

class haxe_io_Input {
	public function __construct(){}
	public function readByte() {
		throw new HException("Not implemented");
	}
	public function readBytes($s, $pos, $len) {
		$k = $len;
		$b = $s->b;
		if($pos < 0 || $len < 0 || $pos + $len > $s->length) {
			throw new HException(haxe_io_Error::$OutsideBounds);
		}
		while($k > 0) {
			$b[$pos] = chr($this->readByte());
			$pos++;
			$k--;
		}
		return $len;
	}
	public function close() {
	}
	function __toString() { return 'haxe.io.Input'; }
}
