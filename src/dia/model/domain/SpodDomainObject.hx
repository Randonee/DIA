package dia.model.domain;

import sys.db.Types;

#if !flash

class SpodDomainObject extends sys.db.Object implements IDomainObject
{
	public var uid(default, default):SId;
	
	public function new()
	{
		super();
	}
	
	public function equals(obj:IDomainObject):Bool
	{
		return (obj.uid == uid);
	}
}

#end