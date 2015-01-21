package dia.net;

import haxe.Http;
import msignal.Signal;

#if flash
import air.net.URLMonitor;
import flash.net.URLRequest;
import flash.events.StatusEvent;
#end

interface IUrlMonitor
{
	public var statusChange:Signal1<Bool>;
	public var available(get, null):Bool;
	public var urlChecked(default, null):Bool;

	public var url(default, null):String;
	public var acceptableStatusCodes(get, set):Array<Int>;
	function start():Void;
	function checkStatus():Void;
}


#if flash
class UrlMonitor implements IUrlMonitor
{
	public var url(default, null):String;
	public var acceptableStatusCodes(get, set):Array<Int>;
	function get_acceptableStatusCodes():Array<Int>{untyped return monitor.acceptableStatusCodes;}
	function set_acceptableStatusCodes(value:Array<Int>):Array<Int>{untyped monitor.acceptableStatusCodes = value; untyped return monitor.acceptableStatusCodes;}

	public var statusChange:Signal1<Bool>;
	public var available(get, null):Bool;
	public var urlChecked(default, null):Bool;

	var _available:Bool;
	var monitor:URLMonitor;
	var timer:haxe.Timer;


	public function new(url:String):Void
	{
		urlChecked = false;
		_available = false;
		this.url = url;
		monitor = new URLMonitor(new URLRequest(url));
		monitor.addEventListener(StatusEvent.STATUS, onNetworkStatusChange);
		statusChange = new Signal1();
		
	}

	public function get_available():Bool
	{
		checkStatus();
		return _available;
	}

	public function start():Void
	{
		monitor.start();
	}

	public function checkStatus():Void
	{
		if(urlChecked)
		{
			monitor.removeEventListener(StatusEvent.STATUS, onNetworkStatusChange);
			monitor = new URLMonitor(new URLRequest(url));
			monitor.addEventListener(StatusEvent.STATUS, onNetworkStatusChange);
			start();
		}
	}

	public function onNetworkStatusChange(event:StatusEvent):Void
	{
		urlChecked = true;
		_available = monitor.available;
		statusChange.dispatch(_available);
	}

	
}
#else
class UrlMonitor implements IUrlMonitor
{
	public var url(default, null):String;
	public var acceptableStatusCodes(get, set):Array<Int>;
	function get_acceptableStatusCodes():Array<Int>{return null;}
	function set_acceptableStatusCodes(value:Array<Int>):Array<Int>{return null;}

	public var statusChange:Signal1<Bool>;
	public var available(get, null):Bool;
	public var urlChecked(default, null):Bool;

	var _available:Bool;
	private var http:Http;

	public function new(url:String):Void
	{
		#if js
			_available = true;
			urlChecked = false;
		#else
			urlChecked = false;
			_available = false;
		#end

		_available = true;
		
		this.url = url;
		acceptableStatusCodes = [200, 202, 204, 205, 206];
		statusChange = new Signal1();
	}

	public function get_available():Bool
	{
		checkStatus();
		return _available;
	}

	public function start():Void
	{
	}

	public function checkStatus():Void
	{
	}
	
}
#end