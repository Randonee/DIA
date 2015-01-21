<?php

class dia_util_ObjectUtil {
	public function __construct(){}
	static $UID_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	static function deepCopy($v) {
		if(!Reflect::isObject($v)) {
			return $v;
		} else {
			if(Std::is($v, _hx_qtype("Array"))) {
				$r = Type::createInstance(Type::getClass($v), (new _hx_array(array())));
				{
					$_g1 = 0;
					$_g = $v->length;
					while($_g1 < $_g) {
						$ii = $_g1++;
						$r->push(dia_util_ObjectUtil::deepCopy($v[$ii]));
						unset($ii);
					}
				}
				return $r;
			} else {
				if(Type::getClass($v) === null) {
					$obj = _hx_anonymous(array());
					{
						$_g2 = 0;
						$_g11 = Reflect::fields($v);
						while($_g2 < $_g11->length) {
							$ff = $_g11[$_g2];
							++$_g2;
							$value = dia_util_ObjectUtil::deepCopy(Reflect::field($v, $ff));
							$obj->{$ff} = $value;
							unset($value,$ff);
						}
					}
					return $obj;
				} else {
					$obj1 = Type::createEmptyInstance(Type::getClass($v));
					{
						$_g3 = 0;
						$_g12 = Reflect::fields($v);
						while($_g3 < $_g12->length) {
							$ff1 = $_g12[$_g3];
							++$_g3;
							$value1 = dia_util_ObjectUtil::deepCopy(Reflect::field($v, $ff1));
							$obj1->{$ff1} = $value1;
							unset($value1,$ff1);
						}
					}
					return $obj1;
				}
			}
		}
		return null;
	}
	static function createID($size = null) {
		if($size === null) {
			$size = 32;
		}
		$nchars = strlen(dia_util_ObjectUtil::$UID_CHARS);
		$uid = new StringBuf();
		{
			$_g = 0;
			while($_g < $size) {
				$i = $_g++;
				{
					$c = _hx_char_code_at(dia_util_ObjectUtil::$UID_CHARS, Std::random($nchars));
					$uid->b .= _hx_string_or_null(chr($c));
					unset($c);
				}
				unset($i);
			}
		}
		return $uid->b;
	}
	static function getPhpString($obj) {
		try {
			if($obj === null) {
				return "";
			}
			if(_hx_field($obj, "b") !== null) {
				return $obj->b;
			}
			return $obj;
		}catch(Exception $__hx__e) {
			$_ex_ = ($__hx__e instanceof HException) ? $__hx__e->e : $__hx__e;
			if(is_string($error = $_ex_)){
			} else throw $__hx__e;;
		}
		return "";
	}
	static function isIterable($value) {
		if($value === null) {
			return false;
		}
		$fieldClass = Type::getClass($value);
		if($fieldClass !== null) {
			$fieldTypeName = Type::getClassName($fieldClass);
			if($fieldTypeName === "String") {
				return false;
			}
		}
		$field = Reflect::field($value, "iterator");
		if($field !== null && Reflect::isFunction($field)) {
			return true;
		}
		$field = Reflect::field($value, "hasNext");
		if($field !== null && Reflect::isFunction($field)) {
			$field = Reflect::field($value, "next");
			if($field !== null && Reflect::isFunction($field)) {
				return true;
			}
		}
		$fieldClass1 = Type::getClass($value);
		$fieldTypeName1 = "";
		if($fieldClass1 !== null) {
			$fieldTypeName1 = Type::getClassName($fieldClass1);
		}
		if($fieldTypeName1 === "Array") {
			return true;
		}
		return false;
	}
	static function updateFromData($from, $to, $excludeFields = null) {
		if($excludeFields === null) {
			$excludeFields = (new _hx_array(array()));
		} else {
			$excludeFields = $excludeFields;
		}
		$excludeFields->push("uid");
		$man = Reflect::field(Type::getClass($to), "manager");
		$info = $man->dbInfos();
		{
			$_g = 0;
			$_g1 = $info->fields;
			while($_g < $_g1->length) {
				$field = $_g1[$_g];
				++$_g;
				if(!Lambda::has($excludeFields, $field->name)) {
					if(_hx_has_field($from, $field->name)) {
						Reflect::setProperty($to, $field->name, Reflect::field($from, $field->name));
					}
				}
				unset($field);
			}
		}
	}
	function __toString() { return 'dia.util.ObjectUtil'; }
}
