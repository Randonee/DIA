<?php

class haxe_xml_Printer {
	public function __construct($pretty) {
		if(!php_Boot::$skip_constructor) {
		$this->output = new StringBuf();
		$this->pretty = $pretty;
	}}
	public $output;
	public $pretty;
	public function writeNode($value, $tabs) {
		$_g = $value->nodeType;
		switch($_g) {
		case 2:{
			$this->output->add(_hx_string_or_null($tabs) . "<![CDATA[");
			{
				$input = null;
				{
					$s = null;
					{
						if((is_object($_t = $value->nodeType) && !($_t instanceof Enum) ? $_t === Xml::$Document : $_t == Xml::$Document) || (is_object($_t2 = $value->nodeType) && !($_t2 instanceof Enum) ? $_t2 === Xml::$Element : $_t2 == Xml::$Element)) {
							throw new HException("Bad node type, unexpected " . _hx_string_rec($value->nodeType, ""));
						}
						$s = $value->nodeValue;
					}
					$input = trim($s);
				}
				$this->output->add($input);
			}
			$this->output->add("]]>");
			if($this->pretty) {
				$this->output->add("");
			}
		}break;
		case 3:{
			$commentContent = null;
			{
				if((is_object($_t = $value->nodeType) && !($_t instanceof Enum) ? $_t === Xml::$Document : $_t == Xml::$Document) || (is_object($_t2 = $value->nodeType) && !($_t2 instanceof Enum) ? $_t2 === Xml::$Element : $_t2 == Xml::$Element)) {
					throw new HException("Bad node type, unexpected " . _hx_string_rec($value->nodeType, ""));
				}
				$commentContent = $value->nodeValue;
			}
			$commentContent = _hx_deref(new EReg("[\x0A\x0D\x09]+", "g"))->replace($commentContent, "");
			$commentContent = "<!--" . _hx_string_or_null($commentContent) . "-->";
			$this->output->add($tabs);
			{
				$input1 = trim($commentContent);
				$this->output->add($input1);
			}
			if($this->pretty) {
				$this->output->add("");
			}
		}break;
		case 6:{
			$__hx__it = haxe_xml_Printer_0($this, $_g, $child, $tabs, $value);
			while($__hx__it->hasNext()) {
				unset($child);
				$child = $__hx__it->next();
				$this->writeNode($child, $tabs);
			}
		}break;
		case 0:{
			$this->output->add(_hx_string_or_null($tabs) . "<");
			{
				$input2 = null;
				{
					if((is_object($_t = $value->nodeType) && !($_t instanceof Enum) ? $_t !== Xml::$Element : $_t != Xml::$Element)) {
						throw new HException("Bad node type, expected Element but found " . _hx_string_rec($value->nodeType, ""));
					}
					$input2 = $value->nodeName;
				}
				$this->output->add($input2);
			}
			if(null == $value) throw new HException('null iterable');
			$__hx__it = $value->attributes();
			while($__hx__it->hasNext()) {
				unset($attribute);
				$attribute = $__hx__it->next();
				$this->output->add(" " . _hx_string_or_null($attribute) . "=\"");
				{
					$input3 = StringTools::htmlEscape($value->get($attribute), true);
					$this->output->add($input3);
					unset($input3);
				}
				$this->output->add("\"");
			}
			if($this->hasChildren($value)) {
				$this->output->add(">");
				if($this->pretty) {
					$this->output->add("");
				}
				$__hx__it = haxe_xml_Printer_1($this, $_g, $child1, $tabs, $value);
				while($__hx__it->hasNext()) {
					unset($child1);
					$child1 = $__hx__it->next();
					$this->writeNode($child1, haxe_xml_Printer_2($this, $_g, $child1, $tabs, $value));
				}
				$this->output->add(_hx_string_or_null($tabs) . "</");
				{
					$input4 = null;
					{
						if((is_object($_t = $value->nodeType) && !($_t instanceof Enum) ? $_t !== Xml::$Element : $_t != Xml::$Element)) {
							throw new HException("Bad node type, expected Element but found " . _hx_string_rec($value->nodeType, ""));
						}
						$input4 = $value->nodeName;
					}
					$this->output->add($input4);
				}
				$this->output->add(">");
				if($this->pretty) {
					$this->output->add("");
				}
			} else {
				$this->output->add("/>");
				if($this->pretty) {
					$this->output->add("");
				}
			}
		}break;
		case 1:{
			$nodeValue = null;
			{
				if((is_object($_t = $value->nodeType) && !($_t instanceof Enum) ? $_t === Xml::$Document : $_t == Xml::$Document) || (is_object($_t2 = $value->nodeType) && !($_t2 instanceof Enum) ? $_t2 === Xml::$Element : $_t2 == Xml::$Element)) {
					throw new HException("Bad node type, unexpected " . _hx_string_rec($value->nodeType, ""));
				}
				$nodeValue = $value->nodeValue;
			}
			if(strlen($nodeValue) !== 0) {
				{
					$input5 = _hx_string_or_null($tabs) . _hx_string_or_null(StringTools::htmlEscape($nodeValue, null));
					$this->output->add($input5);
				}
				if($this->pretty) {
					$this->output->add("");
				}
			}
		}break;
		case 5:{
			$input6 = null;
			$input6 = "<?" . _hx_string_or_null(haxe_xml_Printer_3($this, $_g, $input6, $tabs, $value)) . "?>";
			$this->output->add($input6);
		}break;
		case 4:{
			$input7 = null;
			$input7 = "<!DOCTYPE " . _hx_string_or_null(haxe_xml_Printer_4($this, $_g, $input7, $tabs, $value)) . ">";
			$this->output->add($input7);
		}break;
		}
	}
	public function hasChildren($value) {
		$__hx__it = haxe_xml_Printer_5($this, $child, $value);
		while($__hx__it->hasNext()) {
			unset($child);
			$child = $__hx__it->next();
			$_g = $child->nodeType;
			switch($_g) {
			case 0:case 1:{
				return true;
			}break;
			case 2:case 3:{
				if(strlen((haxe_xml_Printer_6($this, $_g, $child, $value))) !== 0) {
					return true;
				}
			}break;
			default:{}break;
			}
			unset($_g);
		}
		return false;
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
	static function hprint($xml, $pretty = null) {
		if($pretty === null) {
			$pretty = false;
		}
		$printer = new haxe_xml_Printer($pretty);
		$printer->writeNode($xml, "");
		return $printer->output->b;
	}
	function __toString() { return 'haxe.xml.Printer'; }
}
function haxe_xml_Printer_0(&$__hx__this, &$_g, &$child, &$tabs, &$value) {
	{
		if((is_object($_t = $value->nodeType) && !($_t instanceof Enum) ? $_t !== Xml::$Document : $_t != Xml::$Document) && (is_object($_t2 = $value->nodeType) && !($_t2 instanceof Enum) ? $_t2 !== Xml::$Element : $_t2 != Xml::$Element)) {
			throw new HException("Bad node type, expected Element or Document but found " . _hx_string_rec($value->nodeType, ""));
		}
		return $value->children->iterator();
	}
}
function haxe_xml_Printer_1(&$__hx__this, &$_g, &$child1, &$tabs, &$value) {
	{
		if((is_object($_t = $value->nodeType) && !($_t instanceof Enum) ? $_t !== Xml::$Document : $_t != Xml::$Document) && (is_object($_t2 = $value->nodeType) && !($_t2 instanceof Enum) ? $_t2 !== Xml::$Element : $_t2 != Xml::$Element)) {
			throw new HException("Bad node type, expected Element or Document but found " . _hx_string_rec($value->nodeType, ""));
		}
		return $value->children->iterator();
	}
}
function haxe_xml_Printer_2(&$__hx__this, &$_g, &$child1, &$tabs, &$value) {
	if($__hx__this->pretty) {
		return _hx_string_or_null($tabs) . "\x09";
	} else {
		return $tabs;
	}
}
function haxe_xml_Printer_3(&$__hx__this, &$_g, &$input6, &$tabs, &$value) {
	{
		if((is_object($_t = $value->nodeType) && !($_t instanceof Enum) ? $_t === Xml::$Document : $_t == Xml::$Document) || (is_object($_t2 = $value->nodeType) && !($_t2 instanceof Enum) ? $_t2 === Xml::$Element : $_t2 == Xml::$Element)) {
			throw new HException("Bad node type, unexpected " . _hx_string_rec($value->nodeType, ""));
		}
		return $value->nodeValue;
	}
}
function haxe_xml_Printer_4(&$__hx__this, &$_g, &$input7, &$tabs, &$value) {
	{
		if((is_object($_t = $value->nodeType) && !($_t instanceof Enum) ? $_t === Xml::$Document : $_t == Xml::$Document) || (is_object($_t2 = $value->nodeType) && !($_t2 instanceof Enum) ? $_t2 === Xml::$Element : $_t2 == Xml::$Element)) {
			throw new HException("Bad node type, unexpected " . _hx_string_rec($value->nodeType, ""));
		}
		return $value->nodeValue;
	}
}
function haxe_xml_Printer_5(&$__hx__this, &$child, &$value) {
	{
		if((is_object($_t = $value->nodeType) && !($_t instanceof Enum) ? $_t !== Xml::$Document : $_t != Xml::$Document) && (is_object($_t2 = $value->nodeType) && !($_t2 instanceof Enum) ? $_t2 !== Xml::$Element : $_t2 != Xml::$Element)) {
			throw new HException("Bad node type, expected Element or Document but found " . _hx_string_rec($value->nodeType, ""));
		}
		return $value->children->iterator();
	}
}
function haxe_xml_Printer_6(&$__hx__this, &$_g, &$child, &$value) {
	{
		$s = null;
		{
			if((is_object($_t = $child->nodeType) && !($_t instanceof Enum) ? $_t === Xml::$Document : $_t == Xml::$Document) || (is_object($_t2 = $child->nodeType) && !($_t2 instanceof Enum) ? $_t2 === Xml::$Element : $_t2 == Xml::$Element)) {
				throw new HException("Bad node type, unexpected " . _hx_string_rec($child->nodeType, ""));
			}
			$s = $child->nodeValue;
		}
		return ltrim($s);
	}
}
