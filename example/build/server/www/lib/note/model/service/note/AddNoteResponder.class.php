<?php

class note_model_service_note_AddNoteResponder extends dia_model_service_HttpServiceResponder {
	public function __construct($completeHandler = null, $failHandler = null) { if(!php_Boot::$skip_constructor) {
		parent::__construct($completeHandler,$failHandler);
	}}
	public function handle() {
		try {
			$note1 = note_model_domain_Note::create($this->request->name, $this->request->body);
			if($note1 !== null) {
				$this->response = _hx_anonymous(array("note" => $note1));
				$this->finishSuccess();
				return;
			}
			$this->error = _hx_anonymous(array("code" => 500, "message" => ""));
			$this->finishFail();
		}catch(Exception $__hx__e) {
			$_ex_ = ($__hx__e instanceof HException) ? $__hx__e->e : $__hx__e;
			$e = $_ex_;
			{
				$this->error = _hx_anonymous(array("code" => 500, "message" => Std::string($e)));
				$this->finishFail();
			}
		}
	}
	function __toString() { return 'note.model.service.note.AddNoteResponder'; }
}
