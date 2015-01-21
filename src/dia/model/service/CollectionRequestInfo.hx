package dia.model.service;

class CollectionRequestInfo
{
	public var count(default, null):Int;
	public var pos(default, null):Int;
	public var maxId(default, null):Int;

	public function new(count:Int, pos:Int)
	{
		this.count = count;
		this.pos = pos;
	}
}