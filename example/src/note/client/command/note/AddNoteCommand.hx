package note.client.command.note;

import note.model.service.note.AddNoteService;
import note.model.domain.Note;
import dia.util.Settings;
import dia.client.notice.Notice;
import dia.client.notice.*;
import dia.client.NoticeStatus;
import dia.client.notice.*;
import dia.client.hap.Hap;
import dia.client.hap.*;

class AddNoteCommand extends dia.client.Command
{
	@inject public var settings:Settings;
	@inject public var data:AddNoteHapData;
	
	private var requester:AddNoteRequester;

	override public function execute():Void
	{
		var complete = function(requester:AddNoteRequester):Void
		{
			var notice:Notice = AddNoteNotice(new AddNoteNoticeData(requester.response.note), new NoticeStatus(200));
			app.notify(notice);
		}
		
		var fail = function(requester:AddNoteRequester):Void
		{
			var notice:Notice = AddNoteNotice(new AddNoteNoticeData(null), new NoticeStatus(requester.status, requester.error));
			app.notify(notice);
		}
		requester = new AddNoteRequester(settings.get("server.baseURL").value + settings.get("service.api.note.uri").value, complete, fail);
		requester.call({name:data.name, body:data.body});
	}
}