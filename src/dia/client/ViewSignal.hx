package dia.client;

import msignal.Signal;
import dia.client.hap.Hap;
import dia.client.notice.Notice;
import dia.client.notice.*;

class ViewSignal extends msignal.Signal1<Hap>
{
	public var notifySignal(default, null):Signal1<Notice>;

	public function new()
	{
		super();
		notifySignal = new Signal1();
	}

	public function notify(notice:Notice):Void
	{
		notifySignal.dispatch(notice);
	}

	public function addReceiver(func:Notice->Void)
	{
		notifySignal.add(func);
	}
}