package note.client.command.note;

import note.model.service.note.DeleteNoteService;
import dia.util.Settings;
import note.model.domain.Note;
import dia.client.notice.Notice;
import dia.client.notice.*;
import dia.client.NoticeStatus;
import dia.client.notice.*;
import dia.client.hap.Hap;
import dia.client.hap.*;

class DeleteNoteCommand extends dia.client.Command
{
	@inject public var settings:Settings;
	@inject public var data:DeleteNoteHapData;
	
	private var requester:DeleteNoteRequester;

	override public function execute():Void
	{
		var complete = function(requester:DeleteNoteRequester):Void
		{
			var notice:Notice = DeleteNoteNotice(new DeleteNoteNoticeData(requester.response.noteId), new NoticeStatus(200));
			app.notify(notice);
		}
		
		var fail = function(requester:DeleteNoteRequester):Void
		{
			var notice:Notice = DeleteNoteNotice(new DeleteNoteNoticeData(data.noteId), new NoticeStatus(requester.status, requester.error));
			app.notify(notice);
		}
		requester = new DeleteNoteRequester(settings.get("server.baseURL").value + settings.get("service.api.note.uri").value, complete, fail);
		requester.call({noteId:data.noteId});
	}
}