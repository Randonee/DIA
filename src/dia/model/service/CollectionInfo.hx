package dia.model.service;

class CollectionInfo
{
	public var count(default, null):Int;
	public var pos(default, null):Int;
	public var total(default, null):Int;

	public function new(count:Int, pos:Int, total:Int)
	{
		this.count = count;
		this.pos = pos;
		this.total = total;
	}
}