package dia.model.service;

import haxe.Http;
import dia.util.ConversionUtil;

typedef HttpHeader = {name:String, value:String};

class HttpServiceRequester<RequestType, ResponseType> extends ServiceRequester<RequestType, ResponseType>
{
	public static var GLOBAL_HEADERS:Array<HttpHeader>;
	static public function addGlobalheader(name, value):Void
	{
		if(GLOBAL_HEADERS == null)
			GLOBAL_HEADERS = [];
		GLOBAL_HEADERS.push({name:name, value:value});
	}

	public var url(default, default):String;
	public var data(default, null):String;
	
	private var http:Http;
	private var method:String;
	public var status(default, null):Int;

	public function new(?url:String="", ?completeHandler:Dynamic->Void, ?failHandler:Dynamic->Void, ?method:String="GET")
	{
		super(completeHandler, failHandler);
		status = -1;
		this.url = url;
		http = new Http(url);
		this.method = method.toUpperCase();
	}
	
	public function setHeader(name:String, value:String):Void
	{
		http.setHeader(name, value);
	}
	
	override public function call(request:RequestType):Void
	{
		if(GLOBAL_HEADERS != null)
			for(header in GLOBAL_HEADERS)
				http.setHeader(header.name, header.value);

		http.onStatus = onStatus;
		http.onData = onComplete;
		http.onError = onError;
		http.setParameter("data", StringTools.htmlEscape(haxe.Json.stringify(ConversionUtil.toTransferObject(request))));
		http.setParameter("method", method);

		if(method == "POST" || method == "PUT" || method == "DELETE")
			http.request(true);
		else
			http.request(false);
	}

	private function onStatus(status:Int):Void
	{
		this.status = status;
	}
	
	private function onComplete(jsonData:String):Void
	{
		data = jsonData;
		try{
			response = ConversionUtil.toDomainObject(haxe.Json.parse(jsonData));
		}catch(error:Dynamic){}
		
		finishSuccess();
	}
	
	private function onError(error:String):Void
	{
		this.error = error;
		finishFail();
	}
}