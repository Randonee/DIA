package dia.client;

class Command
{
	@inject public var view:IView;
	@inject public var commandMap:CommandMap;
	@inject public var app:ApplicationBase;
	

	public function new(){}
	
	public function execute():Void
	{
	
	}
}	