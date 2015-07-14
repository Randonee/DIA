package dia.model.domain;

#if server
import sys.db.Types;
#end

interface IDomainObject
{
	#if client
	public var uid(default, default):Int;
	#end
	#if server
	public var uid(default, default):SId;
	#end
}