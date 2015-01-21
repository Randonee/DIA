package dia.sys;

#if server
typedef FileSystem = sys.FileSystem;
#else

#if flash
typedef LocalFileSystem = air.sys.FileSystem;
#elseif (cordova && !macro)
typedef LocalFileSystem = cordova.sys.FileSystem;
#else
typedef LocalFileSystem = sys.FileSystem;
#end


class FileSystem
{
	static public function createDirectory(path:String, success:Void->Void, fail:Dynamic->Void):Void
	{
		LocalFileSystem.createDirectory(path);
		success();
	}
	
	static public function deleteDirectory(path:String, success:Void->Void, fail:Dynamic->Void):Void
	{
		LocalFileSystem.deleteDirectory(path);
		success();
	}
	
	static public function deleteFile(path:String, success:Void->Void, fail:Dynamic->Void):Void
	{		
		LocalFileSystem.deleteFile(path);
		success();
	}
	
	static public function exists(path:String, success:Bool->Void, fail:Dynamic->Void):Void
	{
		success(LocalFileSystem.exists(path));
	}
	
	static public function fullPath(relPath:String, success:String->Void, fail:Dynamic->Void):Void
	{
		success(LocalFileSystem.fullPath(relPath));
	}
	
	static public function isDirectory(path:String, success:Bool->Void, fail:Dynamic->Void):Void
	{	
		success(LocalFileSystem.isDirectory(path));
	}
	
	static public function readDirectory(path:String, success:Array<String>->Void, fail:Dynamic->Void):Void
	{	
		success(LocalFileSystem.readDirectory(path));
	}
	
	static public function rename(path:String, newPath:String, success:Void->Void, fail:Dynamic->Void):Void
	{	
		LocalFileSystem.rename(path, newPath);
		success();
	}
}

#end