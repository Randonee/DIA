<?php

class haxe_rtti_Meta {
	public function __construct(){}
	static function getType($t) {
		$meta = haxe_rtti_Meta::getMeta($t);
		if($meta === null || _hx_field($meta, "obj") === null) {
			return _hx_anonymous(array());
		} else {
			return $meta->obj;
		}
	}
	static function getMeta($t) {
		return $t->__meta__;
	}
	static function getFields($t) {
		$meta = haxe_rtti_Meta::getMeta($t);
		if($meta === null || _hx_field($meta, "fields") === null) {
			return _hx_anonymous(array());
		} else {
			return $meta->fields;
		}
	}
	function __toString() { return 'haxe.rtti.Meta'; }
}
