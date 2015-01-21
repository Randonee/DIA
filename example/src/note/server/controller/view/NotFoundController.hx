package note.server.controller.view;

import note.model.service.auth.update.*;
import dia.model.service.*;

import haxe.Json;

#if php
import php.NativeArray;
import php.Lib;
import php.Web;
#elseif neko
import neko.Lib;
import neko.Web;
#end


import dia.util.Settings;

class NotFoundController extends dia.server.Controller
{
	@inject public var settings:Settings;
	
	override public function handleRequest():Void
	{
		Web.setReturnCode(404);
		Lib.println("Oops. Something your looking for is not here. Maybe url is wrong?");
	}
}