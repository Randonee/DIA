package dia.util;

import Type;

@:expose
class ConversionUtil
{
	public static function toTransferObject(domainObject:Dynamic):Dynamic
	{
		if(ObjectUtil.isIterable(domainObject))
		{
			var arr:Array<Dynamic> = [];
			var iterator:Iterator<Dynamic> = domainObject.iterator();
			for(subObj in iterator)
				arr.push(toTransferObject(subObj));
				
			return arr;
		}

		if(Type.getClass(domainObject) == Date)
		{
			return {__type:"Date", data:domainObject.getTime()};
		}

		var topFieldType = Type.typeof(domainObject);
		if(topFieldType == TInt || topFieldType == TFloat || topFieldType == TBool || topFieldType == TNull)
			return domainObject;

		var type:Class<Dynamic> = Type.getClass(domainObject);
		var to:Dynamic = {};
		var fields:Array<String> = null;
		if(type != null)
		{
			 fields = Type.getInstanceFields(type);
			 to.__type = Type.getClassName(type);
		}
		else
			fields = Reflect.fields(domainObject);
			 
    	for(fieldName in fields)
    	{
    		if( (type != null && MetaUtil.getPropertyMeta(type, fieldName, "dtSkip") != null) || fieldName.charAt(0) == "_" || fieldName == "serverId")
    			continue;
    		
    		var fieldValue:Dynamic = Reflect.field(domainObject, fieldName);
    		var fieldType = Type.typeof(fieldValue);
    		
    		switch(fieldType)
    		{
    			case TObject, TClass(_), TInt, TFloat, TBool, TNull:
		    		if(fieldValue != null)
		    		{
		    			switch(fieldType)
		    			{
		    				case TObject, TClass(_):
		    					
		    						
		    					if(ObjectUtil.isIterable(fieldValue))
								{
									var arr:Array<Dynamic> = [];
									var iterator:Iterator<Dynamic> = fieldValue.iterator();
									for(subObj in iterator)
										arr.push(toTransferObject(subObj));
										
									Reflect.setField(to, fieldName, arr);
								}
								else
								{
									var fieldClass = Type.getClass(fieldValue);
		    						var fieldTypeName:String = "";
		    						if(fieldClass != null)
		    							fieldTypeName = Type.getClassName(fieldClass);
								
									if(fieldTypeName == "String" || fieldTypeName == "haxe.io.Bytes")
									{
										Reflect.setField(to, fieldName, ConversionUtil.getPhpFieldValue(fieldValue));
									}
									else
									{
										var subObj =  toTransferObject(fieldValue);
										Reflect.setField(to, fieldName, subObj);
									}
								}
		    						
		    				case TInt, TFloat, TBool:
		    					Reflect.setField(to, fieldName, fieldValue);
		    					
		    				case _:
		    			}
					}
	    		case _:
	    	}
    	}
    	return to;
	}
	
	
	public static function toDomainObject(object:Dynamic):Dynamic
	{
		if(ObjectUtil.isIterable(object))
		{
			var collection = new Array<Dynamic>();
			var iterator:Iterator<Dynamic> = object.iterator();
			for(subObj in iterator)
				collection.push(toDomainObject(subObj));
				
			return collection;
		}

		var topFieldType = Type.typeof(object);
		if(topFieldType == TInt || topFieldType == TFloat || topFieldType == TBool || topFieldType == TNull)
			return object;

		var domainObj:Dynamic = null;
		var type:Class<Dynamic> = null;
		var fields:Array<String> = null;
		if(Reflect.hasField(object, "__type"))
		{
			if(object.__type == "Date")
				return Date.fromTime(object.data);

			type = Type.resolveClass(object.__type);
			domainObj = Type.createInstance(type, []);
			fields = Type.getInstanceFields(type);
		}
		else
		{
			domainObj = {};
			fields = Reflect.fields(object);
		}
		
    	for(fieldName in fields)
    	{
    		if((type != null && MetaUtil.getPropertyMeta(type, fieldName, "dtSkip") != null) || fieldName.charAt(0) == "_")
    			continue;
    		
    		var fieldValue:Dynamic = Reflect.getProperty(object, fieldName);
    		var fieldType = Type.typeof(fieldValue);
    		switch(fieldType)
    		{
    			case TObject, TClass(_), TInt, TFloat, TBool, TNull:
		    		if(fieldValue != null)
		    		{
		    			switch(fieldType)
		    			{
		    				case TObject, TClass(_):
		    					
		    					
		    					if(ObjectUtil.isIterable(fieldValue))
								{
									var collection = new Array<Dynamic>();
									var iterator:Iterator<Dynamic> = fieldValue.iterator();
									for(subObj in iterator)
										collection.push(toDomainObject(subObj));
										
									Reflect.setField(domainObj, fieldName, collection);
								}
								else
								{

									var fieldClass = Type.getClass(fieldValue);
		    						var fieldTypeName:String = "";
		    						if(fieldClass != null)
		    							fieldTypeName = Type.getClassName(fieldClass);

					    			if(fieldTypeName == "String")
									{
										Reflect.setField(domainObj, fieldName, ConversionUtil.getPhpFieldValue(fieldValue));
									}
									else
									{
										var subObj =  toDomainObject(fieldValue);
										Reflect.setField(domainObj, fieldName, subObj);
									}
								}
		    						
		    				case TInt, TFloat, TBool:
		    					Reflect.setField(domainObj, fieldName, fieldValue);
		    					
		    				case _:
		    			}
					}
	    		case _:
	    	}
    	}
    	return domainObj;
	}
	
	private static inline function getClassNameWithoutPath(type:Class<Dynamic>):String
    {
    	var name:String = Type.getClassName(type);
    	return name.split(".").pop();
    }
    
   
    public static function getPhpFieldValue(obj:Dynamic):Dynamic
	{
		 #if php
		if(obj == null)
			return null;
		
		//This is to get medium text because it doesn't seem to be handled correctly.
		if(Reflect.hasField(obj, "b") && Reflect.hasField(obj, "length"))
			return obj.b;
		#end
		return obj;
	}
    
}