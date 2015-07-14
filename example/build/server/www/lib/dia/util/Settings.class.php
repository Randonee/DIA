<?php

class dia_util_Settings {
	public function __construct() {
		if(!php_Boot::$skip_constructor) {
		$this->_rootSetting = new dia_util_Setting("root", "");
	}}
	public $_rootSetting;
	public function add($path, $value) {
		return $this->addSettingRecursive($this->_rootSetting, _hx_explode(".", $path), $value);
	}
	public function addSettingRecursive($setting, $path, $value) {
		if($path->length === 0) {
			return null;
		}
		$newSetting = $setting->children->get($path[0]);
		if($newSetting === null) {
			$newSetting = new dia_util_Setting($path[0], null);
			$setting->children->set($path[0], $newSetting);
		}
		if($path->length === 1) {
			$newSetting->value = $value;
			return $newSetting;
		}
		return $this->addSettingRecursive($newSetting, $path->slice(1, null), $value);
	}
	public function get($path) {
		$setting = $this->getSettingRecursive($this->_rootSetting, _hx_explode(".", $path));
		if($setting === null) {
			throw new HException("Settings path not found: " . _hx_string_or_null($path));
		}
		return $setting;
	}
	public function getSettingRecursive($setting, $path) {
		if($path->length === 0) {
			return $setting;
		}
		{
			$_g1 = 0;
			$_g = $path->length;
			while($_g1 < $_g) {
				$a = $_g1++;
				$foundSetting = $setting->children->get($path[$a]);
				if($foundSetting === null) {
					return null;
				} else {
					$foundSetting = $this->getSettingRecursive($foundSetting, $path->slice(1, null));
					if($foundSetting !== null) {
						return $foundSetting;
					}
				}
				unset($foundSetting,$a);
			}
		}
		return null;
	}
	public function readXMLSettings($xmlString) {
		if($xmlString === "") {
			return;
		}
		$xml = Xml::parse($xmlString);
		$fastXML = new haxe_xml_Fast($xml->firstElement());
		$this->readXMLSettingsRecursive($fastXML, (new _hx_array(array())));
	}
	public function readXMLSettingsRecursive($xml, $path) {
		$count = 0;
		if(null == $xml) throw new HException('null iterable');
		$__hx__it = $xml->get_elements();
		while($__hx__it->hasNext()) {
			unset($node);
			$node = $__hx__it->next();
			++$count;
			$arr = $path->copy();
			$arr->push($xml->get_name());
			$this->readXMLSettingsRecursive($node, $arr);
			unset($arr);
		}
		if($count === 0) {
			$arr1 = $path->copy();
			$arr1->push($xml->get_name());
			$this->add($arr1->join("."), $xml->get_innerHTML());
		}
	}
	public function loadSettingsFiles($path, $baseName) {
		$this->readXMLSettings(dia_util_Settings::getFileContent(_hx_string_or_null($path) . _hx_string_or_null($baseName) . ".xml"));
		$this->readXMLSettings(dia_util_Settings::getFileContent(_hx_string_or_null($path) . _hx_string_or_null($baseName) . "_deploy.xml"));
		$this->readXMLSettings(dia_util_Settings::getFileContent(_hx_string_or_null($path) . _hx_string_or_null($baseName) . "_dev.xml"));
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
	static function getFileContent($filePath) {
		$content = "";
		if(file_exists($filePath)) {
			$content = sys_io_File::getContent($filePath);
		}
		return $content;
	}
	function __toString() { return 'dia.util.Settings'; }
}
