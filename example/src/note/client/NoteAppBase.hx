package note.client;

import dia.terminal.Terminal;
import dia.client.IView;
import dia.util.Settings;

class NoteAppBase extends dia.client.Application
{
	public function new(contextView:IView)
	{
		super(contextView);
		Terminal.init(injector);
		haxe.Log.trace = Terminal.getInstance().debugTrace;
		config();
	}

	private function config()
	{
		injector.mapSingleton( Settings );
		addDebugInstructions();
	}

	private function addDebugInstructions():Void
	{
	}
}