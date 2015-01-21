package dia.util;

class MetaUtil
{
	static public function getPropertyMeta(type:Class<Dynamic>, propName:String, metaName:String):Dynamic
	{
		if(type == null)
			return null;
			
		var metaDatas:Array<Dynamic> = [];
		var fields:Array<String> = [];
		do
		{	
			var m = haxe.rtti.Meta.getFields(type);
			metaDatas.push(m);
			fields = fields.concat(Reflect.fields(m));
			type = Type.getSuperClass(type);
		}
		while(type != null);

		for(fieldName in fields)
		{
			if(fieldName == propName)
			{
				for(m in metaDatas)
				{
					var data = Reflect.field(m, fieldName);
					if(data != null)
						return data;
				}
			}
				
		}
		return null;
	}
}