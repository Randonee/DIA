package note.server.controller;

import note.model.domain.*;
import note.model.domain.auth.*;

import note.model.service.note.AddNoteService;

class CreateDBController extends dia.server.Controller
{
    override public function handleRequest() : Void
    {
    	var tables:Array<Dynamic> = [Note];
    
		for(table in tables)
		{
			var manager = Reflect.field(table, "manager");
			
			if ( !sys.db.TableCreate.exists(manager) )
				sys.db.TableCreate.create(manager);
		}
		
		
    }
}