package dia.server;

interface IPrecondition
{
	public var failController(get_failController, null):Class<Controller>;
    public function canHandle(url:String) : Bool;
}