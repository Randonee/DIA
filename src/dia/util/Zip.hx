package dia.util;

import haxe.zip.Entry;
import haxe.io.Bytes;

#if flash
import air.sys.FileSystem;
import air.sys.File;
#elseif cordova
import cordova.sys.FileSystem;
import cordova.sys.File;
#else
import sys.FileSystem;
import sys.io.File;
#end

class Zip
{
	var entries:List<Entry>;

	public function new()
	{
		entries = new List();
	}

	public function entryFromFile(path:String, entryPath:String):Entry
	{
		if(FileSystem.exists(path))
		{
			if(FileSystem.isDirectory(path))
			{
				var entry:Entry = createDirectoryEntry(entryPath);
				entries.push(entry);
				return entry;
			}
			else
			{
				//TODO implement for cordova
				#if cordova
				var inFile:Dynamic = null;
				#else
				var inFile = File.read(path);
				#end

				var entry:Entry = null;
				try
				{
					entry = {
						fileName : entryPath,
						fileSize : 0,
						fileTime : Date.now(),
						compressed : false,
						dataSize : 0,
						data : inFile.readAll(),
						crc32 : 0,
						extraFields : null
					};
					entries.add(entry);
				}
				catch(error:Dynamic)
				{
					throw("Zip error. couldn't add: " + path);
				}
				return entry;
			}
		}
		return null;
	}
	
	public function createDirectoryEntry(entryPath:String):Entry
	{
		var entry:Entry = {
			fileName : entryPath + "/",
			fileSize : 0,
			fileTime : Date.now(),
			compressed : false,
			dataSize : 0,
			data : null,
			crc32 : 0,
			extraFields : null
		};
		entries.add(entry);

		return entry;
	}
	
	public function entryFromString(entryPath:String, data:String):Entry
	{
		var entry:Entry = {
			fileName : entryPath,
			fileSize : 0,
			fileTime : Date.now(),
			compressed : false,
			dataSize : 0,
			data : Bytes.ofString(data),
			crc32 : 0,
			extraFields : null
		};
		entries.add(entry);
		return entry;
	}
	
	public function save(directory:String, name:String):Void
	{
		#if (flash || cordova)
			throw("Save zip not implementd");
		#else
		if(!FileSystem.exists(directory))
			FileUtil.createDirectory(directory);
	
		var fout = File.write(directory + "/" + name);
		var writer = new haxe.zip.Writer(fout);
		writer.write(entries);
		fout.close();
		#end
		
	}

	static public function unZip(zip:Bytes, saveDirPath:String):Void
	{
		var entries = haxe.zip.Reader.readZip(new haxe.io.BytesInput(zip, 0, zip.length));
		for(entry in entries)
		{
			if(entry.fileSize == 0)
				FileSystem.createDirectory(saveDirPath + entry.fileName);
			else
			{
				var bytes = haxe.zip.Reader.unzip(entry);


				//TODO implement for cordova
				#if cordova
				var out:Dynamic = null;
				#else
				var out = File.write(saveDirPath + entry.fileName);
				#end
				
				
				out.writeBytes(bytes, 0, bytes.length);
				out.close();
			}
		}

	}
}