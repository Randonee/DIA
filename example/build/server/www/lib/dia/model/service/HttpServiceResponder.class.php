<?php

class dia_model_service_HttpServiceResponder extends dia_model_service_ServiceResponder {
	public function __construct($completeHandler = null, $failHandler = null) {
		if(!php_Boot::$skip_constructor) {
		parent::__construct($completeHandler,$failHandler);
		$this->error = _hx_anonymous(array("code" => 0, "message" => ""));
		$this->init();
	}}
	public $request;
	public function init() {
		$params = php_Web::getParams();
		if($params->exists("data")) {
			$this->request = dia_util_ConversionUtil::toDomainObject(dia_model_service_HttpServiceResponder_0($this, $params));
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
	function __toString() { return 'dia.model.service.HttpServiceResponder'; }
}
function dia_model_service_HttpServiceResponder_0(&$__hx__this, &$params) {
	{
		$text = null;
		{
			$s = null;
			{
				$this1 = php_Web::getParams();
				$s = $this1->get("data");
			}
			$text = htmlspecialchars_decode($s, ENT_QUOTES);
		}
		return haxe_Json::phpJsonDecode($text);
	}
}
