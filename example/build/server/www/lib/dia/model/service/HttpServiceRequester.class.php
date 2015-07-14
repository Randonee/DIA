<?php

class dia_model_service_HttpServiceRequester extends dia_model_service_ServiceRequester {
	public function __construct($url = null, $completeHandler = null, $failHandler = null, $method = null) {
		if(!php_Boot::$skip_constructor) {
		if($method === null) {
			$method = "GET";
		}
		if($url === null) {
			$url = "";
		}
		parent::__construct($completeHandler,$failHandler);
		$this->status = -1;
		$this->url = $url;
		$this->http = new haxe_Http($url);
		$this->method = strtoupper($method);
	}}
	public $url;
	public $data;
	public $http;
	public $method;
	public $status;
	public function setHeader($name, $value) {
		$this->http->setHeader($name, $value);
	}
	public function call($request) {
		if(dia_model_service_HttpServiceRequester::$GLOBAL_HEADERS !== null) {
			$_g = 0;
			$_g1 = dia_model_service_HttpServiceRequester::$GLOBAL_HEADERS;
			while($_g < $_g1->length) {
				$header = $_g1[$_g];
				++$_g;
				$this->http->setHeader($header->name, $header->value);
				unset($header);
			}
		}
		$this->http->onStatus = (isset($this->onStatus) ? $this->onStatus: array($this, "onStatus"));
		$this->http->onData = (isset($this->onComplete) ? $this->onComplete: array($this, "onComplete"));
		$this->http->onError = (isset($this->onError) ? $this->onError: array($this, "onError"));
		$this->http->setParameter("data", StringTools::htmlEscape(dia_model_service_HttpServiceRequester_0($this, $request), null));
		$this->http->setParameter("method", $this->method);
		if($this->method === "POST" || $this->method === "PUT" || $this->method === "DELETE") {
			$this->http->request(true);
		} else {
			$this->http->request(false);
		}
	}
	public function onStatus($status) {
		$this->status = $status;
	}
	public function onComplete($jsonData) {
		$this->data = $jsonData;
		try {
			$this->response = dia_util_ConversionUtil::toDomainObject(haxe_Json::phpJsonDecode($jsonData));
		}catch(Exception $__hx__e) {
			$_ex_ = ($__hx__e instanceof HException) ? $__hx__e->e : $__hx__e;
			$error = $_ex_;
			{}
		}
		$this->finishSuccess();
	}
	public function onError($error) {
		$this->error = $error;
		$this->finishFail();
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
	static $GLOBAL_HEADERS;
	static function addGlobalheader($name, $value) {
		if(dia_model_service_HttpServiceRequester::$GLOBAL_HEADERS === null) {
			dia_model_service_HttpServiceRequester::$GLOBAL_HEADERS = (new _hx_array(array()));
		}
		dia_model_service_HttpServiceRequester::$GLOBAL_HEADERS->push(_hx_anonymous(array("name" => $name, "value" => $value)));
	}
	function __toString() { return 'dia.model.service.HttpServiceRequester'; }
}
function dia_model_service_HttpServiceRequester_0(&$__hx__this, &$request) {
	{
		$value = dia_util_ConversionUtil::toTransferObject($request);
		return haxe_Json::phpJsonEncode($value, null, null);
	}
}
