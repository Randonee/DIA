package note.client.platform.html.view.note;

import note.model.domain.*;

#if js
import dia.client.hap.*;
import dia.util.FileUtil;
import dia.client.notice.Notice;
import dia.client.notice.*;
import dia.client.event.ViewEvent;

import msignal.Signal;
#end

using dia.util.CollectionUtil;

#if js
@:external
@:expose
class NoteView extends dia.js.JSView
{
	static var TEMPLATE:String = "NoteView.mtt";

	var notes:Array<Note>;

	public function new(props:Dynamic)
	{
		super(TEMPLATE, props);
		refreshList();
	}

	function hideViews():Void
	{
	}

	override public function handleNotice(notice:Notice):Void
	{
		switch(notice)
		{
			case AddNoteNotice(data, status):
				notes.push(data.note);

			case DeleteNoteNotice(data, status):
				notes.removeById(data.noteId);

			case UpdateNoteNotice(data, status):
				var note = notes.getById(data.note.uid);
				note.name = data.note.name;
				note.body = data.note.body;
			case _:
		}
		refreshList();
		super.handleNotice(notice);
	}

	function refreshList():Void
	{
		var list = "<ul>";
		for(note in notes)
		{
			list += '<li><a href="javascript:;" onclick="' + view + '.onListItemClick(' + note.uid + ')">' + note.name + '</a> <a href="javascript:;" onclick="' + view + '.onDeleteNote(' + note.uid + ')">(delete)</a> </li>';
		}
		list += "</ul>";
		getElement("notesList").innerHTML = list;
	}

	function onDeleteNote(noteId:Int):Void
	{
		signal.dispatch(DeleteNoteHap(new DeleteNoteHapData(noteId)));
	}

	function onListItemClick(noteId:Int):Void
	{
		noteDisplay.visible = true;
		noteDisplay.update(notes.getById(noteId));
	}

	function onAddNote():Void
	{
		signal.dispatch(AddNoteHap(new AddNoteHapData("New Note", "")));
	}

}
#end