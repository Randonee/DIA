package dia.util;

import haxe.xml.Fast;
import haxe.io.Path;

import haxe.macro.Expr;
import haxe.macro.Context;

#if flash
import air.sys.FileSystem;
import air.sys.File;
#elseif !js
import sys.FileSystem;
import sys.io.File;
#end


class Setting
{
	public var name(default, default):String;
	public var value(default, default):String;
	public var children(default, null):Map<String, Setting>;
	
	public function new(?name:String="", ?value:String="")
	{
		this.name = name;
		this.value = value;
		children = new Map();
	}
}

class Settings
{
	var _rootSetting:Setting;

	public function new()
	{
		_rootSetting = new Setting("root", "");
	}
	
	public function add(path:String, value:String):Setting
	{
		return addSettingRecursive(_rootSetting, path.split("."), value);
	}
	
	private function addSettingRecursive(setting:Setting, path:Array<String>, value:String):Setting
	{
		if(path.length == 0)
			return null;
	
		var newSetting:Setting = setting.children.get(path[0]);
		if(newSetting == null)
		{
			newSetting = new Setting(path[0]);
			setting.children.set(path[0], newSetting);
		}
		
		if(path.length == 1)
		{
			newSetting.value = value;
			return newSetting;
		}
		
		return addSettingRecursive(newSetting, path.slice(1), value);
	}
	
	public function get(path:String):Setting
	{
		var setting = getSettingRecursive(_rootSetting, path.split("."));
		if(setting == null)
			throw "Settings path not found: " + path;
		
		return setting;
	}
	
	private function getSettingRecursive(setting:Setting, path:Array<String>):Setting
	{
		if(path.length == 0)
			return setting;
	
		for(a in 0...path.length)
		{
			var foundSetting:Setting = setting.children.get(path[a]);
			if(foundSetting == null)
				return null;
			else
			{
				foundSetting = getSettingRecursive(foundSetting, path.slice(1));
				if(foundSetting != null)
					return foundSetting;
			}
		}
		return null;
	}
	
	public function readXMLSettings(xmlString:String):Void
	{
		if(xmlString == "")
			return;
		var xml:Xml = Xml.parse(xmlString);
		var fastXML:Fast = new  Fast(xml.firstElement());
		
		readXMLSettingsRecursive(fastXML, []);
	}
	
	
	public function readXMLSettingsRecursive(xml:Fast, path:Array<String>):Void
	{
		var count:Int = 0;
		for(node in xml.elements)
		{
			++count;
			var arr:Array<String> = path.copy();
			arr.push(xml.name);
			readXMLSettingsRecursive(node, arr);
		}
		
		if(count == 0)
		{
			var arr:Array<String> = path.copy();
			arr.push(xml.name);
			add(arr.join("."), xml.innerHTML);
		}
	}
	
	#if !js

	public function loadSettingsFiles(path:String, baseName:String):Void
	{
		readXMLSettings(Settings.getFileContent(path + baseName + ".xml"));
		readXMLSettings(Settings.getFileContent(path + baseName + "_deploy.xml"));
		readXMLSettings(Settings.getFileContent(path + baseName + "_dev.xml"));
	}

    static public function getFileContent(filePath:String):String
    {
		var content:String = "";
		if(FileSystem.exists(filePath))
			content = File.getContent(filePath);
			
		return content;
    }
    #end
    
    
}
