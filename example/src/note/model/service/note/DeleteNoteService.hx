package note.model.service.note;

import dia.model.service.*;
import note.model.domain.Note;
import dia.util.ObjectUtil;


typedef DeleteNoteRequest = {noteId:Int};
typedef DeleteNoteResponse = {noteId:Int};

class DeleteNoteRequester extends HttpServiceRequester<DeleteNoteRequest, DeleteNoteResponse>
{
	public function new(?url:String="", ?completeHandler:Dynamic->Void, ?failHandler:Dynamic->Void)
	{
		super(url, completeHandler, failHandler, "DELETE");
	}
}

#if server
class DeleteNoteResponder extends HttpServiceResponder<DeleteNoteRequest, DeleteNoteResponse>
{
	public function handle():Void
	{
		try
		{
			var id:Int = request.noteId;
			var note:Note = Note.manager.get(id);

			if(note == null)
				throw "Note not found id=" + id;


			note.delete();

			response = {noteId:id};
			finishSuccess();
		}
		catch(error:Dynamic)
		{
			this.error = {code:500, message:error};
			finishFail();
		}
	}
}
#end