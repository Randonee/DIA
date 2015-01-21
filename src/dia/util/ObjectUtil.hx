package dia.util;

#if server
import sys.db.Types;
import sys.db.*;
#end

class ObjectUtil
{
	static private var UID_CHARS:String = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

	/** 
	deep copy of anything 
	**/ 
	public static function deepCopy<T>( v:T ) : T 
	{ 
		if (!Reflect.isObject(v)) // simple type 
		{ 
			return v; 
		} 
		else if( Std.is( v, Array ) ) // array 
		{ 
			var r = Type.createInstance(Type.getClass(v), []); 
			untyped 
			{ 
				for( ii in 0...v.length ) 
					r.push(deepCopy(v[ii])); 
			} 
			return r; 
		} 
		else if( Type.getClass(v) == null ) // anonymous object 
		{ 
			var obj : Dynamic = {}; 
			for( ff in Reflect.fields(v) ) 
				Reflect.setField(obj, ff, deepCopy(Reflect.field(v, ff))); 
			return obj; 
		} 
		else // class 
		{ 
			var obj = Type.createEmptyInstance(Type.getClass(v)); 
			for( ff in Reflect.fields(v) ) 
			Reflect.setField(obj, ff, deepCopy(Reflect.field(v, ff))); 
			return obj; 
		} 
		return null; 
	} 
	
	
	public static function createID(?size : Int) : String
	{
		if(size == null) size = 32;
		var nchars = ObjectUtil.UID_CHARS.length;
		var uid = new StringBuf();
		for (i in 0 ... size){
			uid.addChar(ObjectUtil.UID_CHARS.charCodeAt( Std.random(nchars) ));
		}
		return uid.toString();
	}
	
	
	public static function getPhpString(obj:Dynamic):String
	{
		try
		{
			if(obj == null)
				return "";
				
			if(obj.b != null)
				return obj.b;
				
			return obj;
		}
		catch(error:String)
		{}
		return "";
	}
	
	public static function isIterable(value:Dynamic):Bool 
	{ 
        if (value == null) 
                return false; 

		var fieldClass = Type.getClass(value);
		if(fieldClass != null)
		{
			//checking for string here because firefox JS was seeing some strings as iterable
			var fieldTypeName = Type.getClassName(fieldClass);
			if(fieldTypeName == "String")
				return false;
		}
			
        var field = Reflect.field(value, "iterator"); 
        if (field != null && Reflect.isFunction(field)) 
        	return true; 
        
        field = Reflect.field(value, "hasNext"); 
        if (field != null && Reflect.isFunction(field)) 
        { 
                field = Reflect.field(value, "next"); 
                if (field != null && Reflect.isFunction(field)) 
                        return true; 
        }


        var fieldClass = Type.getClass(value);
		var fieldTypeName:String = "";
		if(fieldClass != null)
			fieldTypeName = Type.getClassName(fieldClass);

		if(fieldTypeName == "Array")
			return true;

        return false; 
	}
	
	#if server
	static public function updateFromData(from:Dynamic, to:sys.db.Object, ?excludeFields:Array<String>):Void
	{
		excludeFields = (excludeFields == null)? [] : excludeFields;
		excludeFields.push("uid");
		var man = Reflect.field(Type.getClass(to), "manager");
		var info:RecordInfos = man.dbInfos();
		for(field in info.fields)
		{
			if(!Lambda.has(excludeFields, field.name))
			{
				if(Reflect.hasField(from, field.name))
					Reflect.setProperty(to, field.name, Reflect.field(from, field.name) );
			}
		}
	}
	#end
}