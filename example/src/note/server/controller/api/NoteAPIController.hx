package note.server.controller.api;

import note.model.service.note.AddNoteService;
import note.model.service.note.UpdateNoteService;
import note.model.service.note.DeleteNoteService;

import haxe.Json;
#if php
import php.Lib;
import php.Web;
#elseif neko
import neko.Lib;
import neko.Web;
#end

import dia.util.Settings;

class NoteAPIController extends dia.server.Controller
{
	@inject public var settings:Settings;

	override public function handleRequest():Void
	{
		var uri:String = Web.getURI();

		var method:String;
		var params:Map<String, String> = Web.getParams();
		
		if(params.exists("method"))
			method = params.get("method").toUpperCase();
		else
			method = Web.getMethod().toUpperCase();
		
		switch(method)
		{
			case "GET":

			case "POST":
		    	var complete = function(responder:AddNoteResponder):Void {respond(responder.response);}
		    	var fail = function(responder:AddNoteResponder):Void {fail(responder.error.code, responder.error.message);}
		    	var responder = new AddNoteResponder(complete, fail);
		    	responder.handle();
			case "PUT":
		    	var complete = function(responder:UpdateNoteResponder):Void {respond(responder.response);}
		    	var fail = function(responder:UpdateNoteResponder):Void {fail(responder.error.code, responder.error.message);}
		    	var responder = new UpdateNoteResponder(complete, fail);
		    	responder.handle();
			case "DELETE":
				var complete = function(responder:DeleteNoteResponder):Void {respond(responder.response);}
		    	var fail = function(responder:DeleteNoteResponder):Void {fail(responder.error.code, responder.error.message);}
		    	var responder = new DeleteNoteResponder(complete, fail);
		    	responder.handle();
			case _:
				Web.setReturnCode(401);
		}
	}
}