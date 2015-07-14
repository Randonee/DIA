<?php

class Xml {
	public function __construct($nodeType) {
		if(!php_Boot::$skip_constructor) {
		$this->nodeType = $nodeType;
		$this->children = (new _hx_array(array()));
		$this->attributeMap = new haxe_ds_StringMap();
	}}
	public $nodeType;
	public $nodeName;
	public $nodeValue;
	public $parent;
	public $children;
	public $attributeMap;
	public function get($att) {
		if((is_object($_t = $this->nodeType) && !($_t instanceof Enum) ? $_t !== Xml::$Element : $_t != Xml::$Element)) {
			throw new HException("Bad node type, expected Element but found " . _hx_string_rec($this->nodeType, ""));
		}
		return $this->attributeMap->get($att);
	}
	public function set($att, $value) {
		if((is_object($_t = $this->nodeType) && !($_t instanceof Enum) ? $_t !== Xml::$Element : $_t != Xml::$Element)) {
			throw new HException("Bad node type, expected Element but found " . _hx_string_rec($this->nodeType, ""));
		}
		$this->attributeMap->set($att, $value);
	}
	public function exists($att) {
		if((is_object($_t = $this->nodeType) && !($_t instanceof Enum) ? $_t !== Xml::$Element : $_t != Xml::$Element)) {
			throw new HException("Bad node type, expected Element but found " . _hx_string_rec($this->nodeType, ""));
		}
		return $this->attributeMap->exists($att);
	}
	public function attributes() {
		if((is_object($_t = $this->nodeType) && !($_t instanceof Enum) ? $_t !== Xml::$Element : $_t != Xml::$Element)) {
			throw new HException("Bad node type, expected Element but found " . _hx_string_rec($this->nodeType, ""));
		}
		return $this->attributeMap->keys();
	}
	public function elements() {
		if((is_object($_t = $this->nodeType) && !($_t instanceof Enum) ? $_t !== Xml::$Document : $_t != Xml::$Document) && (is_object($_t2 = $this->nodeType) && !($_t2 instanceof Enum) ? $_t2 !== Xml::$Element : $_t2 != Xml::$Element)) {
			throw new HException("Bad node type, expected Element or Document but found " . _hx_string_rec($this->nodeType, ""));
		}
		$ret = null;
		{
			$_g = (new _hx_array(array()));
			{
				$_g1 = 0;
				$_g2 = $this->children;
				while($_g1 < $_g2->length) {
					$child = $_g2[$_g1];
					++$_g1;
					if((is_object($_t3 = $child->nodeType) && !($_t3 instanceof Enum) ? $_t3 === Xml::$Element : $_t3 == Xml::$Element)) {
						$_g->push($child);
					}
					unset($child,$_t3);
				}
			}
			$ret = $_g;
		}
		return $ret->iterator();
	}
	public function firstElement() {
		if((is_object($_t = $this->nodeType) && !($_t instanceof Enum) ? $_t !== Xml::$Document : $_t != Xml::$Document) && (is_object($_t2 = $this->nodeType) && !($_t2 instanceof Enum) ? $_t2 !== Xml::$Element : $_t2 != Xml::$Element)) {
			throw new HException("Bad node type, expected Element or Document but found " . _hx_string_rec($this->nodeType, ""));
		}
		{
			$_g = 0;
			$_g1 = $this->children;
			while($_g < $_g1->length) {
				$child = $_g1[$_g];
				++$_g;
				if((is_object($_t3 = $child->nodeType) && !($_t3 instanceof Enum) ? $_t3 === Xml::$Element : $_t3 == Xml::$Element)) {
					return $child;
				}
				unset($child,$_t3);
			}
		}
		return null;
	}
	public function addChild($x) {
		if((is_object($_t = $this->nodeType) && !($_t instanceof Enum) ? $_t !== Xml::$Document : $_t != Xml::$Document) && (is_object($_t2 = $this->nodeType) && !($_t2 instanceof Enum) ? $_t2 !== Xml::$Element : $_t2 != Xml::$Element)) {
			throw new HException("Bad node type, expected Element or Document but found " . _hx_string_rec($this->nodeType, ""));
		}
		if($x->parent !== null) {
			$x->parent->removeChild($x);
		}
		$this->children->push($x);
		$x->parent = $this;
	}
	public function removeChild($x) {
		if((is_object($_t = $this->nodeType) && !($_t instanceof Enum) ? $_t !== Xml::$Document : $_t != Xml::$Document) && (is_object($_t2 = $this->nodeType) && !($_t2 instanceof Enum) ? $_t2 !== Xml::$Element : $_t2 != Xml::$Element)) {
			throw new HException("Bad node type, expected Element or Document but found " . _hx_string_rec($this->nodeType, ""));
		}
		if($this->children->remove($x)) {
			$x->parent = null;
			return true;
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
	static $Element;
	static $PCData;
	static $CData;
	static $Comment;
	static $DocType;
	static $ProcessingInstruction;
	static $Document;
	static function parse($str) {
		return haxe_xml_Parser::parse($str, null);
	}
	static function createElement($name) {
		$xml = new Xml(Xml::$Element);
		{
			if((is_object($_t = $xml->nodeType) && !($_t instanceof Enum) ? $_t !== Xml::$Element : $_t != Xml::$Element)) {
				throw new HException("Bad node type, expected Element but found " . _hx_string_rec($xml->nodeType, ""));
			}
			$xml->nodeName = $name;
		}
		return $xml;
	}
	static function createPCData($data) {
		$xml = new Xml(Xml::$PCData);
		{
			if((is_object($_t = $xml->nodeType) && !($_t instanceof Enum) ? $_t === Xml::$Document : $_t == Xml::$Document) || (is_object($_t2 = $xml->nodeType) && !($_t2 instanceof Enum) ? $_t2 === Xml::$Element : $_t2 == Xml::$Element)) {
				throw new HException("Bad node type, unexpected " . _hx_string_rec($xml->nodeType, ""));
			}
			$xml->nodeValue = $data;
		}
		return $xml;
	}
	static function createCData($data) {
		$xml = new Xml(Xml::$CData);
		{
			if((is_object($_t = $xml->nodeType) && !($_t instanceof Enum) ? $_t === Xml::$Document : $_t == Xml::$Document) || (is_object($_t2 = $xml->nodeType) && !($_t2 instanceof Enum) ? $_t2 === Xml::$Element : $_t2 == Xml::$Element)) {
				throw new HException("Bad node type, unexpected " . _hx_string_rec($xml->nodeType, ""));
			}
			$xml->nodeValue = $data;
		}
		return $xml;
	}
	static function createComment($data) {
		$xml = new Xml(Xml::$Comment);
		{
			if((is_object($_t = $xml->nodeType) && !($_t instanceof Enum) ? $_t === Xml::$Document : $_t == Xml::$Document) || (is_object($_t2 = $xml->nodeType) && !($_t2 instanceof Enum) ? $_t2 === Xml::$Element : $_t2 == Xml::$Element)) {
				throw new HException("Bad node type, unexpected " . _hx_string_rec($xml->nodeType, ""));
			}
			$xml->nodeValue = $data;
		}
		return $xml;
	}
	static function createDocType($data) {
		$xml = new Xml(Xml::$DocType);
		{
			if((is_object($_t = $xml->nodeType) && !($_t instanceof Enum) ? $_t === Xml::$Document : $_t == Xml::$Document) || (is_object($_t2 = $xml->nodeType) && !($_t2 instanceof Enum) ? $_t2 === Xml::$Element : $_t2 == Xml::$Element)) {
				throw new HException("Bad node type, unexpected " . _hx_string_rec($xml->nodeType, ""));
			}
			$xml->nodeValue = $data;
		}
		return $xml;
	}
	static function createProcessingInstruction($data) {
		$xml = new Xml(Xml::$ProcessingInstruction);
		{
			if((is_object($_t = $xml->nodeType) && !($_t instanceof Enum) ? $_t === Xml::$Document : $_t == Xml::$Document) || (is_object($_t2 = $xml->nodeType) && !($_t2 instanceof Enum) ? $_t2 === Xml::$Element : $_t2 == Xml::$Element)) {
				throw new HException("Bad node type, unexpected " . _hx_string_rec($xml->nodeType, ""));
			}
			$xml->nodeValue = $data;
		}
		return $xml;
	}
	static function createDocument() {
		return new Xml(Xml::$Document);
	}
	function __toString() { return 'Xml'; }
}
Xml::$Element = 0;
Xml::$PCData = 1;
Xml::$CData = 2;
Xml::$Comment = 3;
Xml::$DocType = 4;
Xml::$ProcessingInstruction = 5;
Xml::$Document = 6;
