package dia.server;

import minject.Injector;
import haxe.Json;
import dia.util.ConversionUtil;

#if php
import php.Lib;
import php.Web;
#elseif neko
import neko.Lib;
import neko.Web;
#end

class Controller
{
	@inject public var injector:Injector;
	
    public function handleRequest() : Void
    {
    }
    
    public function new(){};
    
    private function fail(code:Int, ?message:String, ?errorResponse:Dynamic):Void
    {
    	if(message != null)
    		Web.setHeader("Message", message);

        if(errorResponse != null)
            Lib.print(Json.stringify(ConversionUtil.toTransferObject(errorResponse)));
    		
    	Web.setReturnCode(code);
    }
    
    private function respond(response:Dynamic):Void
    {
    	if(response != null)
    		Lib.print(Json.stringify(ConversionUtil.toTransferObject(response)));
    }
}