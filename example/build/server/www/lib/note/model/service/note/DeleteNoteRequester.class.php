<?php

class note_model_service_note_DeleteNoteRequester extends dia_model_service_HttpServiceRequester {
	public function __construct($url = null, $completeHandler = null, $failHandler = null) { if(!php_Boot::$skip_constructor) {
		if($url === null) {
			$url = "";
		}
		parent::__construct($url,$completeHandler,$failHandler,"DELETE");
	}}
	function __toString() { return 'note.model.service.note.DeleteNoteRequester'; }
}
