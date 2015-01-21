<?php

class dia_util_CollectionUtil {
	public function __construct(){}
	static function update($collection, $obj) {
		$_g1 = 0;
		$_g = $collection->length;
		while($_g1 < $_g) {
			$a = $_g1++;
			if(_hx_array_get($collection, $a)->uid === $obj->uid) {
				$collection[$a] = $obj;
			}
			unset($a);
		}
	}
	static function insertAt($collection, $obj, $index) {
		if($index < 0 || $index > $collection->length) {
			throw new HException("index is out of range");
		}
		if($index === $collection->length) {
			$collection->push($obj);
		} else {
			if($index === 0) {
				$collection->unshift($obj);
			} else {
				$temp = $collection->slice(0, $index - 1);
				$temp->push($obj);
				$collection = $temp->concat($collection->slice($index, null));
			}
		}
	}
	static function getById($collection, $uid) {
		{
			$_g = 0;
			while($_g < $collection->length) {
				$obj = $collection[$_g];
				++$_g;
				if($obj->uid === $uid) {
					return $obj;
				}
				unset($obj);
			}
		}
		return null;
	}
	static function getIndexById($collection, $uid) {
		{
			$_g1 = 0;
			$_g = $collection->length;
			while($_g1 < $_g) {
				$a = $_g1++;
				$obj = $collection[$a];
				if($obj->uid === $uid) {
					return $a;
				}
				unset($obj,$a);
			}
		}
		return -1;
	}
	static function removeById($collection, $uid) {
		$obj = dia_util_CollectionUtil::getById($collection, $uid);
		$index = dia_util_CollectionUtil::getIndexById($collection, $uid);
		if($index >= 0) {
			dia_util_CollectionUtil::removeItemAt($collection, $index);
		}
		return $obj;
	}
	static function removeItemAt($collection, $index) {
		if($index < 0 || $index >= $collection->length) {
			throw new HException("Index is out of range");
		}
		$obj = _hx_array_get($collection->splice($index, 1), 0);
		return $obj;
	}
	static function swap($collection, $objA, $objB) {
		$indexA = dia_util_CollectionUtil::getIndexById($collection, $objA->uid);
		$indexB = dia_util_CollectionUtil::getIndexById($collection, $objB->uid);
		if($indexA === -1 || $indexB === -1) {
			return false;
		}
		$temp = $collection[$indexA];
		$collection[$indexA] = $collection[$indexB];
		$collection[$indexB] = $temp;
		return true;
	}
	function __toString() { return 'dia.util.CollectionUtil'; }
}
