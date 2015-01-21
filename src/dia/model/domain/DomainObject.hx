package dia.model.domain;

class DomainObject implements IDomainObject
{
	public var uid(default, default):Int;
	
	public function new()
	{
	}
	
	public function equals(obj:IDomainObject):Bool
	{
		return (obj.uid == uid);
	}
	
}