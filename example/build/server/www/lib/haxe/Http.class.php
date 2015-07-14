<?php

class haxe_Http {
	public function __construct($url) {
		if(!isset($this->onData)) $this->onData = array(new _hx_lambda(array(&$this, &$url), "haxe_Http_0"), 'execute');
		if(!isset($this->onError)) $this->onError = array(new _hx_lambda(array(&$this, &$url), "haxe_Http_1"), 'execute');
		if(!isset($this->onStatus)) $this->onStatus = array(new _hx_lambda(array(&$this, &$url), "haxe_Http_2"), 'execute');
		if(!php_Boot::$skip_constructor) {
		$this->url = $url;
		$this->headers = new HList();
		$this->params = new HList();
		$this->cnxTimeout = 10;
		$this->noShutdown = !function_exists("stream_socket_shutdown");
	}}
	public $url;
	public $responseData;
	public $noShutdown;
	public $cnxTimeout;
	public $responseHeaders;
	public $chunk_size;
	public $chunk_buf;
	public $file;
	public $postData;
	public $headers;
	public $params;
	public function setHeader($header, $value) {
		$this->headers = Lambda::filter($this->headers, array(new _hx_lambda(array(&$header, &$value), "haxe_Http_3"), 'execute'));
		$this->headers->push(_hx_anonymous(array("header" => $header, "value" => $value)));
		return $this;
	}
	public function setParameter($param, $value) {
		$this->params = Lambda::filter($this->params, array(new _hx_lambda(array(&$param, &$value), "haxe_Http_4"), 'execute'));
		$this->params->push(_hx_anonymous(array("param" => $param, "value" => $value)));
		return $this;
	}
	public function request($post = null) {
		$_g = $this;
		$me = $this;
		$me1 = $this;
		$output = new haxe_io_BytesOutput();
		$old = (isset($this->onError) ? $this->onError: array($this, "onError"));
		$err = false;
		$this->onError = array(new _hx_lambda(array(&$_g, &$err, &$me, &$me1, &$old, &$output, &$post), "haxe_Http_5"), 'execute');
		$this->customRequest($post, $output, null, null);
		if(!$err) {
			$me1->onData($me1->responseData = $output->getBytes()->toString());
		}
	}
	public function customRequest($post, $api, $sock = null, $method = null) {
		$this->responseData = null;
		$url_regexp = new EReg("^(https?://)?([a-zA-Z\\.0-9_-]+)(:[0-9]+)?(.*)\$", "");
		if(!$url_regexp->match($this->url)) {
			$this->onError("Invalid URL");
			return;
		}
		$secure = $url_regexp->matched(1) === "https://";
		if($sock === null) {
			if($secure) {
				$sock = new php_net_SslSocket();
			} else {
				$sock = new sys_net_Socket();
			}
		}
		$host = $url_regexp->matched(2);
		$portString = $url_regexp->matched(3);
		$request = $url_regexp->matched(4);
		if($request === "") {
			$request = "/";
		}
		$port = null;
		if($portString === null || $portString === "") {
			if($secure) {
				$port = 443;
			} else {
				$port = 80;
			}
		} else {
			$port = Std::parseInt(_hx_substr($portString, 1, strlen($portString) - 1));
		}
		$data = null;
		$multipart = _hx_field($this, "file") !== null;
		$boundary = null;
		$uri = null;
		if($multipart) {
			$post = true;
			$boundary = Std::string(Std::random(1000)) . Std::string(Std::random(1000)) . Std::string(Std::random(1000)) . Std::string(Std::random(1000));
			while(strlen($boundary) < 38) {
				$boundary = "-" . _hx_string_or_null($boundary);
			}
			$b = new StringBuf();
			if(null == $this->params) throw new HException('null iterable');
			$__hx__it = $this->params->iterator();
			while($__hx__it->hasNext()) {
				unset($p);
				$p = $__hx__it->next();
				$b->add("--");
				$b->add($boundary);
				$b->add("\x0D\x0A");
				$b->add("Content-Disposition: form-data; name=\"");
				$b->add($p->param);
				$b->add("\"");
				$b->add("\x0D\x0A");
				$b->add("\x0D\x0A");
				$b->add($p->value);
				$b->add("\x0D\x0A");
			}
			$b->add("--");
			$b->add($boundary);
			$b->add("\x0D\x0A");
			$b->add("Content-Disposition: form-data; name=\"");
			$b->add($this->file->param);
			$b->add("\"; filename=\"");
			$b->add($this->file->filename);
			$b->add("\"");
			$b->add("\x0D\x0A");
			$b->add("Content-Type: " . _hx_string_or_null($this->file->mimeType) . "\x0D\x0A" . "\x0D\x0A");
			$uri = $b->b;
		} else {
			if(null == $this->params) throw new HException('null iterable');
			$__hx__it = $this->params->iterator();
			while($__hx__it->hasNext()) {
				unset($p1);
				$p1 = $__hx__it->next();
				if($uri === null) {
					$uri = "";
				} else {
					$uri .= "&";
				}
				$uri .= _hx_string_or_null(rawurlencode($p1->param)) . "=" . _hx_string_or_null(rawurlencode($p1->value));
			}
		}
		$b1 = new StringBuf();
		if($method !== null) {
			$b1->add($method);
			$b1->add(" ");
		} else {
			if($post) {
				$b1->add("POST ");
			} else {
				$b1->add("GET ");
			}
		}
		if(_hx_field(_hx_qtype("haxe.Http"), "PROXY") !== null) {
			$b1->add("http://");
			$b1->add($host);
			if($port !== 80) {
				$b1->add(":");
				$b1->add($port);
			}
		}
		$b1->add($request);
		if(!$post && $uri !== null) {
			if(_hx_index_of($request, "?", 0) >= 0) {
				$b1->add("&");
			} else {
				$b1->add("?");
			}
			$b1->add($uri);
		}
		$b1->add(" HTTP/1.1\x0D\x0AHost: " . _hx_string_or_null($host) . "\x0D\x0A");
		if($this->postData !== null) {
			$b1->add("Content-Length: " . _hx_string_rec(strlen($this->postData), "") . "\x0D\x0A");
		} else {
			if($post && $uri !== null) {
				if($multipart || !Lambda::exists($this->headers, array(new _hx_lambda(array(&$api, &$b1, &$boundary, &$data, &$host, &$method, &$multipart, &$port, &$portString, &$post, &$request, &$secure, &$sock, &$uri, &$url_regexp), "haxe_Http_6"), 'execute'))) {
					$b1->add("Content-Type: ");
					if($multipart) {
						$b1->add("multipart/form-data");
						$b1->add("; boundary=");
						$b1->add($boundary);
					} else {
						$b1->add("application/x-www-form-urlencoded");
					}
					$b1->add("\x0D\x0A");
				}
				if($multipart) {
					$b1->add("Content-Length: " . _hx_string_rec((strlen($uri) + $this->file->size + strlen($boundary) + 6), "") . "\x0D\x0A");
				} else {
					$b1->add("Content-Length: " . _hx_string_rec(strlen($uri), "") . "\x0D\x0A");
				}
			}
		}
		if(null == $this->headers) throw new HException('null iterable');
		$__hx__it = $this->headers->iterator();
		while($__hx__it->hasNext()) {
			unset($h1);
			$h1 = $__hx__it->next();
			$b1->add($h1->header);
			$b1->add(": ");
			$b1->add($h1->value);
			$b1->add("\x0D\x0A");
		}
		$b1->add("\x0D\x0A");
		if($this->postData !== null) {
			$b1->add($this->postData);
		} else {
			if($post && $uri !== null) {
				$b1->add($uri);
			}
		}
		try {
			if(_hx_field(_hx_qtype("haxe.Http"), "PROXY") !== null) {
				$sock->connect(new sys_net_Host(haxe_Http::$PROXY->host), haxe_Http::$PROXY->port);
			} else {
				$sock->connect(new sys_net_Host($host), $port);
			}
			$sock->write($b1->b);
			if($multipart) {
				$bufsize = 4096;
				$buf = haxe_io_Bytes::alloc($bufsize);
				while($this->file->size > 0) {
					$size = null;
					if($this->file->size > $bufsize) {
						$size = $bufsize;
					} else {
						$size = $this->file->size;
					}
					$len = 0;
					try {
						$len = $this->file->io->readBytes($buf, 0, $size);
					}catch(Exception $__hx__e) {
						$_ex_ = ($__hx__e instanceof HException) ? $__hx__e->e : $__hx__e;
						if(($e = $_ex_) instanceof haxe_io_Eof){
							break;
						} else throw $__hx__e;;
					}
					$sock->output->writeFullBytes($buf, 0, $len);
					$this->file->size -= $len;
					unset($size,$len,$e);
				}
				$sock->write("\x0D\x0A");
				$sock->write("--");
				$sock->write($boundary);
				$sock->write("--");
			}
			$this->readHttpResponse($api, $sock);
			$sock->close();
		}catch(Exception $__hx__e) {
			$_ex_ = ($__hx__e instanceof HException) ? $__hx__e->e : $__hx__e;
			$e1 = $_ex_;
			{
				try {
					$sock->close();
				}catch(Exception $__hx__e) {
					$_ex_ = ($__hx__e instanceof HException) ? $__hx__e->e : $__hx__e;
					$e2 = $_ex_;
					{}
				}
				$this->onError(Std::string($e1));
			}
		}
	}
	public function readHttpResponse($api, $sock) {
		$b = new haxe_io_BytesBuffer();
		$k = 4;
		$s = haxe_io_Bytes::alloc(4);
		$sock->setTimeout($this->cnxTimeout);
		while(true) {
			$p = $sock->input->readBytes($s, 0, $k);
			while($p !== $k) {
				$p += $sock->input->readBytes($s, $p, $k - $p);
			}
			{
				if($k < 0 || $k > $s->length) {
					throw new HException(haxe_io_Error::$OutsideBounds);
				}
				$b->b .= _hx_string_or_null(substr($s->b, 0, $k));
			}
			switch($k) {
			case 1:{
				$c = ord($s->b[0]);
				if($c === 10) {
					break 2;
				}
				if($c === 13) {
					$k = 3;
				} else {
					$k = 4;
				}
			}break;
			case 2:{
				$c1 = ord($s->b[1]);
				if($c1 === 10) {
					if(ord($s->b[0]) === 13) {
						break 2;
					}
					$k = 4;
				} else {
					if($c1 === 13) {
						$k = 3;
					} else {
						$k = 4;
					}
				}
			}break;
			case 3:{
				$c2 = ord($s->b[2]);
				if($c2 === 10) {
					if(ord($s->b[1]) !== 13) {
						$k = 4;
					} else {
						if(ord($s->b[0]) !== 10) {
							$k = 2;
						} else {
							break 2;
						}
					}
				} else {
					if($c2 === 13) {
						if(ord($s->b[1]) !== 10 || ord($s->b[0]) !== 13) {
							$k = 1;
						} else {
							$k = 3;
						}
					} else {
						$k = 4;
					}
				}
			}break;
			case 4:{
				$c3 = ord($s->b[3]);
				if($c3 === 10) {
					if(ord($s->b[2]) !== 13) {
						continue 2;
					} else {
						if(ord($s->b[1]) !== 10 || ord($s->b[0]) !== 13) {
							$k = 2;
						} else {
							break 2;
						}
					}
				} else {
					if($c3 === 13) {
						if(ord($s->b[2]) !== 10 || ord($s->b[1]) !== 13) {
							$k = 3;
						} else {
							$k = 1;
						}
					}
				}
			}break;
			}
			unset($p);
		}
		$headers = _hx_explode("\x0D\x0A", $b->getBytes()->toString());
		$response = $headers->shift();
		$rp = _hx_explode(" ", $response);
		$status = Std::parseInt($rp[1]);
		if($status === 0 || $status === null) {
			throw new HException("Response status error");
		}
		$headers->pop();
		$headers->pop();
		$this->responseHeaders = new haxe_ds_StringMap();
		$size = null;
		$chunked = false;
		{
			$_g = 0;
			while($_g < $headers->length) {
				$hline = $headers[$_g];
				++$_g;
				$a = _hx_explode(": ", $hline);
				$hname = $a->shift();
				$hval = null;
				if($a->length === 1) {
					$hval = $a[0];
				} else {
					$hval = $a->join(": ");
				}
				{
					$s1 = rtrim($hval);
					$hval = ltrim($s1);
					unset($s1);
				}
				$this->responseHeaders->set($hname, $hval);
				{
					$_g1 = strtolower($hname);
					switch($_g1) {
					case "content-length":{
						$size = Std::parseInt($hval);
					}break;
					case "transfer-encoding":{
						$chunked = strtolower($hval) === "chunked";
					}break;
					}
					unset($_g1);
				}
				unset($hval,$hname,$hline,$a);
			}
		}
		$this->onStatus($status);
		$chunk_re = new EReg("^([0-9A-Fa-f]+)[ ]*\x0D\x0A", "m");
		$this->chunk_size = null;
		$this->chunk_buf = null;
		$bufsize = 1024;
		$buf = haxe_io_Bytes::alloc($bufsize);
		if($size === null) {
			if(!$this->noShutdown) {
				$sock->shutdown(false, true);
			}
			try {
				while(true) {
					$len = $sock->input->readBytes($buf, 0, $bufsize);
					if($chunked) {
						if(!$this->readChunk($chunk_re, $api, $buf, $len)) {
							break;
						}
					} else {
						$api->writeBytes($buf, 0, $len);
					}
					unset($len);
				}
			}catch(Exception $__hx__e) {
				$_ex_ = ($__hx__e instanceof HException) ? $__hx__e->e : $__hx__e;
				if(($e = $_ex_) instanceof haxe_io_Eof){} else throw $__hx__e;;
			}
		} else {
			$api->prepare($size);
			try {
				while($size > 0) {
					$len1 = $sock->input->readBytes($buf, 0, (($size > $bufsize) ? $bufsize : $size));
					if($chunked) {
						if(!$this->readChunk($chunk_re, $api, $buf, $len1)) {
							break;
						}
					} else {
						$api->writeBytes($buf, 0, $len1);
					}
					$size -= $len1;
					unset($len1);
				}
			}catch(Exception $__hx__e) {
				$_ex_ = ($__hx__e instanceof HException) ? $__hx__e->e : $__hx__e;
				if(($e1 = $_ex_) instanceof haxe_io_Eof){
					throw new HException("Transfer aborted");
				} else throw $__hx__e;;
			}
		}
		if($chunked && ($this->chunk_size !== null || $this->chunk_buf !== null)) {
			throw new HException("Invalid chunk");
		}
		if($status < 200 || $status >= 400) {
			throw new HException("Http Error #" . _hx_string_rec($status, ""));
		}
		$api->close();
	}
	public function readChunk($chunk_re, $api, $buf, $len) {
		if($this->chunk_size === null) {
			if($this->chunk_buf !== null) {
				$b = new haxe_io_BytesBuffer();
				$b->b .= _hx_string_or_null($this->chunk_buf->b);
				{
					if($len < 0 || $len > $buf->length) {
						throw new HException(haxe_io_Error::$OutsideBounds);
					}
					$b->b .= _hx_string_or_null(substr($buf->b, 0, $len));
				}
				$buf = $b->getBytes();
				$len += $this->chunk_buf->length;
				$this->chunk_buf = null;
			}
			if($chunk_re->match($buf->toString())) {
				$p = $chunk_re->matchedPos();
				if($p->len <= $len) {
					$cstr = $chunk_re->matched(1);
					$this->chunk_size = Std::parseInt("0x" . _hx_string_or_null($cstr));
					if($cstr === "0") {
						$this->chunk_size = null;
						$this->chunk_buf = null;
						return false;
					}
					$len -= $p->len;
					return $this->readChunk($chunk_re, $api, $buf->sub($p->len, $len), $len);
				}
			}
			if($len > 10) {
				$this->onError("Invalid chunk");
				return false;
			}
			$this->chunk_buf = $buf->sub(0, $len);
			return true;
		}
		if($this->chunk_size > $len) {
			$this->chunk_size -= $len;
			$api->writeBytes($buf, 0, $len);
			return true;
		}
		$end = $this->chunk_size + 2;
		if($len >= $end) {
			if($this->chunk_size > 0) {
				$api->writeBytes($buf, 0, $this->chunk_size);
			}
			$len -= $end;
			$this->chunk_size = null;
			if($len === 0) {
				return true;
			}
			return $this->readChunk($chunk_re, $api, $buf->sub($end, $len), $len);
		}
		if($this->chunk_size > 0) {
			$api->writeBytes($buf, 0, $this->chunk_size);
		}
		$this->chunk_size -= $len;
		return true;
	}
	public function onData($data) { return call_user_func_array($this->onData, array($data)); }
	public $onData = null;
	public function onError($msg) { return call_user_func_array($this->onError, array($msg)); }
	public $onError = null;
	public function onStatus($status) { return call_user_func_array($this->onStatus, array($status)); }
	public $onStatus = null;
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
	static $PROXY = null;
	function __toString() { return 'haxe.Http'; }
}
function haxe_Http_0(&$__hx__this, &$url, $data) {
	{}
}
function haxe_Http_1(&$__hx__this, &$url, $msg) {
	{}
}
function haxe_Http_2(&$__hx__this, &$url, $status) {
	{}
}
function haxe_Http_3(&$header, &$value, $h) {
	{
		return $h->header !== $header;
	}
}
function haxe_Http_4(&$param, &$value, $p) {
	{
		return $p->param !== $param;
	}
}
function haxe_Http_5(&$_g, &$err, &$me, &$me1, &$old, &$output, &$post, $e) {
	{
		$me1->responseData = $output->getBytes()->toString();
		$err = true;
		$_g->onError = $old;
		$_g->onError($e);
	}
}
function haxe_Http_6(&$api, &$b1, &$boundary, &$data, &$host, &$method, &$multipart, &$port, &$portString, &$post, &$request, &$secure, &$sock, &$uri, &$url_regexp, $h) {
	{
		return $h->header === "Content-Type";
	}
}
