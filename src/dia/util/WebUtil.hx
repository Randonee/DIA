package dia.util;

import haxe.io.Bytes;

#if php
import php.NativeArray;
import php.Lib;
import php.Web;
#elseif neko
import neko.Lib;
import neko.Web;
typedef NativeArray = Array<Dynamic>;
#end

class WebUtil
{
	#if neko
	public static function parseMultipart( onPart : String -> String -> Int -> Void, onData : Bytes -> Int -> Int -> Void ) : Void {
	
		var onPart2 = function(part:String, file:String):Void
		{
			onPart(part, file, 0);
		}
		
		Web.parseMultipart(onPart2, onData);
	}
	
	#elseif php
	public static function parseMultipart( onPart : String -> String -> Int -> Void, onData : Bytes -> Int -> Int -> Void, ?onComplete:Void->Void) : Void {
		var a : NativeArray = untyped __var__("_POST");
		if(untyped __call__("get_magic_quotes_gpc"))
			untyped __php__("reset($a); while(list($k, $v) = each($a)) $a[$k] = stripslashes((string)$v)");
		var post = Lib.hashOfAssociativeArray(a);

		for (key in post.keys())
		{
			onPart(key, "", 0);
			var v = post.get(key);
			onData(Bytes.ofString(v), 0, untyped __call__("strlen", v));
		}

		if(!untyped __call__("isset", __php__("$_FILES"))) return;
		var parts : Array<String> = untyped __call__("new _hx_array",__call__("array_keys", __php__("$_FILES")));
		for(part in parts) {
			var info : Dynamic = untyped __php__("$_FILES[$part]");
			var tmp : String = untyped info['tmp_name'];
			var file : String = untyped info['name'];
			var size : Int = untyped info['size'];
			var err : Int = untyped info['error'];

			if(err > 0) {
				switch(err) {
					case 1: throw "The uploaded file exceeds the max size of " + untyped __call__('ini_get', 'upload_max_filesize');
					case 2: throw "The uploaded file exceeds the max file size directive specified in the HTML form (max is" + untyped __call__('ini_get', 'post_max_size') + ")";
					case 3: throw "The uploaded file was only partially uploaded";
					case 4: continue; // No file was uploaded
					case 6: throw "Missing a temporary folder";
					case 7: throw "Failed to write file to disk";
					case 8: throw "File upload stopped by extension";
				}
			}
			onPart(part, file, size);
			if ("" != file)
			{
				var h = untyped __call__("fopen", tmp, "r");
				var bsize = 8192;
				while (!untyped __call__("feof", h)) {
					var buf : String = untyped __call__("fread", h, bsize);
					var size : Int = untyped __call__("strlen", buf);
					onData(Bytes.ofString(buf), 0, size);
				}
				untyped __call__("fclose", h);
			}
		}
		
		if(onComplete != null)
			onComplete();
	}
	#end
}