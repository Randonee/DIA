package dia.util;

class UriUtil
{
	static public function getId(uri:String):Int
	{
		var index:Int = uri.lastIndexOf("/");
		
		if(index < 0)
			return -1;
		
		uri = uri.substr(index + 1);
			
		var eReg : EReg = ~/^\d+/;
		if(eReg.matchSub(uri, 0))
			return Std.parseInt(eReg.matched(0));
			
		return -1;
	}
}