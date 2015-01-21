package dia.net;

class ClientSession
{

	//TODO HACK this to make things easier with flex and the weeklyquiz
	static public var SESSION:String;

	public var token(get_token, set_token):String;
	private var _token:String;

	public function new():Void
	{
	}
	
	public function get_token():String
	{
		return _token;
	}
	
	public function set_token(value:String):String
	{
		SESSION = value;
		_token = value;
		#if js
			js.Cookie.set("token", _token, 24000, "/");
		#end
		return _token;
	}
}