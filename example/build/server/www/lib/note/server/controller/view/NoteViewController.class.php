<?php

class note_server_controller_view_NoteViewController extends note_server_controller_view_ViewControllerBase {
	public function __construct() { if(!php_Boot::$skip_constructor) {
		parent::__construct();
	}}
	public function handleRequest() {
		$data = _hx_anonymous(array());
		try {
			$data->notes = Lambda::harray(note_model_domain_Note::$manager->unsafeObjects("SELECT * FROM Note WHERE uid>0", true));
		}catch(Exception $__hx__e) {
			$_ex_ = ($__hx__e instanceof HException) ? $__hx__e->e : $__hx__e;
			$error = $_ex_;
			{
				haxe_Log::trace($error, _hx_anonymous(array("fileName" => "NoteViewController.hx", "lineNumber" => 31, "className" => "note.server.controller.view.NoteViewController", "methodName" => "handleRequest")));
			}
		}
		$this->addCssFile("style/comon.css");
		$this->addCoreJS("note/client/platform/html/view/note/NoteView");
		$this->addCoreJS("note/client/platform/html/view/note/Header");
		$this->addCoreJS("note/client/platform/html/view/note/NoteDisplay");
		$this->showView("note.client.platform.html.view.note.NoteView", $data);
	}
	function __toString() { return 'note.server.controller.view.NoteViewController'; }
}
