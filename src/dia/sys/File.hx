package dia.sys;


#if server
typedef File = sys.io.File;
#elseif (cordova && !macro)
typedef File = cordova.sys.File;
#else

#if macro
typedef LocalFile = sys.io.File;
#elseif flash
typedef LocalFile = air.sys.File;
#elseif (cordova && !macro)
typedef LocalFile = cordova.sys.File;
#else
typedef LocalFile = sys.io.File;
#end


class File
{
	#if flash
	static public var applicationDirectory(get_applicationDirectory, null):String;
	static private function get_applicationDirectory():String
	{
		return flash.filesystem.File.applicationDirectory.nativePath;
	}

	static public var documentsDirectory(get_documentsDirectory, null):String;
	static private function get_documentsDirectory():String
	{
		return flash.filesystem.File.documentsDirectory.nativePath;
	}
	#end


	static public function getContent(path:String, success:String->Void, fail:Dynamic->Void):Void
	{
		#if (cordova && !macro)
		#else
			success(LocalFile.getContent(path));
		#end
	}
	
	static public function saveContent(path:String, content:String, success:Void->Void, fail:Dynamic->Void):Void
	{
		#if (cordova && !macro)
		#else
			LocalFile.saveContent(path, content);
			success();
		#end
	}
	
	static public function write(path:String, binary:Bool, success:FileOutput->Void, fail:Dynamic->Void):Void
	{
		#if (cordova && !macro)
		#else
			success(LocalFile.write(path, binary));
		#end
	}
	
	static public function copy(srcPath:String, dstPath:String, success:Void->Void, fail:Dynamic->Void):Void
	{
		#if (cordova && !macro)
		#else
			LocalFile.copy(srcPath, dstPath);
			success();
		#end
	}
	
	static public function read(path:String, binary:Bool, success:FileInput->Void, fail:Dynamic->Void):Void
	{
		#if (cordova && !macro)
		#else
			success(LocalFile.read(path, binary));
		#end
	}
	
	/*
	static public function append(path:String, binary:Bool):FileOutput
	{
	}
	
	
	
	static public function getBytes(path:String):Bytes
	{
	}
	
	
	
	
	static public function saveBytes(path:String, bytes:Bytes):Void
	{
	}
	
	*/
}

#end