<?php

class dia_model_domain_SpodDomainObject extends sys_db_Object implements dia_model_domain_IDomainObject{
	public function __construct() {
		if(!php_Boot::$skip_constructor) {
		parent::__construct();
	}}
	public $uid;
	public function equals($obj) {
		return $obj->uid === $this->uid;
	}
	public function __getManager() {
		return dia_model_domain_SpodDomainObject::$manager;
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
	static $manager;
	function __toString() { return 'dia.model.domain.SpodDomainObject'; }
}
dia_model_domain_SpodDomainObject::$__meta__ = _hx_anonymous(array("obj" => _hx_anonymous(array("rtti" => (new _hx_array(array("oy4:namey16:SpodDomainObjecty7:indexesahy9:relationsahy7:hfieldsby3:uidoR0R5y6:isNullfy1:tjy17:sys.db.RecordType:0:0ghy3:keyaR5hy6:fieldsar4hg")))))));
dia_model_domain_SpodDomainObject::$manager = new sys_db_Manager(_hx_qtype("dia.model.domain.SpodDomainObject"));
