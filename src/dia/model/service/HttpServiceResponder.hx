package dia.model.service;

#if server
import dia.util.ConversionUtil;

#if php
import php.Lib;
import php.Web;
#elseif neko
import neko.Lib;
import neko.Web;
#end

typedef HttpError = {code:Int, message:String};

class HttpServiceResponder<RequestType, ResponseType> extends ServiceResponder<ResponseType, HttpError>
{
	public var request:RequestType;

	public function new(?completeHandler:Dynamic->Void, ?failHandler:Dynamic->Void)
	{
		super(completeHandler, failHandler);
		error = {code:0, message:""};

		init();
	}

	private function init():Void
	{
		var params = Web.getParams();
		if(params.exists("data"))
			request = ConversionUtil.toDomainObject(haxe.Json.parse(StringTools.htmlUnescape(Web.getParams().get("data"))));
	}
}
#end