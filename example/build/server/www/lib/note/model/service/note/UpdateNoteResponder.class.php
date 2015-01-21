<?php

class note_model_service_note_UpdateNoteResponder extends dia_model_service_HttpServiceResponder {
	public function __construct($completeHandler = null, $failHandler = null) { if(!php_Boot::$skip_constructor) {
		parent::__construct($completeHandler,$failHandler);
	}}
	public function handle() {
		try {
			$id = $this->request->note->uid;
			$note1 = note_model_domain_Note::$manager->unsafeGet($id, true);
			if($note1 === null) {
				throw new HException("Note not found id=" . _hx_string_rec($id, ""));
			}
			dia_util_ObjectUtil::updateFromData($this->request->note, $note1, null);
			$note1->update();
			$this->response = _hx_anonymous(array("note" => $note1));
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
	function __toString() { return 'note.model.service.note.UpdateNoteResponder'; }
}
