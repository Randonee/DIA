<?php

class note_server_controller_view_NotFoundController extends dia_server_Controller {
	public function __construct() {
		if(!php_Boot::$skip_constructor) {
		parent::__construct();
	}}
	public $settings;
	public function handleRequest() {
		php_Web::setReturnCode(404);
		php_Lib::println("Oops. Something your looking for is not here. Maybe url is wrong?");
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
	function __toString() { return 'note.server.controller.view.NotFoundController'; }
}
note_server_controller_view_NotFoundController::$__meta__ = _hx_anonymous(array("fields" => _hx_anonymous(array("settings" => _hx_anonymous(array("name" => (new _hx_array(array("settings"))), "type" => (new _hx_array(array("dia.util.Settings"))), "inject" => null))))));
