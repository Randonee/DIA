package note.client.platform.html;


import dia.net.UrlMonitor;

import dia.util.Settings;
import dia.net.ClientSession;
import dia.js.JSView;
import dia.client.IView;
import dia.js.BrowserDetection;


import note.client.platform.html.view.*;
import note.client.platform.html.view.login.*;
import note.client.platform.html.view.note.*;

class ApplicationContext extends note.client.NoteAppBase
{
	static private var baseURL:String;
	private var initialData:Dynamic;

	public function new(view:JSView, initialData:Dynamic)
	{
		this.initialData = initialData;
		
		super(view);

		view.startView();

		NoteView;
		

	}
	
	static public function setBaseURL(url:String):Void
	{
		baseURL = url;
		JSView.BASE_URL = url;
	}

	override private function config():Void
	{

		dia.terminal.Terminal.init(injector);

		super.config();
		injector.mapSingleton( ClientSession );
		try{
			var settings:Settings = injector.getInstance(Settings);
			var settingsLoader = new SettingsLoader();
			settingsLoader.load(settings);
			settings.add("server.baseURL", baseURL);

			var urlMonitor:UrlMonitor = new UrlMonitor("");
			injector.mapValue(UrlMonitor, urlMonitor);
    	}
    	catch(error:String)
    	{
    		trace(error);
    	}

    	
		
	}
	
}