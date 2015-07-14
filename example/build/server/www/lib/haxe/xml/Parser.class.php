<?php

class haxe_xml_Parser {
	public function __construct(){}
	static $escapes;
	static function parse($str, $strict = null) {
		if($strict === null) {
			$strict = false;
		}
		$doc = Xml::createDocument();
		haxe_xml_Parser::doParse($str, $strict, 0, $doc);
		return $doc;
	}
	static function doParse($str, $strict, $p = null, $parent = null) {
		if($p === null) {
			$p = 0;
		}
		$xml = null;
		$state = 1;
		$next = 1;
		$aname = null;
		$start = 0;
		$nsubs = 0;
		$nbrackets = 0;
		$c = ord(substr($str,$p,1));
		$buf = new StringBuf();
		$escapeNext = 1;
		$attrValQuote = -1;
		while(!($c === 0)) {
			switch($state) {
			case 0:{
				switch($c) {
				case 10:case 13:case 9:case 32:{}break;
				default:{
					$state = $next;
					continue 3;
				}break;
				}
			}break;
			case 1:{
				switch($c) {
				case 60:{
					$state = 0;
					$next = 2;
				}break;
				default:{
					$start = $p;
					$state = 13;
					continue 3;
				}break;
				}
			}break;
			case 13:{
				if($c === 60) {
					$buf->b .= _hx_string_or_null(_hx_substr($str, $start, $p - $start));
					$child = Xml::createPCData($buf->b);
					$buf = new StringBuf();
					{
						$parent->addChild($child);
						$nsubs++;
					}
					$state = 0;
					$next = 2;
				} else {
					if($c === 38) {
						$buf->b .= _hx_string_or_null(_hx_substr($str, $start, $p - $start));
						$state = 18;
						$escapeNext = 13;
						$start = $p + 1;
					}
				}
			}break;
			case 17:{
				if($c === 93 && ord(substr($str,$p + 1,1)) === 93 && ord(substr($str,$p + 2,1)) === 62) {
					$child1 = Xml::createCData(_hx_substr($str, $start, $p - $start));
					{
						$parent->addChild($child1);
						$nsubs++;
					}
					$p += 2;
					$state = 1;
				}
			}break;
			case 2:{
				switch($c) {
				case 33:{
					if(ord(substr($str,$p + 1,1)) === 91) {
						$p += 2;
						if(strtoupper(_hx_substr($str, $p, 6)) !== "CDATA[") {
							throw new HException("Expected <![CDATA[");
						}
						$p += 5;
						$state = 17;
						$start = $p + 1;
					} else {
						if(ord(substr($str,$p + 1,1)) === 68 || ord(substr($str,$p + 1,1)) === 100) {
							if(strtoupper(_hx_substr($str, $p + 2, 6)) !== "OCTYPE") {
								throw new HException("Expected <!DOCTYPE");
							}
							$p += 8;
							$state = 16;
							$start = $p + 1;
						} else {
							if(ord(substr($str,$p + 1,1)) !== 45 || ord(substr($str,$p + 2,1)) !== 45) {
								throw new HException("Expected <!--");
							} else {
								$p += 2;
								$state = 15;
								$start = $p + 1;
							}
						}
					}
				}break;
				case 63:{
					$state = 14;
					$start = $p;
				}break;
				case 47:{
					if($parent === null) {
						throw new HException("Expected node name");
					}
					$start = $p + 1;
					$state = 0;
					$next = 10;
				}break;
				default:{
					$state = 3;
					$start = $p;
					continue 3;
				}break;
				}
			}break;
			case 3:{
				if(!($c >= 97 && $c <= 122 || $c >= 65 && $c <= 90 || $c >= 48 && $c <= 57 || $c === 58 || $c === 46 || $c === 95 || $c === 45)) {
					if($p === $start) {
						throw new HException("Expected node name");
					}
					$xml = Xml::createElement(_hx_substr($str, $start, $p - $start));
					{
						$parent->addChild($xml);
						$nsubs++;
					}
					$state = 0;
					$next = 4;
					continue 2;
				}
			}break;
			case 4:{
				switch($c) {
				case 47:{
					$state = 11;
				}break;
				case 62:{
					$state = 9;
				}break;
				default:{
					$state = 5;
					$start = $p;
					continue 3;
				}break;
				}
			}break;
			case 5:{
				if(!($c >= 97 && $c <= 122 || $c >= 65 && $c <= 90 || $c >= 48 && $c <= 57 || $c === 58 || $c === 46 || $c === 95 || $c === 45)) {
					$tmp = null;
					if($start === $p) {
						throw new HException("Expected attribute name");
					}
					$tmp = _hx_substr($str, $start, $p - $start);
					$aname = $tmp;
					if($xml->exists($aname)) {
						throw new HException("Duplicate attribute");
					}
					$state = 0;
					$next = 6;
					continue 2;
				}
			}break;
			case 6:{
				switch($c) {
				case 61:{
					$state = 0;
					$next = 7;
				}break;
				default:{
					throw new HException("Expected =");
				}break;
				}
			}break;
			case 7:{
				switch($c) {
				case 34:case 39:{
					$buf = new StringBuf();
					$state = 8;
					$start = $p + 1;
					$attrValQuote = $c;
				}break;
				default:{
					throw new HException("Expected \"");
				}break;
				}
			}break;
			case 8:{
				switch($c) {
				case 38:{
					$buf->b .= _hx_string_or_null(_hx_substr($str, $start, $p - $start));
					$state = 18;
					$escapeNext = 8;
					$start = $p + 1;
				}break;
				case 62:{
					if($strict) {
						throw new HException("Invalid unescaped " . _hx_string_or_null(chr($c)) . " in attribute value");
					} else {
						if($c === $attrValQuote) {
							$buf->b .= _hx_string_or_null(_hx_substr($str, $start, $p - $start));
							$val = $buf->b;
							$buf = new StringBuf();
							$xml->set($aname, $val);
							$state = 0;
							$next = 4;
						}
					}
				}break;
				case 60:{
					if($strict) {
						throw new HException("Invalid unescaped " . _hx_string_or_null(chr($c)) . " in attribute value");
					} else {
						if($c === $attrValQuote) {
							$buf->b .= _hx_string_or_null(_hx_substr($str, $start, $p - $start));
							$val1 = $buf->b;
							$buf = new StringBuf();
							$xml->set($aname, $val1);
							$state = 0;
							$next = 4;
						}
					}
				}break;
				default:{
					if($c === $attrValQuote) {
						$buf->b .= _hx_string_or_null(_hx_substr($str, $start, $p - $start));
						$val2 = $buf->b;
						$buf = new StringBuf();
						$xml->set($aname, $val2);
						$state = 0;
						$next = 4;
					}
				}break;
				}
			}break;
			case 9:{
				$p = haxe_xml_Parser::doParse($str, $strict, $p, $xml);
				$start = $p;
				$state = 1;
			}break;
			case 11:{
				switch($c) {
				case 62:{
					$state = 1;
				}break;
				default:{
					throw new HException("Expected >");
				}break;
				}
			}break;
			case 12:{
				switch($c) {
				case 62:{
					if($nsubs === 0) {
						$parent->addChild(Xml::createPCData(""));
					}
					return $p;
				}break;
				default:{
					throw new HException("Expected >");
				}break;
				}
			}break;
			case 10:{
				if(!($c >= 97 && $c <= 122 || $c >= 65 && $c <= 90 || $c >= 48 && $c <= 57 || $c === 58 || $c === 46 || $c === 95 || $c === 45)) {
					if($start === $p) {
						throw new HException("Expected node name");
					}
					$v = _hx_substr($str, $start, $p - $start);
					if($v !== haxe_xml_Parser_0($aname, $attrValQuote, $buf, $c, $escapeNext, $nbrackets, $next, $nsubs, $p, $parent, $start, $state, $str, $strict, $v, $xml)) {
						throw new HException("Expected </" . _hx_string_or_null(haxe_xml_Parser_1($aname, $attrValQuote, $buf, $c, $escapeNext, $nbrackets, $next, $nsubs, $p, $parent, $start, $state, $str, $strict, $v, $xml)) . ">");
					}
					$state = 0;
					$next = 12;
					continue 2;
				}
			}break;
			case 15:{
				if($c === 45 && ord(substr($str,$p + 1,1)) === 45 && ord(substr($str,$p + 2,1)) === 62) {
					{
						$xml1 = Xml::createComment(_hx_substr($str, $start, $p - $start));
						$parent->addChild($xml1);
						$nsubs++;
					}
					$p += 2;
					$state = 1;
				}
			}break;
			case 16:{
				if($c === 91) {
					$nbrackets++;
				} else {
					if($c === 93) {
						$nbrackets--;
					} else {
						if($c === 62 && $nbrackets === 0) {
							{
								$xml2 = Xml::createDocType(_hx_substr($str, $start, $p - $start));
								$parent->addChild($xml2);
								$nsubs++;
							}
							$state = 1;
						}
					}
				}
			}break;
			case 14:{
				if($c === 63 && ord(substr($str,$p + 1,1)) === 62) {
					$p++;
					$str1 = _hx_substr($str, $start + 1, $p - $start - 2);
					{
						$xml3 = Xml::createProcessingInstruction($str1);
						$parent->addChild($xml3);
						$nsubs++;
					}
					$state = 1;
				}
			}break;
			case 18:{
				if($c === 59) {
					$s = _hx_substr($str, $start, $p - $start);
					if(ord(substr($s,0,1)) === 35) {
						$c1 = null;
						if(ord(substr($s,1,1)) === 120) {
							$c1 = Std::parseInt("0" . _hx_string_or_null(_hx_substr($s, 1, strlen($s) - 1)));
						} else {
							$c1 = Std::parseInt(_hx_substr($s, 1, strlen($s) - 1));
						}
						if($c1 >= 128) {
							if($c1 <= 2047) {
								$buf->b .= _hx_string_or_null(chr(192 | $c1 >> 6));
								$buf->b .= _hx_string_or_null(chr(128 | $c1 & 63));
							} else {
								if($c1 <= 65535) {
									$buf->b .= _hx_string_or_null(chr(224 | $c1 >> 12));
									$buf->b .= _hx_string_or_null(chr(128 | $c1 >> 6 & 63));
									$buf->b .= _hx_string_or_null(chr(128 | $c1 & 63));
								} else {
									if($c1 <= 1114111) {
										$buf->b .= _hx_string_or_null(chr(240 | $c1 >> 18));
										$buf->b .= _hx_string_or_null(chr(128 | $c1 >> 12 & 63));
										$buf->b .= _hx_string_or_null(chr(128 | $c1 >> 6 & 63));
										$buf->b .= _hx_string_or_null(chr(128 | $c1 & 63));
									} else {
										throw new HException("Cannot encode UTF8-char " . _hx_string_rec($c1, ""));
									}
								}
							}
						} else {
							$buf->b .= _hx_string_or_null(chr($c1));
						}
					} else {
						if(!haxe_xml_Parser::$escapes->exists($s)) {
							if($strict) {
								throw new HException("Undefined entity: " . _hx_string_or_null($s));
							}
							$buf->add("&" . _hx_string_or_null($s) . ";");
						} else {
							$buf->add(haxe_xml_Parser::$escapes->get($s));
						}
					}
					$start = $p + 1;
					$state = $escapeNext;
				} else {
					if(!($c >= 97 && $c <= 122 || $c >= 65 && $c <= 90 || $c >= 48 && $c <= 57 || $c === 58 || $c === 46 || $c === 95 || $c === 45) && $c !== 35) {
						if($strict) {
							throw new HException("Invalid character in entity: " . _hx_string_or_null(chr($c)));
						}
						$buf->b .= "&";
						$buf->b .= _hx_string_or_null(_hx_substr($str, $start, $p - $start));
						$p--;
						$start = $p + 1;
						$state = $escapeNext;
					}
				}
			}break;
			}
			{
				$index = ++$p;
				$c = ord(substr($str,$index,1));
				unset($index);
			}
		}
		if($state === 1) {
			$start = $p;
			$state = 13;
		}
		if($state === 13) {
			if($p !== $start || $nsubs === 0) {
				$buf->b .= _hx_string_or_null(_hx_substr($str, $start, $p - $start));
				{
					$xml4 = Xml::createPCData($buf->b);
					$parent->addChild($xml4);
					$nsubs++;
				}
			}
			return $p;
		}
		if(!$strict && $state === 18 && $escapeNext === 13) {
			$buf->b .= "&";
			$buf->b .= _hx_string_or_null(_hx_substr($str, $start, $p - $start));
			{
				$xml5 = Xml::createPCData($buf->b);
				$parent->addChild($xml5);
				$nsubs++;
			}
			return $p;
		}
		throw new HException("Unexpected end");
	}
	function __toString() { return 'haxe.xml.Parser'; }
}
haxe_xml_Parser::$escapes = haxe_xml_Parser_2();
function haxe_xml_Parser_0(&$aname, &$attrValQuote, &$buf, &$c, &$escapeNext, &$nbrackets, &$next, &$nsubs, &$p, &$parent, &$start, &$state, &$str, &$strict, &$v, &$xml) {
	{
		if((is_object($_t = $parent->nodeType) && !($_t instanceof Enum) ? $_t !== Xml::$Element : $_t != Xml::$Element)) {
			throw new HException("Bad node type, expected Element but found " . _hx_string_rec($parent->nodeType, ""));
		}
		return $parent->nodeName;
	}
}
function haxe_xml_Parser_1(&$aname, &$attrValQuote, &$buf, &$c, &$escapeNext, &$nbrackets, &$next, &$nsubs, &$p, &$parent, &$start, &$state, &$str, &$strict, &$v, &$xml) {
	{
		if((is_object($_t = $parent->nodeType) && !($_t instanceof Enum) ? $_t !== Xml::$Element : $_t != Xml::$Element)) {
			throw new HException("Bad node type, expected Element but found " . _hx_string_rec($parent->nodeType, ""));
		}
		return $parent->nodeName;
	}
}
function haxe_xml_Parser_2() {
	{
		$h = new haxe_ds_StringMap();
		$h->set("lt", "<");
		$h->set("gt", ">");
		$h->set("amp", "&");
		$h->set("quot", "\"");
		$h->set("apos", "'");
		return $h;
	}
}
