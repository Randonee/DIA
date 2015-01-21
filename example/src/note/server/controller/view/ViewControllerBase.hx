package note.server.controller.view;

import haxe.Json;
import dia.server.Controller;
import dia.util.Settings;

#if php
import php.NativeArray;
import php.Lib;
import php.Web;
#elseif neko
import neko.Lib;
import neko.Web;
#end

using StringTools;

class ViewControllerBase extends Controller
{
	@inject public var settings:Settings;

	var viewClass:String;
	var cssFiles:Array<String>;
	var jsFiles:Array<String>;
	var coreJSFiles:Array<String>;
	var statics:Array<String>;
	var addCore:Bool;
	var htmlTemplate:String = "res/note/server/controller/view/html.mtt";
	var templateVars:Dynamic = {};


	public function new():Void
	{
		addCore = true;
		cssFiles = [];
		jsFiles = [];
		coreJSFiles = [];
		statics = [];
		super();
	}

	function showView(viewClass:String, initialData:Dynamic):Void
	{

		jsFiles.push("script/jquery.js");

		if(addCore)
		{
			jsFiles.push("script/setup.js");
			jsFiles.push("script/script.js");
		}
		jsFiles = jsFiles.concat(coreJSFiles);
		jsFiles = jsFiles.concat(statics);
		jsFiles.push("script/statics.js");

		

		var base = settings.get("server.baseURL").value;

		var jsIncludes = "";
		for(file in jsFiles)
			jsIncludes += '<script type="text/javascript" src="' + base + file +'" ></script>\n';

		var cssIncludes = "";
		for(file in cssFiles)
			cssIncludes += '<link rel="StyleSheet" href="' + base + file + '" />\n';


		try{
			initialData.clientIp = Web.getClientIP();
			var str:String = sys.io.File.getContent(Web.getCwd() + htmlTemplate);
			var t = new haxe.Template(str);
			var data:String = haxe.Json.stringify(dia.util.ConversionUtil.toTransferObject(initialData));
			data = data.replace('\\', '\\\\');
			data = data.replace("'", "\\'");
			templateVars.addCore = addCore;
			templateVars.baseURL = settings.get("server.baseURL").value;
			templateVars.mainCss = cssIncludes;
			templateVars.mainJs = jsIncludes;
			templateVars.viewClass = viewClass;
			templateVars.initialData = data;

	        var output = t.execute(templateVars);
	        Lib.print(output);
		
		}catch(error:String)
		{
			trace(error);
		}
	}

	function addCssFile(url:String):Void
	{
		cssFiles.push(url);
	}

	function addJsFile(url:String):Void
	{
		jsFiles.push(url);
	}

	function addCoreJS(path:String):Void
	{
		coreJSFiles.push("script/" + path + ".js");
		if(sys.FileSystem.exists("script/" + path + '_statics.js'))
			statics.push("script/" + path + "_statics.js");


		if(sys.FileSystem.exists("res/" + path + '.css'))
			cssFiles.push("res/" + path + ".css");	
	}

	function getMinUrl(files:Array<String>):String
	{
		var base = settings.get("server.baseURL").value;
		var url = "";
		for(file in files)
			url += file + ",";

		return url.substring(0, url.length-1);
	}
	
	function getLessonContentId():Int
    {
		return getIdOfType("lessoncontent");
    }
    
    function getIdOfType(type:String):Int
    {
    	var parts = Web.getURI().split("/");
		
		for(a in 0...parts.length)
		{
			if(parts[a] == type && a + 1 < parts.length)
				return Std.parseInt(parts[a+1]);
		}
		return -1;
    }
}