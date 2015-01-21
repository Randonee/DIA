package note.client.command.note;

import note.model.service.note.UpdateNoteService;
import dia.util.Settings;
import note.model.domain.Note;
import dia.client.notice.Notice;
import dia.client.notice.*;
import dia.client.NoticeStatus;
import dia.client.notice.*;
import dia.client.hap.Hap;
import dia.client.hap.*;

class UpdateNoteCommand extends dia.client.Command
{
	@inject public var settings:Settings;
	@inject public var data:UpdateNoteHapData;
	
	private var requester:UpdateNoteRequester;

	override public function execute():Void
	{
		var complete = function(requester:UpdateNoteRequester):Void
		{
			var notice:Notice = UpdateNoteNotice(new UpdateNoteNoticeData(requester.response.note), new NoticeStatus(200));
			app.notify(notice);
		}
		
		var fail = function(requester:UpdateNoteRequester):Void
		{
			var notice:Notice = UpdateNoteNotice(new UpdateNoteNoticeData(data.note), new NoticeStatus(requester.status, requester.error));
			app.notify(notice);
		}
		
		requester = new UpdateNoteRequester(settings.get("server.baseURL").value + settings.get("service.api.note.uri").value, complete, fail);
		requester.call({note:data.note});
	}
}