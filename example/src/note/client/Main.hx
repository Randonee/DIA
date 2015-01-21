package note.client;

#if js
import note.client.platform.html.ApplicationContext;
import dia.js.JSView;
#else
	#error "No platform selected (ios, android...)"
#end


@:expose("App")
class Main
{
#if !js

	public static function main()
	{
		var context = new ApplicationContext();
	}
	
#else

	public static var currentView:Dynamic;
	public static function htmlMain(view:Dynamic, ?initialData:Dynamic):Void
	{
		currentView = view;
		var context = new ApplicationContext(currentView, initialData);
	}

	public static function setBaseURL(url:String):Void
	{
		ApplicationContext.setBaseURL(url);
	}
	
	public static function getView(viewId:String):JSView
	{
		return JSView.getView(viewId);
	}
	
	public static function setToken(token:String):Void
	{
	}
	
	public static function main(){}
	
#end
}