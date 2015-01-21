package dia.net;

import haxe.io.Bytes;
import haxe.io.Output;
import haxe.io.BytesOutput;
import haxe.Http;
import cpp.vm.Thread;


class URLLoader
{

	private var _http:Http;
	
	public var onProgress(default, default):ProgressInfo->Void;
	public var onComplete(default, default):Bytes->Void;
	public var onError(default, default):String->Void;
	

	public function new()
	{
	
	}

	public function load(url:String)
	{
		var downloadThread = Thread.create(download);
		
		downloadThread.sendMessage(Thread.current());
    	downloadThread.sendMessage(url);
    	
    	var message:Dynamic = Thread.readMessage(true);
    	
    	
    	while(message != "FINISHED")
    	{
    		if(Std.is(message, ProgressInfo))
    		{
    			if(onProgress != null)
    				onProgress(message);
    		}
    		
    		if(Std.is(message, String))
    		{
    			if(onError != null)
    				onError(message);
    		}
    		
    		if(Std.is(message, Bytes))
    		{
    			if(onComplete != null)
    				onComplete(message);
    		}
    		
    		message = Thread.readMessage(true);
    	}
    	
	}
	
	private function download():Void
	{
		var thread:Thread = Thread.readMessage(true);
		var url:String = Thread.readMessage(true);

		var output:BytesOutput = new haxe.io.BytesOutput();
		var downloadOutput = new DownloadOutput(output);
		downloadOutput.update = function()
		{
			thread.sendMessage(new ProgressInfo(downloadOutput.bytesLoaded, downloadOutput.bytesTotal)); 
		};
		
		var _http = new haxe.Http(url);
		var me = this;
		_http.onError = function(error)
		{
			thread.sendMessage(Std.string(error));
		};
		
		_http.customRequest(false, downloadOutput);
		
		thread.sendMessage(output.getBytes());
		thread.sendMessage("FINISHED");
	}
}

class ProgressInfo
{
	public var bytesLoaded(default, null):Int;
	public var bytesTotal(default, null):Int;
	
	public function new(bytesLoaded:Int, bytesTotal:Int)
	{
		this.bytesLoaded = bytesLoaded;
		this.bytesTotal = bytesTotal;
	}
}

class DownloadOutput extends haxe.io.Output
{
	var output:Output;
	public var bytesLoaded(default, null) : Int;
	public var bytesTotal(default, null) : Int;

	public function new(o:Output)
	{
		this.output = o;
		bytesLoaded = 0;
	}

	public dynamic function update()
	{
	}

	public override function writeByte(data)
	{
		output.writeByte(data);
		bytesLoaded++;
		update();
	}

	public override function writeBytes(s, p, l)
	{
		var r = output.writeBytes(s, p, l);
		bytesLoaded += r;
		update();
		return r;
	}

	public override function close()
	{
		super.close();
		output.close();
	}

	public override function prepare(total)
	{
		bytesTotal = total;
	}
}