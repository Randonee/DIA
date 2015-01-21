<?php

class note_server_controller_view_ViewControllerBase extends dia_server_Controller {
	public function __construct() {
		if(!php_Boot::$skip_constructor) {
		$this->templateVars = _hx_anonymous(array());
		$this->htmlTemplate = "res/note/server/controller/view/html.mtt";
		$this->addCore = true;
		$this->cssFiles = (new _hx_array(array()));
		$this->jsFiles = (new _hx_array(array()));
		$this->coreJSFiles = (new _hx_array(array()));
		$this->statics = (new _hx_array(array()));
		parent::__construct();
	}}
	public $settings;
	public $viewClass;
	public $cssFiles;
	public $jsFiles;
	public $coreJSFiles;
	public $statics;
	public $addCore;
	public $htmlTemplate;
	public $templateVars;
	public function showView($viewClass, $initialData) {
		$this->jsFiles->push("script/jquery.js");
		if($this->addCore) {
			$this->jsFiles->push("script/setup.js");
			$this->jsFiles->push("script/script.js");
		}
		$this->jsFiles = $this->jsFiles->concat($this->coreJSFiles);
		$this->jsFiles = $this->jsFiles->concat($this->statics);
		$this->jsFiles->push("script/statics.js");
		$base = $this->settings->get("server.baseURL")->value;
		$jsIncludes = "";
		{
			$_g = 0;
			$_g1 = $this->jsFiles;
			while($_g < $_g1->length) {
				$file = $_g1[$_g];
				++$_g;
				$jsIncludes .= "<script type=\"text/javascript\" src=\"" . _hx_string_or_null($base) . _hx_string_or_null($file) . "\" ></script>\x0A";
				unset($file);
			}
		}
		$cssIncludes = "";
		{
			$_g2 = 0;
			$_g11 = $this->cssFiles;
			while($_g2 < $_g11->length) {
				$file1 = $_g11[$_g2];
				++$_g2;
				$cssIncludes .= "<link rel=\"StyleSheet\" href=\"" . _hx_string_or_null($base) . _hx_string_or_null($file1) . "\" />\x0A";
				unset($file1);
			}
		}
		try {
			$initialData->clientIp = $_SERVER['REMOTE_ADDR'];
			$str = sys_io_File::getContent(_hx_string_or_null(dirname($_SERVER["SCRIPT_FILENAME"])) . "/" . _hx_string_or_null($this->htmlTemplate));
			$t = new haxe_Template($str);
			$data = null;
			{
				$value = dia_util_ConversionUtil::toTransferObject($initialData);
				$data = haxe_Json::phpJsonEncode($value, null, null);
			}
			$data = str_replace("\\", "\\\\", $data);
			$data = str_replace("'", "\\'", $data);
			$this->templateVars->addCore = $this->addCore;
			$this->templateVars->baseURL = $this->settings->get("server.baseURL")->value;
			$this->templateVars->mainCss = $cssIncludes;
			$this->templateVars->mainJs = $jsIncludes;
			$this->templateVars->viewClass = $viewClass;
			$this->templateVars->initialData = $data;
			$output = $t->execute($this->templateVars, null);
			php_Lib::hprint($output);
		}catch(Exception $__hx__e) {
			$_ex_ = ($__hx__e instanceof HException) ? $__hx__e->e : $__hx__e;
			if(is_string($error = $_ex_)){
				haxe_Log::trace($error, _hx_anonymous(array("fileName" => "ViewControllerBase.hx", "lineNumber" => 88, "className" => "note.server.controller.view.ViewControllerBase", "methodName" => "showView")));
			} else throw $__hx__e;;
		}
	}
	public function addCssFile($url) {
		$this->cssFiles->push($url);
	}
	public function addJsFile($url) {
		$this->jsFiles->push($url);
	}
	public function addCoreJS($path) {
		$this->coreJSFiles->push("script/" . _hx_string_or_null($path) . ".js");
		if(file_exists("script/" . _hx_string_or_null($path) . "_statics.js")) {
			$this->statics->push("script/" . _hx_string_or_null($path) . "_statics.js");
		}
		if(file_exists("res/" . _hx_string_or_null($path) . ".css")) {
			$this->cssFiles->push("res/" . _hx_string_or_null($path) . ".css");
		}
	}
	public function getMinUrl($files) {
		$base = $this->settings->get("server.baseURL")->value;
		$url = "";
		{
			$_g = 0;
			while($_g < $files->length) {
				$file = $files[$_g];
				++$_g;
				$url .= _hx_string_or_null($file) . ",";
				unset($file);
			}
		}
		return _hx_substring($url, 0, strlen($url) - 1);
	}
	public function getLessonContentId() {
		return $this->getIdOfType("lessoncontent");
	}
	public function getIdOfType($type) {
		$parts = _hx_explode("/", php_Web::getURI());
		{
			$_g1 = 0;
			$_g = $parts->length;
			while($_g1 < $_g) {
				$a = $_g1++;
				if($parts[$a] === $type && $a + 1 < $parts->length) {
					return Std::parseInt($parts[$a + 1]);
				}
				unset($a);
			}
		}
		return -1;
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
	function __toString() { return 'note.server.controller.view.ViewControllerBase'; }
}
note_server_controller_view_ViewControllerBase::$__meta__ = _hx_anonymous(array("fields" => _hx_anonymous(array("settings" => _hx_anonymous(array("name" => (new _hx_array(array("settings"))), "type" => (new _hx_array(array("dia.util.Settings"))), "inject" => null))))));
