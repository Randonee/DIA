package dia.js;

import js.html.*;

class ElementUtil
{
	static public function isOfClass(element:Element, name:String):Bool
	{
		if(element.className == null)
			return false;
		
		var classNames:Array<String> = element.className.split(" ");
		for(cName in classNames)
		{
			if(name == cName)
				return true;
		}
		return false;
	}

	static function setVisible(element:Element, value:Bool):Bool
	{
		if(value)
		{
			element.style.visibility = "visible";
			return true;
		}
		else
		{
			element.style.visibility = "hidden";
			return false;
		}
	}
}
