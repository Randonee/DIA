<?php

class dia_model_domain_ContextDomainObject extends dia_model_domain_SpodDomainObject {
	public function __construct() { if(!php_Boot::$skip_constructor) {
		parent::__construct();
	}}
	public function __getManager() {
		return dia_model_domain_ContextDomainObject::$manager;
	}
	static function __meta__() { $args = func_get_args(); return call_user_func_array(self::$__meta__, $args); }
	static $__meta__;
	static $manager;
	function __toString() { return 'dia.model.domain.ContextDomainObject'; }
}
dia_model_domain_ContextDomainObject::$__meta__ = _hx_anonymous(array("obj" => _hx_anonymous(array("rtti" => (new _hx_array(array("oy4:namey19:ContextDomainObjecty7:indexesahy9:relationsahy7:hfieldsby3:uidoR0R5y6:isNullfy1:tjy17:sys.db.RecordType:0:0ghy3:keyaR5hy6:fieldsar4hg")))))));
dia_model_domain_ContextDomainObject::$manager = new sys_db_Manager(_hx_qtype("dia.model.domain.ContextDomainObject"));
