<?php

class note_server_controller_api_NoteAPIController extends dia_server_Controller {
	public function __construct() {
		if(!php_Boot::$skip_constructor) {
		parent::__construct();
	}}
	public $settings;
	public function handleRequest() {
		$_g = $this;
		$uri = php_Web::getURI();
		$method = null;
		$params = php_Web::getParams();
		if($params->exists("method")) {
			$method = strtoupper($params->get("method"));
		} else {
			$method = strtoupper(php_Web::getMethod());
		}
		switch($method) {
		case "GET":{}break;
		case "POST":{
			$complete = array(new _hx_lambda(array(&$_g, &$method, &$params, &$uri), "note_server_controller_api_NoteAPIController_0"), 'execute');
			$fail = array(new _hx_lambda(array(&$_g, &$complete, &$method, &$params, &$uri), "note_server_controller_api_NoteAPIController_1"), 'execute');
			$responder2 = new note_model_service_note_AddNoteResponder($complete, $fail);
			$responder2->handle();
		}break;
		case "PUT":{
			$complete1 = array(new _hx_lambda(array(&$_g, &$method, &$params, &$uri), "note_server_controller_api_NoteAPIController_2"), 'execute');
			$fail1 = array(new _hx_lambda(array(&$_g, &$complete1, &$method, &$params, &$uri), "note_server_controller_api_NoteAPIController_3"), 'execute');
			$responder5 = new note_model_service_note_UpdateNoteResponder($complete1, $fail1);
			$responder5->handle();
		}break;
		case "DELETE":{
			$complete2 = array(new _hx_lambda(array(&$_g, &$method, &$params, &$uri), "note_server_controller_api_NoteAPIController_4"), 'execute');
			$fail2 = array(new _hx_lambda(array(&$_g, &$complete2, &$method, &$params, &$uri), "note_server_controller_api_NoteAPIController_5"), 'execute');
			$responder8 = new note_model_service_note_DeleteNoteResponder($complete2, $fail2);
			$responder8->handle();
		}break;
		default:{
			php_Web::setReturnCode(401);
		}break;
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
	function __toString() { return 'note.server.controller.api.NoteAPIController'; }
}
note_server_controller_api_NoteAPIController::$__meta__ = _hx_anonymous(array("fields" => _hx_anonymous(array("settings" => _hx_anonymous(array("name" => (new _hx_array(array("settings"))), "type" => (new _hx_array(array("dia.util.Settings"))), "inject" => null))))));
function note_server_controller_api_NoteAPIController_0(&$_g, &$method, &$params, &$uri, $responder) {
	{
		$_g->respond($responder->response);
	}
}
function note_server_controller_api_NoteAPIController_1(&$_g, &$complete, &$method, &$params, &$uri, $responder1) {
	{
		$_g->fail($responder1->error->code, $responder1->error->message, null);
	}
}
function note_server_controller_api_NoteAPIController_2(&$_g, &$method, &$params, &$uri, $responder3) {
	{
		$_g->respond($responder3->response);
	}
}
function note_server_controller_api_NoteAPIController_3(&$_g, &$complete1, &$method, &$params, &$uri, $responder4) {
	{
		$_g->fail($responder4->error->code, $responder4->error->message, null);
	}
}
function note_server_controller_api_NoteAPIController_4(&$_g, &$method, &$params, &$uri, $responder6) {
	{
		$_g->respond($responder6->response);
	}
}
function note_server_controller_api_NoteAPIController_5(&$_g, &$complete2, &$method, &$params, &$uri, $responder7) {
	{
		$_g->fail($responder7->error->code, $responder7->error->message, null);
	}
}
