package dia.server.url;

import dia.server.Controller;

class ERegURLMapping implements URLMapping
{
	public var preconditions(default, null):Array<Class<IPrecondition>>;

    private var _urlReg : EReg;
    private var _controllerClass : Class<Controller>;

    public function new(urlReg : EReg, controllerClass : Class<Controller>, preconditions:Array<Class<IPrecondition>>)
    {
        _urlReg = urlReg;
        _controllerClass = controllerClass;
        this.preconditions = preconditions;
    }
    
    public function resolve(url : String) : Bool
    {
        return _urlReg.match(url);
    }

    public function getControllerClass() : Class<Controller>
    {
        return _controllerClass;
    }
}