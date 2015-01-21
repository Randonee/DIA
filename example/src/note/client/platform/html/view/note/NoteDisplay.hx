package note.client.platform.html.view.note;

import note.model.domain.*;
import dia.client.hap.*;
import dia.client.notice.Notice;
import dia.client.notice.*;
import dia.client.event.ViewEvent;
import js.html.*;
import msignal.Signal;


@:external
@:expose
class NoteDisplay extends dia.js.JSView
{
	static var TEMPLATE:String = "NoteDisplay.mtt";

	var note:Note;

	var nameInput:InputElement;
	var bodyText:InputElement;

	public function new(props:Dynamic)
	{
		super(TEMPLATE, props);

		nameInput = untyped getElement("nameInput");
		bodyText = untyped getElement("bodyText");
	}

	public function update(note:Note):Void
	{
		this.note = note;

		nameInput.value = note.name;
		bodyText.value = note.body;
	}

	public function onUpdateNote():Void
	{
		note.name = nameInput.value;
		note.body = bodyText.value;

		signal.dispatch(UpdateNoteHap(new UpdateNoteHapData(note)));
	}
}