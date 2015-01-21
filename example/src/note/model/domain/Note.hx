package note.model.domain;

import sys.db.Types;

class Note extends dia.model.domain.ContextDomainObject
{
	public var name:SString<255>;
	public var body:String;
	
	#if server
	public static function create(name:String, body:String):Note
	{
		var note = new Note();

		note.name = name;
		note.body = body;

		note.insert();

		return note;
	}
	#end

}