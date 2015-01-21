package dia.client;

import dia.client.hap.Hap;
import dia.client.notice.Notice;
import dia.client.notice.*;
import msignal.Signal;


class View implements dia.client.IView
{
	public var signal(default, null):Signal1<Hap>;

	public function new ()
	{
		signal = new Signal1();
	}

	public function handleNotice(notice:Notice):Void
	{
	}
}