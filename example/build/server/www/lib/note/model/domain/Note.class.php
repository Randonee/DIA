<?php

class note_model_domain_Note extends dia_model_domain_ContextDomainObject {
	public function __construct() {
		if(!php_Boot::$skip_constructor) {
		parent::__construct();
	}}
	public $name;
	public $body;
	public function __getManager() {
		return note_model_domain_Note::$manager;
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
	static function create($name, $body) {
		$note1 = new note_model_domain_Note();
		$note1->name = $name;
		$note1->body = $body;
		$note1->insert();
		return $note1;
	}
	static $manager;
	function __toString() { return 'note.model.domain.Note'; }
}
note_model_domain_Note::$__meta__ = _hx_anonymous(array("obj" => _hx_anonymous(array("rtti" => (new _hx_array(array("oy4:namey4:Notey7:indexesahy9:relationsahy7:hfieldsbR0oR0R0y6:isNullfy1:tjy17:sys.db.RecordType:9:1i255gy4:bodyoR0R8R5fR6jR7:15:0gy3:uidoR0R9R5fR6jR7:0:0ghy3:keyaR9hy6:fieldsar8r4r6hg")))))));
note_model_domain_Note::$manager = new sys_db_Manager(_hx_qtype("note.model.domain.Note"));
