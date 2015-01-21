package dia.client;

import dia.client.hap.Hap;
import dia.client.notice.Notice;
import dia.client.notice.*;
import msignal.Signal;

interface IView
{
	public var signal(default, null):Signal1<Hap>;
	public function handleNotice(notice:Notice):Void;
}