<?php

class note_server_Main {
	public function __construct(){}
	static function main() {
		_hx_deref(new note_server_NoteServer())->dispatchURL(php_Web::getURI());
	}
	function __toString() { return 'note.server.Main'; }
}
