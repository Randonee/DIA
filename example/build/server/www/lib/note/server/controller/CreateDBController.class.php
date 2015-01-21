<?php

class note_server_controller_CreateDBController extends dia_server_Controller {
	public function __construct() { if(!php_Boot::$skip_constructor) {
		parent::__construct();
	}}
	public function handleRequest() {
		$tables = (new _hx_array(array(_hx_qtype("note.model.domain.Note"))));
		{
			$_g = 0;
			while($_g < $tables->length) {
				$table = $tables[$_g];
				++$_g;
				$manager = Reflect::field($table, "manager");
				if(!sys_db_TableCreate::exists($manager)) {
					sys_db_TableCreate::create($manager, null);
				}
				unset($table,$manager);
			}
		}
	}
	function __toString() { return 'note.server.controller.CreateDBController'; }
}
