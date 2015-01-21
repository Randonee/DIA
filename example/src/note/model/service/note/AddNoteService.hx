package note.model.service.note;

import note.model.domain.Note;
import dia.model.service.*;
import dia.app.model.domain.*;
import note.model.domain.*;
import dia.http.HttpStatusCodes;


typedef AddNoteRequest = {name:String, body:String}
typedef AddNoteResponse = {note:Note};

class AddNoteRequester extends HttpServiceRequester<AddNoteRequest, AddNoteResponse>
{
	public function new(?url:String="", ?completeHandler:Dynamic->Void, ?failHandler:Dynamic->Void)
	{
		super(url, completeHandler, failHandler, "POST");
	}
}

#if server
class AddNoteResponder extends HttpServiceResponder<AddNoteRequest, AddNoteResponse>
{
	public function handle():Void
	{
		try
		{
			var note = Note.create(request.name, request.body);

			if(note != null)
			{
				response = {note:note};
				finishSuccess();
				return;
			}

			error = {code:HttpStatusCodes.INTERNAL_SERVER_ERROR, message:""};
			finishFail();
		}
		catch(e:Dynamic)
		{
			error = {code:HttpStatusCodes.INTERNAL_SERVER_ERROR, message:Std.string(e)};
			finishFail();
		}	
	}
}
#end