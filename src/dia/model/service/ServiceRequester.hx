package dia.model.service;

import dia.model.service.*;

class ServiceRequester<RequestType, ResponseType>
{
	public var request(default, null):RequestType;
	public var response(default, null):ResponseType;
	public var error(default, null):String;

	private var completeHandler:ServiceRequester<RequestType, ResponseType>->Void;
	private var failHandler:ServiceRequester<RequestType, ResponseType>->Void;
	
	public function new(?completeHandler:ServiceRequester<RequestType, ResponseType>->Void, ?failHandler:ServiceRequester<RequestType, ResponseType>->Void)
	{
		this.completeHandler = completeHandler;
		this.failHandler = failHandler;
	}
	
	public function call(request:RequestType):Void
	{
		this.request = request;
	}
	
	private function finishSuccess():Void
	{
		if(completeHandler != null)
			completeHandler(this);
	}
	
	private function finishFail():Void
	{
		if(failHandler != null)
			failHandler(this);
	}
}