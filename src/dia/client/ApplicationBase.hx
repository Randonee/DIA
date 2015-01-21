package dia.client;

import minject.Injector;
import dia.client.hap.Hap;
import dia.client.notice.Notice;
import dia.client.notice.*;
import msignal.Signal;

class ApplicationBase
{
	var commandMap:CommandMap;
	public var view:IView;
	public var injector:Injector;
	public var notifySignal(default, null):Signal1<Notice>;

	public function new(view:IView)
	{
		injector = new Injector();
		commandMap = new CommandMap(injector);
		this.view = view;
		view.signal.add(handleHap);
		notifySignal = new Signal1();
		notifySignal.add(view.handleNotice);

		injector.mapValue(CommandMap, commandMap);
		injector.mapValue(IView, view);
		injector.mapValue(Injector, injector);
		injector.mapValue(ApplicationBase, this);

		dia.util.ConversionUtil; // just to make sure its included
	}

	public function notify(notice:Notice):Void
	{
		notifySignal.dispatch(notice);
	}

	public function handleHap(hap:Hap):Void
	{
		var enumParameters = Type.enumParameters(hap);
		commandMap.executeCommand(enumParameters[0]);
	}
}