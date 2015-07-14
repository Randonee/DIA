<?php

class php_Web {
	public function __construct(){}
	static function getParams() {
		$a = array_merge($_GET, $_POST);
		if(get_magic_quotes_gpc()) {
			reset($a); while(list($k, $v) = each($a)) $a[$k] = stripslashes((string)$v);
		}
		return php_Lib::hashOfAssociativeArray($a);
	}
	static function getURI() {
		$s = $_SERVER['REQUEST_URI'];
		return _hx_array_get(_hx_explode("?", $s), 0);
	}
	static function setReturnCode($r) {
		$code = null;
		switch($r) {
		case 100:{
			$code = "100 Continue";
		}break;
		case 101:{
			$code = "101 Switching Protocols";
		}break;
		case 200:{
			$code = "200 OK";
		}break;
		case 201:{
			$code = "201 Created";
		}break;
		case 202:{
			$code = "202 Accepted";
		}break;
		case 203:{
			$code = "203 Non-Authoritative Information";
		}break;
		case 204:{
			$code = "204 No Content";
		}break;
		case 205:{
			$code = "205 Reset Content";
		}break;
		case 206:{
			$code = "206 Partial Content";
		}break;
		case 300:{
			$code = "300 Multiple Choices";
		}break;
		case 301:{
			$code = "301 Moved Permanently";
		}break;
		case 302:{
			$code = "302 Found";
		}break;
		case 303:{
			$code = "303 See Other";
		}break;
		case 304:{
			$code = "304 Not Modified";
		}break;
		case 305:{
			$code = "305 Use Proxy";
		}break;
		case 307:{
			$code = "307 Temporary Redirect";
		}break;
		case 400:{
			$code = "400 Bad Request";
		}break;
		case 401:{
			$code = "401 Unauthorized";
		}break;
		case 402:{
			$code = "402 Payment Required";
		}break;
		case 403:{
			$code = "403 Forbidden";
		}break;
		case 404:{
			$code = "404 Not Found";
		}break;
		case 405:{
			$code = "405 Method Not Allowed";
		}break;
		case 406:{
			$code = "406 Not Acceptable";
		}break;
		case 407:{
			$code = "407 Proxy Authentication Required";
		}break;
		case 408:{
			$code = "408 Request Timeout";
		}break;
		case 409:{
			$code = "409 Conflict";
		}break;
		case 410:{
			$code = "410 Gone";
		}break;
		case 411:{
			$code = "411 Length Required";
		}break;
		case 412:{
			$code = "412 Precondition Failed";
		}break;
		case 413:{
			$code = "413 Request Entity Too Large";
		}break;
		case 414:{
			$code = "414 Request-URI Too Long";
		}break;
		case 415:{
			$code = "415 Unsupported Media Type";
		}break;
		case 416:{
			$code = "416 Requested Range Not Satisfiable";
		}break;
		case 417:{
			$code = "417 Expectation Failed";
		}break;
		case 500:{
			$code = "500 Internal Server Error";
		}break;
		case 501:{
			$code = "501 Not Implemented";
		}break;
		case 502:{
			$code = "502 Bad Gateway";
		}break;
		case 503:{
			$code = "503 Service Unavailable";
		}break;
		case 504:{
			$code = "504 Gateway Timeout";
		}break;
		case 505:{
			$code = "505 HTTP Version Not Supported";
		}break;
		default:{
			$code = Std::string($r);
		}break;
		}
		header("HTTP/1.1 " . _hx_string_or_null($code), true, $r);
	}
	static function getMethod() {
		if(isset($_SERVER['REQUEST_METHOD'])) {
			return $_SERVER['REQUEST_METHOD'];
		} else {
			return null;
		}
	}
	static $isModNeko;
	function __toString() { return 'php.Web'; }
}
php_Web::$isModNeko = !php_Lib::isCli();
