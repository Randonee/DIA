package dia.server.url;

import dia.server.Controller;


interface URLMapping
{
	public var preconditions(default, null):Array<Class<IPrecondition>>;
    public function resolve(url : String) : Bool;
    public function getControllerClass() : Class<Controller>;
}