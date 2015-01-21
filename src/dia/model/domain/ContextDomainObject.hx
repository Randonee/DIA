package dia.model.domain;


#if client
class ContextDomainObject extends dia.model.domain.DomainObject
#else
class ContextDomainObject extends dia.model.domain.SpodDomainObject
#end
{
	
}