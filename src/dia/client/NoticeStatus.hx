package dia.client;

class NoticeStatus
{
	public var code(default, null):Int;
	public var message(default, null):String;
	
	public function new(code:Int, ?message:String="")
	{
		this.code = code;
		this.message = message;
	}
}