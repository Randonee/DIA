package dia.util;


#if server
	typedef FileUtil = dia.util.ServerFileUtil;
#else

	import haxe.macro.Expr;
	import haxe.macro.Context;
	import Type;

	#if (!js || cordova)
		import haxe.io.Path;
		import haxe.Template;
		import dia.sys.FileSystem;
		import dia.sys.File;
		import dia.sys.FileOutput;

		#if (macro)
			import sys.io.Process;
		#end
	#end

/**
* Much of this code was modified from NME helpers
**/
class FileUtil
{

#if (!js || fileSystemClient)

	static public function createTempFile():String
	{
		var path:String = "";
		#if php
			var file = untyped __call__("tmpfile");
			var meta = untyped __call__("stream_get_meta_data", file);
			path = untyped meta["uri"];
		#end
		
		return path;
	}

	static public function cleanPath(path:String):String
	{
		path = StringTools.replace(path, '\\', '/');
		path = StringTools.replace(path, '//', '/');
		while(path.charAt(path.length-1) == "/" && path.length > 0)
			path = path.substring(0, path.length-1);
		return path;
	}

	static public function deleteDirectoryRecursive(directoryName:String, success:Void->Void, fail:Dynamic->Void):Void 
	{
		var dirExists = function(exists:Bool):Void
		{
			if(!exists)
			{
				success();
				return;
			}

			var readDirSuccess = function(files:Array<String>):Void
			{
				var index:Int = 0;
				var onItemDeleted:Void->Void = null;

				var deleteNextItem = function():Void
				{
					if(index >= files.length)
					{
						FileSystem.deleteDirectory(directoryName, success, fail);
					}
					else
					{
						var path:String = directoryName + '/' + files[index]; 

						var isDirectorySuccess = function(isDir:Bool):Void
						{
							if(isDir)
							{
								deleteDirectoryRecursive(path, onItemDeleted, fail); 
							}
								
							else
								FileSystem.deleteFile(path, onItemDeleted, fail);
						}
						FileSystem.isDirectory(path, isDirectorySuccess, fail);
					}
				}

				onItemDeleted = function():Void
				{
					++index;
					deleteNextItem();
				}

				deleteNextItem();
			}
			FileSystem.readDirectory(directoryName, readDirSuccess, fail);
		}
		directoryName = cleanPath(directoryName);
		FileSystem.exists(directoryName, dirExists, fail);
	}
	
	static public function getFileExtention(path:String):String
	{
		return Path.extension(path);
	}
	
	public static function read(path : String, success:Array<String>->Void, fail:Dynamic->Void) : Void
	{
		FileSystem.readDirectory(path, success, fail);
	}
	
	
	/**
	* Creates a directory.
	* If a directory in the path does not exist it will be created
	**/
	static public function createDirectory(path:String, success:Void->Void, fail:Dynamic->Void):Void
	{
		path = cleanPath(path);
		var parts:Array<String> = path.split("/");
		var currIndex = 0;
		var currDir = "";
		var onExists:Bool->Void = null;
		var index = 0;

		var createNextDir = function():Void
		{
			if(index != 0)
				currDir += "/";

			currDir += parts[currIndex];

			FileSystem.exists(currDir, onExists, fail);
		}

		onExists = function(exists:Bool):Void
		{
			if(!exists)
			{
				var onCreated = function():Void
				{
					++index;
					createNextDir();
				}
				FileSystem.createDirectory(currDir, onCreated, fail);
			}
			else
			{
				++index;
				createNextDir();
			}
		}

		createNextDir();
		
	}
	
	#if (!flash && !cordova)
	
	/**
	* gets a path to a haxelib
	* 
	* @param library name of haxelib
	**/
	public static function getHaxelib(library:String):String
	{
		var proc = new Process ("haxelib", ["path", library ]);
		var result = "";
		
		try
		{
			while (true)
			{
				var line = proc.stdout.readLine ();
				if (line.substr (0,1) != "-")
				{
					result = line;
					break;
				}
			}
		}
		catch (e:Dynamic) { };
		
		proc.close();
		
		if (result == "")
		{
			throw ("Could not find haxelib path  " + library + " - perhaps you need to install it?");
		}
		return result;
	}
	
	#end
	
