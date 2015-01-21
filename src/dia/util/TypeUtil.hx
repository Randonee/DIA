package dia.util;

class TypeUtil
{
	static inline public function getClassNameNoPackage(type:Class<Dynamic>):String
	{
		return Type.getClassName(type).split(".").pop();
	}
}