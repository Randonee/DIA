<?php

class note_model_service_note_DeleteNoteResponder extends dia_model_service_HttpServiceResponder {
	public function __construct($completeHandler = null, $failHandler = null) { if(!php_Boot::$skip_constructor) {
		parent::__construct($completeHandler,$failHandler);
	}}
	public function handle() {
		try {
			$id = $this->request->noteId;
			$note1 = note_model_domain_Note::$manager->unsafeGet($id, true);
			if($note1 === null) {
				throw new HException("Note not found id=" . _hx_string_rec($id, ""));
			}
			$note1->delete();
			$this->response = _hx_anonymous(array("noteId" => $id));
			$this->finishSuccess();
		}catch(Exception $__hx__e) {
			$_ex_ = ($__hx__e instanceof HException) ? $__hx__e->e : $__hx__e;
			$error = $_ex_;
			{
				$this->error = _hx_anonymous(array("code" => 500, "message" => $error));
				$this->finishFail();
			}
		}
	}
	function __toString() { return 'note.model.service.note.DeleteNoteResponder'; }
}
