package dia.model.service;

import haxe.Http;
import haxe.io.Bytes;

using Lambda;

#if flash

class HttpHeadRequester extends ServiceRequester<String, String>
{
	public var status(default, null):Int;
	public var acceptableStatusCodes:Array<Int>;
	public var url:String;
	public var data:Bytes;
	public var responseHeaders(default, null):Map<String, String>;
	private var loader:flash.net.URLLoader;
	private var progressHandler:Int->Int->Void;
	private var headRetrieveSuccess:Bool;


	public function new(?url:String="", ?completeHandler:Dynamic->Void, ?failHandler:Dynamic->Void, ?progressHandler:Int->Int->Void)
	{
		acceptableStatusCodes = [200, 202, 204, 205, 206];
		responseHeaders = new Map();
		super(completeHandler, failHandler);
		this.url = url;
		loader = new flash.net.URLLoader();
		loader.dataFormat = flash.net.URLLoaderDataFormat.BINARY;
		loader.addEventListener( "complete", onComplete);
		loader.addEventListener( "ioError", onError);
		loader.addEventListener( "securityError", onError);
		loader.addEventListener( "httpResponseStatus", onHttpResponseStatus);
		this.progressHandler = progressHandler;
	}
	
	override public function call(request:String):Void
	{
		var request = new flash.net.URLRequest( url );
		if(HttpServiceRequester.GLOBAL_HEADERS != null)
			for(header in HttpServiceRequester.GLOBAL_HEADERS)
				request.requestHeaders.push( new flash.net.URLRequestHeader(header.name, header.value) );

		var vars = new flash.net.URLVariables();
		vars.method = "HEAD";
		request.data = vars;

		try {
			loader.load( request );
		}catch( e : Dynamic ){
			onError("Exception: "+Std.string(e));
		}		
	}

	public function close():Void
	{
		loader.close();
		completeHandler = null;
		failHandler = null;
		progressHandler = null;
	}

	private function onHttpResponseStatus(event:flash.events.HTTPStatusEvent):Void
	{
		status = event.status;
		
		for(header in event.responseHeaders)
			responseHeaders.set(header.name, header.value);

		//Some clients don't allow method = HEAD. The server also returnes Content-Size to compensate
		if(responseHeaders.get("Content-Length") == "0")
			responseHeaders.set("Content-Length", responseHeaders.get("Content-Size"));

		if(acceptableStatusCodes.exists(function(ii) { return ii == event.status; }))
			headRetrieveSuccess = true;
	}
	
	private function onComplete(e:Dynamic):Void
	{
		if(headRetrieveSuccess)
			finishSuccess();
		else
			finishFail();
	}


	private function onError(e:Dynamic):Void
	{
		this.error = e.text;
		finishFail();
	}

}

#else

class HttpHeadRequester extends HttpServiceRequester<String, String>
{
	public var responseHeaders(default, null):Map<String, String>;
	private var progressHandler:Int->Int->Void;

	public function new(?url:String="", ?completeHandler:Dynamic->Void, ?failHandler:Dynamic->Void, ?progressHandler:Int->Int->Void)
	{
		responseHeaders = new Map();
		this.progressHandler = progressHandler;
		super(url, completeHandler, failHandler);
	}
	
	override public function call(request:String):Void
	{
		if(HttpServiceRequester.GLOBAL_HEADERS != null)
			for(header in HttpServiceRequester.GLOBAL_HEADERS)
				http.setHeader(header.name, header.value);

		http.onData = onComplete;
		http.onError = onError;
		http.setParameter("method", "HEAD");
		http.request(false);
	}
	
	public function close():Void
	{
		//TODO figure out how to do this
		completeHandler = null;
		failHandler = null;
		progressHandler = null;
	}

	override private function onComplete(data:String):Void
	{
		response = data;
		finishSuccess();
	}

	

}

#end