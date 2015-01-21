<?php

class dia_util_MetaUtil {
	public function __construct(){}
	static function getPropertyMeta($type, $propName, $metaName) {
		if($type === null) {
			return null;
		}
		$metaDatas = (new _hx_array(array()));
		$fields = (new _hx_array(array()));
		do {
			$m = haxe_rtti_Meta::getFields($type);
			$metaDatas->push($m);
			$fields = $fields->concat(Reflect::fields($m));
			$type = Type::getSuperClass($type);
			unset($m);
		} while($type !== null);
		{
			$_g = 0;
			while($_g < $fields->length) {
				$fieldName = $fields[$_g];
				++$_g;
				if($fieldName === $propName) {
					$_g1 = 0;
					while($_g1 < $metaDatas->length) {
						$m1 = $metaDatas[$_g1];
						++$_g1;
						$data = Reflect::field($m1, $fieldName);
						if($data !== null) {
							return $data;
						}
						unset($m1,$data);
					}
					unset($_g1);
				}
				unset($fieldName);
			}
		}
		return null;
	}
	function __toString() { return 'dia.util.MetaUtil'; }
}
