<?php

class dia_server_Controller {
	public function __construct() {}
	public $injector;
	public function handleRequest() {}
	public function fail($code, $message = null, $errorResponse = null) {
		if(!php_Boot::$skip_constructor) {
		if($message !== null) {
			header("Message" . ": " . _hx_string_or_null($message));
		}
		if($errorResponse !== null) {
			php_Lib::hprint(dia_server_Controller_0($this, $code, $errorResponse, $message));
		}
		php_Web::setReturnCode($code);
	}}
	public function respond($response) {
		if($response !== null) {
			php_Lib::hprint(dia_server_Controller_1($this, $response));
		}
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
	static function __meta__() { $args = func_get_args(); return call_user_func_array(self::$__meta__, $args); }
	static $__meta__;
	function __toString() { return 'dia.server.Controller'; }
}
dia_server_Controller::$__meta__ = _hx_anonymous(array("fields" => _hx_anonymous(array("injector" => _hx_anonymous(array("name" => (new _hx_array(array("injector"))), "type" => (new _hx_array(array("minject.Injector"))), "inject" => null))))));
function dia_server_Controller_0(&$__hx__this, &$code, &$errorResponse, &$message) {
	{
		$value = dia_util_ConversionUtil::toTransferObject($errorResponse);
		return haxe_Json::phpJsonEncode($value, null, null);
	}
}
function dia_server_Controller_1(&$__hx__this, &$response) {
	{
		$value = dia_util_ConversionUtil::toTransferObject($response);
		return haxe_Json::phpJsonEncode($value, null, null);
	}
}
