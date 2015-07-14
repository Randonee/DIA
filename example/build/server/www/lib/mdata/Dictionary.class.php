<?php

class mdata_Dictionary {
	public function __construct($weakKeys = null) {
		if(!php_Boot::$skip_constructor) {
		if($weakKeys === null) {
			$weakKeys = false;
		}
		$this->weakKeys = $weakKeys;
		$this->clear();
	}}
	public $_keys;
	public $_values;
	public $weakKeys;
	public function set($key, $value) {
		{
			$_g1 = 0;
			$_g = $this->_keys->length;
			while($_g1 < $_g) {
				$i = $_g1++;
				if((is_object($_t = $this->_keys[$i]) && !($_t instanceof Enum) ? $_t === $key : $_t == $key)) {
					$this->_keys[$i] = $key;
					$this->_values[$i] = $value;
					return;
				}
				unset($i,$_t);
			}
		}
		$this->_keys->push($key);
		$this->_values->push($value);
	}
	public function get($key) {
		{
			$_g1 = 0;
			$_g = $this->_keys->length;
			while($_g1 < $_g) {
				$i = $_g1++;
				if((is_object($_t = $this->_keys[$i]) && !($_t instanceof Enum) ? $_t === $key : $_t == $key)) {
					return $this->_values[$i];
				}
				unset($i,$_t);
			}
		}
		return null;
	}
	public function remove($key) {
		{
			$_g1 = 0;
			$_g = $this->_keys->length;
			while($_g1 < $_g) {
				$i = $_g1++;
				if((is_object($_t = $this->_keys[$i]) && !($_t instanceof Enum) ? $_t === $key : $_t == $key)) {
					$this->_keys->splice($i, 1);
					$this->_values->splice($i, 1);
					return true;
				}
				unset($i,$_t);
			}
		}
		return false;
	}
	public function delete($key) {
		$this->remove($key);
	}
	public function exists($key) {
		{
			$_g = 0;
			$_g1 = $this->_keys;
			while($_g < $_g1->length) {
				$k = $_g1[$_g];
				++$_g;
				if((is_object($_t = $k) && !($_t instanceof Enum) ? $_t === $key : $_t == $key)) {
					return true;
				}
				unset($k,$_t);
			}
		}
		return false;
	}
	public function clear() {
		$this->_keys = (new _hx_array(array()));
		$this->_values = (new _hx_array(array()));
	}
	public function keys() {
		return $this->_keys->iterator();
	}
	public function iterator() {
		return $this->_values->iterator();
	}
	public function toString() {
		$s = "{";
		if(null == $this) throw new HException('null iterable');
		$__hx__it = $this->keys();
		while($__hx__it->hasNext()) {
			unset($key);
			$key = $__hx__it->next();
			$value = $this->get($key);
			$k = null;
			if(Std::is($key, _hx_qtype("Array"))) {
				$k = "[" . _hx_string_or_null($key->join(",")) . "]";
			} else {
				$k = Std::string($key);
			}
			$v = null;
			if(Std::is($value, _hx_qtype("Array"))) {
				$v = "[" . _hx_string_or_null($value->join(",")) . "]";
			} else {
				$v = Std::string($value);
			}
			$s .= _hx_string_or_null($k) . " => " . _hx_string_or_null($v) . ", ";
			unset($value,$v,$k);
		}
		if(strlen($s) > 2) {
			$s = _hx_substr($s, 0, strlen($s) - 2);
		}
		return _hx_string_or_null($s) . "}";
	}
	public function __call($m, $a) {
		if(isset($this->$m) && is_callable($this->$m))
			return call_user_func_array($this->$m, $a);
		else if(isset($this->__dynamics[$m]) && is_callable($this->__dynamics[$m]))
			return call_user_func_array($this->__dynamics[$m], $a);
		else if('toString' == $m)
			return $this->__toString();
		else
			throw new HException('Unable to call <'.$m.'>');
	}
	function __toString() { return $this->toString(); }
}
