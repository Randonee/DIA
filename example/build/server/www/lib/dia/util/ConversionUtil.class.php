<?php

class dia_util_ConversionUtil {
	public function __construct(){}
	static function toTransferObject($domainObject) {
		if(_hx_field($domainObject, "getDTO") !== null) {
			return $domainObject->getDTO();
		}
		if(dia_util_ObjectUtil::isIterable($domainObject)) {
			$arr = (new _hx_array(array()));
			$iterator = $domainObject->iterator();
			$__hx__it = $iterator;
			while($__hx__it->hasNext()) {
				unset($subObj);
				$subObj = $__hx__it->next();
				$arr->push(dia_util_ConversionUtil::toTransferObject($subObj));
			}
			return $arr;
		}
		if((is_object($_t = Type::getClass($domainObject)) && !($_t instanceof Enum) ? $_t === _hx_qtype("Date") : $_t == _hx_qtype("Date"))) {
			return _hx_anonymous(array("__type" => "Date", "data" => $domainObject->getTime()));
		}
		$topFieldType = Type::typeof($domainObject);
		if($topFieldType === ValueType::$TInt || $topFieldType === ValueType::$TFloat || $topFieldType === ValueType::$TBool || $topFieldType === ValueType::$TNull) {
			return $domainObject;
		}
		$type = Type::getClass($domainObject);
		$to = _hx_anonymous(array());
		$fields = null;
		if($type !== null) {
			$fields = Type::getInstanceFields($type);
			$to->__type = Type::getClassName($type);
		} else {
			$fields = Reflect::fields($domainObject);
		}
		{
			$_g = 0;
			while($_g < $fields->length) {
				$fieldName = $fields[$_g];
				++$_g;
				if($type !== null && dia_util_MetaUtil::getPropertyMeta($type, $fieldName, "dtSkip") !== null || _hx_char_at($fieldName, 0) === "_" || $fieldName === "serverId") {
					continue;
				}
				$fieldValue = Reflect::field($domainObject, $fieldName);
				$fieldType = Type::typeof($fieldValue);
				switch($fieldType->index) {
				case 4:case 6:case 1:case 2:case 3:case 0:{
					if($fieldValue !== null) {
						switch($fieldType->index) {
						case 4:case 6:{
							if(dia_util_ObjectUtil::isIterable($fieldValue)) {
								$arr1 = (new _hx_array(array()));
								$iterator1 = $fieldValue->iterator();
								$__hx__it = $iterator1;
								while($__hx__it->hasNext()) {
									unset($subObj1);
									$subObj1 = $__hx__it->next();
									$arr1->push(dia_util_ConversionUtil::toTransferObject($subObj1));
								}
								$to->{$fieldName} = $arr1;
							} else {
								$fieldClass = Type::getClass($fieldValue);
								$fieldTypeName = "";
								if($fieldClass !== null) {
									$fieldTypeName = Type::getClassName($fieldClass);
								}
								if($fieldTypeName === "String" || $fieldTypeName === "haxe.io.Bytes") {
									$value = dia_util_ConversionUtil::getPhpFieldValue($fieldValue);
									$to->{$fieldName} = $value;
								} else {
									$subObj2 = dia_util_ConversionUtil::toTransferObject($fieldValue);
									$to->{$fieldName} = $subObj2;
								}
							}
						}break;
						case 1:case 2:case 3:{
							$to->{$fieldName} = $fieldValue;
						}break;
						default:{}break;
						}
					}
				}break;
				default:{}break;
				}
				unset($fieldValue,$fieldType,$fieldName);
			}
		}
		return $to;
	}
	static function toDomainObject($object) {
		if(dia_util_ObjectUtil::isIterable($object)) {
			$collection = new _hx_array(array());
			$iterator = $object->iterator();
			$__hx__it = $iterator;
			while($__hx__it->hasNext()) {
				unset($subObj);
				$subObj = $__hx__it->next();
				$collection->push(dia_util_ConversionUtil::toDomainObject($subObj));
			}
			return $collection;
		}
		$topFieldType = Type::typeof($object);
		if($topFieldType === ValueType::$TInt || $topFieldType === ValueType::$TFloat || $topFieldType === ValueType::$TBool || $topFieldType === ValueType::$TNull) {
			return $object;
		}
		$domainObj = null;
		$type = null;
		$fields = null;
		if(_hx_has_field($object, "__type")) {
			if(_hx_equal($object->__type, "Date")) {
				return Date::fromTime($object->data);
			}
			$type = Type::resolveClass($object->__type);
			$domainObj = Type::createInstance($type, (new _hx_array(array())));
			$fields = Type::getInstanceFields($type);
		} else {
			$domainObj = _hx_anonymous(array());
			$fields = Reflect::fields($object);
		}
		{
			$_g = 0;
			while($_g < $fields->length) {
				$fieldName = $fields[$_g];
				++$_g;
				if($type !== null && dia_util_MetaUtil::getPropertyMeta($type, $fieldName, "dtSkip") !== null || _hx_char_at($fieldName, 0) === "_") {
					continue;
				}
				$fieldValue = Reflect::getProperty($object, $fieldName);
				$fieldType = Type::typeof($fieldValue);
				switch($fieldType->index) {
				case 4:case 6:case 1:case 2:case 3:case 0:{
					if($fieldValue !== null) {
						switch($fieldType->index) {
						case 4:case 6:{
							if(dia_util_ObjectUtil::isIterable($fieldValue)) {
								$collection1 = new _hx_array(array());
								$iterator1 = $fieldValue->iterator();
								$__hx__it = $iterator1;
								while($__hx__it->hasNext()) {
									unset($subObj1);
									$subObj1 = $__hx__it->next();
									$collection1->push(dia_util_ConversionUtil::toDomainObject($subObj1));
								}
								$domainObj->{$fieldName} = $collection1;
							} else {
								$fieldClass = Type::getClass($fieldValue);
								$fieldTypeName = "";
								if($fieldClass !== null) {
									$fieldTypeName = Type::getClassName($fieldClass);
								}
								if($fieldTypeName === "String") {
									$value = dia_util_ConversionUtil::getPhpFieldValue($fieldValue);
									$domainObj->{$fieldName} = $value;
								} else {
									$subObj2 = dia_util_ConversionUtil::toDomainObject($fieldValue);
									$domainObj->{$fieldName} = $subObj2;
								}
							}
						}break;
						case 1:case 2:case 3:{
							$domainObj->{$fieldName} = $fieldValue;
						}break;
						default:{}break;
						}
					}
				}break;
				default:{}break;
				}
				unset($fieldValue,$fieldType,$fieldName);
			}
		}
		return $domainObj;
	}
	static function getClassNameWithoutPath($type) {
		$name = Type::getClassName($type);
		return _hx_explode(".", $name)->pop();
	}
	static function getPhpFieldValue($obj) {
		if($obj === null) {
			return null;
		}
		if(_hx_has_field($obj, "b") && _hx_has_field($obj, "length")) {
			return $obj->b;
		}
		return $obj;
	}
	function __toString() { return 'dia.util.ConversionUtil'; }
}
