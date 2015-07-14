<?php

class mcore_exception_Exception {
	public function __construct($message = null, $cause = null, $info = null) {
		if(!php_Boot::$skip_constructor) {
		if($message === null) {
			$message = "";
		}
		$this->name = Type::getClassName(Type::getClass($this));
		$this->message = $message;
		$this->cause = $cause;
		$this->info = $info;
	}}
	public $name;
	public function get_name() {
		return $this->name;
	}
	public $message;
	public function get_message() {
		return $this->message;
	}
	public $cause;
	public $info;
	public function toString() {
		$str = _hx_string_or_null($this->get_name()) . ": " . _hx_string_or_null($this->get_message());
		if(_hx_field($this, "info") !== null) {
			$str .= " at " . _hx_string_or_null($this->info->className) . "#" . _hx_string_or_null($this->info->methodName) . " (" . _hx_string_rec($this->info->lineNumber, "") . ")";
		}
		if(_hx_field($this, "cause") !== null) {
			$str .= "\x0A\x09 Caused by: " . _hx_string_or_null(mcore_exception_Exception::getStackTrace($this->cause));
		}
		return $str;
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
	static function getStackTrace($source) {
		$s = "";
		if($s !== "") {
			return $s;
		}
		$stack = haxe_CallStack::exceptionStack();
		while($stack->length > 0) {
			{
				$_g = $stack->shift();
				if($_g !== null) {
					switch($_g->index) {
					case 2:{
						$line = _hx_deref($_g)->params[2];
						$file = _hx_deref($_g)->params[1];
						$s .= "\x09at " . _hx_string_or_null($file) . " (" . _hx_string_rec($line, "") . ")\x0A";
					}break;
					case 3:{
						$method = _hx_deref($_g)->params[1];
						$classname = _hx_deref($_g)->params[0];
						$s .= "\x09at " . _hx_string_or_null($classname) . "#" . _hx_string_or_null($method) . "\x0A";
					}break;
					default:{}break;
					}
				} else {}
				unset($_g);
			}
		}
		return $s;
	}
	static $__properties__ = array("get_message" => "get_message","get_name" => "get_name");
	function __toString() { return $this->toString(); }
}
