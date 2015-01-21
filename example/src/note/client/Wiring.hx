package note.client;

import haxe.macro.Expr;
import dia.client.Wires;

class Wiring
{

	macro static function build(): Array<Field>
	{
		//map signals

		Wires.add("AddNote", [["name","String"], ["body","String"]], [["note", "note.model.domain.Note"]], "note.client.command.note");
		Wires.add("UpdateNote", [["note","note.model.domain.Note"]], [["note", "note.model.domain.Note"]], "note.client.command.note");
		Wires.add("DeleteNote", [["noteId","Int"]], [["noteId", "Int"]], "note.client.command.note");

		Wires.create();

		return haxe.macro.Context.getBuildFields();
	}

}

