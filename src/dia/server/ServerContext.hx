package dia.server;

import minject.Injector;
import dia.server.Controller;
import dia.server.url.*;

class ServerContext
{
	var injector(default, null):Injector;
	
	private var _urlMappings:Array<URLMapping>;
	
	public function new()
	{
		injector = new Injector();
		injector.mapValue(Injector, injector);
		
		_urlMappings = new Array();
		init();
	}
	
	private function init():Void
	{
	
	}
	
	public function addURLMapping(urlReg : EReg, controllerClass : Class<Controller>, ?preconditions:Array<Class<IPrecondition>>) : Void
	{
		if(preconditions == null)
			preconditions = [];
        _urlMappings.push(new ERegURLMapping(urlReg, controllerClass, preconditions));
    }
    
    public function dispatchURL(url:String):Void
    {
    	url = appendSlash(url);
    	for(urlMapping in _urlMappings)
    	{
    		if(urlMapping.resolve(url))
    		{
    			for(preconditionClass in urlMapping.preconditions)
    			{
    				var precondition:IPrecondition = injector.instantiate(preconditionClass);
    				if(!precondition.canHandle(url))
    				{
    					var failController = precondition.failController;
    					var controller:Controller = injector.instantiate(precondition.failController);
		    			controller.handleRequest();
		    			return;
    				}
    			}
    			
    			var controller:Controller = injector.instantiate(urlMapping.getControllerClass());
    			controller.handleRequest();
    			return;
    		}
    	}
    }
    
    private function appendSlash(url : String) : String
    {
        if(url.charAt(url.length - 1) != "/")
            url += "/";

        return url;
    }
}