	/**
	* Copies contents of one directoy into another. If the destination directory does not exist it will be created
	* 
	* @param sourcePath source directory
	* @param destinationPath destination directory
	* @param settings If set each file will be treated as a haxe template and the settings will be applied.
	* @param ifNewer only copy if the source is newer than the destination.
	**/
	/*public static function copyInto(sourcePath : String, destinationPath : String, ?settings:Dynamic=null, ?ifNewer:Bool=false, ?include:Array<EReg>, ?exclude:Array<EReg>) : Void 
	{
		privateCopyInto(sourcePath, destinationPath, settings, ifNewer, include, exclude);
	}*/
	
	/**
	* Copies a file
	* 
	* @param source source file
	* @param destination destination file
	* @param settings If set the file will be treated as a haxe template and the settings will be applied.
	* @param ifNewer only copy if the source is newer than the destination.
	**/
	/*public static function copyFile (source:String, destination:String, ?settings:Dynamic=null, ?ifNewer:Bool=false)
	{
		var extension:String = Path.extension (source);
		if (settings != null &&
            (extension == "xml" ||
             extension == "java" ||
             extension == "hx" ||
             extension == "hxml" ||
			 extension == "html" || 
             extension == "ini" ||
             extension == "gpe" ||
             extension == "pch" ||
             extension == "pbxproj" ||
             extension == "plist" ||
             extension == "json" ||
             extension == "cpp" ||
             extension == "mm" ||
             extension == "xib" ||
             extension == "properties"))
       {
			var fileContents:String = File.getContent (source);
			var template:Template = new Template (fileContents);
			var result:String = template.execute (settings);
			var fileOutput:FileOutput = File.write (destination, true);
			fileOutput.writeString (result);
			fileOutput.close ();
		}
		else
		{
			if(!ifNewer || (ifNewer && isNewer(source, destination)) )
				File.copy(source, destination);
		}
	}*/
	
	/**
	* Checks if file is newer than another
	* 
	* @param source source file
	* @param destination destination file
	**/
	/*public static function isNewer (source:String, destination:String):Bool
	{
		if (source == null || !FileSystem.exists (source))
		{
			return false;
		}
		
		if (FileSystem.exists (destination))
		{
			if (FileSystem.stat (source).mtime.getTime () < FileSystem.stat (destination).mtime.getTime ())
			{
				return false;
			}
		}
		return true;

	}*/
	
	/*
	private static function privateCopyInto(source:String, destination:String, ?settings:Dynamic=null, ?ifNewer:Bool=false, ?include:Array<EReg>, ?exclude:Array<EReg>) : Void
	{
		source = cleanPath(source);
		if(!FileSystem.exists(source))
			throw("Source does not exist: "+ source);
		
		destination = cleanPath(destination);
		if(!FileSystem.exists(destination))
			createDirectory(destination);
	
		var items = read(source);
		for(itemName in items)
		{
			var itemPath = source + "/" + itemName;
			
			if(itemName.charAt(0) != ".")
			{
				if(FileSystem.isDirectory(itemPath))
				{
					privateCopyInto(itemPath, destination + "/" + itemName, settings, ifNewer, include, exclude);
				} 
				else 
				{	
					if(include == null || containsMatchItem(include, itemName))
					{
						if(!containsMatchItem(exclude, itemName))
							copyFile(itemPath, destination + "/" + itemName, settings, ifNewer);
					}
				}
			}
		}	
	}
	
	static private function containsMatchItem(patterns:Array<EReg>, itemName:String):Bool
	{
		if(patterns == null)
			return false;
			
		for(pattern in patterns)
		{
			if(pattern.match(itemName))
				return true;
		}
		return false;
	}
	*/
#end
	
	macro public static function includeFileContents(fileName:Expr, ?lookInCurrentDir:Bool=true )
	{
        var fileStr = null;
        switch( fileName.expr )
        {
			case EConst(c):
				switch( c )
				{
					case CString(s): fileStr = s;
					default:
				}
			default:
        }
        
        
        if( fileStr == null )
            Context.error("Constant string expected",fileName.pos);
		
		var path:String = "";
		if(lookInCurrentDir)
		{
			path = Std.string(fileName.pos);
			path = path.substring(path.indexOf("(") + 1, path.indexOf(":")-1);
			path = path.substring(0, path.lastIndexOf("/") + 1);
		}

		if(!sys.FileSystem.exists(path + fileStr))
			Context.error("File Does not exist: " + path + fileStr, fileName.pos);
            
        return Context.makeExpr(sys.io.File.getContent(path + fileStr), fileName.pos);
	}
	
}
#end