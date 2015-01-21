<?php

class note_server_NoteServer extends dia_server_ServerContext {
	public function __construct() { if(!php_Boot::$skip_constructor) {
		try {
			parent::__construct();
		}catch(Exception $__hx__e) {
			$_ex_ = ($__hx__e instanceof HException) ? $__hx__e->e : $__hx__e;
			$error = $_ex_;
			{
				error_log($error);
				throw new HException($error);
			}
		}
	}}
	public function dispatchURL($url) {
		try {
			parent::dispatchURL($url);
		}catch(Exception $__hx__e) {
			$_ex_ = ($__hx__e instanceof HException) ? $__hx__e->e : $__hx__e;
			$error = $_ex_;
			{
				{
					$v = $error;
					header("Message" . ": " . _hx_string_or_null($v));
				}
				php_Web::setReturnCode(500);
				throw new HException($error);
			}
		}
	}
	public function init() {
		$this->injector->mapSingleton(_hx_qtype("dia.util.Settings"), null);
		$this->config();
		$uri = php_Web::getURI();
		$this->addURLMapping(new EReg("api/note.*", ""), _hx_qtype("note.server.controller.api.NoteAPIController"), (new _hx_array(array())));
		$this->addURLMapping(new EReg("admin/createdb/?\$", ""), _hx_qtype("note.server.controller.CreateDBController"), null);
		$this->addURLMapping(new EReg("note/\$", ""), _hx_qtype("note.server.controller.view.NoteViewController"), (new _hx_array(array())));
		$settings = $this->injector->getInstance(_hx_qtype("dia.util.Settings"), null);
		$base = $settings->get("server.baseURL")->value;
		$base = _hx_substr($base, _hx_index_of($base, $_SERVER['SERVER_NAME'], null), null);
		$base = _hx_substr($base, _hx_index_of($base, "/", null) + 1, null);
		if(_hx_char_at($base, strlen($base) - 1) === "/") {
			$base = _hx_substr($base, 0, strlen($base) - 1);
		}
		$base = "^\\/{0,1}" . _hx_string_or_null($base) . "\\/*\$";
		$r = new EReg($base, "");
		$this->addURLMapping(new EReg(".*", ""), _hx_qtype("note.server.controller.view.NotFoundController"), null);
	}
	public function config() {
		$settings = $this->injector->getInstance(_hx_qtype("dia.util.Settings"), null);
		$baseDir = _hx_string_or_null(dirname($_SERVER["SCRIPT_FILENAME"])) . "/";
		$privateSettings = _hx_string_or_null($baseDir) . "../settings/";
		$publicSettings = _hx_string_or_null($baseDir) . "settings/";
		$settings->loadSettingsFiles(_hx_string_or_null($privateSettings) . "db/", "db");
		$settings->loadSettingsFiles(_hx_string_or_null($privateSettings) . "email/", "email");
		$settings->loadSettingsFiles(_hx_string_or_null($publicSettings) . "server/", "server");
		$settings->loadSettingsFiles(_hx_string_or_null($publicSettings) . "service/", "service");
		$dbSettings = $settings->get("server.db");
		try {
			$cnx = sys_db_Mysql::connect(_hx_anonymous(array("host" => $dbSettings->children->get("host")->value, "port" => Std::parseInt($dbSettings->children->get("port")->value), "user" => $dbSettings->children->get("user")->value, "pass" => $dbSettings->children->get("password")->value, "database" => $dbSettings->children->get("database")->value)));
			sys_db_Manager::set_cnx($cnx);
			sys_db_Manager::initialize();
		}catch(Exception $__hx__e) {
			$_ex_ = ($__hx__e instanceof HException) ? $__hx__e->e : $__hx__e;
			$error = $_ex_;
			{
				throw new HException($error);
			}
		}
	}
	function __toString() { return 'note.server.NoteServer'; }
}
