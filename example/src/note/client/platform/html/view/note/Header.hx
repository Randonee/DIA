package note.client.platform.html.view.note;

import note.model.domain.*;
import dia.client.hap.*;
import dia.client.notice.Notice;
import dia.client.notice.*;
import dia.client.event.ViewEvent;
import js.html.*;
import msignal.Signal;


@:external
@:expose
class Header extends dia.js.JSView
{
	static var TEMPLATE:String = "Header.mtt";


	public function new(props:Dynamic)
	{
		super(TEMPLATE, props);
	}
}