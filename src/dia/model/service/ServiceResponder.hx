package dia.model.service;

class ServiceResponder<ResponseType, ErrorType>
{
	public var response:ResponseType;
	public var error:ErrorType;

	private var completeHandler:ServiceResponder<ResponseType, ErrorType>->Void;
	private var failHandler:ServiceResponder<ResponseType, ErrorType>->Void;
	
	public function new(?completeHandler:Dynamic->Void, ?failHandler:Dynamic->Void)
	{
		this.completeHandler = completeHandler;
		this.failHandler = failHandler;
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

