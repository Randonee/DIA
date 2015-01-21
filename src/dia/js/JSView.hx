package dia.js;

import js.html.Element;
import dia.client.event.ViewEvent;
import dia.client.hap.Hap;
import dia.client.notice.Notice;
import msignal.Signal;

using StringTools;

@:autoBuild(dia.js.HtmlTemplate.create()) class JSView extends dia.client.View
{
	//view id incremented for each view created
	private static var currentViewId:Int = 0;
	
	//Base url of web site. Example: http://www.example.com/
	static public var BASE_URL:String;
	static private var ___views:Map<String, JSView>;
	
	public var visible(get, set):Bool;

	public var rotation(get, set):Int;
	public var widthPx(get, set):Dynamic;
	public var heightPx(get, set):Dynamic;
	public var topPx(get, set):Dynamic;
	public var marginTopPx(get, set):Dynamic;

	public var eventDispatcher:Signal1<ViewEvent>;
	
	static private function getViews():Map<String, JSView>
	{
		if(___views == null)
			___views = new Map();
			
		return ___views;
	}
	
	public static function addView(view:JSView):Void
	{
		getViews().set(view.viewId, view);
	}
	
	public static function getView(viewId:String):JSView
	{
		return getViews().get(viewId);
	}


	public static function getScrollbarWidth():Float
	{
		var outer = js.Browser.document.createElement("div");
	    outer.style.visibility = "hidden";
	    outer.style.width = "100px";
	    untyped outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

	    js.Browser.document.body.appendChild(outer);

	    var widthNoScroll = outer.offsetWidth;
	    // force scrollbars
	    outer.style.overflow = "scroll";

	    // add innerdiv
	    var inner = js.Browser.document.createElement("div");
	    inner.style.width = "100%";
	    outer.appendChild(inner);        

	    var widthWithScroll = inner.offsetWidth;

	    // remove divs
	    outer.parentNode.removeChild(outer);

	    return widthNoScroll - widthWithScroll;
	}

	public var viewId(default, null):String;
	public var baseURL:String;
	public var view(default, null):String;
	public var template(default, null):String;
	public var element:Element;
	public var children(default, null):Array<JSView>;

	var html:String;
	
	public function new(template:String, ?props:Dynamic)
	{
		baseURL = BASE_URL;
		eventDispatcher = new Signal1();
		viewId = "view" + Std.string(++currentViewId);
		view = "App.getView('" + viewId + "')";
		addView(this);
		this.template = template;
		reloadTemplate(props);
		super();	
	}


	public function reloadTemplate(?props:Dynamic):Void
	{
		this.children = [];

		if(props != null)
		{
			var fields = Reflect.fields(props);
			for(field in fields)
			{
				Reflect.setProperty(this, field, Reflect.getProperty(props, field));
			}
		}
		var t = new haxe.Template(template);
		
		var div = js.Browser.document.createElement("div");
		try
		{
			div.innerHTML = t.execute(this, {add:add});
		}
		catch(error:Dynamic)
		{
			trace("Template Error: Probably missing a class. Make sure that all external js files that contain classes are included");
			throw(error);
		}

		if(element == null)
			element = untyped div.firstChild;
		else
		{
			var temp = div.firstChild;
			element.parentElement.replaceChild(div.firstChild, element);
			element = untyped temp;
		}
		element.setAttribute("id", viewId);

		for(child in children)
		{
			var childNode = getElement(child.viewId);
			if(childNode == null)
				throw("Child not found: " + Type.getClassName(Type.getClass(child)) + ":" + child.viewId + ". TEMPLATE may need to be set" );
			else
				childNode.parentElement.replaceChild(child.element, childNode);
		}
	}

	

	private function getValue(obj:Dynamic, fieldChain:String):Dynamic
	{
		if(fieldChain.indexOf(".") < 0)
			return Reflect.getProperty(obj, fieldChain);

		var parts = fieldChain.split(".");

		var value:Dynamic = Reflect.getProperty(this, parts[0]);
		for(a in 1...parts.length)
			value = Reflect.getProperty(value, parts[a]);
		return value;
	}

	private function add(resolve : String -> Dynamic, childPath : String, ?propStr:String = "", ?propertyName:String="")
	{
		var type = Type.resolveClass(childPath);

		if(type == null)
			trace("type not found: " + childPath);


		var child:JSView = null; 

		if(propStr != "")
		{
			propStr = propStr.replace(";", ",");
			var props:Dynamic = haxe.Json.parse(propStr);
			var fields = Reflect.fields(props);
			for(field in fields)
			{
				if(field.charAt(0) == "$")
				{
					var realField = field.substr(1);
					Reflect.setProperty(props, realField, getValue(this, Reflect.field(props, field)));
					Reflect.deleteField(props, field);
				}
			}
			child = Type.createInstance(type, [props]);
		}
		else
			child = Type.createInstance(type, []);

		if(propertyName != "")
		{
			propertyName = propertyName.replace(" ", "");
			Reflect.setProperty(this, propertyName, child);
		}

		child.signal.add(onChildHap);
		child.eventDispatcher.add(onChildEvent);
		children.push(child);

		return '<div id="' + child.viewId + '">&nbsp;</div>';
	}

	public function addChild(child:JSView):Void
	{
		child.eventDispatcher.add(onChildEvent);
		child.signal.add(onChildHap);
		children.push(child);
	}

	public function removeChild(child:JSView):Void
	{
		child.eventDispatcher.remove(onChildEvent);
		child.signal.remove(onChildHap);
		children.remove(child);
		child.element.parentNode.removeChild(child.element);
	}

	private function onChildEvent(event:ViewEvent):Void
	{
		eventDispatcher.dispatch(event);
	}

	private function onChildHap(hap:Hap):Void
	{
		signal.dispatch(hap);
	}

	override public function handleNotice(notice:Notice):Void
	{
		for(child in children)
			child.handleNotice(notice);
	}

	public function startView():Void
	{
	}

	public function get_visible():Bool
	{
		return (element.style.visibility == "visible");
	}
	
	public function set_visible(value:Bool):Bool
	{
		element.style.visibility = value ? "visible" : "hidden";
		return (element.style.visibility == "visible");
	}
	
	public function getElement(elementId:String):Element
	{
		return getElementRecursive(this.element, elementId);
	}

	private function getElementRecursive(parentNode:js.html.Node, id:String):Element
	{
		for(node in parentNode.childNodes)
		{
			if(node.nodeType == 1 && node.hasAttributes())
			{
				var att = node.attributes.getNamedItem("id");
				if(att != null && att.nodeValue == id)
					return untyped node;
			}
			if(node.hasChildNodes())
			{
				var el = getElementRecursive(node, id);
				if(el != null)
					return el;
			}
		}
		return null;
	}
	
	inline public function inputValue(elementId:String):Dynamic
	{
		return untyped getElement(elementId).value;
	}

	public function get_rotation():Int
	{
		var st = js.Browser.window.getComputedStyle(element, null);

  		var tr = st.getPropertyValue("-webkit-transform");
  		if(tr == null) tr = st.getPropertyValue("-moz-transform");
  		if(tr == null) tr = st.getPropertyValue("-ms-transform");
  		if(tr == null) tr = st.getPropertyValue("-o-transform");
  		if(tr == null) tr = st.getPropertyValue("transform");

  		if(tr == null)
  			return 0;

  		return 0;
	}

	public function set_rotation(degree:Int):Int
	{
		untyped
		{
		    element.style.webkitTransform = 'rotate('+degree+'deg)'; 
		    element.style.mozTransform    = 'rotate('+degree+'deg)'; 
		    element.style.msTransform     = 'rotate('+degree+'deg)'; 
		    element.style.oTransform      = 'rotate('+degree+'deg)'; 
		    element.style.transform       = 'rotate('+degree+'deg)'; 
		}

		return get_rotation();
	}

	public function get_topPx():Float
	{
		return Std.parseFloat(element.style.top.substring(0, element.style.top.length-2));
	}
	
	public function set_topPx(value:Float):Float
	{
		element.style.top = Std.string(value) + "px";
		return value;
	}

	public function set_alpha(value:Float):Float
	{
		element.style.opacity = Std.string(value);
		untyped element.style.filter = 'alpha(opacity=' + value * 100 + ")";
		return value;
	}

	public function get_marginTopPx():Float
	{
		return element.offsetTop;
	}
	
	public function set_marginTopPx(value:Float):Float
	{
		element.style.marginTop = Std.string(value) + "px";
		return element.offsetTop;
	}

	public function get_widthPx():Float
	{
		return element.clientWidth;
	}
	
	public function set_widthPx(value:Float):Float
	{
		element.style.width = Std.string(value) + "px";
		return element.clientWidth;
	}
	
	public function get_heightPx():Float
	{
		return element.clientHeight;
	}
	
	public function set_heightPx(value:Float):Float
	{
		element.style.height = Std.string(value) + "px";
		return element.clientHeight;
	}
}