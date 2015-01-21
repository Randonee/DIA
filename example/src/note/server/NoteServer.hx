package note.server;

import dia.server.ServerContext;

import note.server.controller.*;
import note.server.precondition.*;
import note.server.controller.api.*;
import note.server.controller.view.*;
import note.model.domain.*;
import dia.util.Settings;


using StringTools;

#if php
import php.Lib;
import php.Web;
#elseif neko
import neko.Lib;
import neko.Web;
#end

import sys.FileSystem;

class NoteServer extends ServerContext
{

	public function new()
	{
		try
		{
			super();
		}
		catch(error:Dynamic)
		{
			untyped __call__("error_log", error);
			throw(error);
		}
	}

	override public function dispatchURL(url:String):Void
	{
		try
		{
			super.dispatchURL(url);
		}
		catch(error:Dynamic)
		{
			Web.setHeader("Message", error);
    		Web.setReturnCode(500);
    		throw(error);
		}
	}

	override private function init():Void
	{
		injector.mapSingleton(Settings);
		config();
	   
	    var uri:String = Web.getURI();

		//API
		addURLMapping(~/api\/note.*/, NoteAPIController, []);
		

		addURLMapping(~/admin\/createdb\/?$/, CreateDBController);
		
		//views
		addURLMapping(~/note\/$/, NoteViewController, []);

		
		var settings:Settings = injector.getInstance(Settings);
		var base:String = settings.get("server.baseURL").value;
		base = base.substr(base.indexOf(Web.getHostName()));
		base = base.substr(base.indexOf("/") + 1);
		if(base.charAt(base.length - 1) == "/")
			base = base.substr(0, base.length - 1);

		base = "^\\/{0,1}" + base + "\\/*$";
		var r = new EReg(base, "");
		//addURLMapping(r, LoginViewController, []);

		addURLMapping(~/.*/, NotFoundController);
	}
	
	private function config():Void
	{
		var settings:Settings = injector.getInstance(Settings);
		
		var baseDir = Web.getCwd();

		var privateSettings = baseDir + "../settings/";
		var publicSettings = baseDir + "settings/";

		settings.loadSettingsFiles(privateSettings + "db/", "db");
		settings.loadSettingsFiles(privateSettings + "email/", "email");
		settings.loadSettingsFiles(publicSettings + "server/", "server");
		settings.loadSettingsFiles(publicSettings + "service/", "service");
    	
    	var dbSettings:Setting = settings.get("server.db");

    	try
    	{
	    	var cnx = sys.db.Mysql.connect(
			{
			   host : dbSettings.children.get('host').value,
			   port : Std.parseInt(dbSettings.children.get('port').value),
			   user : dbSettings.children.get('user').value,
			   pass : dbSettings.children.get('password').value,
			   database : dbSettings.children.get('database').value,
			  // socket : dbSettings.children.get('socket').value,
			  
			});
			sys.db.Manager.cnx = cnx;
			sys.db.Manager.initialize();
		}
		catch(error:Dynamic)
		{
			throw error;
		}
		
    }
}