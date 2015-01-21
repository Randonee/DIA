package dia.js;

class FileSaver
{
	public static function saveTextFile(data:String, fileName:String):Void
	{
		var blob = new js.html.Blob([data], {type: "text/plain;charset=utf-8"});
		untyped saveAs(blob, fileName);
	}
}