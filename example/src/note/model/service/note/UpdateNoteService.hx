package note.model.service.note;

import dia.model.service.*;
import note.model.domain.Note;
import dia.util.ObjectUtil;


typedef UpdateNoteRequest = {note:Note};
typedef UpdateNoteResponse = {note:Note};

class UpdateNoteRequester extends HttpServiceRequester<UpdateNoteRequest, UpdateNoteResponse>
{
	public function new(?url:String="", ?completeHandler:Dynamic->Void, ?failHandler:Dynamic->Void)
	{
		super(url, completeHandler, failHandler, "PUT");
	}
}

#if server
class UpdateNoteResponder extends HttpServiceResponder<UpdateNoteRequest, UpdateNoteResponse>
{
	public function handle():Void
	{
		try
		{
			var id:Int = request.note.uid;
			var note:Note = Note.manager.get(id);
			
			if(note == null)
				throw "Note not found id=" + id;
			
			ObjectUtil.updateFromData(request.note, note);
			note.update();

			
			response = {note:note};
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