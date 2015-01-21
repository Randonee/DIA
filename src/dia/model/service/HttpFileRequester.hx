package dia.model.service;

import haxe.Http;
import haxe.io.Bytes;

using Lambda;

#if flash

class HttpFileRequester extends ServiceRequester<String, Bytes>
{
	public var status(default, null):Int;
	public var acceptableStatusCodes:Array<Int>;
	public var url:String;
	public var data:Bytes;
	var loader:flash.net.URLLoader;
	private var progressHandler:Int->Int->Void;
	private var failed:Bool;

	public function new(?url:String="", ?completeHandler:Dynamic->Void, ?failHandler:Dynamic->Void, ?progressHandler:Int->Int->Void)
	{
		acceptableStatusCodes = [200, 202, 204, 205, 206];
		super(completeHandler, failHandler);
		this.url = url;
		loader = new flash.net.URLLoader();
		loader.dataFormat = flash.net.URLLoaderDataFormat.BINARY;
		loader.addEventListener( "complete", onComplete);
		loader.addEventListener( "ioError", onError);
		loader.addEventListener( "securityError", onError);
		loader.addEventListener( "progress", onProgress);
		loader.addEventListener( "httpResponseStatus", onHttpResponseStatus);
		this.progressHandler = progressHandler;
		failed = true;
	}

	private function onHttpResponseStatus(event:flash.events.HTTPStatusEvent):Void
	{
		status = event.status;

		if(acceptableStatusCodes.exists(function(ii) { return ii == event.status; }))
			failed = false;
	}
	
	override public function call(request:String):Void
	{
		var request = new flash.net.URLRequest( url );

		if(HttpServiceRequester.GLOBAL_HEADERS != null)
			for(header in HttpServiceRequester.GLOBAL_HEADERS)
				request.requestHeaders.push( new flash.net.URLRequestHeader(header.name, header.value) );

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

	private function onProgress(e:Dynamic):Void
	{
		if(progressHandler != null)
			progressHandler(loader.bytesLoaded, loader.bytesTotal);
	}
	
	private function onComplete(e:Dynamic):Void
	{
		if(failed)
		{
			finishFail();
		}
		else{
			response = Bytes.ofData(loader.data);
			finishSuccess();
		}
	}

	private function onError(e:Dynamic):Void
	{
		this.error = e.text;
		finishFail();
	}
}

#else

class HttpFileRequester extends HttpServiceRequester<String, Bytes>
{
	private var progressHandler:Int->Int->Void;

	public function new(?url:String="", ?completeHandler:Dynamic->Void, ?failHandler:Dynamic->Void, ?progressHandler:Int->Int->Void)
	{
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
		http.setParameter("method", "GET");
		http.request(false);
	}

	public function close():Void
	{
		//TODO figure out how to do this
		completeHandler = null;
		failHandler = null;
	}
	
	override private function onComplete(data:String):Void
	{
		response = Bytes.ofString(data);
		finishSuccess();
	}

	

}

#end