DateTools = $hxClasses['DateTools'] = function() { };
DateTools.__name__ = ["DateTools"];
DateTools.delta = function(d,t) {
	var t1 = d.getTime() + t;
	var d1 = new Date();
	d1.setTime(t1);
	return d1;
};
DateTools.prototype.__class__ = DateTools;
DateTools.prototype.__properties__ = {};
EReg = $hxClasses['EReg'] = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = ["EReg"];
EReg.prototype.r = null;
EReg.prototype.match = function(s) {
	if(this.r.global) this.r.lastIndex = 0;
	this.r.m = this.r.exec(s);
	this.r.s = s;
	return this.r.m != null;
};
EReg.prototype.matched = function(n) {
	if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw new js._Boot.HaxeError("EReg::matched");
};
EReg.prototype.matchedRight = function() {
	if(this.r.m == null) throw new js._Boot.HaxeError("No string matched");
	var sz = this.r.m.index + this.r.m[0].length;
	return HxOverrides.substr(this.r.s,sz,this.r.s.length - sz);
};
EReg.prototype.matchedPos = function() {
	if(this.r.m == null) throw new js._Boot.HaxeError("No string matched");
	return { pos : this.r.m.index, len : this.r.m[0].length};
};
EReg.prototype.replace = function(s,by) {
	return s.replace(this.r,by);
};
EReg.prototype.__class__ = EReg;
EReg.prototype.__properties__ = {};
HxOverrides = $hxClasses['HxOverrides'] = function() { };
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
HxOverrides.prototype.__class__ = HxOverrides;
HxOverrides.prototype.__properties__ = {};
Lambda = $hxClasses['Lambda'] = function() { };
Lambda.__name__ = ["Lambda"];
Lambda.has = function(it,elt) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(x == elt) return true;
	}
	return false;
};
Lambda.exists = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
};
Lambda.filter = function(it,f) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) l.add(x);
	}
	return l;
};
Lambda.prototype.__class__ = Lambda;
Lambda.prototype.__properties__ = {};
List = $hxClasses['List'] = function() {
	this.length = 0;
};
List.__name__ = ["List"];
List.prototype.h = null;
List.prototype.q = null;
List.prototype.length = null;
List.prototype.add = function(item) {
	var x = [item];
	if(this.h == null) this.h = x; else this.q[1] = x;
	this.q = x;
	this.length++;
};
List.prototype.push = function(item) {
	var x = [item,this.h];
	this.h = x;
	if(this.q == null) this.q = x;
	this.length++;
};
List.prototype.first = function() {
	if(this.h == null) return null; else return this.h[0];
};
List.prototype.pop = function() {
	if(this.h == null) return null;
	var x = this.h[0];
	this.h = this.h[1];
	if(this.h == null) this.q = null;
	this.length--;
	return x;
};
List.prototype.isEmpty = function() {
	return this.h == null;
};
List.prototype.iterator = function() {
	return new _List.ListIterator(this.h);
};
List.prototype.__class__ = List;
List.prototype.__properties__ = {};
_List.ListIterator = $hxClasses['_List.ListIterator'] = function(head) {
	this.head = head;
	this.val = null;
};
_List.ListIterator.__name__ = ["_List","ListIterator"];
_List.ListIterator.prototype.head = null;
_List.ListIterator.prototype.val = null;
_List.ListIterator.prototype.hasNext = function() {
	return this.head != null;
};
_List.ListIterator.prototype.next = function() {
	this.val = this.head[0];
	this.head = this.head[1];
	return this.val;
};
_List.ListIterator.prototype.__class__ = _List.ListIterator;
_List.ListIterator.prototype.__properties__ = {};
Reflect = $hxClasses['Reflect'] = function() { };
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		haxe.CallStack.lastException = e;
		if (e instanceof js._Boot.HaxeError) e = e.val;
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.getProperty = function(o,field) {
	var tmp;
	if(o == null) return null; else if(o.__properties__ && (tmp = o.__properties__["get_" + field])) return o[tmp](); else return o[field];
};
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
};
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return t == "string" || t == "object" && v.__enum__ == null || t == "function" && (v.__name__ || v.__ename__) != null;
};
Reflect.deleteField = function(o,field) {
	if(!Object.prototype.hasOwnProperty.call(o,field)) return false;
	delete(o[field]);
	return true;
};
Reflect.prototype.__class__ = Reflect;
Reflect.prototype.__properties__ = {};
Std = $hxClasses['Std'] = function() { };
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
};
Std.random = function(x) {
	if(x <= 0) return 0; else return Math.floor(Math.random() * x);
};
Std.prototype.__class__ = Std;
Std.prototype.__properties__ = {};
StringBuf = $hxClasses['StringBuf'] = function() {
	this.b = "";
};
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype.b = null;
StringBuf.prototype.length = null;
StringBuf.prototype.add = function(x) {
	this.b += Std.string(x);
};
StringBuf.prototype.addChar = function(c) {
	this.b += String.fromCharCode(c);
};
StringBuf.prototype.addSub = function(s,pos,len) {
	if(len == null) this.b += HxOverrides.substr(s,pos,null); else this.b += HxOverrides.substr(s,pos,len);
};
StringBuf.prototype.__class__ = StringBuf;
StringBuf.prototype.__properties__ = {};
StringTools = $hxClasses['StringTools'] = function() { };
StringTools.__name__ = ["StringTools"];
StringTools.htmlEscape = function(s,quotes) {
	s = s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
	if(quotes) return s.split("\"").join("&quot;").split("'").join("&#039;"); else return s;
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
StringTools.prototype.__class__ = StringTools;
StringTools.prototype.__properties__ = {};
ValueType = $hxClasses['ValueType'] = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] };
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
Type = $hxClasses['Type'] = function() { };
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null; else return js.Boot.getClass(o);
};
Type.getSuperClass = function(c) {
	return c.__super__;
};
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) return null;
	return a.join(".");
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw new js._Boot.HaxeError("Too many arguments");
	}
	return null;
};
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
};
Type.getInstanceFields = function(c) {
	var a = [];
	for(var i in c.prototype) a.push(i);
	HxOverrides.remove(a,"__class__");
	HxOverrides.remove(a,"__properties__");
	return a;
};
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = js.Boot.getClass(v);
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
Type.prototype.__class__ = Type;
Type.prototype.__properties__ = {};
Xml = $hxClasses['Xml'] = function(nodeType) {
	this.nodeType = nodeType;
	this.children = [];
	this.attributeMap = new haxe.ds.StringMap();
};
Xml.__name__ = ["Xml"];
Xml.parse = function(str) {
	return haxe.xml.Parser.parse(str);
};
Xml.createElement = function(name) {
	var xml = new Xml(Xml.Element);
	if(xml.nodeType != Xml.Element) throw new js._Boot.HaxeError("Bad node type, expected Element but found " + xml.nodeType);
	xml.nodeName = name;
	return xml;
};
Xml.createPCData = function(data) {
	var xml = new Xml(Xml.PCData);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js._Boot.HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createCData = function(data) {
	var xml = new Xml(Xml.CData);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js._Boot.HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createComment = function(data) {
	var xml = new Xml(Xml.Comment);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js._Boot.HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createDocType = function(data) {
	var xml = new Xml(Xml.DocType);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js._Boot.HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createProcessingInstruction = function(data) {
	var xml = new Xml(Xml.ProcessingInstruction);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js._Boot.HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createDocument = function() {
	return new Xml(Xml.Document);
};
Xml.prototype.nodeType = null;
Xml.prototype.nodeName = null;
Xml.prototype.nodeValue = null;
Xml.prototype.parent = null;
Xml.prototype.children = null;
Xml.prototype.attributeMap = null;
Xml.prototype.get_nodeName = function() {
	if(this.nodeType != Xml.Element) throw new js._Boot.HaxeError("Bad node type, expected Element but found " + this.nodeType);
	return this.nodeName;
};
Xml.prototype.get = function(att) {
	if(this.nodeType != Xml.Element) throw new js._Boot.HaxeError("Bad node type, expected Element but found " + this.nodeType);
	return this.attributeMap.get(att);
};
Xml.prototype.set = function(att,value) {
	if(this.nodeType != Xml.Element) throw new js._Boot.HaxeError("Bad node type, expected Element but found " + this.nodeType);
	this.attributeMap.set(att,value);
};
Xml.prototype.exists = function(att) {
	if(this.nodeType != Xml.Element) throw new js._Boot.HaxeError("Bad node type, expected Element but found " + this.nodeType);
	return this.attributeMap.exists(att);
};
Xml.prototype.attributes = function() {
	if(this.nodeType != Xml.Element) throw new js._Boot.HaxeError("Bad node type, expected Element but found " + this.nodeType);
	return this.attributeMap.keys();
};
Xml.prototype.iterator = function() {
	if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw new js._Boot.HaxeError("Bad node type, expected Element or Document but found " + this.nodeType);
	return HxOverrides.iter(this.children);
};
Xml.prototype.elements = function() {
	if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw new js._Boot.HaxeError("Bad node type, expected Element or Document but found " + this.nodeType);
	var ret;
	var _g = [];
	var _g1 = 0;
	var _g2 = this.children;
	while(_g1 < _g2.length) {
		var child = _g2[_g1];
		++_g1;
		if(child.nodeType == Xml.Element) _g.push(child);
	}
	ret = _g;
	return HxOverrides.iter(ret);
};
Xml.prototype.firstElement = function() {
	if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw new js._Boot.HaxeError("Bad node type, expected Element or Document but found " + this.nodeType);
	var _g = 0;
	var _g1 = this.children;
	while(_g < _g1.length) {
		var child = _g1[_g];
		++_g;
		if(child.nodeType == Xml.Element) return child;
	}
	return null;
};
Xml.prototype.addChild = function(x) {
	if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw new js._Boot.HaxeError("Bad node type, expected Element or Document but found " + this.nodeType);
	if(x.parent != null) x.parent.removeChild(x);
	this.children.push(x);
	x.parent = this;
};
Xml.prototype.removeChild = function(x) {
	if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw new js._Boot.HaxeError("Bad node type, expected Element or Document but found " + this.nodeType);
	if(HxOverrides.remove(this.children,x)) {
		x.parent = null;
		return true;
	}
	return false;
};
Xml.prototype.__class__ = Xml;
Xml.prototype.__properties__ = {get_nodeName:"get_nodeName"};
dia.client.ApplicationBase = $hxClasses['dia.client.ApplicationBase'] = function(view) {
	this.injector = new minject.Injector();
	this.commandMap = new dia.client.CommandMap(this.injector);
	this.view = view;
	view.signal.add($bind(this,this.handleHap));
	this.notifySignal = new msignal.Signal1();
	this.notifySignal.add($bind(view,view.handleNotice));
	this.injector.mapValue(dia.client.CommandMap,this.commandMap);
	this.injector.mapValue(dia.client.IView,view);
	this.injector.mapValue(minject.Injector,this.injector);
	this.injector.mapValue(dia.client.ApplicationBase,this);
	dia.util.ConversionUtil;
};
dia.client.ApplicationBase.__name__ = ["dia","client","ApplicationBase"];
dia.client.ApplicationBase.prototype.commandMap = null;
dia.client.ApplicationBase.prototype.view = null;
dia.client.ApplicationBase.prototype.injector = null;
dia.client.ApplicationBase.prototype.notifySignal = null;
dia.client.ApplicationBase.prototype.notify = function(notice) {
	this.notifySignal.dispatch(notice);
};
dia.client.ApplicationBase.prototype.handleHap = function(hap) {
	var enumParameters = hap.slice(2);
	this.commandMap.executeCommand(enumParameters[0]);
};
dia.client.ApplicationBase.prototype.__class__ = dia.client.ApplicationBase;
dia.client.ApplicationBase.prototype.__properties__ = {};
dia.client.Application = $hxClasses['dia.client.Application'] = function(view) {
	dia.client.ApplicationBase.call(this,view);
	this.init();
};
dia.client.Application.__name__ = ["dia","client","Application"];
dia.client.Application.__super__ = dia.client.ApplicationBase;
for(var k in dia.client.ApplicationBase.prototype ) dia.client.Application.prototype[k] = dia.client.ApplicationBase.prototype[k];
dia.client.Application.prototype.init = function() {
	this.commandMap.add(dia.client.hap.AddNoteHapData,note.client.command.note.AddNoteCommand);
	this.commandMap.add(dia.client.hap.UpdateNoteHapData,note.client.command.note.UpdateNoteCommand);
	this.commandMap.add(dia.client.hap.DeleteNoteHapData,note.client.command.note.DeleteNoteCommand);
};
dia.client.Application.prototype.__class__ = dia.client.Application;
dia.client.Application.prototype.__properties__ = $extend(dia.client.ApplicationBase.prototype.__properties__, {});
dia.client.Command = $hxClasses['dia.client.Command'] = function() {
};
dia.client.Command.__name__ = ["dia","client","Command"];
dia.client.Command.prototype.view = null;
dia.client.Command.prototype.commandMap = null;
dia.client.Command.prototype.app = null;
dia.client.Command.prototype.execute = function() {
};
dia.client.Command.prototype.__class__ = dia.client.Command;
dia.client.Command.prototype.__properties__ = {};
dia.client.CommandMap = $hxClasses['dia.client.CommandMap'] = function(injector) {
	this.injector = injector;
	this.map = new haxe.ds.StringMap();
	this.detainedCommands = new haxe.ds.ObjectMap();
};
dia.client.CommandMap.__name__ = ["dia","client","CommandMap"];
dia.client.CommandMap.prototype.map = null;
dia.client.CommandMap.prototype.injector = null;
dia.client.CommandMap.prototype.detainedCommands = null;
dia.client.CommandMap.prototype.add = function(dataClass,commandType) {
	var key = Type.getClassName(dataClass);
	this.map.set(key,commandType);
};
dia.client.CommandMap.prototype.executeCommand = function(data) {
	var dataClass = Type.getClass(data);
	var cls;
	var key = Type.getClassName(dataClass);
	cls = this.map.get(key);
	this.injector.mapValue(dataClass,data);
	var cmd = this.injector.instantiate(cls);
	this.injector.unmap(dataClass);
	cmd.execute();
};
dia.client.CommandMap.prototype.detain = function(command) {
	this.detainedCommands.set(command,true);
};
dia.client.CommandMap.prototype.release = function(command) {
	if(this.detainedCommands.h.__keys__[command.__id__] != null) this.detainedCommands.remove(command);
};
dia.client.CommandMap.prototype.__class__ = dia.client.CommandMap;
dia.client.CommandMap.prototype.__properties__ = {};
dia.client.IView = $hxClasses['dia.client.IView'] = function() { };
dia.client.IView.__name__ = ["dia","client","IView"];
dia.client.IView.prototype.signal = null;
dia.client.IView.prototype.handleNotice = null;
dia.client.IView.prototype.__class__ = dia.client.IView;
dia.client.IView.prototype.__properties__ = {};
dia.client.NoticeStatus = $hxClasses['dia.client.NoticeStatus'] = function(code,message) {
	if(message == null) message = "";
	this.code = code;
	this.message = message;
};
dia.client.NoticeStatus.__name__ = ["dia","client","NoticeStatus"];
dia.client.NoticeStatus.prototype.code = null;
dia.client.NoticeStatus.prototype.message = null;
dia.client.NoticeStatus.prototype.__class__ = dia.client.NoticeStatus;
dia.client.NoticeStatus.prototype.__properties__ = {};
dia.client.View = $hxClasses['dia.client.View'] = function() {
	this.signal = new msignal.Signal1();
};
dia.client.View.__name__ = ["dia","client","View"];
dia.client.View.prototype.signal = null;
dia.client.View.prototype.handleNotice = function(notice) {
};
dia.client.View.prototype.__class__ = dia.client.View;
dia.client.View.prototype.__properties__ = {};
dia.client.View.__interfaces__ = [dia.client.IView];
dia.client.event.ViewEvent = $hxClasses['dia.client.event.ViewEvent'] = { __ename__ : ["dia","client","event","ViewEvent"], __constructs__ : [] };
dia.client.hap.AddNoteHapData = $hxClasses['dia.client.hap.AddNoteHapData'] = function(name,body) {
	this.name = name;
	this.body = body;
};
dia.client.hap.AddNoteHapData.__name__ = ["dia","client","hap","AddNoteHapData"];
dia.client.hap.AddNoteHapData.prototype.name = null;
dia.client.hap.AddNoteHapData.prototype.body = null;
dia.client.hap.AddNoteHapData.prototype.__class__ = dia.client.hap.AddNoteHapData;
dia.client.hap.AddNoteHapData.prototype.__properties__ = {};
dia.client.hap.DeleteNoteHapData = $hxClasses['dia.client.hap.DeleteNoteHapData'] = function(noteId) {
	this.noteId = noteId;
};
dia.client.hap.DeleteNoteHapData.__name__ = ["dia","client","hap","DeleteNoteHapData"];
dia.client.hap.DeleteNoteHapData.prototype.noteId = null;
dia.client.hap.DeleteNoteHapData.prototype.__class__ = dia.client.hap.DeleteNoteHapData;
dia.client.hap.DeleteNoteHapData.prototype.__properties__ = {};
dia.client.hap.Hap = $hxClasses['dia.client.hap.Hap'] = { __ename__ : ["dia","client","hap","Hap"], __constructs__ : ["AddNoteHap","UpdateNoteHap","DeleteNoteHap"] };
dia.client.hap.Hap.AddNoteHap = function(data) { var $x = ["AddNoteHap",0,data]; $x.__enum__ = dia.client.hap.Hap; $x.toString = $estr; return $x; };
dia.client.hap.Hap.UpdateNoteHap = function(data) { var $x = ["UpdateNoteHap",1,data]; $x.__enum__ = dia.client.hap.Hap; $x.toString = $estr; return $x; };
dia.client.hap.Hap.DeleteNoteHap = function(data) { var $x = ["DeleteNoteHap",2,data]; $x.__enum__ = dia.client.hap.Hap; $x.toString = $estr; return $x; };
dia.client.hap.UpdateNoteHapData = $hxClasses['dia.client.hap.UpdateNoteHapData'] = function(note) {
	this.note = note;
};
dia.client.hap.UpdateNoteHapData.__name__ = ["dia","client","hap","UpdateNoteHapData"];
dia.client.hap.UpdateNoteHapData.prototype.note = null;
dia.client.hap.UpdateNoteHapData.prototype.__class__ = dia.client.hap.UpdateNoteHapData;
dia.client.hap.UpdateNoteHapData.prototype.__properties__ = {};
dia.client.notice.AddNoteNoticeData = $hxClasses['dia.client.notice.AddNoteNoticeData'] = function(note) {
	this.note = note;
};
dia.client.notice.AddNoteNoticeData.__name__ = ["dia","client","notice","AddNoteNoticeData"];
dia.client.notice.AddNoteNoticeData.prototype.note = null;
dia.client.notice.AddNoteNoticeData.prototype.__class__ = dia.client.notice.AddNoteNoticeData;
dia.client.notice.AddNoteNoticeData.prototype.__properties__ = {};
dia.client.notice.DeleteNoteNoticeData = $hxClasses['dia.client.notice.DeleteNoteNoticeData'] = function(noteId) {
	this.noteId = noteId;
};
dia.client.notice.DeleteNoteNoticeData.__name__ = ["dia","client","notice","DeleteNoteNoticeData"];
dia.client.notice.DeleteNoteNoticeData.prototype.noteId = null;
dia.client.notice.DeleteNoteNoticeData.prototype.__class__ = dia.client.notice.DeleteNoteNoticeData;
dia.client.notice.DeleteNoteNoticeData.prototype.__properties__ = {};
dia.client.notice.Notice = $hxClasses['dia.client.notice.Notice'] = { __ename__ : ["dia","client","notice","Notice"], __constructs__ : ["AddNoteNotice","UpdateNoteNotice","DeleteNoteNotice"] };
dia.client.notice.Notice.DeleteNoteNotice = function(data,status) { var $x = ["DeleteNoteNotice",2,data,status]; $x.__enum__ = dia.client.notice.Notice; $x.toString = $estr; return $x; };
dia.client.notice.Notice.UpdateNoteNotice = function(data,status) { var $x = ["UpdateNoteNotice",1,data,status]; $x.__enum__ = dia.client.notice.Notice; $x.toString = $estr; return $x; };
dia.client.notice.Notice.AddNoteNotice = function(data,status) { var $x = ["AddNoteNotice",0,data,status]; $x.__enum__ = dia.client.notice.Notice; $x.toString = $estr; return $x; };
dia.client.notice.UpdateNoteNoticeData = $hxClasses['dia.client.notice.UpdateNoteNoticeData'] = function(note) {
	this.note = note;
};
dia.client.notice.UpdateNoteNoticeData.__name__ = ["dia","client","notice","UpdateNoteNoticeData"];
dia.client.notice.UpdateNoteNoticeData.prototype.note = null;
dia.client.notice.UpdateNoteNoticeData.prototype.__class__ = dia.client.notice.UpdateNoteNoticeData;
dia.client.notice.UpdateNoteNoticeData.prototype.__properties__ = {};
dia.http.HttpStatusCodes = $hxClasses['dia.http.HttpStatusCodes'] = function() { };
dia.http.HttpStatusCodes.__name__ = ["dia","http","HttpStatusCodes"];
dia.http.HttpStatusCodes.prototype.__class__ = dia.http.HttpStatusCodes;
dia.http.HttpStatusCodes.prototype.__properties__ = {};
dia.js.BrowserType = $hxClasses['dia.js.BrowserType'] = { __ename__ : ["dia","js","BrowserType"], __constructs__ : ["Chrome","Safari","WebKitOther","FireFox","Opera","IE","Unknown"] };
dia.js.BrowserType.FireFox = ["FireFox",3];
dia.js.BrowserType.FireFox.toString = $estr;
dia.js.BrowserType.FireFox.__enum__ = dia.js.BrowserType;
dia.js.BrowserType.Safari = ["Safari",1];
dia.js.BrowserType.Safari.toString = $estr;
dia.js.BrowserType.Safari.__enum__ = dia.js.BrowserType;
dia.js.BrowserType.IE = ["IE",5];
dia.js.BrowserType.IE.toString = $estr;
dia.js.BrowserType.IE.__enum__ = dia.js.BrowserType;
dia.js.BrowserType.Unknown = ["Unknown",6];
dia.js.BrowserType.Unknown.toString = $estr;
dia.js.BrowserType.Unknown.__enum__ = dia.js.BrowserType;
dia.js.BrowserType.Opera = ["Opera",4];
dia.js.BrowserType.Opera.toString = $estr;
dia.js.BrowserType.Opera.__enum__ = dia.js.BrowserType;
dia.js.BrowserType.Chrome = ["Chrome",0];
dia.js.BrowserType.Chrome.toString = $estr;
dia.js.BrowserType.Chrome.__enum__ = dia.js.BrowserType;
dia.js.BrowserType.WebKitOther = ["WebKitOther",2];
dia.js.BrowserType.WebKitOther.toString = $estr;
dia.js.BrowserType.WebKitOther.__enum__ = dia.js.BrowserType;
dia.js.BrowserDetection = $hxClasses['dia.js.BrowserDetection'] = function() { };
dia.js.BrowserDetection.__name__ = ["dia","js","BrowserDetection"];
dia.js.BrowserDetection.browserType = null;
dia.js.BrowserDetection._version = null;
dia.js.BrowserDetection.type = null;
dia.js.BrowserDetection.version = null;
dia.js.BrowserDetection.get_type = function() {
	dia.js.BrowserDetection.detectIfNeeded();
	return dia.js.BrowserDetection.browserType;
};
dia.js.BrowserDetection.get_version = function() {
	dia.js.BrowserDetection.detectIfNeeded();
	return dia.js.BrowserDetection._version;
};
dia.js.BrowserDetection.getAgent = function() {
	return window.navigator.userAgent;
};
dia.js.BrowserDetection.detectIfNeeded = function() {
	if(dia.js.BrowserDetection.browserType != null) return;
	dia.js.BrowserDetection.detectBrowser(dia.js.BrowserDetection.getAgent());
};
dia.js.BrowserDetection.isAdobeAir = function() {
	return new EReg("AdobeAIR","").match(dia.js.BrowserDetection.getAgent());
};
dia.js.BrowserDetection.detectBrowser = function(agent) {
	if(new EReg("WebKit","").match(agent)) {
		if(new EReg("Chrome","").match(agent)) {
			dia.js.BrowserDetection.browserType = dia.js.BrowserType.Chrome;
			var pos = agent.indexOf("Chrome/") + 7;
			dia.js.BrowserDetection._version = HxOverrides.substr(agent,pos,null);
			dia.js.BrowserDetection._version = dia.js.BrowserDetection.get_version().substring(0,dia.js.BrowserDetection.get_version().indexOf(" "));
		} else if(new EReg("Safari","").match(agent)) {
			dia.js.BrowserDetection.browserType = dia.js.BrowserType.Safari;
			var pos1 = agent.indexOf("Version/") + 8;
			dia.js.BrowserDetection._version = HxOverrides.substr(agent,pos1,null);
			dia.js.BrowserDetection._version = dia.js.BrowserDetection.get_version().substring(0,dia.js.BrowserDetection.get_version().indexOf(" "));
		} else {
			dia.js.BrowserDetection.browserType = dia.js.BrowserType.Opera;
			var pos2 = agent.indexOf("Opera") + 6;
			dia.js.BrowserDetection._version = HxOverrides.substr(agent,pos2,null);
		}
	} else if(new EReg("Opera","").match(agent)) {
		dia.js.BrowserDetection.browserType = dia.js.BrowserType.Opera;
		if(agent.charAt(0) == "O") {
			var pos3 = agent.indexOf("Version/") + 8;
			dia.js.BrowserDetection._version = HxOverrides.substr(agent,pos3,null);
		} else {
			var pos4 = agent.indexOf("Opera") + 6;
			dia.js.BrowserDetection._version = HxOverrides.substr(agent,pos4,null);
		}
	} else if(new EReg("MSIE","").match(agent)) {
		dia.js.BrowserDetection.browserType = dia.js.BrowserType.IE;
		var pos5 = agent.indexOf("MSIE") + 5;
		dia.js.BrowserDetection._version = HxOverrides.substr(agent,pos5,null);
		dia.js.BrowserDetection._version = dia.js.BrowserDetection.get_version().substring(0,dia.js.BrowserDetection.get_version().indexOf(";"));
	} else if(new EReg("Trident","").match(agent)) dia.js.BrowserDetection.browserType = dia.js.BrowserType.IE; else if(new EReg("Mozilla","").match(agent)) dia.js.BrowserDetection.browserType = dia.js.BrowserType.FireFox; else dia.js.BrowserDetection.browserType = dia.js.BrowserType.Unknown;
};
dia.js.BrowserDetection.prototype.__class__ = dia.js.BrowserDetection;
dia.js.BrowserDetection.prototype.__properties__ = {};
dia.js.JSView = $hxClasses['dia.js.JSView'] = function(template,props) {
	this.baseURL = dia.js.JSView.BASE_URL;
	this.eventDispatcher = new msignal.Signal1();
	this.viewId = "view" + Std.string(++dia.js.JSView.currentViewId);
	this.view = "App.getView('" + this.viewId + "')";
	dia.js.JSView.addView(this);
	this.template = template;
	this.reloadTemplate(props);
	dia.client.View.call(this);
};
dia.js.JSView.__name__ = ["dia","js","JSView"];
dia.js.JSView.__super__ = dia.client.View;
for(var k in dia.client.View.prototype ) dia.js.JSView.prototype[k] = dia.client.View.prototype[k];
dia.js.JSView.BASE_URL = null;
dia.js.JSView.___views = null;
dia.js.JSView.getViews = function() {
	if(dia.js.JSView.___views == null) dia.js.JSView.___views = new haxe.ds.StringMap();
	return dia.js.JSView.___views;
};
dia.js.JSView.addView = function(view) {
	var this1 = dia.js.JSView.getViews();
	this1.set(view.viewId,view);
};
dia.js.JSView.getView = function(viewId) {
	var this1 = dia.js.JSView.getViews();
	return this1.get(viewId);
};
dia.js.JSView.getScrollbarWidth = function() {
	var outer = window.document.createElement("div");
	outer.style.visibility = "hidden";
	outer.style.width = "100px";
	outer.style.msOverflowStyle = "scrollbar";
	window.document.body.appendChild(outer);
	var widthNoScroll = outer.offsetWidth;
	outer.style.overflow = "scroll";
	var inner = window.document.createElement("div");
	inner.style.width = "100%";
	outer.appendChild(inner);
	var widthWithScroll = inner.offsetWidth;
	outer.parentNode.removeChild(outer);
	return widthNoScroll - widthWithScroll;
};
dia.js.JSView.prototype.visible = null;
dia.js.JSView.prototype.rotation = null;
dia.js.JSView.prototype.widthPx = null;
dia.js.JSView.prototype.heightPx = null;
dia.js.JSView.prototype.topPx = null;
dia.js.JSView.prototype.marginTopPx = null;
dia.js.JSView.prototype.eventDispatcher = null;
dia.js.JSView.prototype.viewId = null;
dia.js.JSView.prototype.baseURL = null;
dia.js.JSView.prototype.view = null;
dia.js.JSView.prototype.template = null;
dia.js.JSView.prototype.element = null;
dia.js.JSView.prototype.children = null;
dia.js.JSView.prototype.html = null;
dia.js.JSView.prototype.reloadTemplate = function(props) {
	this.children = [];
	if(props != null) {
		var fields = Reflect.fields(props);
		var _g = 0;
		while(_g < fields.length) {
			var field = fields[_g];
			++_g;
			Reflect.setProperty(this,field,Reflect.getProperty(props,field));
		}
	}
	var t = new haxe.Template(this.template);
	var div = window.document.createElement("div");
	try {
		div.innerHTML = t.execute(this,{ add : $bind(this,this.add)});
	} catch( error ) {
		haxe.CallStack.lastException = error;
		if (error instanceof js._Boot.HaxeError) error = error.val;
		haxe.Log.trace("Template Error: Probably missing a class. Make sure that all external js files that contain classes are included",{ fileName : "JSView.hx", lineNumber : 118, className : "dia.js.JSView", methodName : "reloadTemplate"});
		throw new js._Boot.HaxeError(error);
	}
	if(this.element == null) this.element = div.firstChild; else {
		var temp = div.firstChild;
		this.element.parentElement.replaceChild(div.firstChild,this.element);
		this.element = temp;
	}
	this.element.setAttribute("id",this.viewId);
	var _g1 = 0;
	var _g11 = this.children;
	while(_g1 < _g11.length) {
		var child = _g11[_g1];
		++_g1;
		var childNode = this.getElement(child.viewId);
		if(childNode == null) throw new js._Boot.HaxeError("Child not found: " + Type.getClassName(child == null?null:js.Boot.getClass(child)) + ":" + child.viewId + ". TEMPLATE may need to be set"); else childNode.parentElement.replaceChild(child.element,childNode);
	}
};
dia.js.JSView.prototype.getValue = function(obj,fieldChain) {
	if(fieldChain.indexOf(".") < 0) return Reflect.getProperty(obj,fieldChain);
	var parts = fieldChain.split(".");
	var value = Reflect.getProperty(this,parts[0]);
	var _g1 = 1;
	var _g = parts.length;
	while(_g1 < _g) {
		var a = _g1++;
		value = Reflect.getProperty(value,parts[a]);
	}
	return value;
};
dia.js.JSView.prototype.add = function(resolve,childPath,propStr,propertyName) {
	if(propertyName == null) propertyName = "";
	if(propStr == null) propStr = "";
	var type = Type.resolveClass(childPath);
	if(type == null) haxe.Log.trace("type not found: " + childPath,{ fileName : "JSView.hx", lineNumber : 162, className : "dia.js.JSView", methodName : "add"});
	var child = null;
	if(propStr != "") {
		propStr = StringTools.replace(propStr,";",",");
		var props = JSON.parse(propStr);
		var fields = Reflect.fields(props);
		var _g = 0;
		while(_g < fields.length) {
			var field = fields[_g];
			++_g;
			if(field.charAt(0) == "$") {
				var realField = HxOverrides.substr(field,1,null);
				Reflect.setProperty(props,realField,this.getValue(this,Reflect.field(props,field)));
				Reflect.deleteField(props,field);
			}
		}
		child = Type.createInstance(type,[props]);
	} else child = Type.createInstance(type,[]);
	if(propertyName != "") {
		propertyName = StringTools.replace(propertyName," ","");
		Reflect.setProperty(this,propertyName,child);
	}
	child.signal.add($bind(this,this.onChildHap));
	child.eventDispatcher.add($bind(this,this.onChildEvent));
	this.children.push(child);
	return "<div id=\"" + child.viewId + "\">&nbsp;</div>";
};
dia.js.JSView.prototype.addChild = function(child) {
	child.eventDispatcher.add($bind(this,this.onChildEvent));
	child.signal.add($bind(this,this.onChildHap));
	this.children.push(child);
};
dia.js.JSView.prototype.removeChild = function(child) {
	child.eventDispatcher.remove($bind(this,this.onChildEvent));
	child.signal.remove($bind(this,this.onChildHap));
	HxOverrides.remove(this.children,child);
	child.element.parentNode.removeChild(child.element);
};
dia.js.JSView.prototype.onChildEvent = function(event) {
	this.eventDispatcher.dispatch(event);
};
dia.js.JSView.prototype.onChildHap = function(hap) {
	this.signal.dispatch(hap);
};
dia.js.JSView.prototype.handleNotice = function(notice) {
	var _g = 0;
	var _g1 = this.children;
	while(_g < _g1.length) {
		var child = _g1[_g];
		++_g;
		child.handleNotice(notice);
	}
};
dia.js.JSView.prototype.startView = function() {
};
dia.js.JSView.prototype.get_visible = function() {
	return this.element.style.visibility == "visible";
};
dia.js.JSView.prototype.set_visible = function(value) {
	if(value) this.element.style.visibility = "visible"; else this.element.style.visibility = "hidden";
	return this.element.style.visibility == "visible";
};
dia.js.JSView.prototype.getElement = function(elementId) {
	return this.getElementRecursive(this.element,elementId);
};
dia.js.JSView.prototype.getElementRecursive = function(parentNode,id) {
	var _g = 0;
	var _g1 = parentNode.childNodes;
	while(_g < _g1.length) {
		var node = _g1[_g];
		++_g;
		if(node.nodeType == 1 && node.hasAttributes()) {
			var att = node.attributes.getNamedItem("id");
			if(att != null && att.nodeValue == id) return node;
		}
		if(node.hasChildNodes()) {
			var el = this.getElementRecursive(node,id);
			if(el != null) return el;
		}
	}
	return null;
};
dia.js.JSView.prototype.inputValue = function(elementId) {
	return this.getElement(elementId).value;
};
dia.js.JSView.prototype.get_rotation = function() {
	var st = window.getComputedStyle(this.element,null);
	var tr = st.getPropertyValue("-webkit-transform");
	if(tr == null) tr = st.getPropertyValue("-moz-transform");
	if(tr == null) tr = st.getPropertyValue("-ms-transform");
	if(tr == null) tr = st.getPropertyValue("-o-transform");
	if(tr == null) tr = st.getPropertyValue("transform");
	if(tr == null) return 0;
	return 0;
};
dia.js.JSView.prototype.set_rotation = function(degree) {
	this.element.style.webkitTransform = "rotate(" + degree + "deg)";
	this.element.style.mozTransform = "rotate(" + degree + "deg)";
	this.element.style.msTransform = "rotate(" + degree + "deg)";
	this.element.style.oTransform = "rotate(" + degree + "deg)";
	this.element.style.transform = "rotate(" + degree + "deg)";
	return this.get_rotation();
};
dia.js.JSView.prototype.get_topPx = function() {
	return Std.parseFloat(this.element.style.top.substring(0,this.element.style.top.length - 2));
};
dia.js.JSView.prototype.set_topPx = function(value) {
	this.element.style.top = (value == null?"null":"" + value) + "px";
	return value;
};
dia.js.JSView.prototype.set_alpha = function(value) {
	if(value == null) this.element.style.opacity = "null"; else this.element.style.opacity = "" + value;
	this.element.style.filter = "alpha(opacity=" + value * 100 + ")";
	return value;
};
dia.js.JSView.prototype.get_marginTopPx = function() {
	return this.element.offsetTop;
};
dia.js.JSView.prototype.set_marginTopPx = function(value) {
	this.element.style.marginTop = (value == null?"null":"" + value) + "px";
	return this.element.offsetTop;
};
dia.js.JSView.prototype.get_widthPx = function() {
	return this.element.clientWidth;
};
dia.js.JSView.prototype.set_widthPx = function(value) {
	this.element.style.width = (value == null?"null":"" + value) + "px";
	return this.element.clientWidth;
};
dia.js.JSView.prototype.get_heightPx = function() {
	return this.element.clientHeight;
};
dia.js.JSView.prototype.set_heightPx = function(value) {
	this.element.style.height = (value == null?"null":"" + value) + "px";
	return this.element.clientHeight;
};
dia.js.JSView.prototype.__class__ = dia.js.JSView;
dia.js.JSView.prototype.__properties__ = $extend(dia.client.View.prototype.__properties__, {get_visible:"get_visible", set_visible:"set_visible", get_rotation:"get_rotation", set_rotation:"set_rotation", get_topPx:"get_topPx", set_topPx:"set_topPx", set_alpha:"set_alpha", get_marginTopPx:"get_marginTopPx", set_marginTopPx:"set_marginTopPx", get_widthPx:"get_widthPx", set_widthPx:"set_widthPx", get_heightPx:"get_heightPx", set_heightPx:"set_heightPx"});
dia.model.domain.IDomainObject = $hxClasses['dia.model.domain.IDomainObject'] = function() { };
dia.model.domain.IDomainObject.__name__ = ["dia","model","domain","IDomainObject"];
dia.model.domain.IDomainObject.prototype.uid = null;
dia.model.domain.IDomainObject.prototype.__class__ = dia.model.domain.IDomainObject;
dia.model.domain.IDomainObject.prototype.__properties__ = {};
dia.model.domain.DomainObject = $hxClasses['dia.model.domain.DomainObject'] = function() {
};
dia.model.domain.DomainObject.__name__ = ["dia","model","domain","DomainObject"];
dia.model.domain.DomainObject.prototype.uid = null;
dia.model.domain.DomainObject.prototype.equals = function(obj) {
	return obj.uid == this.uid;
};
dia.model.domain.DomainObject.prototype.__class__ = dia.model.domain.DomainObject;
dia.model.domain.DomainObject.prototype.__properties__ = {};
dia.model.domain.DomainObject.__interfaces__ = [dia.model.domain.IDomainObject];
dia.model.domain.ContextDomainObject = $hxClasses['dia.model.domain.ContextDomainObject'] = function() {
	dia.model.domain.DomainObject.call(this);
};
dia.model.domain.ContextDomainObject.__name__ = ["dia","model","domain","ContextDomainObject"];
dia.model.domain.ContextDomainObject.__super__ = dia.model.domain.DomainObject;
for(var k in dia.model.domain.DomainObject.prototype ) dia.model.domain.ContextDomainObject.prototype[k] = dia.model.domain.DomainObject.prototype[k];
dia.model.domain.ContextDomainObject.prototype.__class__ = dia.model.domain.ContextDomainObject;
dia.model.domain.ContextDomainObject.prototype.__properties__ = $extend(dia.model.domain.DomainObject.prototype.__properties__, {});
dia.model.service.ServiceRequester = $hxClasses['dia.model.service.ServiceRequester'] = function(completeHandler,failHandler) {
	this.completeHandler = completeHandler;
	this.failHandler = failHandler;
};
dia.model.service.ServiceRequester.__name__ = ["dia","model","service","ServiceRequester"];
dia.model.service.ServiceRequester.prototype.request = null;
dia.model.service.ServiceRequester.prototype.response = null;
dia.model.service.ServiceRequester.prototype.error = null;
dia.model.service.ServiceRequester.prototype.completeHandler = null;
dia.model.service.ServiceRequester.prototype.failHandler = null;
dia.model.service.ServiceRequester.prototype.call = function(request) {
	this.request = request;
};
dia.model.service.ServiceRequester.prototype.finishSuccess = function() {
	if(this.completeHandler != null) this.completeHandler(this);
};
dia.model.service.ServiceRequester.prototype.finishFail = function() {
	if(this.failHandler != null) this.failHandler(this);
};
dia.model.service.ServiceRequester.prototype.__class__ = dia.model.service.ServiceRequester;
dia.model.service.ServiceRequester.prototype.__properties__ = {};
dia.model.service.HttpServiceRequester = $hxClasses['dia.model.service.HttpServiceRequester'] = function(url,completeHandler,failHandler,method) {
	if(method == null) method = "GET";
	if(url == null) url = "";
	dia.model.service.ServiceRequester.call(this,completeHandler,failHandler);
	this.status = -1;
	this.url = url;
	this.http = new haxe.Http(url);
	this.method = method.toUpperCase();
};
dia.model.service.HttpServiceRequester.__name__ = ["dia","model","service","HttpServiceRequester"];
dia.model.service.HttpServiceRequester.__super__ = dia.model.service.ServiceRequester;
for(var k in dia.model.service.ServiceRequester.prototype ) dia.model.service.HttpServiceRequester.prototype[k] = dia.model.service.ServiceRequester.prototype[k];
dia.model.service.HttpServiceRequester.GLOBAL_HEADERS = null;
dia.model.service.HttpServiceRequester.addGlobalheader = function(name,value) {
	if(dia.model.service.HttpServiceRequester.GLOBAL_HEADERS == null) dia.model.service.HttpServiceRequester.GLOBAL_HEADERS = [];
	dia.model.service.HttpServiceRequester.GLOBAL_HEADERS.push({ name : name, value : value});
};
dia.model.service.HttpServiceRequester.prototype.url = null;
dia.model.service.HttpServiceRequester.prototype.data = null;
dia.model.service.HttpServiceRequester.prototype.http = null;
dia.model.service.HttpServiceRequester.prototype.method = null;
dia.model.service.HttpServiceRequester.prototype.status = null;
dia.model.service.HttpServiceRequester.prototype.setHeader = function(name,value) {
	this.http.setHeader(name,value);
};
dia.model.service.HttpServiceRequester.prototype.call = function(request) {
	if(dia.model.service.HttpServiceRequester.GLOBAL_HEADERS != null) {
		var _g = 0;
		var _g1 = dia.model.service.HttpServiceRequester.GLOBAL_HEADERS;
		while(_g < _g1.length) {
			var header = _g1[_g];
			++_g;
			this.http.setHeader(header.name,header.value);
		}
	}
	this.http.onStatus = $bind(this,this.onStatus);
	this.http.onData = $bind(this,this.onComplete);
	this.http.onError = $bind(this,this.onError);
	this.http.setParameter("data",StringTools.htmlEscape(JSON.stringify(dia.util.ConversionUtil.toTransferObject(request))));
	this.http.setParameter("method",this.method);
	if(this.method == "POST" || this.method == "PUT" || this.method == "DELETE") this.http.request(true); else this.http.request(false);
};
dia.model.service.HttpServiceRequester.prototype.onStatus = function(status) {
	this.status = status;
};
dia.model.service.HttpServiceRequester.prototype.onComplete = function(jsonData) {
	this.data = jsonData;
	try {
		this.response = dia.util.ConversionUtil.toDomainObject(JSON.parse(jsonData));
	} catch( error ) {
		haxe.CallStack.lastException = error;
		if (error instanceof js._Boot.HaxeError) error = error.val;
	}
	this.finishSuccess();
};
dia.model.service.HttpServiceRequester.prototype.onError = function(error) {
	this.error = error;
	this.finishFail();
};
dia.model.service.HttpServiceRequester.prototype.__class__ = dia.model.service.HttpServiceRequester;
dia.model.service.HttpServiceRequester.prototype.__properties__ = $extend(dia.model.service.ServiceRequester.prototype.__properties__, {});
dia.net.ClientSession = $hxClasses['dia.net.ClientSession'] = function() {
};
dia.net.ClientSession.__name__ = ["dia","net","ClientSession"];
dia.net.ClientSession.SESSION = null;
dia.net.ClientSession.prototype.token = null;
dia.net.ClientSession.prototype._token = null;
dia.net.ClientSession.prototype.get_token = function() {
	return this._token;
};
dia.net.ClientSession.prototype.set_token = function(value) {
	dia.net.ClientSession.SESSION = value;
	this._token = value;
	js.Cookie.set("token",this._token,24000,"/");
	return this._token;
};
dia.net.ClientSession.prototype.__class__ = dia.net.ClientSession;
dia.net.ClientSession.prototype.__properties__ = {get_token:"get_token", set_token:"set_token"};
dia.net.IUrlMonitor = $hxClasses['dia.net.IUrlMonitor'] = function() { };
dia.net.IUrlMonitor.__name__ = ["dia","net","IUrlMonitor"];
dia.net.IUrlMonitor.prototype.get_available = null;
dia.net.IUrlMonitor.prototype.get_acceptableStatusCodes = null;
dia.net.IUrlMonitor.prototype.set_acceptableStatusCodes = null;
dia.net.IUrlMonitor.prototype.statusChange = null;
dia.net.IUrlMonitor.prototype.available = null;
dia.net.IUrlMonitor.prototype.urlChecked = null;
dia.net.IUrlMonitor.prototype.url = null;
dia.net.IUrlMonitor.prototype.acceptableStatusCodes = null;
dia.net.IUrlMonitor.prototype.start = null;
dia.net.IUrlMonitor.prototype.checkStatus = null;
dia.net.IUrlMonitor.prototype.__class__ = dia.net.IUrlMonitor;
dia.net.IUrlMonitor.prototype.__properties__ = {get_available:"get_available", get_acceptableStatusCodes:"get_acceptableStatusCodes", set_acceptableStatusCodes:"set_acceptableStatusCodes"};
dia.net.UrlMonitor = $hxClasses['dia.net.UrlMonitor'] = function(url) {
	this._available = true;
	this.urlChecked = false;
	this._available = true;
	this.url = url;
	this.set_acceptableStatusCodes([200,202,204,205,206]);
	this.statusChange = new msignal.Signal1();
};
dia.net.UrlMonitor.__name__ = ["dia","net","UrlMonitor"];
dia.net.UrlMonitor.prototype.url = null;
dia.net.UrlMonitor.prototype.acceptableStatusCodes = null;
dia.net.UrlMonitor.prototype.get_acceptableStatusCodes = function() {
	return null;
};
dia.net.UrlMonitor.prototype.set_acceptableStatusCodes = function(value) {
	return null;
};
dia.net.UrlMonitor.prototype.statusChange = null;
dia.net.UrlMonitor.prototype.available = null;
dia.net.UrlMonitor.prototype.urlChecked = null;
dia.net.UrlMonitor.prototype._available = null;
dia.net.UrlMonitor.prototype.http = null;
dia.net.UrlMonitor.prototype.get_available = function() {
	this.checkStatus();
	return this._available;
};
dia.net.UrlMonitor.prototype.start = function() {
};
dia.net.UrlMonitor.prototype.checkStatus = function() {
};
dia.net.UrlMonitor.prototype.__class__ = dia.net.UrlMonitor;
dia.net.UrlMonitor.prototype.__properties__ = {get_acceptableStatusCodes:"get_acceptableStatusCodes", set_acceptableStatusCodes:"set_acceptableStatusCodes", get_available:"get_available"};
dia.net.UrlMonitor.__interfaces__ = [dia.net.IUrlMonitor];
dia.terminal.IInstruction = $hxClasses['dia.terminal.IInstruction'] = function() { };
dia.terminal.IInstruction.__name__ = ["dia","terminal","IInstruction"];
dia.terminal.IInstruction.prototype.helpText = null;
dia.terminal.IInstruction.prototype.execute = null;
dia.terminal.IInstruction.prototype.__class__ = dia.terminal.IInstruction;
dia.terminal.IInstruction.prototype.__properties__ = {};
dia.terminal.Terminal = $hxClasses['dia.terminal.Terminal'] = function(injector) {
	this.injector = injector;
	this.currIndex = 0;
	this.currentCommandHistoryIndex = 0;
	this.controlIsDown = false;
	this.commandHistory = [];
	this.timers = new haxe.ds.IntMap();
	this.instructions = new haxe.ds.StringMap();
	this.out = new msignal.Signal2();
	this.log = "";
};
dia.terminal.Terminal.__name__ = ["dia","terminal","Terminal"];
dia.terminal.Terminal._instance = null;
dia.terminal.Terminal.getInstance = function() {
	if(dia.terminal.Terminal._instance == null) throw new js._Boot.HaxeError("Must call Terminal.init() before usage");
	return dia.terminal.Terminal._instance;
};
dia.terminal.Terminal.init = function(injector) {
	if(injector == null) throw new js._Boot.HaxeError("Injector can not be null");
	dia.terminal.Terminal._instance = new dia.terminal.Terminal(injector);
};
dia.terminal.Terminal.prototype.log = null;
dia.terminal.Terminal.prototype.out = null;
dia.terminal.Terminal.prototype.currIndex = null;
dia.terminal.Terminal.prototype.instructions = null;
dia.terminal.Terminal.prototype.controlIsDown = null;
dia.terminal.Terminal.prototype.timers = null;
dia.terminal.Terminal.prototype.commandHistory = null;
dia.terminal.Terminal.prototype.currentCommandHistoryIndex = null;
dia.terminal.Terminal.prototype.injector = null;
dia.terminal.Terminal.prototype.clear = function() {
	this.log = "";
};
dia.terminal.Terminal.prototype.startTimer = function(timerID) {
	var value = haxe.Timer.stamp();
	this.timers.h[timerID] = value;
};
dia.terminal.Terminal.prototype.outTime = function(timerID) {
	var time = haxe.Timer.stamp() - this.timers.h[timerID];
	this.print("Timer " + timerID + ": " + (time == null?"null":"" + time) + "s, " + (time == null?"null":"" + time) + "ms",null,{ fileName : "Terminal.hx", lineNumber : 83, className : "dia.terminal.Terminal", methodName : "outTime"});
	return time;
};
dia.terminal.Terminal.prototype.gotoPreviousExecutedCommand = function() {
	if(this.currentCommandHistoryIndex > 0) {
		--this.currentCommandHistoryIndex;
		return this.commandHistory[this.currentCommandHistoryIndex];
	}
	return "";
};
dia.terminal.Terminal.prototype.gotoNextExecutedCommand = function() {
	if(this.currentCommandHistoryIndex < this.commandHistory.length) {
		++this.currentCommandHistoryIndex;
		if(this.currentCommandHistoryIndex == this.commandHistory.length) return ""; else return this.commandHistory[this.currentCommandHistoryIndex];
	}
	return "";
};
dia.terminal.Terminal.prototype.debugTrace = function(v,info) {
	this.print(Std.string(v),true,info);
	var str = Std.string(v);
	if(info != null) str = info.fileName + "(" + info.lineNumber + "): " + str;
	console.log(str);
};
dia.terminal.Terminal.prototype.print = function(str,onNewLine,info) {
	if(onNewLine == null) onNewLine = true;
	if(info != null) str = info.fileName + "(" + (info.lineNumber == null?"null":"" + info.lineNumber) + "): " + str;
	if(this.log != "" && onNewLine) this.log += "\n";
	this.log += str;
	this.out.dispatch(str,null);
};
dia.terminal.Terminal.prototype.addInstrunction = function(name,instrunction) {
	this.instructions.set(name,instrunction);
};
dia.terminal.Terminal.prototype.getInstrunction = function(name) {
	return this.instructions.get(name);
};
dia.terminal.Terminal.prototype.executeInstrunction = function(command) {
	this.commandHistory.push(command);
	this.currentCommandHistoryIndex = this.commandHistory.length;
	var parts = command.split(",");
	var name = parts[0];
	var args;
	if(parts.length > 1) args = parts.splice(1,parts.length); else args = [];
	if(name == "help" || name == "?") {
		this.out.dispatch("---- Command Syntax ----",null);
		this.out.dispatch("Enter the command name and arguments separated by commas.",null);
		this.out.dispatch("Example: commandName,arg1,arg2",null);
		this.out.dispatch(" ",null);
		this.out.dispatch("---- Command List ----",null);
		var keys = this.instructions.keys();
		while( keys.hasNext() ) {
			var key = keys.next();
			this.out.dispatch(key,null);
			var classType = this.instructions.get(key);
			var instruction = this.injector.instantiate(classType);
			this.out.dispatch(instruction.helpText,null);
			this.out.dispatch(" ",null);
		}
		this.out.dispatch("----------------------",null);
		return;
	}
	var instructionClass = this.getInstrunction(name);
	if(instructionClass == null) this.out.dispatch(name + " Instruction Not Found\n",null); else try {
		var instruction1 = this.injector.instantiate(instructionClass);
		instruction1.execute(args);
	} catch( error ) {
		haxe.CallStack.lastException = error;
		if (error instanceof js._Boot.HaxeError) error = error.val;
		this.out.dispatch(error,null);
	}
};
dia.terminal.Terminal.prototype.keyUp = function(keyCode) {
	if(keyCode == 17) this.controlIsDown = false;
	if(keyCode == 38) this.gotoPreviousExecutedCommand();
	if(keyCode == 40) this.gotoNextExecutedCommand();
};
dia.terminal.Terminal.prototype.keyDown = function(keyCode) {
	if(keyCode == 17) {
		this.controlIsDown = true;
		return;
	}
};
dia.terminal.Terminal.prototype.__class__ = dia.terminal.Terminal;
dia.terminal.Terminal.prototype.__properties__ = {};
dia.util.CollectionUtil = $hxClasses['dia.util.CollectionUtil'] = function() { };
dia.util.CollectionUtil.__name__ = ["dia","util","CollectionUtil"];
dia.util.CollectionUtil.update = function(collection,obj) {
	var _g1 = 0;
	var _g = collection.length;
	while(_g1 < _g) {
		var a = _g1++;
		if(collection[a].uid == obj.uid) collection[a] = obj;
	}
};
dia.util.CollectionUtil.insertAt = function(collection,obj,index) {
	if(index < 0 || index > collection.length) throw new js._Boot.HaxeError("index is out of range");
	if(index == collection.length) collection.push(obj); else if(index == 0) collection.unshift(obj); else {
		var temp = collection.slice(0,index - 1);
		temp.push(obj);
		collection = temp.concat(collection.slice(index));
	}
};
dia.util.CollectionUtil.getById = function(collection,uid) {
	var _g = 0;
	while(_g < collection.length) {
		var obj = collection[_g];
		++_g;
		if(obj.uid == uid) return obj;
	}
	return null;
};
dia.util.CollectionUtil.getIndexById = function(collection,uid) {
	var _g1 = 0;
	var _g = collection.length;
	while(_g1 < _g) {
		var a = _g1++;
		var obj = collection[a];
		if(obj.uid == uid) return a;
	}
	return -1;
};
dia.util.CollectionUtil.removeById = function(collection,uid) {
	var obj = dia.util.CollectionUtil.getById(collection,uid);
	var index = dia.util.CollectionUtil.getIndexById(collection,uid);
	if(index >= 0) dia.util.CollectionUtil.removeItemAt(collection,index);
	return obj;
};
dia.util.CollectionUtil.removeItemAt = function(collection,index) {
	if(index < 0 || index >= collection.length) throw new js._Boot.HaxeError("Index is out of range");
	var obj = collection.splice(index,1)[0];
	return obj;
};
dia.util.CollectionUtil.swap = function(collection,objA,objB) {
	var indexA = dia.util.CollectionUtil.getIndexById(collection,objA.uid);
	var indexB = dia.util.CollectionUtil.getIndexById(collection,objB.uid);
	if(indexA == -1 || indexB == -1) return false;
	var temp = collection[indexA];
	collection[indexA] = collection[indexB];
	collection[indexB] = temp;
	return true;
};
dia.util.CollectionUtil.prototype.__class__ = dia.util.CollectionUtil;
dia.util.CollectionUtil.prototype.__properties__ = {};
dia.util.ConversionUtil = $hxClasses['dia.util.ConversionUtil'] = function() { };
dia.util.ConversionUtil.__name__ = ["dia","util","ConversionUtil"];
dia.util.ConversionUtil.toTransferObject = function(domainObject) {
	if(domainObject.getDTO != null) return domainObject.getDTO();
	if(dia.util.ObjectUtil.isIterable(domainObject)) {
		var arr = [];
		var iterator = $iterator(domainObject)();
		while( iterator.hasNext() ) {
			var subObj = iterator.next();
			arr.push(dia.util.ConversionUtil.toTransferObject(subObj));
		}
		return arr;
	}
	if(Type.getClass(domainObject) == Date) return { __type : "Date", data : domainObject.getTime()};
	var topFieldType = Type["typeof"](domainObject);
	if(topFieldType == ValueType.TInt || topFieldType == ValueType.TFloat || topFieldType == ValueType.TBool || topFieldType == ValueType.TNull) return domainObject;
	var type = Type.getClass(domainObject);
	var to = { };
	var fields = null;
	if(type != null) {
		fields = Type.getInstanceFields(type);
		to.__type = Type.getClassName(type);
	} else fields = Reflect.fields(domainObject);
	var _g = 0;
	while(_g < fields.length) {
		var fieldName = fields[_g];
		++_g;
		if(type != null && dia.util.MetaUtil.getPropertyMeta(type,fieldName,"dtSkip") != null || fieldName.charAt(0) == "_" || fieldName == "serverId") continue;
		var fieldValue = Reflect.field(domainObject,fieldName);
		var fieldType = Type["typeof"](fieldValue);
		switch(fieldType[1]) {
		case 4:case 6:case 1:case 2:case 3:case 0:
			if(fieldValue != null) switch(fieldType[1]) {
			case 4:case 6:
				if(dia.util.ObjectUtil.isIterable(fieldValue)) {
					var arr1 = [];
					var iterator1 = $iterator(fieldValue)();
					while( iterator1.hasNext() ) {
						var subObj1 = iterator1.next();
						arr1.push(dia.util.ConversionUtil.toTransferObject(subObj1));
					}
					to[fieldName] = arr1;
				} else {
					var fieldClass = Type.getClass(fieldValue);
					var fieldTypeName = "";
					if(fieldClass != null) fieldTypeName = Type.getClassName(fieldClass);
					if(fieldTypeName == "String" || fieldTypeName == "haxe.io.Bytes") Reflect.setField(to,fieldName,dia.util.ConversionUtil.getPhpFieldValue(fieldValue)); else {
						var subObj2 = dia.util.ConversionUtil.toTransferObject(fieldValue);
						to[fieldName] = subObj2;
					}
				}
				break;
			case 1:case 2:case 3:
				to[fieldName] = fieldValue;
				break;
			default:
			}
			break;
		default:
		}
	}
	return to;
};
dia.util.ConversionUtil.toDomainObject = function(object) {
	if(dia.util.ObjectUtil.isIterable(object)) {
		var collection = [];
		var iterator = $iterator(object)();
		while( iterator.hasNext() ) {
			var subObj = iterator.next();
			collection.push(dia.util.ConversionUtil.toDomainObject(subObj));
		}
		return collection;
	}
	var topFieldType = Type["typeof"](object);
	if(topFieldType == ValueType.TInt || topFieldType == ValueType.TFloat || topFieldType == ValueType.TBool || topFieldType == ValueType.TNull) return object;
	var domainObj = null;
	var type = null;
	var fields = null;
	if(Object.prototype.hasOwnProperty.call(object,"__type")) {
		if(object.__type == "Date") {
			var t = object.data;
			var d = new Date();
			d.setTime(t);
			return d;
		}
		type = Type.resolveClass(object.__type);
		domainObj = Type.createInstance(type,[]);
		fields = Type.getInstanceFields(type);
	} else {
		domainObj = { };
		fields = Reflect.fields(object);
	}
	var _g = 0;
	while(_g < fields.length) {
		var fieldName = fields[_g];
		++_g;
		if(type != null && dia.util.MetaUtil.getPropertyMeta(type,fieldName,"dtSkip") != null || fieldName.charAt(0) == "_") continue;
		var fieldValue = Reflect.getProperty(object,fieldName);
		var fieldType = Type["typeof"](fieldValue);
		switch(fieldType[1]) {
		case 4:case 6:case 1:case 2:case 3:case 0:
			if(fieldValue != null) switch(fieldType[1]) {
			case 4:case 6:
				if(dia.util.ObjectUtil.isIterable(fieldValue)) {
					var collection1 = [];
					var iterator1 = $iterator(fieldValue)();
					while( iterator1.hasNext() ) {
						var subObj1 = iterator1.next();
						collection1.push(dia.util.ConversionUtil.toDomainObject(subObj1));
					}
					domainObj[fieldName] = collection1;
				} else {
					var fieldClass = Type.getClass(fieldValue);
					var fieldTypeName = "";
					if(fieldClass != null) fieldTypeName = Type.getClassName(fieldClass);
					if(fieldTypeName == "String") Reflect.setField(domainObj,fieldName,dia.util.ConversionUtil.getPhpFieldValue(fieldValue)); else {
						var subObj2 = dia.util.ConversionUtil.toDomainObject(fieldValue);
						domainObj[fieldName] = subObj2;
					}
				}
				break;
			case 1:case 2:case 3:
				domainObj[fieldName] = fieldValue;
				break;
			default:
			}
			break;
		default:
		}
	}
	return domainObj;
};
dia.util.ConversionUtil.getClassNameWithoutPath = function(type) {
	var name = Type.getClassName(type);
	return name.split(".").pop();
};
dia.util.ConversionUtil.getPhpFieldValue = function(obj) {
	return obj;
};
dia.util.ConversionUtil.prototype.__class__ = dia.util.ConversionUtil;
dia.util.ConversionUtil.prototype.__properties__ = {};
dia.util.FileUtil = $hxClasses['dia.util.FileUtil'] = function() { };
dia.util.FileUtil.__name__ = ["dia","util","FileUtil"];
dia.util.FileUtil.prototype.__class__ = dia.util.FileUtil;
dia.util.FileUtil.prototype.__properties__ = {};
dia.util.MetaUtil = $hxClasses['dia.util.MetaUtil'] = function() { };
dia.util.MetaUtil.__name__ = ["dia","util","MetaUtil"];
dia.util.MetaUtil.getPropertyMeta = function(type,propName,metaName) {
	if(type == null) return null;
	var metaDatas = [];
	var fields = [];
	do {
		var m = haxe.rtti.Meta.getFields(type);
		metaDatas.push(m);
		fields = fields.concat(Reflect.fields(m));
		type = Type.getSuperClass(type);
	} while(type != null);
	var _g = 0;
	while(_g < fields.length) {
		var fieldName = fields[_g];
		++_g;
		if(fieldName == propName) {
			var _g1 = 0;
			while(_g1 < metaDatas.length) {
				var m1 = metaDatas[_g1];
				++_g1;
				var data = Reflect.field(m1,fieldName);
				if(data != null) return data;
			}
		}
	}
	return null;
};
dia.util.MetaUtil.prototype.__class__ = dia.util.MetaUtil;
dia.util.MetaUtil.prototype.__properties__ = {};
dia.util.ObjectUtil = $hxClasses['dia.util.ObjectUtil'] = function() { };
dia.util.ObjectUtil.__name__ = ["dia","util","ObjectUtil"];
dia.util.ObjectUtil.deepCopy = function(v) {
	if(!Reflect.isObject(v)) return v; else if((v instanceof Array) && v.__enum__ == null) {
		var r = Type.createInstance(v == null?null:js.Boot.getClass(v),[]);
		var _g1 = 0;
		var _g = v.length;
		while(_g1 < _g) {
			var ii = _g1++;
			r.push(dia.util.ObjectUtil.deepCopy(v[ii]));
		}
		return r;
	} else if((v == null?null:js.Boot.getClass(v)) == null) {
		var obj = { };
		var _g2 = 0;
		var _g11 = Reflect.fields(v);
		while(_g2 < _g11.length) {
			var ff = _g11[_g2];
			++_g2;
			Reflect.setField(obj,ff,dia.util.ObjectUtil.deepCopy(Reflect.field(v,ff)));
		}
		return obj;
	} else {
		var obj1 = Type.createEmptyInstance(v == null?null:js.Boot.getClass(v));
		var _g3 = 0;
		var _g12 = Reflect.fields(v);
		while(_g3 < _g12.length) {
			var ff1 = _g12[_g3];
			++_g3;
			Reflect.setField(obj1,ff1,dia.util.ObjectUtil.deepCopy(Reflect.field(v,ff1)));
		}
		return obj1;
	}
	return null;
};
dia.util.ObjectUtil.createID = function(size) {
	if(size == null) size = 32;
	var nchars = dia.util.ObjectUtil.UID_CHARS.length;
	var uid = new StringBuf();
	var _g = 0;
	while(_g < size) {
		var i = _g++;
		uid.addChar((function($this) {
			var $r;
			var index = Std.random(nchars);
			$r = HxOverrides.cca(dia.util.ObjectUtil.UID_CHARS,index);
			return $r;
		}(this)));
	}
	return uid.b;
};
dia.util.ObjectUtil.getPhpString = function(obj) {
	try {
		if(obj == null) return "";
		if(obj.b != null) return obj.b;
		return obj;
	} catch( error ) {
		haxe.CallStack.lastException = error;
		if (error instanceof js._Boot.HaxeError) error = error.val;
		if( js.Boot.__instanceof(error,String) ) {
		} else throw(error);
	}
	return "";
};
dia.util.ObjectUtil.isIterable = function(value) {
	if(value == null) return false;
	var fieldClass = Type.getClass(value);
	if(fieldClass != null) {
		var fieldTypeName1 = Type.getClassName(fieldClass);
		if(fieldTypeName1 == "String") return false;
	}
	var field = Reflect.field(value,"iterator");
	if(field != null && Reflect.isFunction(field)) return true;
	field = Reflect.field(value,"hasNext");
	if(field != null && Reflect.isFunction(field)) {
		field = Reflect.field(value,"next");
		if(field != null && Reflect.isFunction(field)) return true;
	}
	var fieldClass1 = Type.getClass(value);
	var fieldTypeName = "";
	if(fieldClass1 != null) fieldTypeName = Type.getClassName(fieldClass1);
	if(fieldTypeName == "Array") return true;
	return false;
};
dia.util.ObjectUtil.prototype.__class__ = dia.util.ObjectUtil;
dia.util.ObjectUtil.prototype.__properties__ = {};
dia.util.Setting = $hxClasses['dia.util.Setting'] = function(name,value) {
	if(value == null) value = "";
	if(name == null) name = "";
	this.name = name;
	this.value = value;
	this.children = new haxe.ds.StringMap();
};
dia.util.Setting.__name__ = ["dia","util","Setting"];
dia.util.Setting.prototype.name = null;
dia.util.Setting.prototype.value = null;
dia.util.Setting.prototype.children = null;
dia.util.Setting.prototype.__class__ = dia.util.Setting;
dia.util.Setting.prototype.__properties__ = {};
dia.util.Settings = $hxClasses['dia.util.Settings'] = function() {
	this._rootSetting = new dia.util.Setting("root","");
};
dia.util.Settings.__name__ = ["dia","util","Settings"];
dia.util.Settings.prototype._rootSetting = null;
dia.util.Settings.prototype.add = function(path,value) {
	return this.addSettingRecursive(this._rootSetting,path.split("."),value);
};
dia.util.Settings.prototype.addSettingRecursive = function(setting,path,value) {
	if(path.length == 0) return null;
	var newSetting = setting.children.get(path[0]);
	if(newSetting == null) {
		newSetting = new dia.util.Setting(path[0]);
		setting.children.set(path[0],newSetting);
	}
	if(path.length == 1) {
		newSetting.value = value;
		return newSetting;
	}
	return this.addSettingRecursive(newSetting,path.slice(1),value);
};
dia.util.Settings.prototype.get = function(path) {
	var setting = this.getSettingRecursive(this._rootSetting,path.split("."));
	if(setting == null) throw new js._Boot.HaxeError("Settings path not found: " + path);
	return setting;
};
dia.util.Settings.prototype.getSettingRecursive = function(setting,path) {
	if(path.length == 0) return setting;
	var _g1 = 0;
	var _g = path.length;
	while(_g1 < _g) {
		var a = _g1++;
		var foundSetting = setting.children.get(path[a]);
		if(foundSetting == null) return null; else {
			foundSetting = this.getSettingRecursive(foundSetting,path.slice(1));
			if(foundSetting != null) return foundSetting;
		}
	}
	return null;
};
dia.util.Settings.prototype.readXMLSettings = function(xmlString) {
	if(xmlString == "") return;
	var xml = Xml.parse(xmlString);
	var fastXML = new haxe.xml.Fast(xml.firstElement());
	this.readXMLSettingsRecursive(fastXML,[]);
};
dia.util.Settings.prototype.readXMLSettingsRecursive = function(xml,path) {
	var count = 0;
	var $it0 = xml.get_elements();
	while( $it0.hasNext() ) {
		var node = $it0.next();
		++count;
		var arr = path.slice();
		arr.push(xml.get_name());
		this.readXMLSettingsRecursive(node,arr);
	}
	if(count == 0) {
		var arr1 = path.slice();
		arr1.push(xml.get_name());
		this.add(arr1.join("."),xml.get_innerHTML());
	}
};
dia.util.Settings.prototype.__class__ = dia.util.Settings;
dia.util.Settings.prototype.__properties__ = {};
haxe.StackItem = $hxClasses['haxe.StackItem'] = { __ename__ : ["haxe","StackItem"], __constructs__ : ["CFunction","Module","FilePos","Method","LocalFunction"] };
haxe.StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; };
haxe.StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; };
haxe.StackItem.LocalFunction = function(v) { var $x = ["LocalFunction",4,v]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; };
haxe.StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; };
haxe.StackItem.CFunction = ["CFunction",0];
haxe.StackItem.CFunction.toString = $estr;
haxe.StackItem.CFunction.__enum__ = haxe.StackItem;
haxe.CallStack = $hxClasses['haxe.CallStack'] = function() { };
haxe.CallStack.__name__ = ["haxe","CallStack"];
haxe.CallStack.lastException = null;
haxe.CallStack.getStack = function(e) {
	if(e == null) return [];
	var oldValue = Error.prepareStackTrace;
	Error.prepareStackTrace = function(error,callsites) {
		var stack = [];
		var _g = 0;
		while(_g < callsites.length) {
			var site = callsites[_g];
			++_g;
			if(haxe.CallStack.wrapCallSite != null) site = haxe.CallStack.wrapCallSite(site);
			var method = null;
			var fullName = site.getFunctionName();
			if(fullName != null) {
				var idx = fullName.lastIndexOf(".");
				if(idx >= 0) {
					var className = HxOverrides.substr(fullName,0,idx);
					var methodName = HxOverrides.substr(fullName,idx + 1,null);
					method = haxe.StackItem.Method(className,methodName);
				}
			}
			stack.push(haxe.StackItem.FilePos(method,site.getFileName(),site.getLineNumber()));
		}
		return stack;
	};
	var a = haxe.CallStack.makeStack(e.stack);
	Error.prepareStackTrace = oldValue;
	return a;
};
haxe.CallStack.wrapCallSite = null;
haxe.CallStack.exceptionStack = function() {
	return haxe.CallStack.getStack(haxe.CallStack.lastException);
};
haxe.CallStack.makeStack = function(s) {
	if(s == null) return []; else if(typeof(s) == "string") {
		var stack = s.split("\n");
		if(stack[0] == "Error") stack.shift();
		var m = [];
		var rie10 = new EReg("^   at ([A-Za-z0-9_. ]+) \\(([^)]+):([0-9]+):([0-9]+)\\)$","");
		var _g = 0;
		while(_g < stack.length) {
			var line = stack[_g];
			++_g;
			if(rie10.match(line)) {
				var path = rie10.matched(1).split(".");
				var meth = path.pop();
				var file = rie10.matched(2);
				var line1 = Std.parseInt(rie10.matched(3));
				m.push(haxe.StackItem.FilePos(meth == "Anonymous function"?haxe.StackItem.LocalFunction():meth == "Global code"?null:haxe.StackItem.Method(path.join("."),meth),file,line1));
			} else m.push(haxe.StackItem.Module(StringTools.trim(line)));
		}
		return m;
	} else return s;
};
haxe.CallStack.prototype.__class__ = haxe.CallStack;
haxe.CallStack.prototype.__properties__ = {};
haxe.IMap = $hxClasses['haxe.IMap'] = function() { };
haxe.IMap.__name__ = ["haxe","IMap"];
haxe.IMap.prototype.get = null;
haxe.IMap.prototype.set = null;
haxe.IMap.prototype.__class__ = haxe.IMap;
haxe.IMap.prototype.__properties__ = {};
haxe.Http = $hxClasses['haxe.Http'] = function(url) {
	this.url = url;
	this.headers = new List();
	this.params = new List();
	this.async = true;
};
haxe.Http.__name__ = ["haxe","Http"];
haxe.Http.prototype.url = null;
haxe.Http.prototype.responseData = null;
haxe.Http.prototype.async = null;
haxe.Http.prototype.postData = null;
haxe.Http.prototype.headers = null;
haxe.Http.prototype.params = null;
haxe.Http.prototype.setHeader = function(header,value) {
	this.headers = Lambda.filter(this.headers,function(h) {
		return h.header != header;
	});
	this.headers.push({ header : header, value : value});
	return this;
};
haxe.Http.prototype.setParameter = function(param,value) {
	this.params = Lambda.filter(this.params,function(p) {
		return p.param != param;
	});
	this.params.push({ param : param, value : value});
	return this;
};
haxe.Http.prototype.req = null;
haxe.Http.prototype.request = function(post) {
	var me = this;
	me.responseData = null;
	var r = this.req = js.Browser.createXMLHttpRequest();
	var onreadystatechange = function(_) {
		if(r.readyState != 4) return;
		var s;
		try {
			s = r.status;
		} catch( e ) {
			haxe.CallStack.lastException = e;
			if (e instanceof js._Boot.HaxeError) e = e.val;
			s = null;
		}
		if(s != null) {
			var protocol = window.location.protocol.toLowerCase();
			var rlocalProtocol = new EReg("^(?:about|app|app-storage|.+-extension|file|res|widget):$","");
			var isLocal = rlocalProtocol.match(protocol);
			if(isLocal) if(r.responseText != null) s = 200; else s = 404;
		}
		if(s == undefined) s = null;
		if(s != null) me.onStatus(s);
		if(s != null && s >= 200 && s < 400) {
			me.req = null;
			me.onData(me.responseData = r.responseText);
		} else if(s == null) {
			me.req = null;
			me.onError("Failed to connect or resolve host");
		} else switch(s) {
		case 12029:
			me.req = null;
			me.onError("Failed to connect to host");
			break;
		case 12007:
			me.req = null;
			me.onError("Unknown host");
			break;
		default:
			me.req = null;
			me.responseData = r.responseText;
			me.onError("Http Error #" + r.status);
		}
	};
	if(this.async) r.onreadystatechange = onreadystatechange;
	var uri = this.postData;
	if(uri != null) post = true; else {
		var _g_head = this.params.h;
		var _g_val = null;
		while(_g_head != null) {
			var p;
			p = (function($this) {
				var $r;
				_g_val = _g_head[0];
				_g_head = _g_head[1];
				$r = _g_val;
				return $r;
			}(this));
			if(uri == null) uri = ""; else uri += "&";
			uri += encodeURIComponent(p.param) + "=" + encodeURIComponent(p.value);
		}
	}
	try {
		if(post) r.open("POST",this.url,this.async); else if(uri != null) {
			var question = this.url.split("?").length <= 1;
			r.open("GET",this.url + (question?"?":"&") + uri,this.async);
			uri = null;
		} else r.open("GET",this.url,this.async);
	} catch( e1 ) {
		haxe.CallStack.lastException = e1;
		if (e1 instanceof js._Boot.HaxeError) e1 = e1.val;
		me.req = null;
		this.onError(e1.toString());
		return;
	}
	if(!Lambda.exists(this.headers,function(h) {
		return h.header == "Content-Type";
	}) && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	var _g_head1 = this.headers.h;
	var _g_val1 = null;
	while(_g_head1 != null) {
		var h1;
		h1 = (function($this) {
			var $r;
			_g_val1 = _g_head1[0];
			_g_head1 = _g_head1[1];
			$r = _g_val1;
			return $r;
		}(this));
		r.setRequestHeader(h1.header,h1.value);
	}
	r.send(uri);
	if(!this.async) onreadystatechange(null);
};
haxe.Http.prototype.onData = function(data) {
};
haxe.Http.prototype.onError = function(msg) {
};
haxe.Http.prototype.onStatus = function(status) {
};
haxe.Http.prototype.__class__ = haxe.Http;
haxe.Http.prototype.__properties__ = {};
haxe._Int64.___Int64 = $hxClasses['haxe._Int64.___Int64'] = function(high,low) {
	this.high = high;
	this.low = low;
};
haxe._Int64.___Int64.__name__ = ["haxe","_Int64","___Int64"];
haxe._Int64.___Int64.prototype.high = null;
haxe._Int64.___Int64.prototype.low = null;
haxe._Int64.___Int64.prototype.__class__ = haxe._Int64.___Int64;
haxe._Int64.___Int64.prototype.__properties__ = {};
haxe.Log = $hxClasses['haxe.Log'] = function() { };
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
};
haxe.Log.prototype.__class__ = haxe.Log;
haxe.Log.prototype.__properties__ = {};
haxe._Template.TemplateExpr = $hxClasses['haxe._Template.TemplateExpr'] = { __ename__ : ["haxe","_Template","TemplateExpr"], __constructs__ : ["OpVar","OpExpr","OpIf","OpStr","OpBlock","OpForeach","OpMacro"] };
haxe._Template.TemplateExpr.OpStr = function(str) { var $x = ["OpStr",3,str]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; };
haxe._Template.TemplateExpr.OpMacro = function(name,params) { var $x = ["OpMacro",6,name,params]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; };
haxe._Template.TemplateExpr.OpIf = function(expr,eif,eelse) { var $x = ["OpIf",2,expr,eif,eelse]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; };
haxe._Template.TemplateExpr.OpBlock = function(l) { var $x = ["OpBlock",4,l]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; };
haxe._Template.TemplateExpr.OpExpr = function(expr) { var $x = ["OpExpr",1,expr]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; };
haxe._Template.TemplateExpr.OpForeach = function(expr,loop) { var $x = ["OpForeach",5,expr,loop]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; };
haxe._Template.TemplateExpr.OpVar = function(v) { var $x = ["OpVar",0,v]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; };
haxe.Template = $hxClasses['haxe.Template'] = function(str) {
	var tokens = this.parseTokens(str);
	this.expr = this.parseBlock(tokens);
	if(!tokens.isEmpty()) throw new js._Boot.HaxeError("Unexpected '" + Std.string(tokens.first().s) + "'");
};
haxe.Template.__name__ = ["haxe","Template"];
haxe.Template.prototype.expr = null;
haxe.Template.prototype.context = null;
haxe.Template.prototype.macros = null;
haxe.Template.prototype.stack = null;
haxe.Template.prototype.buf = null;
haxe.Template.prototype.execute = function(context,macros) {
	if(macros == null) this.macros = { }; else this.macros = macros;
	this.context = context;
	this.stack = new List();
	this.buf = new StringBuf();
	this.run(this.expr);
	return this.buf.b;
};
haxe.Template.prototype.resolve = function(v) {
	if(Object.prototype.hasOwnProperty.call(this.context,v)) return Reflect.field(this.context,v);
	var _g_head = this.stack.h;
	var _g_val = null;
	while(_g_head != null) {
		var ctx;
		_g_val = _g_head[0];
		_g_head = _g_head[1];
		ctx = _g_val;
		if(Object.prototype.hasOwnProperty.call(ctx,v)) return Reflect.field(ctx,v);
	}
	if(v == "__current__") return this.context;
	return Reflect.field(haxe.Template.globals,v);
};
haxe.Template.prototype.parseTokens = function(data) {
	var tokens = new List();
	while(haxe.Template.splitter.match(data)) {
		var p = haxe.Template.splitter.matchedPos();
		if(p.pos > 0) tokens.add({ p : HxOverrides.substr(data,0,p.pos), s : true, l : null});
		if(HxOverrides.cca(data,p.pos) == 58) {
			tokens.add({ p : HxOverrides.substr(data,p.pos + 2,p.len - 4), s : false, l : null});
			data = haxe.Template.splitter.matchedRight();
			continue;
		}
		var parp = p.pos + p.len;
		var npar = 1;
		var params = [];
		var part = "";
		while(true) {
			var c = HxOverrides.cca(data,parp);
			parp++;
			if(c == 40) npar++; else if(c == 41) {
				npar--;
				if(npar <= 0) break;
			} else if(c == null) throw new js._Boot.HaxeError("Unclosed macro parenthesis");
			if(c == 44 && npar == 1) {
				params.push(part);
				part = "";
			} else part += String.fromCharCode(c);
		}
		params.push(part);
		tokens.add({ p : haxe.Template.splitter.matched(2), s : false, l : params});
		data = HxOverrides.substr(data,parp,data.length - parp);
	}
	if(data.length > 0) tokens.add({ p : data, s : true, l : null});
	return tokens;
};
haxe.Template.prototype.parseBlock = function(tokens) {
	var l = new List();
	while(true) {
		var t = tokens.first();
		if(t == null) break;
		if(!t.s && (t.p == "end" || t.p == "else" || HxOverrides.substr(t.p,0,7) == "elseif ")) break;
		l.add(this.parse(tokens));
	}
	if(l.length == 1) return l.first();
	return haxe._Template.TemplateExpr.OpBlock(l);
};
haxe.Template.prototype.parse = function(tokens) {
	var t = tokens.pop();
	var p = t.p;
	if(t.s) return haxe._Template.TemplateExpr.OpStr(p);
	if(t.l != null) {
		var pe = new List();
		var _g = 0;
		var _g1 = t.l;
		while(_g < _g1.length) {
			var p1 = _g1[_g];
			++_g;
			pe.add(this.parseBlock(this.parseTokens(p1)));
		}
		return haxe._Template.TemplateExpr.OpMacro(p,pe);
	}
	if(HxOverrides.substr(p,0,3) == "if ") {
		p = HxOverrides.substr(p,3,p.length - 3);
		var e = this.parseExpr(p);
		var eif = this.parseBlock(tokens);
		var t1 = tokens.first();
		var eelse;
		if(t1 == null) throw new js._Boot.HaxeError("Unclosed 'if'");
		if(t1.p == "end") {
			tokens.pop();
			eelse = null;
		} else if(t1.p == "else") {
			tokens.pop();
			eelse = this.parseBlock(tokens);
			t1 = tokens.pop();
			if(t1 == null || t1.p != "end") throw new js._Boot.HaxeError("Unclosed 'else'");
		} else {
			t1.p = HxOverrides.substr(t1.p,4,t1.p.length - 4);
			eelse = this.parse(tokens);
		}
		return haxe._Template.TemplateExpr.OpIf(e,eif,eelse);
	}
	if(HxOverrides.substr(p,0,8) == "foreach ") {
		p = HxOverrides.substr(p,8,p.length - 8);
		var e1 = this.parseExpr(p);
		var efor = this.parseBlock(tokens);
		var t2 = tokens.pop();
		if(t2 == null || t2.p != "end") throw new js._Boot.HaxeError("Unclosed 'foreach'");
		return haxe._Template.TemplateExpr.OpForeach(e1,efor);
	}
	if(haxe.Template.expr_splitter.match(p)) return haxe._Template.TemplateExpr.OpExpr(this.parseExpr(p));
	return haxe._Template.TemplateExpr.OpVar(p);
};
haxe.Template.prototype.parseExpr = function(data) {
	var l = new List();
	var expr = data;
	while(haxe.Template.expr_splitter.match(data)) {
		var p = haxe.Template.expr_splitter.matchedPos();
		var k = p.pos + p.len;
		if(p.pos != 0) l.add({ p : HxOverrides.substr(data,0,p.pos), s : true});
		var p1 = haxe.Template.expr_splitter.matched(0);
		l.add({ p : p1, s : p1.indexOf("\"") >= 0});
		data = haxe.Template.expr_splitter.matchedRight();
	}
	if(data.length != 0) l.add({ p : data, s : true});
	var e;
	try {
		e = this.makeExpr(l);
		if(!l.isEmpty()) throw new js._Boot.HaxeError(l.first().p);
	} catch( s ) {
		haxe.CallStack.lastException = s;
		if (s instanceof js._Boot.HaxeError) s = s.val;
		if( js.Boot.__instanceof(s,String) ) {
			throw new js._Boot.HaxeError("Unexpected '" + s + "' in " + expr);
		} else throw(s);
	}
	return function() {
		try {
			return e();
		} catch( exc ) {
			haxe.CallStack.lastException = exc;
			if (exc instanceof js._Boot.HaxeError) exc = exc.val;
			throw new js._Boot.HaxeError("Error : " + Std.string(exc) + " in " + expr);
		}
	};
};
haxe.Template.prototype.makeConst = function(v) {
	haxe.Template.expr_trim.match(v);
	v = haxe.Template.expr_trim.matched(1);
	if(HxOverrides.cca(v,0) == 34) {
		var str = HxOverrides.substr(v,1,v.length - 2);
		return function() {
			return str;
		};
	}
	if(haxe.Template.expr_int.match(v)) {
		var i = Std.parseInt(v);
		return function() {
			return i;
		};
	}
	if(haxe.Template.expr_float.match(v)) {
		var f = parseFloat(v);
		return function() {
			return f;
		};
	}
	var me = this;
	return function() {
		return me.resolve(v);
	};
};
haxe.Template.prototype.makePath = function(e,l) {
	var p = l.first();
	if(p == null || p.p != ".") return e;
	l.pop();
	var field = l.pop();
	if(field == null || !field.s) throw new js._Boot.HaxeError(field.p);
	var f = field.p;
	haxe.Template.expr_trim.match(f);
	f = haxe.Template.expr_trim.matched(1);
	return this.makePath(function() {
		return Reflect.field(e(),f);
	},l);
};
haxe.Template.prototype.makeExpr = function(l) {
	return this.makePath(this.makeExpr2(l),l);
};
haxe.Template.prototype.makeExpr2 = function(l) {
	var p = l.pop();
	if(p == null) throw new js._Boot.HaxeError("<eof>");
	if(p.s) return this.makeConst(p.p);
	var _g = p.p;
	switch(_g) {
	case "(":
		var e1 = this.makeExpr(l);
		var p1 = l.pop();
		if(p1 == null || p1.s) throw new js._Boot.HaxeError(p1.p);
		if(p1.p == ")") return e1;
		var e2 = this.makeExpr(l);
		var p2 = l.pop();
		if(p2 == null || p2.p != ")") throw new js._Boot.HaxeError(p2.p);
		var _g1 = p1.p;
		switch(_g1) {
		case "+":
			return function() {
				return e1() + e2();
			};
		case "-":
			return function() {
				return e1() - e2();
			};
		case "*":
			return function() {
				return e1() * e2();
			};
		case "/":
			return function() {
				return e1() / e2();
			};
		case ">":
			return function() {
				return e1() > e2();
			};
		case "<":
			return function() {
				return e1() < e2();
			};
		case ">=":
			return function() {
				return e1() >= e2();
			};
		case "<=":
			return function() {
				return e1() <= e2();
			};
		case "==":
			return function() {
				return e1() == e2();
			};
		case "!=":
			return function() {
				return e1() != e2();
			};
		case "&&":
			return function() {
				return e1() && e2();
			};
		case "||":
			return function() {
				return e1() || e2();
			};
		default:
			throw new js._Boot.HaxeError("Unknown operation " + p1.p);
		}
		break;
	case "!":
		var e = this.makeExpr(l);
		return function() {
			var v = e();
			return v == null || v == false;
		};
	case "-":
		var e3 = this.makeExpr(l);
		return function() {
			return -e3();
		};
	}
	throw new js._Boot.HaxeError(p.p);
};
haxe.Template.prototype.run = function(e) {
	switch(e[1]) {
	case 0:
		var v = e[2];
		this.buf.add(Std.string(this.resolve(v)));
		break;
	case 1:
		var e1 = e[2];
		this.buf.add(Std.string(e1()));
		break;
	case 2:
		var eelse = e[4];
		var eif = e[3];
		var e2 = e[2];
		var v1 = e2();
		if(v1 == null || v1 == false) {
			if(eelse != null) this.run(eelse);
		} else this.run(eif);
		break;
	case 3:
		var str = e[2];
		if(str == null) this.buf.b += "null"; else this.buf.b += "" + str;
		break;
	case 4:
		var l = e[2];
		var _g_head = l.h;
		var _g_val = null;
		while(_g_head != null) {
			var e3;
			e3 = (function($this) {
				var $r;
				_g_val = _g_head[0];
				_g_head = _g_head[1];
				$r = _g_val;
				return $r;
			}(this));
			this.run(e3);
		}
		break;
	case 5:
		var loop = e[3];
		var e4 = e[2];
		var v2 = e4();
		try {
			var x = $iterator(v2)();
			if(x.hasNext == null) throw new js._Boot.HaxeError(null);
			v2 = x;
		} catch( e5 ) {
			haxe.CallStack.lastException = e5;
			if (e5 instanceof js._Boot.HaxeError) e5 = e5.val;
			try {
				if(v2.hasNext == null) throw new js._Boot.HaxeError(null);
			} catch( e6 ) {
				haxe.CallStack.lastException = e6;
				if (e6 instanceof js._Boot.HaxeError) e6 = e6.val;
				throw new js._Boot.HaxeError("Cannot iter on " + Std.string(v2));
			}
		}
		this.stack.push(this.context);
		var v3 = v2;
		while( v3.hasNext() ) {
			var ctx = v3.next();
			this.context = ctx;
			this.run(loop);
		}
		this.context = this.stack.pop();
		break;
	case 6:
		var params = e[3];
		var m = e[2];
		var v4 = Reflect.field(this.macros,m);
		var pl = [];
		var old = this.buf;
		pl.push($bind(this,this.resolve));
		var _g_head1 = params.h;
		var _g_val1 = null;
		while(_g_head1 != null) {
			var p;
			p = (function($this) {
				var $r;
				_g_val1 = _g_head1[0];
				_g_head1 = _g_head1[1];
				$r = _g_val1;
				return $r;
			}(this));
			switch(p[1]) {
			case 0:
				var v5 = p[2];
				pl.push(this.resolve(v5));
				break;
			default:
				this.buf = new StringBuf();
				this.run(p);
				pl.push(this.buf.b);
			}
		}
		this.buf = old;
		try {
			this.buf.add(Std.string(Reflect.callMethod(this.macros,v4,pl)));
		} catch( e7 ) {
			haxe.CallStack.lastException = e7;
			if (e7 instanceof js._Boot.HaxeError) e7 = e7.val;
			var plstr;
			try {
				plstr = pl.join(",");
			} catch( e8 ) {
				haxe.CallStack.lastException = e8;
				if (e8 instanceof js._Boot.HaxeError) e8 = e8.val;
				plstr = "???";
			}
			var msg = "Macro call " + m + "(" + plstr + ") failed (" + Std.string(e7) + ")";
			throw new js._Boot.HaxeError(msg);
		}
		break;
	}
};
haxe.Template.prototype.__class__ = haxe.Template;
haxe.Template.prototype.__properties__ = {};
haxe.Timer = $hxClasses['haxe.Timer'] = function() { };
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.stamp = function() {
	return new Date().getTime() / 1000;
};
haxe.Timer.prototype.__class__ = haxe.Timer;
haxe.Timer.prototype.__properties__ = {};
haxe.ds.IntMap = $hxClasses['haxe.ds.IntMap'] = function() {
	this.h = { };
};
haxe.ds.IntMap.__name__ = ["haxe","ds","IntMap"];
haxe.ds.IntMap.prototype.h = null;
haxe.ds.IntMap.prototype.set = function(key,value) {
	this.h[key] = value;
};
haxe.ds.IntMap.prototype.get = function(key) {
	return this.h[key];
};
haxe.ds.IntMap.prototype.__class__ = haxe.ds.IntMap;
haxe.ds.IntMap.prototype.__properties__ = {};
haxe.ds.IntMap.__interfaces__ = [haxe.IMap];
haxe.ds.ObjectMap = $hxClasses['haxe.ds.ObjectMap'] = function() {
	this.h = { };
	this.h.__keys__ = { };
};
haxe.ds.ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe.ds.ObjectMap.prototype.h = null;
haxe.ds.ObjectMap.prototype.set = function(key,value) {
	var id = key.__id__ || (key.__id__ = ++haxe.ds.ObjectMap.count);
	this.h[id] = value;
	this.h.__keys__[id] = key;
};
haxe.ds.ObjectMap.prototype.get = function(key) {
	return this.h[key.__id__];
};
haxe.ds.ObjectMap.prototype.remove = function(key) {
	var id = key.__id__;
	if(this.h.__keys__[id] == null) return false;
	delete(this.h[id]);
	delete(this.h.__keys__[id]);
	return true;
};
haxe.ds.ObjectMap.prototype.__class__ = haxe.ds.ObjectMap;
haxe.ds.ObjectMap.prototype.__properties__ = {};
haxe.ds.ObjectMap.__interfaces__ = [haxe.IMap];
haxe.ds.StringMap = $hxClasses['haxe.ds.StringMap'] = function() {
	this.h = { };
};
haxe.ds.StringMap.__name__ = ["haxe","ds","StringMap"];
haxe.ds.StringMap.prototype.h = null;
haxe.ds.StringMap.prototype.rh = null;
haxe.ds.StringMap.prototype.set = function(key,value) {
	if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
};
haxe.ds.StringMap.prototype.get = function(key) {
	if(__map_reserved[key] != null) return this.getReserved(key);
	return this.h[key];
};
haxe.ds.StringMap.prototype.exists = function(key) {
	if(__map_reserved[key] != null) return this.existsReserved(key);
	return this.h.hasOwnProperty(key);
};
haxe.ds.StringMap.prototype.setReserved = function(key,value) {
	if(this.rh == null) this.rh = { };
	this.rh["$" + key] = value;
};
haxe.ds.StringMap.prototype.getReserved = function(key) {
	if(this.rh == null) return null; else return this.rh["$" + key];
};
haxe.ds.StringMap.prototype.existsReserved = function(key) {
	if(this.rh == null) return false;
	return this.rh.hasOwnProperty("$" + key);
};
haxe.ds.StringMap.prototype.keys = function() {
	var _this = this.arrayKeys();
	return HxOverrides.iter(_this);
};
haxe.ds.StringMap.prototype.arrayKeys = function() {
	var out = [];
	for( var key in this.h ) {
	if(this.h.hasOwnProperty(key)) out.push(key);
	}
	if(this.rh != null) {
		for( var key in this.rh ) {
		if(key.charCodeAt(0) == 36) out.push(key.substr(1));
		}
	}
	return out;
};
haxe.ds.StringMap.prototype.__class__ = haxe.ds.StringMap;
haxe.ds.StringMap.prototype.__properties__ = {};
haxe.ds.StringMap.__interfaces__ = [haxe.IMap];
haxe.io.Error = $hxClasses['haxe.io.Error'] = { __ename__ : ["haxe","io","Error"], __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe.io.Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe.io.Error; $x.toString = $estr; return $x; };
haxe.io.Error.Blocked = ["Blocked",0];
haxe.io.Error.Blocked.toString = $estr;
haxe.io.Error.Blocked.__enum__ = haxe.io.Error;
haxe.io.Error.Overflow = ["Overflow",1];
haxe.io.Error.Overflow.toString = $estr;
haxe.io.Error.Overflow.__enum__ = haxe.io.Error;
haxe.io.Error.OutsideBounds = ["OutsideBounds",2];
haxe.io.Error.OutsideBounds.toString = $estr;
haxe.io.Error.OutsideBounds.__enum__ = haxe.io.Error;
haxe.io.FPHelper = $hxClasses['haxe.io.FPHelper'] = function() { };
haxe.io.FPHelper.__name__ = ["haxe","io","FPHelper"];
haxe.io.FPHelper.i32ToFloat = function(i) {
	var sign = 1 - (i >>> 31 << 1);
	var exp = i >>> 23 & 255;
	var sig = i & 8388607;
	if(sig == 0 && exp == 0) return 0.0;
	return sign * (1 + Math.pow(2,-23) * sig) * Math.pow(2,exp - 127);
};
haxe.io.FPHelper.floatToI32 = function(f) {
	if(f == 0) return 0;
	var af;
	if(f < 0) af = -f; else af = f;
	var exp = Math.floor(Math.log(af) / 0.6931471805599453);
	if(exp < -127) exp = -127; else if(exp > 128) exp = 128;
	var sig = Math.round((af / Math.pow(2,exp) - 1) * 8388608) & 8388607;
	return (f < 0?-2147483648:0) | exp + 127 << 23 | sig;
};
haxe.io.FPHelper.i64ToDouble = function(low,high) {
	var sign = 1 - (high >>> 31 << 1);
	var exp = (high >> 20 & 2047) - 1023;
	var sig = (high & 1048575) * 4294967296. + (low >>> 31) * 2147483648. + (low & 2147483647);
	if(sig == 0 && exp == -1023) return 0.0;
	return sign * (1.0 + Math.pow(2,-52) * sig) * Math.pow(2,exp);
};
haxe.io.FPHelper.doubleToI64 = function(v) {
	var i64 = haxe.io.FPHelper.i64tmp;
	if(v == 0) {
		i64.low = 0;
		i64.high = 0;
	} else {
		var av;
		if(v < 0) av = -v; else av = v;
		var exp = Math.floor(Math.log(av) / 0.6931471805599453);
		var sig;
		var v1 = (av / Math.pow(2,exp) - 1) * 4503599627370496.;
		sig = Math.round(v1);
		var sig_l = sig | 0;
		var sig_h = sig / 4294967296.0 | 0;
		i64.low = sig_l;
		i64.high = (v < 0?-2147483648:0) | exp + 1023 << 20 | sig_h;
	}
	return i64;
};
haxe.io.FPHelper.prototype.__class__ = haxe.io.FPHelper;
haxe.io.FPHelper.prototype.__properties__ = {};
haxe.rtti.Meta = $hxClasses['haxe.rtti.Meta'] = function() { };
haxe.rtti.Meta.__name__ = ["haxe","rtti","Meta"];
haxe.rtti.Meta.getType = function(t) {
	var meta = haxe.rtti.Meta.getMeta(t);
	if(meta == null || meta.obj == null) return { }; else return meta.obj;
};
haxe.rtti.Meta.getMeta = function(t) {
	return t.__meta__;
};
haxe.rtti.Meta.getFields = function(t) {
	var meta = haxe.rtti.Meta.getMeta(t);
	if(meta == null || meta.fields == null) return { }; else return meta.fields;
};
haxe.rtti.Meta.prototype.__class__ = haxe.rtti.Meta;
haxe.rtti.Meta.prototype.__properties__ = {};
haxe.xml._Fast.NodeAccess = $hxClasses['haxe.xml._Fast.NodeAccess'] = function(x) {
	this.__x = x;
};
haxe.xml._Fast.NodeAccess.__name__ = ["haxe","xml","_Fast","NodeAccess"];
haxe.xml._Fast.NodeAccess.prototype.__x = null;
haxe.xml._Fast.NodeAccess.prototype.__class__ = haxe.xml._Fast.NodeAccess;
haxe.xml._Fast.NodeAccess.prototype.__properties__ = {};
haxe.xml._Fast.AttribAccess = $hxClasses['haxe.xml._Fast.AttribAccess'] = function(x) {
	this.__x = x;
};
haxe.xml._Fast.AttribAccess.__name__ = ["haxe","xml","_Fast","AttribAccess"];
haxe.xml._Fast.AttribAccess.prototype.__x = null;
haxe.xml._Fast.AttribAccess.prototype.__class__ = haxe.xml._Fast.AttribAccess;
haxe.xml._Fast.AttribAccess.prototype.__properties__ = {};
haxe.xml._Fast.HasAttribAccess = $hxClasses['haxe.xml._Fast.HasAttribAccess'] = function(x) {
	this.__x = x;
};
haxe.xml._Fast.HasAttribAccess.__name__ = ["haxe","xml","_Fast","HasAttribAccess"];
haxe.xml._Fast.HasAttribAccess.prototype.__x = null;
haxe.xml._Fast.HasAttribAccess.prototype.__class__ = haxe.xml._Fast.HasAttribAccess;
haxe.xml._Fast.HasAttribAccess.prototype.__properties__ = {};
haxe.xml._Fast.HasNodeAccess = $hxClasses['haxe.xml._Fast.HasNodeAccess'] = function(x) {
	this.__x = x;
};
haxe.xml._Fast.HasNodeAccess.__name__ = ["haxe","xml","_Fast","HasNodeAccess"];
haxe.xml._Fast.HasNodeAccess.prototype.__x = null;
haxe.xml._Fast.HasNodeAccess.prototype.__class__ = haxe.xml._Fast.HasNodeAccess;
haxe.xml._Fast.HasNodeAccess.prototype.__properties__ = {};
haxe.xml._Fast.NodeListAccess = $hxClasses['haxe.xml._Fast.NodeListAccess'] = function(x) {
	this.__x = x;
};
haxe.xml._Fast.NodeListAccess.__name__ = ["haxe","xml","_Fast","NodeListAccess"];
haxe.xml._Fast.NodeListAccess.prototype.__x = null;
haxe.xml._Fast.NodeListAccess.prototype.__class__ = haxe.xml._Fast.NodeListAccess;
haxe.xml._Fast.NodeListAccess.prototype.__properties__ = {};
haxe.xml.Fast = $hxClasses['haxe.xml.Fast'] = function(x) {
	if(x.nodeType != Xml.Document && x.nodeType != Xml.Element) throw new js._Boot.HaxeError("Invalid nodeType " + x.nodeType);
	this.x = x;
	this.node = new haxe.xml._Fast.NodeAccess(x);
	this.nodes = new haxe.xml._Fast.NodeListAccess(x);
	this.att = new haxe.xml._Fast.AttribAccess(x);
	this.has = new haxe.xml._Fast.HasAttribAccess(x);
	this.hasNode = new haxe.xml._Fast.HasNodeAccess(x);
};
haxe.xml.Fast.__name__ = ["haxe","xml","Fast"];
haxe.xml.Fast.prototype.x = null;
haxe.xml.Fast.prototype.node = null;
haxe.xml.Fast.prototype.nodes = null;
haxe.xml.Fast.prototype.att = null;
haxe.xml.Fast.prototype.has = null;
haxe.xml.Fast.prototype.hasNode = null;
haxe.xml.Fast.prototype.get_name = function() {
	if(this.x.nodeType == Xml.Document) return "Document"; else return this.x.get_nodeName();
};
haxe.xml.Fast.prototype.get_innerHTML = function() {
	var s = new StringBuf();
	var $it0 = this.x.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		s.add(haxe.xml.Printer.print(x));
	}
	return s.b;
};
haxe.xml.Fast.prototype.get_elements = function() {
	var it = this.x.elements();
	return { hasNext : $bind(it,it.hasNext), next : function() {
		var x = it.next();
		if(x == null) return null;
		return new haxe.xml.Fast(x);
	}};
};
haxe.xml.Fast.prototype.__class__ = haxe.xml.Fast;
haxe.xml.Fast.prototype.__properties__ = {get_name:"get_name", get_innerHTML:"get_innerHTML", get_elements:"get_elements"};
haxe.xml.Parser = $hxClasses['haxe.xml.Parser'] = function() { };
haxe.xml.Parser.__name__ = ["haxe","xml","Parser"];
haxe.xml.Parser.parse = function(str,strict) {
	if(strict == null) strict = false;
	var doc = Xml.createDocument();
	haxe.xml.Parser.doParse(str,strict,0,doc);
	return doc;
};
haxe.xml.Parser.doParse = function(str,strict,p,parent) {
	if(p == null) p = 0;
	var xml = null;
	var state = 1;
	var next = 1;
	var aname = null;
	var start = 0;
	var nsubs = 0;
	var nbrackets = 0;
	var c = str.charCodeAt(p);
	var buf = new StringBuf();
	var escapeNext = 1;
	var attrValQuote = -1;
	while(!(c != c)) {
		switch(state) {
		case 0:
			switch(c) {
			case 10:case 13:case 9:case 32:
				break;
			default:
				state = next;
				continue;
			}
			break;
		case 1:
			switch(c) {
			case 60:
				state = 0;
				next = 2;
				break;
			default:
				start = p;
				state = 13;
				continue;
			}
			break;
		case 13:
			if(c == 60) {
				buf.addSub(str,start,p - start);
				var child = Xml.createPCData(buf.b);
				buf = new StringBuf();
				parent.addChild(child);
				nsubs++;
				state = 0;
				next = 2;
			} else if(c == 38) {
				buf.addSub(str,start,p - start);
				state = 18;
				escapeNext = 13;
				start = p + 1;
			}
			break;
		case 17:
			if(c == 93 && str.charCodeAt(p + 1) == 93 && str.charCodeAt(p + 2) == 62) {
				var child1 = Xml.createCData(HxOverrides.substr(str,start,p - start));
				parent.addChild(child1);
				nsubs++;
				p += 2;
				state = 1;
			}
			break;
		case 2:
			switch(c) {
			case 33:
				if(str.charCodeAt(p + 1) == 91) {
					p += 2;
					if(HxOverrides.substr(str,p,6).toUpperCase() != "CDATA[") throw new js._Boot.HaxeError("Expected <![CDATA[");
					p += 5;
					state = 17;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) == 68 || str.charCodeAt(p + 1) == 100) {
					if(HxOverrides.substr(str,p + 2,6).toUpperCase() != "OCTYPE") throw new js._Boot.HaxeError("Expected <!DOCTYPE");
					p += 8;
					state = 16;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) != 45 || str.charCodeAt(p + 2) != 45) throw new js._Boot.HaxeError("Expected <!--"); else {
					p += 2;
					state = 15;
					start = p + 1;
				}
				break;
			case 63:
				state = 14;
				start = p;
				break;
			case 47:
				if(parent == null) throw new js._Boot.HaxeError("Expected node name");
				start = p + 1;
				state = 0;
				next = 10;
				break;
			default:
				state = 3;
				start = p;
				continue;
			}
			break;
		case 3:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(p == start) throw new js._Boot.HaxeError("Expected node name");
				xml = Xml.createElement(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml);
				nsubs++;
				state = 0;
				next = 4;
				continue;
			}
			break;
		case 4:
			switch(c) {
			case 47:
				state = 11;
				break;
			case 62:
				state = 9;
				break;
			default:
				state = 5;
				start = p;
				continue;
			}
			break;
		case 5:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				var tmp;
				if(start == p) throw new js._Boot.HaxeError("Expected attribute name");
				tmp = HxOverrides.substr(str,start,p - start);
				aname = tmp;
				if(xml.exists(aname)) throw new js._Boot.HaxeError("Duplicate attribute");
				state = 0;
				next = 6;
				continue;
			}
			break;
		case 6:
			switch(c) {
			case 61:
				state = 0;
				next = 7;
				break;
			default:
				throw new js._Boot.HaxeError("Expected =");
			}
			break;
		case 7:
			switch(c) {
			case 34:case 39:
				buf = new StringBuf();
				state = 8;
				start = p + 1;
				attrValQuote = c;
				break;
			default:
				throw new js._Boot.HaxeError("Expected \"");
			}
			break;
		case 8:
			switch(c) {
			case 38:
				buf.addSub(str,start,p - start);
				state = 18;
				escapeNext = 8;
				start = p + 1;
				break;
			case 62:
				if(strict) throw new js._Boot.HaxeError("Invalid unescaped " + String.fromCharCode(c) + " in attribute value"); else if(c == attrValQuote) {
					buf.addSub(str,start,p - start);
					var val = buf.b;
					buf = new StringBuf();
					xml.set(aname,val);
					state = 0;
					next = 4;
				}
				break;
			case 60:
				if(strict) throw new js._Boot.HaxeError("Invalid unescaped " + String.fromCharCode(c) + " in attribute value"); else if(c == attrValQuote) {
					buf.addSub(str,start,p - start);
					var val1 = buf.b;
					buf = new StringBuf();
					xml.set(aname,val1);
					state = 0;
					next = 4;
				}
				break;
			default:
				if(c == attrValQuote) {
					buf.addSub(str,start,p - start);
					var val2 = buf.b;
					buf = new StringBuf();
					xml.set(aname,val2);
					state = 0;
					next = 4;
				}
			}
			break;
		case 9:
			p = haxe.xml.Parser.doParse(str,strict,p,xml);
			start = p;
			state = 1;
			break;
		case 11:
			switch(c) {
			case 62:
				state = 1;
				break;
			default:
				throw new js._Boot.HaxeError("Expected >");
			}
			break;
		case 12:
			switch(c) {
			case 62:
				if(nsubs == 0) parent.addChild(Xml.createPCData(""));
				return p;
			default:
				throw new js._Boot.HaxeError("Expected >");
			}
			break;
		case 10:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(start == p) throw new js._Boot.HaxeError("Expected node name");
				var v = HxOverrides.substr(str,start,p - start);
				if(v != (function($this) {
					var $r;
					if(parent.nodeType != Xml.Element) throw new js._Boot.HaxeError("Bad node type, expected Element but found " + parent.nodeType);
					$r = parent.nodeName;
					return $r;
				}(this))) throw new js._Boot.HaxeError("Expected </" + (function($this) {
					var $r;
					if(parent.nodeType != Xml.Element) throw "Bad node type, expected Element but found " + parent.nodeType;
					$r = parent.nodeName;
					return $r;
				}(this)) + ">");
				state = 0;
				next = 12;
				continue;
			}
			break;
		case 15:
			if(c == 45 && str.charCodeAt(p + 1) == 45 && str.charCodeAt(p + 2) == 62) {
				var xml1 = Xml.createComment(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml1);
				nsubs++;
				p += 2;
				state = 1;
			}
			break;
		case 16:
			if(c == 91) nbrackets++; else if(c == 93) nbrackets--; else if(c == 62 && nbrackets == 0) {
				var xml2 = Xml.createDocType(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml2);
				nsubs++;
				state = 1;
			}
			break;
		case 14:
			if(c == 63 && str.charCodeAt(p + 1) == 62) {
				p++;
				var str1 = HxOverrides.substr(str,start + 1,p - start - 2);
				var xml3 = Xml.createProcessingInstruction(str1);
				parent.addChild(xml3);
				nsubs++;
				state = 1;
			}
			break;
		case 18:
			if(c == 59) {
				var s = HxOverrides.substr(str,start,p - start);
				if(s.charCodeAt(0) == 35) {
					var c1;
					if(s.charCodeAt(1) == 120) c1 = Std.parseInt("0" + HxOverrides.substr(s,1,s.length - 1)); else c1 = Std.parseInt(HxOverrides.substr(s,1,s.length - 1));
					buf.b += String.fromCharCode(c1);
				} else if(!haxe.xml.Parser.escapes.exists(s)) {
					if(strict) throw new js._Boot.HaxeError("Undefined entity: " + s);
					buf.b += Std.string("&" + s + ";");
				} else buf.add(haxe.xml.Parser.escapes.get(s));
				start = p + 1;
				state = escapeNext;
			} else if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45) && c != 35) {
				if(strict) throw new js._Boot.HaxeError("Invalid character in entity: " + String.fromCharCode(c));
				buf.b += "&";
				buf.addSub(str,start,p - start);
				p--;
				start = p + 1;
				state = escapeNext;
			}
			break;
		}
		c = StringTools.fastCodeAt(str,++p);
	}
	if(state == 1) {
		start = p;
		state = 13;
	}
	if(state == 13) {
		if(p != start || nsubs == 0) {
			buf.addSub(str,start,p - start);
			var xml4 = Xml.createPCData(buf.b);
			parent.addChild(xml4);
			nsubs++;
		}
		return p;
	}
	if(!strict && state == 18 && escapeNext == 13) {
		buf.b += "&";
		buf.addSub(str,start,p - start);
		var xml5 = Xml.createPCData(buf.b);
		parent.addChild(xml5);
		nsubs++;
		return p;
	}
	throw new js._Boot.HaxeError("Unexpected end");
};
haxe.xml.Parser.prototype.__class__ = haxe.xml.Parser;
haxe.xml.Parser.prototype.__properties__ = {};
haxe.xml.Printer = $hxClasses['haxe.xml.Printer'] = function(pretty) {
	this.output = new StringBuf();
	this.pretty = pretty;
};
haxe.xml.Printer.__name__ = ["haxe","xml","Printer"];
haxe.xml.Printer.print = function(xml,pretty) {
	if(pretty == null) pretty = false;
	var printer = new haxe.xml.Printer(pretty);
	printer.writeNode(xml,"");
	return printer.output.b;
};
haxe.xml.Printer.prototype.output = null;
haxe.xml.Printer.prototype.pretty = null;
haxe.xml.Printer.prototype.writeNode = function(value,tabs) {
	var _g = value.nodeType;
	switch(_g) {
	case 2:
		this.output.b += Std.string(tabs + "<![CDATA[");
		this.write(StringTools.trim((function($this) {
			var $r;
			if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) throw new js._Boot.HaxeError("Bad node type, unexpected " + value.nodeType);
			$r = value.nodeValue;
			return $r;
		}(this))));
		this.output.b += "]]>";
		if(this.pretty) this.output.b += "";
		break;
	case 3:
		var commentContent;
		if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) throw new js._Boot.HaxeError("Bad node type, unexpected " + value.nodeType);
		commentContent = value.nodeValue;
		commentContent = new EReg("[\n\r\t]+","g").replace(commentContent,"");
		commentContent = "<!--" + commentContent + "-->";
		if(tabs == null) this.output.b += "null"; else this.output.b += "" + tabs;
		this.write(StringTools.trim(commentContent));
		if(this.pretty) this.output.b += "";
		break;
	case 6:
		var $it0 = (function($this) {
			var $r;
			if(value.nodeType != Xml.Document && value.nodeType != Xml.Element) throw new js._Boot.HaxeError("Bad node type, expected Element or Document but found " + value.nodeType);
			$r = HxOverrides.iter(value.children);
			return $r;
		}(this));
		while( $it0.hasNext() ) {
			var child = $it0.next();
			this.writeNode(child,tabs);
		}
		break;
	case 0:
		this.output.b += Std.string(tabs + "<");
		this.write((function($this) {
			var $r;
			if(value.nodeType != Xml.Element) throw new js._Boot.HaxeError("Bad node type, expected Element but found " + value.nodeType);
			$r = value.nodeName;
			return $r;
		}(this)));
		var $it1 = value.attributes();
		while( $it1.hasNext() ) {
			var attribute = $it1.next();
			this.output.b += Std.string(" " + attribute + "=\"");
			this.write(StringTools.htmlEscape(value.get(attribute),true));
			this.output.b += "\"";
		}
		if(this.hasChildren(value)) {
			this.output.b += ">";
			if(this.pretty) this.output.b += "";
			var $it2 = (function($this) {
				var $r;
				if(value.nodeType != Xml.Document && value.nodeType != Xml.Element) throw new js._Boot.HaxeError("Bad node type, expected Element or Document but found " + value.nodeType);
				$r = HxOverrides.iter(value.children);
				return $r;
			}(this));
			while( $it2.hasNext() ) {
				var child1 = $it2.next();
				this.writeNode(child1,this.pretty?tabs + "\t":tabs);
			}
			this.output.b += Std.string(tabs + "</");
			this.write((function($this) {
				var $r;
				if(value.nodeType != Xml.Element) throw new js._Boot.HaxeError("Bad node type, expected Element but found " + value.nodeType);
				$r = value.nodeName;
				return $r;
			}(this)));
			this.output.b += ">";
			if(this.pretty) this.output.b += "";
		} else {
			this.output.b += "/>";
			if(this.pretty) this.output.b += "";
		}
		break;
	case 1:
		var nodeValue;
		if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) throw new js._Boot.HaxeError("Bad node type, unexpected " + value.nodeType);
		nodeValue = value.nodeValue;
		if(nodeValue.length != 0) {
			this.write(tabs + StringTools.htmlEscape(nodeValue));
			if(this.pretty) this.output.b += "";
		}
		break;
	case 5:
		this.write("<?" + (function($this) {
			var $r;
			if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) throw new js._Boot.HaxeError("Bad node type, unexpected " + value.nodeType);
			$r = value.nodeValue;
			return $r;
		}(this)) + "?>");
		break;
	case 4:
		this.write("<!DOCTYPE " + (function($this) {
			var $r;
			if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) throw new js._Boot.HaxeError("Bad node type, unexpected " + value.nodeType);
			$r = value.nodeValue;
			return $r;
		}(this)) + ">");
		break;
	}
};
haxe.xml.Printer.prototype.write = function(input) {
	if(input == null) this.output.b += "null"; else this.output.b += "" + input;
};
haxe.xml.Printer.prototype.hasChildren = function(value) {
	var $it0 = (function($this) {
		var $r;
		if(value.nodeType != Xml.Document && value.nodeType != Xml.Element) throw new js._Boot.HaxeError("Bad node type, expected Element or Document but found " + value.nodeType);
		$r = HxOverrides.iter(value.children);
		return $r;
	}(this));
	while( $it0.hasNext() ) {
		var child = $it0.next();
		var _g = child.nodeType;
		switch(_g) {
		case 0:case 1:
			return true;
		case 2:case 3:
			if(StringTools.ltrim((function($this) {
				var $r;
				if(child.nodeType == Xml.Document || child.nodeType == Xml.Element) throw new js._Boot.HaxeError("Bad node type, unexpected " + child.nodeType);
				$r = child.nodeValue;
				return $r;
			}(this))).length != 0) return true;
			break;
		default:
		}
	}
	return false;
};
haxe.xml.Printer.prototype.__class__ = haxe.xml.Printer;
haxe.xml.Printer.prototype.__properties__ = {};
js._Boot.HaxeError = $hxClasses['js._Boot.HaxeError'] = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js._Boot.HaxeError);
};
js._Boot.HaxeError.__name__ = ["js","_Boot","HaxeError"];
js._Boot.HaxeError.__super__ = Error;
for(var k in Error.prototype ) js._Boot.HaxeError.prototype[k] = Error.prototype[k];
js._Boot.HaxeError.prototype.val = null;
js._Boot.HaxeError.prototype.__class__ = js._Boot.HaxeError;
js._Boot.HaxeError.prototype.__properties__ = $extend(Error.prototype.__properties__, {});
js.Boot = $hxClasses['js.Boot'] = function() { };
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js.Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js.Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js.Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
js.Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js.Boot.__nativeClassName(o);
		if(name != null) return js.Boot.__resolveNativeClass(name);
		return null;
	}
};
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js.Boot.__string_rec(o[i1],s); else str2 += js.Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			haxe.CallStack.lastException = e;
			if (e instanceof js._Boot.HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
};
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js.Boot.__interfLoop(js.Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js.Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js.Boot.__nativeClassName = function(o) {
	var name = js.Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js.Boot.__isNativeObj = function(o) {
	return js.Boot.__nativeClassName(o) != null;
};
js.Boot.__resolveNativeClass = function(name) {
	return (Function("return typeof " + name + " != \"undefined\" ? " + name + " : null"))();
};
js.Boot.prototype.__class__ = js.Boot;
js.Boot.prototype.__properties__ = {};
js.Browser = $hxClasses['js.Browser'] = function() { };
js.Browser.__name__ = ["js","Browser"];
js.Browser.window = null;
js.Browser.document = null;
js.Browser.location = null;
js.Browser.navigator = null;
js.Browser.console = null;
js.Browser.supported = null;
js.Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
	if(typeof ActiveXObject != "undefined") return new ActiveXObject("Microsoft.XMLHTTP");
	throw new js._Boot.HaxeError("Unable to create XMLHttpRequest object.");
};
js.Browser.prototype.__class__ = js.Browser;
js.Browser.prototype.__properties__ = {};
js.Cookie = $hxClasses['js.Cookie'] = function() { };
js.Cookie.__name__ = ["js","Cookie"];
js.Cookie.set = function(name,value,expireDelay,path,domain) {
	var s = name + "=" + encodeURIComponent(value);
	if(expireDelay != null) {
		var d = DateTools.delta(new Date(),expireDelay * 1000);
		s += ";expires=" + d.toGMTString();
	}
	if(path != null) s += ";path=" + path;
	if(domain != null) s += ";domain=" + domain;
	window.document.cookie = s;
};
js.Cookie.prototype.__class__ = js.Cookie;
js.Cookie.prototype.__properties__ = {};
js.html.compat.ArrayBuffer = $hxClasses['js.html.compat.ArrayBuffer'] = function(a) {
	if((a instanceof Array) && a.__enum__ == null) {
		this.a = a;
		this.byteLength = a.length;
	} else {
		var len = a;
		this.a = [];
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			this.a[i] = 0;
		}
		this.byteLength = len;
	}
};
js.html.compat.ArrayBuffer.__name__ = ["js","html","compat","ArrayBuffer"];
js.html.compat.ArrayBuffer.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null?null:end - begin);
	var result = new ArrayBuffer(u.byteLength);
	var resultArray = new Uint8Array(result);
	resultArray.set(u);
	return result;
};
js.html.compat.ArrayBuffer.prototype.byteLength = null;
js.html.compat.ArrayBuffer.prototype.a = null;
js.html.compat.ArrayBuffer.prototype.slice = function(begin,end) {
	return new js.html.compat.ArrayBuffer(this.a.slice(begin,end));
};
js.html.compat.ArrayBuffer.prototype.__class__ = js.html.compat.ArrayBuffer;
js.html.compat.ArrayBuffer.prototype.__properties__ = {};
js.html.compat.DataView = $hxClasses['js.html.compat.DataView'] = function(buffer,byteOffset,byteLength) {
	this.buf = buffer;
	if(byteOffset == null) this.offset = 0; else this.offset = byteOffset;
	if(byteLength == null) this.length = buffer.byteLength - this.offset; else this.length = byteLength;
	if(this.offset < 0 || this.length < 0 || this.offset + this.length > buffer.byteLength) throw new js._Boot.HaxeError(haxe.io.Error.OutsideBounds);
};
js.html.compat.DataView.__name__ = ["js","html","compat","DataView"];
js.html.compat.DataView.prototype.buf = null;
js.html.compat.DataView.prototype.offset = null;
js.html.compat.DataView.prototype.length = null;
js.html.compat.DataView.prototype.getInt8 = function(byteOffset) {
	var v = this.buf.a[this.offset + byteOffset];
	if(v >= 128) return v - 256; else return v;
};
js.html.compat.DataView.prototype.getUint8 = function(byteOffset) {
	return this.buf.a[this.offset + byteOffset];
};
js.html.compat.DataView.prototype.getInt16 = function(byteOffset,littleEndian) {
	var v = this.getUint16(byteOffset,littleEndian);
	if(v >= 32768) return v - 65536; else return v;
};
js.html.compat.DataView.prototype.getUint16 = function(byteOffset,littleEndian) {
	if(littleEndian) return this.buf.a[this.offset + byteOffset] | this.buf.a[this.offset + byteOffset + 1] << 8; else return this.buf.a[this.offset + byteOffset] << 8 | this.buf.a[this.offset + byteOffset + 1];
};
js.html.compat.DataView.prototype.getInt32 = function(byteOffset,littleEndian) {
	var p = this.offset + byteOffset;
	var a = this.buf.a[p++];
	var b = this.buf.a[p++];
	var c = this.buf.a[p++];
	var d = this.buf.a[p++];
	if(littleEndian) return a | b << 8 | c << 16 | d << 24; else return d | c << 8 | b << 16 | a << 24;
};
js.html.compat.DataView.prototype.getUint32 = function(byteOffset,littleEndian) {
	var v = this.getInt32(byteOffset,littleEndian);
	if(v < 0) return v + 4294967296.; else return v;
};
js.html.compat.DataView.prototype.getFloat32 = function(byteOffset,littleEndian) {
	return haxe.io.FPHelper.i32ToFloat(this.getInt32(byteOffset,littleEndian));
};
js.html.compat.DataView.prototype.getFloat64 = function(byteOffset,littleEndian) {
	var a = this.getInt32(byteOffset,littleEndian);
	var b = this.getInt32(byteOffset + 4,littleEndian);
	return haxe.io.FPHelper.i64ToDouble(littleEndian?a:b,littleEndian?b:a);
};
js.html.compat.DataView.prototype.setInt8 = function(byteOffset,value) {
	if(value < 0) this.buf.a[byteOffset + this.offset] = value + 128 & 255; else this.buf.a[byteOffset + this.offset] = value & 255;
};
js.html.compat.DataView.prototype.setUint8 = function(byteOffset,value) {
	this.buf.a[byteOffset + this.offset] = value & 255;
};
js.html.compat.DataView.prototype.setInt16 = function(byteOffset,value,littleEndian) {
	this.setUint16(byteOffset,value < 0?value + 65536:value,littleEndian);
};
js.html.compat.DataView.prototype.setUint16 = function(byteOffset,value,littleEndian) {
	var p = byteOffset + this.offset;
	if(littleEndian) {
		this.buf.a[p] = value & 255;
		this.buf.a[p++] = value >> 8 & 255;
	} else {
		this.buf.a[p++] = value >> 8 & 255;
		this.buf.a[p] = value & 255;
	}
};
js.html.compat.DataView.prototype.setInt32 = function(byteOffset,value,littleEndian) {
	this.setUint32(byteOffset,value,littleEndian);
};
js.html.compat.DataView.prototype.setUint32 = function(byteOffset,value,littleEndian) {
	var p = byteOffset + this.offset;
	if(littleEndian) {
		this.buf.a[p++] = value & 255;
		this.buf.a[p++] = value >> 8 & 255;
		this.buf.a[p++] = value >> 16 & 255;
		this.buf.a[p++] = value >>> 24;
	} else {
		this.buf.a[p++] = value >>> 24;
		this.buf.a[p++] = value >> 16 & 255;
		this.buf.a[p++] = value >> 8 & 255;
		this.buf.a[p++] = value & 255;
	}
};
js.html.compat.DataView.prototype.setFloat32 = function(byteOffset,value,littleEndian) {
	this.setUint32(byteOffset,haxe.io.FPHelper.floatToI32(value),littleEndian);
};
js.html.compat.DataView.prototype.setFloat64 = function(byteOffset,value,littleEndian) {
	var i64 = haxe.io.FPHelper.doubleToI64(value);
	if(littleEndian) {
		this.setUint32(byteOffset,i64.low);
		this.setUint32(byteOffset,i64.high);
	} else {
		this.setUint32(byteOffset,i64.high);
		this.setUint32(byteOffset,i64.low);
	}
};
js.html.compat.DataView.prototype.__class__ = js.html.compat.DataView;
js.html.compat.DataView.prototype.__properties__ = {};
js.html.compat.Uint8Array = $hxClasses['js.html.compat.Uint8Array'] = function() { };
js.html.compat.Uint8Array.__name__ = ["js","html","compat","Uint8Array"];
js.html.compat.Uint8Array._new = function(arg1,offset,length) {
	var arr;
	if(typeof(arg1) == "number") {
		arr = [];
		var _g = 0;
		while(_g < arg1) {
			var i = _g++;
			arr[i] = 0;
		}
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js.html.compat.ArrayBuffer(arr);
	} else if(js.Boot.__instanceof(arg1,js.html.compat.ArrayBuffer)) {
		var buffer = arg1;
		if(offset == null) offset = 0;
		if(length == null) length = buffer.byteLength - offset;
		if(offset == 0) arr = buffer.a; else arr = buffer.a.slice(offset,offset + length);
		arr.byteLength = arr.length;
		arr.byteOffset = offset;
		arr.buffer = buffer;
	} else if((arg1 instanceof Array) && arg1.__enum__ == null) {
		arr = arg1.slice();
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js.html.compat.ArrayBuffer(arr);
	} else throw new js._Boot.HaxeError("TODO " + Std.string(arg1));
	arr.subarray = js.html.compat.Uint8Array._subarray;
	arr.set = js.html.compat.Uint8Array._set;
	return arr;
};
js.html.compat.Uint8Array._set = function(arg,offset) {
	var t = this;
	if(js.Boot.__instanceof(arg.buffer,js.html.compat.ArrayBuffer)) {
		var a = arg;
		if(arg.byteLength + offset > t.byteLength) throw new js._Boot.HaxeError("set() outside of range");
		var _g1 = 0;
		var _g = arg.byteLength;
		while(_g1 < _g) {
			var i = _g1++;
			t[i + offset] = a[i];
		}
	} else if((arg instanceof Array) && arg.__enum__ == null) {
		var a1 = arg;
		if(a1.length + offset > t.byteLength) throw new js._Boot.HaxeError("set() outside of range");
		var _g11 = 0;
		var _g2 = a1.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			t[i1 + offset] = a1[i1];
		}
	} else throw new js._Boot.HaxeError("TODO");
};
js.html.compat.Uint8Array._subarray = function(start,end) {
	var t = this;
	var a = js.html.compat.Uint8Array._new(t.slice(start,end));
	a.byteOffset = start;
	return a;
};
js.html.compat.Uint8Array.prototype.__class__ = js.html.compat.Uint8Array;
js.html.compat.Uint8Array.prototype.__properties__ = {};
mcore.exception.Exception = $hxClasses['mcore.exception.Exception'] = function(message,cause,info) {
	if(message == null) message = "";
	this.name = Type.getClassName(js.Boot.getClass(this));
	this.message = message;
	this.cause = cause;
	this.info = info;
};
mcore.exception.Exception.__name__ = ["mcore","exception","Exception"];
mcore.exception.Exception.getStackTrace = function(source) {
	return "getStackTrace not supported in js, see: https://groups.google.com/forum/#!searchin/haxelang/exceptionStack$20js/haxelang/oVyR-Bx-yM0/zck4VJFwzlUJ";
	var s = "";
	if(s != "") return s;
	var stack = haxe.CallStack.exceptionStack();
	while(stack.length > 0) {
		var _g = stack.shift();
		if(_g != null) switch(_g[1]) {
		case 2:
			var line = _g[4];
			var file = _g[3];
			s += "\tat " + file + " (" + line + ")\n";
			break;
		case 3:
			var method = _g[3];
			var classname = _g[2];
			s += "\tat " + classname + "#" + method + "\n";
			break;
		default:
		} else {
		}
	}
	return s;
};
mcore.exception.Exception.prototype.name = null;
mcore.exception.Exception.prototype.get_name = function() {
	return this.name;
};
mcore.exception.Exception.prototype.message = null;
mcore.exception.Exception.prototype.get_message = function() {
	return this.message;
};
mcore.exception.Exception.prototype.cause = null;
mcore.exception.Exception.prototype.info = null;
mcore.exception.Exception.prototype.toString = function() {
	var str = this.get_name() + ": " + this.get_message();
	if(this.info != null) str += " at " + this.info.className + "#" + this.info.methodName + " (" + this.info.lineNumber + ")";
	if(this.cause != null) str += "\n\t Caused by: " + mcore.exception.Exception.getStackTrace(this.cause);
	return str;
};
mcore.exception.Exception.prototype.__class__ = mcore.exception.Exception;
mcore.exception.Exception.prototype.__properties__ = {get_name:"get_name", get_message:"get_message"};
mcore.exception.ArgumentException = $hxClasses['mcore.exception.ArgumentException'] = function(message,cause,info) {
	if(message == null) message = "";
	mcore.exception.Exception.call(this,message,cause,info);
};
mcore.exception.ArgumentException.__name__ = ["mcore","exception","ArgumentException"];
mcore.exception.ArgumentException.__super__ = mcore.exception.Exception;
for(var k in mcore.exception.Exception.prototype ) mcore.exception.ArgumentException.prototype[k] = mcore.exception.Exception.prototype[k];
mcore.exception.ArgumentException.prototype.__class__ = mcore.exception.ArgumentException;
mcore.exception.ArgumentException.prototype.__properties__ = $extend(mcore.exception.Exception.prototype.__properties__, {});
mcore.util.Arrays = $hxClasses['mcore.util.Arrays'] = function() { };
mcore.util.Arrays.__name__ = ["mcore","util","Arrays"];
mcore.util.Arrays.toString = function(source) {
	return source.toString();
};
mcore.util.Arrays.shuffle = function(source) {
	var copy = source.slice();
	var shuffled = [];
	while(copy.length > 0) shuffled.push(copy.splice(Std.random(copy.length),1)[0]);
	return shuffled;
};
mcore.util.Arrays.lastItem = function(source) {
	return source[source.length - 1];
};
mcore.util.Arrays.prototype.__class__ = mcore.util.Arrays;
mcore.util.Arrays.prototype.__properties__ = {};
mcore.util.Reflection = $hxClasses['mcore.util.Reflection'] = function() { };
mcore.util.Reflection.__name__ = ["mcore","util","Reflection"];
mcore.util.Reflection.setProperty = function(object,property,value) {
	Reflect.setProperty(object,property,value);
	return value;
};
mcore.util.Reflection.hasProperty = function(object,property) {
	var properties = Type.getInstanceFields(Type.getClass(object));
	return Lambda.has(properties,property);
};
mcore.util.Reflection.getFields = function(object) {
	{
		var _g = Type["typeof"](object);
		switch(_g[1]) {
		case 6:
			var c = _g[2];
			return Type.getInstanceFields(c);
		default:
			return Reflect.fields(object);
		}
	}
};
mcore.util.Reflection.here = function(info) {
	return info;
};
mcore.util.Reflection.callMethod = function(o,func,args) {
	if(args == null) args = [];
	try {
		return Reflect.callMethod(o,func,args);
	} catch( e ) {
		haxe.CallStack.lastException = e;
		if (e instanceof js._Boot.HaxeError) e = e.val;
		throw new js._Boot.HaxeError(new mcore.exception.Exception("Error calling method " + Type.getClassName(Type.getClass(o)) + "." + Std.string(func) + "(" + args.toString() + ")",e,{ fileName : "Reflection.hx", lineNumber : 111, className : "mcore.util.Reflection", methodName : "callMethod"}));
	}
};
mcore.util.Reflection.prototype.__class__ = mcore.util.Reflection;
mcore.util.Reflection.prototype.__properties__ = {};
mcore.util.Types = $hxClasses['mcore.util.Types'] = function() { };
mcore.util.Types.__name__ = ["mcore","util","Types"];
mcore.util.Types.isSubClassOf = function(object,type) {
	return js.Boot.__instanceof(object,type) && Type.getClass(object) != type;
};
mcore.util.Types.createInstance = function(forClass,args) {
	if(args == null) args = [];
	try {
		return Type.createInstance(forClass,args);
	} catch( e ) {
		haxe.CallStack.lastException = e;
		if (e instanceof js._Boot.HaxeError) e = e.val;
		throw new js._Boot.HaxeError(new mcore.exception.Exception("Error creating instance of " + Type.getClassName(forClass) + "(" + args.toString() + ")",e,{ fileName : "Types.hx", lineNumber : 65, className : "mcore.util.Types", methodName : "createInstance"}));
	}
};
mcore.util.Types.prototype.__class__ = mcore.util.Types;
mcore.util.Types.prototype.__properties__ = {};
mdata.Dictionary = $hxClasses['mdata.Dictionary'] = function(weakKeys) {
	if(weakKeys == null) weakKeys = false;
	this.weakKeys = weakKeys;
	this.clear();
};
mdata.Dictionary.__name__ = ["mdata","Dictionary"];
mdata.Dictionary.prototype._keys = null;
mdata.Dictionary.prototype._values = null;
mdata.Dictionary.prototype.weakKeys = null;
mdata.Dictionary.prototype.set = function(key,value) {
	var _g1 = 0;
	var _g = this._keys.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(this._keys[i] == key) {
			this._keys[i] = key;
			this._values[i] = value;
			return;
		}
	}
	this._keys.push(key);
	this._values.push(value);
};
mdata.Dictionary.prototype.get = function(key) {
	var _g1 = 0;
	var _g = this._keys.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(this._keys[i] == key) return this._values[i];
	}
	return null;
};
mdata.Dictionary.prototype.remove = function(key) {
	var _g1 = 0;
	var _g = this._keys.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(this._keys[i] == key) {
			this._keys.splice(i,1);
			this._values.splice(i,1);
			return true;
		}
	}
	return false;
};
mdata.Dictionary.prototype["delete"] = function(key) {
	this.remove(key);
};
mdata.Dictionary.prototype.exists = function(key) {
	var _g = 0;
	var _g1 = this._keys;
	while(_g < _g1.length) {
		var k = _g1[_g];
		++_g;
		if(k == key) return true;
	}
	return false;
};
mdata.Dictionary.prototype.clear = function() {
	this._keys = [];
	this._values = [];
};
mdata.Dictionary.prototype.keys = function() {
	return HxOverrides.iter(this._keys);
};
mdata.Dictionary.prototype.iterator = function() {
	return HxOverrides.iter(this._values);
};
mdata.Dictionary.prototype.toString = function() {
	var s = "{";
	var $it0 = this.keys();
	while( $it0.hasNext() ) {
		var key = $it0.next();
		var value = this.get(key);
		var k;
		if((key instanceof Array) && key.__enum__ == null) k = "[" + key.toString() + "]"; else k = Std.string(key);
		var v;
		if((value instanceof Array) && value.__enum__ == null) v = "[" + value.toString() + "]"; else v = Std.string(value);
		s += k + " => " + v + ", ";
	}
	if(s.length > 2) s = HxOverrides.substr(s,0,s.length - 2);
	return s + "}";
};
mdata.Dictionary.prototype.__class__ = mdata.Dictionary;
mdata.Dictionary.prototype.__properties__ = {};
minject.InjectionConfig = $hxClasses['minject.InjectionConfig'] = function(request,injectionName) {
	this.request = request;
	this.injectionName = injectionName;
};
minject.InjectionConfig.__name__ = ["minject","InjectionConfig"];
minject.InjectionConfig.prototype.request = null;
minject.InjectionConfig.prototype.injectionName = null;
minject.InjectionConfig.prototype.injector = null;
minject.InjectionConfig.prototype.result = null;
minject.InjectionConfig.prototype.getResponse = function(injector) {
	if(this.injector != null) injector = this.injector;
	if(this.result != null) return this.result.getResponse(injector);
	var parentConfig = injector.getAncestorMapping(this.request,this.injectionName);
	if(parentConfig != null) return parentConfig.getResponse(injector);
	return null;
};
minject.InjectionConfig.prototype.hasResponse = function(injector) {
	return this.result != null;
};
minject.InjectionConfig.prototype.hasOwnResponse = function() {
	return this.result != null;
};
minject.InjectionConfig.prototype.setResult = function(result) {
	if(this.result != null && result != null) haxe.Log.trace("Warning: Injector already has a rule for type \"" + Type.getClassName(this.request) + "\", named \"" + this.injectionName + "\".\nIf you have overwritten this mapping intentionally " + "you can use \"injector.unmap()\" prior to your replacement " + "mapping in order to avoid seeing this message.",{ fileName : "InjectionConfig.hx", lineNumber : 74, className : "minject.InjectionConfig", methodName : "setResult"});
	this.result = result;
};
minject.InjectionConfig.prototype.setInjector = function(injector) {
	this.injector = injector;
};
minject.InjectionConfig.prototype.__class__ = minject.InjectionConfig;
minject.InjectionConfig.prototype.__properties__ = {};
minject.Injector = $hxClasses['minject.Injector'] = function() {
	this.injectionConfigs = new haxe.ds.StringMap();
	this.injecteeDescriptions = new minject.ClassHash();
	this.attendedToInjectees = new minject._Injector.InjecteeSet();
};
minject.Injector.__name__ = ["minject","Injector"];
minject.Injector.prototype.attendedToInjectees = null;
minject.Injector.prototype.parentInjector = null;
minject.Injector.prototype.injectionConfigs = null;
minject.Injector.prototype.injecteeDescriptions = null;
minject.Injector.prototype.mapValue = function(whenAskedFor,useValue,named) {
	if(named == null) named = "";
	var config = this.getMapping(whenAskedFor,named);
	config.setResult(new minject.result.InjectValueResult(useValue));
	return config;
};
minject.Injector.prototype.mapClass = function(whenAskedFor,instantiateClass,named) {
	if(named == null) named = "";
	var config = this.getMapping(whenAskedFor,named);
	config.setResult(new minject.result.InjectClassResult(instantiateClass));
	return config;
};
minject.Injector.prototype.mapSingleton = function(whenAskedFor,named) {
	if(named == null) named = "";
	return this.mapSingletonOf(whenAskedFor,whenAskedFor,named);
};
minject.Injector.prototype.mapSingletonOf = function(whenAskedFor,useSingletonOf,named) {
	if(named == null) named = "";
	var config = this.getMapping(whenAskedFor,named);
	config.setResult(new minject.result.InjectSingletonResult(useSingletonOf));
	return config;
};
minject.Injector.prototype.mapRule = function(whenAskedFor,useRule,named) {
	if(named == null) named = "";
	var config = this.getMapping(whenAskedFor,named);
	config.setResult(new minject.result.InjectOtherRuleResult(useRule));
	return useRule;
};
minject.Injector.prototype.getMapping = function(forClass,named) {
	if(named == null) named = "";
	var requestName = this.getClassName(forClass) + "#" + named;
	if(this.injectionConfigs.exists(requestName)) return this.injectionConfigs.get(requestName);
	var config = new minject.InjectionConfig(forClass,named);
	this.injectionConfigs.set(requestName,config);
	return config;
};
minject.Injector.prototype.injectInto = function(target) {
	if(this.attendedToInjectees.contains(target)) return;
	this.attendedToInjectees.add(target);
	var targetClass = Type.getClass(target);
	var injecteeDescription = null;
	if(this.injecteeDescriptions.exists(targetClass)) injecteeDescription = this.injecteeDescriptions.get(targetClass); else injecteeDescription = this.getInjectionPoints(targetClass);
	if(injecteeDescription == null) return;
	var injectionPoints = injecteeDescription.injectionPoints;
	var length = injectionPoints.length;
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		var injectionPoint = injectionPoints[i];
		injectionPoint.applyInjection(target,this);
	}
};
minject.Injector.prototype.instantiate = function(theClass) {
	var injecteeDescription;
	if(this.injecteeDescriptions.exists(theClass)) injecteeDescription = this.injecteeDescriptions.get(theClass); else injecteeDescription = this.getInjectionPoints(theClass);
	var injectionPoint = injecteeDescription.ctor;
	var instance = injectionPoint.applyInjection(theClass,this);
	this.injectInto(instance);
	return instance;
};
minject.Injector.prototype.unmap = function(theClass,named) {
	if(named == null) named = "";
	var mapping = this.getConfigurationForRequest(theClass,named);
	if(mapping == null) throw new js._Boot.HaxeError("Error while removing an injector mapping: No mapping defined for class " + this.getClassName(theClass) + ", named \"" + named + "\"");
	mapping.setResult(null);
};
minject.Injector.prototype.hasMapping = function(forClass,named) {
	if(named == null) named = "";
	var mapping = this.getConfigurationForRequest(forClass,named);
	if(mapping == null) return false;
	return mapping.hasResponse(this);
};
minject.Injector.prototype.getInstance = function(ofClass,named) {
	if(named == null) named = "";
	var mapping = this.getConfigurationForRequest(ofClass,named);
	if(mapping == null || !mapping.hasResponse(this)) throw new js._Boot.HaxeError("Error while getting mapping response: No mapping defined for class " + this.getClassName(ofClass) + ", named \"" + named + "\"");
	return mapping.getResponse(this);
};
minject.Injector.prototype.createChildInjector = function() {
	var injector = new minject.Injector();
	injector.set_parentInjector(this);
	return injector;
};
minject.Injector.prototype.getAncestorMapping = function(forClass,named) {
	var parent = this.parentInjector;
	while(parent != null) {
		var parentConfig = parent.getConfigurationForRequest(forClass,named,false);
		if(parentConfig != null && parentConfig.hasOwnResponse()) return parentConfig;
		parent = parent.parentInjector;
	}
	return null;
};
minject.Injector.prototype.getInjectionPoints = function(forClass) {
	var typeMeta = haxe.rtti.Meta.getType(forClass);
	if(typeMeta != null && Object.prototype.hasOwnProperty.call(typeMeta,"interface")) throw new js._Boot.HaxeError("Interfaces can't be used as instantiatable classes.");
	var fieldsMeta = this.getFields(forClass);
	var ctorInjectionPoint = null;
	var injectionPoints = [];
	var postConstructMethodPoints = [];
	var _g = 0;
	var _g1 = Reflect.fields(fieldsMeta);
	while(_g < _g1.length) {
		var field = _g1[_g];
		++_g;
		var fieldMeta = Reflect.field(fieldsMeta,field);
		var inject = Object.prototype.hasOwnProperty.call(fieldMeta,"inject");
		var post = Object.prototype.hasOwnProperty.call(fieldMeta,"post");
		var type = Reflect.field(fieldMeta,"type");
		var args = Reflect.field(fieldMeta,"args");
		if(field == "_") {
			if(args.length > 0) ctorInjectionPoint = new minject.point.ConstructorInjectionPoint(fieldMeta,forClass,this);
		} else if(Object.prototype.hasOwnProperty.call(fieldMeta,"args")) {
			if(inject) {
				var injectionPoint = new minject.point.MethodInjectionPoint(fieldMeta,this);
				injectionPoints.push(injectionPoint);
			} else if(post) {
				var injectionPoint1 = new minject.point.PostConstructInjectionPoint(fieldMeta,this);
				postConstructMethodPoints.push(injectionPoint1);
			}
		} else if(type != null) {
			var injectionPoint2 = new minject.point.PropertyInjectionPoint(fieldMeta,this);
			injectionPoints.push(injectionPoint2);
		}
	}
	if(postConstructMethodPoints.length > 0) {
		postConstructMethodPoints.sort(function(a,b) {
			return a.order - b.order;
		});
		var _g2 = 0;
		while(_g2 < postConstructMethodPoints.length) {
			var point = postConstructMethodPoints[_g2];
			++_g2;
			injectionPoints.push(point);
		}
	}
	if(ctorInjectionPoint == null) ctorInjectionPoint = new minject.point.NoParamsConstructorInjectionPoint();
	var injecteeDescription = new minject.InjecteeDescription(ctorInjectionPoint,injectionPoints);
	this.injecteeDescriptions.set(forClass,injecteeDescription);
	return injecteeDescription;
};
minject.Injector.prototype.getConfigurationForRequest = function(forClass,named,traverseAncestors) {
	if(traverseAncestors == null) traverseAncestors = true;
	var requestName = this.getClassName(forClass) + "#" + named;
	if(!this.injectionConfigs.exists(requestName)) {
		if(traverseAncestors && this.parentInjector != null && this.parentInjector.hasMapping(forClass,named)) return this.getAncestorMapping(forClass,named);
		return null;
	}
	return this.injectionConfigs.get(requestName);
};
minject.Injector.prototype.set_parentInjector = function(value) {
	if(this.parentInjector != null && value == null) this.attendedToInjectees = new minject._Injector.InjecteeSet();
	this.parentInjector = value;
	if(this.parentInjector != null) this.attendedToInjectees = this.parentInjector.attendedToInjectees;
	return this.parentInjector;
};
minject.Injector.prototype.getClassName = function(forClass) {
	if(forClass == null) return "Dynamic"; else return Type.getClassName(forClass);
};
minject.Injector.prototype.getFields = function(type) {
	var meta = { };
	while(type != null) {
		var typeMeta = haxe.rtti.Meta.getFields(type);
		var _g = 0;
		var _g1 = Reflect.fields(typeMeta);
		while(_g < _g1.length) {
			var field = _g1[_g];
			++_g;
			Reflect.setField(meta,field,Reflect.field(typeMeta,field));
		}
		type = Type.getSuperClass(type);
	}
	return meta;
};
minject.Injector.prototype.__class__ = minject.Injector;
minject.Injector.prototype.__properties__ = {set_parentInjector:"set_parentInjector"};
minject._Injector.InjecteeSet = $hxClasses['minject._Injector.InjecteeSet'] = function() {
};
minject._Injector.InjecteeSet.__name__ = ["minject","_Injector","InjecteeSet"];
minject._Injector.InjecteeSet.prototype.add = function(value) {
	value.__injected__ = true;
};
minject._Injector.InjecteeSet.prototype.contains = function(value) {
	return value.__injected__ == true;
};
minject._Injector.InjecteeSet.prototype["delete"] = function(value) {
	Reflect.deleteField(value,"__injected__");
};
minject._Injector.InjecteeSet.prototype.iterator = function() {
	return HxOverrides.iter([]);
};
minject._Injector.InjecteeSet.prototype.__class__ = minject._Injector.InjecteeSet;
minject._Injector.InjecteeSet.prototype.__properties__ = {};
minject.ClassHash = $hxClasses['minject.ClassHash'] = function() {
	this.hash = new haxe.ds.StringMap();
};
minject.ClassHash.__name__ = ["minject","ClassHash"];
minject.ClassHash.prototype.hash = null;
minject.ClassHash.prototype.set = function(key,value) {
	this.hash.set(Type.getClassName(key),value);
};
minject.ClassHash.prototype.get = function(key) {
	return this.hash.get(Type.getClassName(key));
};
minject.ClassHash.prototype.exists = function(key) {
	return this.hash.exists(Type.getClassName(key));
};
minject.ClassHash.prototype.__class__ = minject.ClassHash;
minject.ClassHash.prototype.__properties__ = {};
minject.InjecteeDescription = $hxClasses['minject.InjecteeDescription'] = function(ctor,injectionPoints) {
	this.ctor = ctor;
	this.injectionPoints = injectionPoints;
};
minject.InjecteeDescription.__name__ = ["minject","InjecteeDescription"];
minject.InjecteeDescription.prototype.ctor = null;
minject.InjecteeDescription.prototype.injectionPoints = null;
minject.InjecteeDescription.prototype.__class__ = minject.InjecteeDescription;
minject.InjecteeDescription.prototype.__properties__ = {};
minject.point.InjectionPoint = $hxClasses['minject.point.InjectionPoint'] = function(meta,injector) {
	this.initializeInjection(meta);
};
minject.point.InjectionPoint.__name__ = ["minject","point","InjectionPoint"];
minject.point.InjectionPoint.prototype.applyInjection = function(target,injector) {
	return target;
};
minject.point.InjectionPoint.prototype.initializeInjection = function(meta) {
};
minject.point.InjectionPoint.prototype.__class__ = minject.point.InjectionPoint;
minject.point.InjectionPoint.prototype.__properties__ = {};
minject.point.MethodInjectionPoint = $hxClasses['minject.point.MethodInjectionPoint'] = function(meta,injector) {
	this.requiredParameters = 0;
	minject.point.InjectionPoint.call(this,meta,injector);
};
minject.point.MethodInjectionPoint.__name__ = ["minject","point","MethodInjectionPoint"];
minject.point.MethodInjectionPoint.__super__ = minject.point.InjectionPoint;
for(var k in minject.point.InjectionPoint.prototype ) minject.point.MethodInjectionPoint.prototype[k] = minject.point.InjectionPoint.prototype[k];
minject.point.MethodInjectionPoint.prototype.methodName = null;
minject.point.MethodInjectionPoint.prototype._parameterInjectionConfigs = null;
minject.point.MethodInjectionPoint.prototype.requiredParameters = null;
minject.point.MethodInjectionPoint.prototype.applyInjection = function(target,injector) {
	var parameters = this.gatherParameterValues(target,injector);
	var method = Reflect.field(target,this.methodName);
	mcore.util.Reflection.callMethod(target,method,parameters);
	return target;
};
minject.point.MethodInjectionPoint.prototype.initializeInjection = function(meta) {
	this.methodName = meta.name[0];
	this.gatherParameters(meta);
};
minject.point.MethodInjectionPoint.prototype.gatherParameters = function(meta) {
	var nameArgs = meta.inject;
	var args = meta.args;
	if(nameArgs == null) nameArgs = [];
	this._parameterInjectionConfigs = [];
	var i = 0;
	var _g = 0;
	while(_g < args.length) {
		var arg = args[_g];
		++_g;
		var injectionName = "";
		if(i < nameArgs.length) injectionName = nameArgs[i];
		var parameterTypeName = arg.type;
		if(arg.opt) {
			if(parameterTypeName == "Dynamic") throw new js._Boot.HaxeError("Error in method definition of injectee. Required parameters can't have non class type.");
		} else this.requiredParameters++;
		this._parameterInjectionConfigs.push(new minject.point.ParameterInjectionConfig(parameterTypeName,injectionName));
		i++;
	}
};
minject.point.MethodInjectionPoint.prototype.gatherParameterValues = function(target,injector) {
	var parameters = [];
	var length = this._parameterInjectionConfigs.length;
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		var parameterConfig = this._parameterInjectionConfigs[i];
		var config = injector.getMapping(Type.resolveClass(parameterConfig.typeName),parameterConfig.injectionName);
		var injection = config.getResponse(injector);
		if(injection == null) {
			if(i >= this.requiredParameters) break;
			throw new js._Boot.HaxeError("Injector is missing a rule to handle injection into target " + Type.getClassName(Type.getClass(target)) + ". Target dependency: " + Type.getClassName(config.request) + ", method: " + this.methodName + ", parameter: " + (i + 1) + ", named: " + parameterConfig.injectionName);
		}
		parameters[i] = injection;
	}
	return parameters;
};
minject.point.MethodInjectionPoint.prototype.__class__ = minject.point.MethodInjectionPoint;
minject.point.MethodInjectionPoint.prototype.__properties__ = $extend(minject.point.InjectionPoint.prototype.__properties__, {});
minject.point.ConstructorInjectionPoint = $hxClasses['minject.point.ConstructorInjectionPoint'] = function(meta,forClass,injector) {
	minject.point.MethodInjectionPoint.call(this,meta,injector);
};
minject.point.ConstructorInjectionPoint.__name__ = ["minject","point","ConstructorInjectionPoint"];
minject.point.ConstructorInjectionPoint.__super__ = minject.point.MethodInjectionPoint;
for(var k in minject.point.MethodInjectionPoint.prototype ) minject.point.ConstructorInjectionPoint.prototype[k] = minject.point.MethodInjectionPoint.prototype[k];
minject.point.ConstructorInjectionPoint.prototype.applyInjection = function(target,injector) {
	var ofClass = target;
	var withArgs = this.gatherParameterValues(target,injector);
	return mcore.util.Types.createInstance(ofClass,withArgs);
};
minject.point.ConstructorInjectionPoint.prototype.initializeInjection = function(meta) {
	this.methodName = "new";
	this.gatherParameters(meta);
};
minject.point.ConstructorInjectionPoint.prototype.__class__ = minject.point.ConstructorInjectionPoint;
minject.point.ConstructorInjectionPoint.prototype.__properties__ = $extend(minject.point.MethodInjectionPoint.prototype.__properties__, {});
minject.point.ParameterInjectionConfig = $hxClasses['minject.point.ParameterInjectionConfig'] = function(typeName,injectionName) {
	this.typeName = typeName;
	this.injectionName = injectionName;
};
minject.point.ParameterInjectionConfig.__name__ = ["minject","point","ParameterInjectionConfig"];
minject.point.ParameterInjectionConfig.prototype.typeName = null;
minject.point.ParameterInjectionConfig.prototype.injectionName = null;
minject.point.ParameterInjectionConfig.prototype.__class__ = minject.point.ParameterInjectionConfig;
minject.point.ParameterInjectionConfig.prototype.__properties__ = {};
minject.point.NoParamsConstructorInjectionPoint = $hxClasses['minject.point.NoParamsConstructorInjectionPoint'] = function() {
	minject.point.InjectionPoint.call(this,null,null);
};
minject.point.NoParamsConstructorInjectionPoint.__name__ = ["minject","point","NoParamsConstructorInjectionPoint"];
minject.point.NoParamsConstructorInjectionPoint.__super__ = minject.point.InjectionPoint;
for(var k in minject.point.InjectionPoint.prototype ) minject.point.NoParamsConstructorInjectionPoint.prototype[k] = minject.point.InjectionPoint.prototype[k];
minject.point.NoParamsConstructorInjectionPoint.prototype.applyInjection = function(target,injector) {
	return mcore.util.Types.createInstance(target,[]);
};
minject.point.NoParamsConstructorInjectionPoint.prototype.__class__ = minject.point.NoParamsConstructorInjectionPoint;
minject.point.NoParamsConstructorInjectionPoint.prototype.__properties__ = $extend(minject.point.InjectionPoint.prototype.__properties__, {});
minject.point.PostConstructInjectionPoint = $hxClasses['minject.point.PostConstructInjectionPoint'] = function(meta,injector) {
	this.order = 0;
	minject.point.InjectionPoint.call(this,meta,injector);
};
minject.point.PostConstructInjectionPoint.__name__ = ["minject","point","PostConstructInjectionPoint"];
minject.point.PostConstructInjectionPoint.__super__ = minject.point.InjectionPoint;
for(var k in minject.point.InjectionPoint.prototype ) minject.point.PostConstructInjectionPoint.prototype[k] = minject.point.InjectionPoint.prototype[k];
minject.point.PostConstructInjectionPoint.prototype.order = null;
minject.point.PostConstructInjectionPoint.prototype.methodName = null;
minject.point.PostConstructInjectionPoint.prototype.applyInjection = function(target,injector) {
	mcore.util.Reflection.callMethod(target,Reflect.field(target,this.methodName),[]);
	return target;
};
minject.point.PostConstructInjectionPoint.prototype.initializeInjection = function(meta) {
	this.methodName = meta.name[0];
	if(meta.post != null) this.order = meta.post[0];
};
minject.point.PostConstructInjectionPoint.prototype.__class__ = minject.point.PostConstructInjectionPoint;
minject.point.PostConstructInjectionPoint.prototype.__properties__ = $extend(minject.point.InjectionPoint.prototype.__properties__, {});
minject.point.PropertyInjectionPoint = $hxClasses['minject.point.PropertyInjectionPoint'] = function(meta,injector) {
	minject.point.InjectionPoint.call(this,meta,null);
};
minject.point.PropertyInjectionPoint.__name__ = ["minject","point","PropertyInjectionPoint"];
minject.point.PropertyInjectionPoint.__super__ = minject.point.InjectionPoint;
for(var k in minject.point.InjectionPoint.prototype ) minject.point.PropertyInjectionPoint.prototype[k] = minject.point.InjectionPoint.prototype[k];
minject.point.PropertyInjectionPoint.prototype.propertyName = null;
minject.point.PropertyInjectionPoint.prototype.propertyType = null;
minject.point.PropertyInjectionPoint.prototype.injectionName = null;
minject.point.PropertyInjectionPoint.prototype.applyInjection = function(target,injector) {
	var injectionConfig = injector.getMapping(Type.resolveClass(this.propertyType),this.injectionName);
	var injection = injectionConfig.getResponse(injector);
	if(injection == null) throw new js._Boot.HaxeError("Injector is missing a rule to handle injection into property \"" + this.propertyName + "\" of object \"" + Std.string(target) + "\". Target dependency: \"" + this.propertyType + "\", named \"" + this.injectionName + "\"");
	Reflect.setProperty(target,this.propertyName,injection);
	return target;
};
minject.point.PropertyInjectionPoint.prototype.initializeInjection = function(meta) {
	this.propertyType = meta.type[0];
	this.propertyName = meta.name[0];
	if(meta.inject == null) this.injectionName = ""; else this.injectionName = meta.inject[0];
};
minject.point.PropertyInjectionPoint.prototype.__class__ = minject.point.PropertyInjectionPoint;
minject.point.PropertyInjectionPoint.prototype.__properties__ = $extend(minject.point.InjectionPoint.prototype.__properties__, {});
minject.result.InjectionResult = $hxClasses['minject.result.InjectionResult'] = function() {
};
minject.result.InjectionResult.__name__ = ["minject","result","InjectionResult"];
minject.result.InjectionResult.prototype.getResponse = function(injector) {
	return null;
};
minject.result.InjectionResult.prototype.__class__ = minject.result.InjectionResult;
minject.result.InjectionResult.prototype.__properties__ = {};
minject.result.InjectClassResult = $hxClasses['minject.result.InjectClassResult'] = function(responseType) {
	minject.result.InjectionResult.call(this);
	this.responseType = responseType;
};
minject.result.InjectClassResult.__name__ = ["minject","result","InjectClassResult"];
minject.result.InjectClassResult.__super__ = minject.result.InjectionResult;
for(var k in minject.result.InjectionResult.prototype ) minject.result.InjectClassResult.prototype[k] = minject.result.InjectionResult.prototype[k];
minject.result.InjectClassResult.prototype.responseType = null;
minject.result.InjectClassResult.prototype.getResponse = function(injector) {
	return injector.instantiate(this.responseType);
};
minject.result.InjectClassResult.prototype.__class__ = minject.result.InjectClassResult;
minject.result.InjectClassResult.prototype.__properties__ = $extend(minject.result.InjectionResult.prototype.__properties__, {});
minject.result.InjectOtherRuleResult = $hxClasses['minject.result.InjectOtherRuleResult'] = function(rule) {
	minject.result.InjectionResult.call(this);
	this.rule = rule;
};
minject.result.InjectOtherRuleResult.__name__ = ["minject","result","InjectOtherRuleResult"];
minject.result.InjectOtherRuleResult.__super__ = minject.result.InjectionResult;
for(var k in minject.result.InjectionResult.prototype ) minject.result.InjectOtherRuleResult.prototype[k] = minject.result.InjectionResult.prototype[k];
minject.result.InjectOtherRuleResult.prototype.rule = null;
minject.result.InjectOtherRuleResult.prototype.getResponse = function(injector) {
	return this.rule.getResponse(injector);
};
minject.result.InjectOtherRuleResult.prototype.__class__ = minject.result.InjectOtherRuleResult;
minject.result.InjectOtherRuleResult.prototype.__properties__ = $extend(minject.result.InjectionResult.prototype.__properties__, {});
minject.result.InjectSingletonResult = $hxClasses['minject.result.InjectSingletonResult'] = function(responseType) {
	minject.result.InjectionResult.call(this);
	this.responseType = responseType;
};
minject.result.InjectSingletonResult.__name__ = ["minject","result","InjectSingletonResult"];
minject.result.InjectSingletonResult.__super__ = minject.result.InjectionResult;
for(var k in minject.result.InjectionResult.prototype ) minject.result.InjectSingletonResult.prototype[k] = minject.result.InjectionResult.prototype[k];
minject.result.InjectSingletonResult.prototype.responseType = null;
minject.result.InjectSingletonResult.prototype.response = null;
minject.result.InjectSingletonResult.prototype.getResponse = function(injector) {
	if(this.response == null) this.response = this.createResponse(injector);
	return this.response;
};
minject.result.InjectSingletonResult.prototype.createResponse = function(injector) {
	return injector.instantiate(this.responseType);
};
minject.result.InjectSingletonResult.prototype.__class__ = minject.result.InjectSingletonResult;
minject.result.InjectSingletonResult.prototype.__properties__ = $extend(minject.result.InjectionResult.prototype.__properties__, {});
minject.result.InjectValueResult = $hxClasses['minject.result.InjectValueResult'] = function(value) {
	minject.result.InjectionResult.call(this);
	this.value = value;
};
minject.result.InjectValueResult.__name__ = ["minject","result","InjectValueResult"];
minject.result.InjectValueResult.__super__ = minject.result.InjectionResult;
for(var k in minject.result.InjectionResult.prototype ) minject.result.InjectValueResult.prototype[k] = minject.result.InjectionResult.prototype[k];
minject.result.InjectValueResult.prototype.value = null;
minject.result.InjectValueResult.prototype.getResponse = function(injector) {
	return this.value;
};
minject.result.InjectValueResult.prototype.__class__ = minject.result.InjectValueResult;
minject.result.InjectValueResult.prototype.__properties__ = $extend(minject.result.InjectionResult.prototype.__properties__, {});
msignal.Signal = $hxClasses['msignal.Signal'] = function(valueClasses) {
	if(valueClasses == null) valueClasses = [];
	this.valueClasses = valueClasses;
	this.slots = msignal.SlotList.NIL;
	this.priorityBased = false;
};
msignal.Signal.__name__ = ["msignal","Signal"];
msignal.Signal.prototype.valueClasses = null;
msignal.Signal.prototype.numListeners = null;
msignal.Signal.prototype.slots = null;
msignal.Signal.prototype.priorityBased = null;
msignal.Signal.prototype.add = function(listener) {
	return this.registerListener(listener);
};
msignal.Signal.prototype.addOnce = function(listener) {
	return this.registerListener(listener,true);
};
msignal.Signal.prototype.addWithPriority = function(listener,priority) {
	if(priority == null) priority = 0;
	return this.registerListener(listener,false,priority);
};
msignal.Signal.prototype.addOnceWithPriority = function(listener,priority) {
	if(priority == null) priority = 0;
	return this.registerListener(listener,true,priority);
};
msignal.Signal.prototype.remove = function(listener) {
	var slot = this.slots.find(listener);
	if(slot == null) return null;
	this.slots = this.slots.filterNot(listener);
	return slot;
};
msignal.Signal.prototype.removeAll = function() {
	this.slots = msignal.SlotList.NIL;
};
msignal.Signal.prototype.registerListener = function(listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	if(this.registrationPossible(listener,once)) {
		var newSlot = this.createSlot(listener,once,priority);
		if(!this.priorityBased && priority != 0) this.priorityBased = true;
		if(!this.priorityBased && priority == 0) this.slots = this.slots.prepend(newSlot); else this.slots = this.slots.insertWithPriority(newSlot);
		return newSlot;
	}
	return this.slots.find(listener);
};
msignal.Signal.prototype.registrationPossible = function(listener,once) {
	if(!this.slots.nonEmpty) return true;
	var existingSlot = this.slots.find(listener);
	if(existingSlot == null) return true;
	if(existingSlot.once != once) throw new js._Boot.HaxeError("You cannot addOnce() then add() the same listener without removing the relationship first.");
	return false;
};
msignal.Signal.prototype.createSlot = function(listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	return null;
};
msignal.Signal.prototype.get_numListeners = function() {
	return this.slots.get_length();
};
msignal.Signal.prototype.__class__ = msignal.Signal;
msignal.Signal.prototype.__properties__ = {get_numListeners:"get_numListeners"};
msignal.Signal0 = $hxClasses['msignal.Signal0'] = function() {
	msignal.Signal.call(this);
};
msignal.Signal0.__name__ = ["msignal","Signal0"];
msignal.Signal0.__super__ = msignal.Signal;
for(var k in msignal.Signal.prototype ) msignal.Signal0.prototype[k] = msignal.Signal.prototype[k];
msignal.Signal0.prototype.dispatch = function() {
	var slotsToProcess = this.slots;
	while(slotsToProcess.nonEmpty) {
		slotsToProcess.head.execute();
		slotsToProcess = slotsToProcess.tail;
	}
};
msignal.Signal0.prototype.createSlot = function(listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	return new msignal.Slot0(this,listener,once,priority);
};
msignal.Signal0.prototype.__class__ = msignal.Signal0;
msignal.Signal0.prototype.__properties__ = $extend(msignal.Signal.prototype.__properties__, {});
msignal.Signal1 = $hxClasses['msignal.Signal1'] = function(type) {
	msignal.Signal.call(this,[type]);
};
msignal.Signal1.__name__ = ["msignal","Signal1"];
msignal.Signal1.__super__ = msignal.Signal;
for(var k in msignal.Signal.prototype ) msignal.Signal1.prototype[k] = msignal.Signal.prototype[k];
msignal.Signal1.prototype.dispatch = function(value) {
	var slotsToProcess = this.slots;
	while(slotsToProcess.nonEmpty) {
		slotsToProcess.head.execute(value);
		slotsToProcess = slotsToProcess.tail;
	}
};
msignal.Signal1.prototype.createSlot = function(listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	return new msignal.Slot1(this,listener,once,priority);
};
msignal.Signal1.prototype.__class__ = msignal.Signal1;
msignal.Signal1.prototype.__properties__ = $extend(msignal.Signal.prototype.__properties__, {});
msignal.Signal2 = $hxClasses['msignal.Signal2'] = function(type1,type2) {
	msignal.Signal.call(this,[type1,type2]);
};
msignal.Signal2.__name__ = ["msignal","Signal2"];
msignal.Signal2.__super__ = msignal.Signal;
for(var k in msignal.Signal.prototype ) msignal.Signal2.prototype[k] = msignal.Signal.prototype[k];
msignal.Signal2.prototype.dispatch = function(value1,value2) {
	var slotsToProcess = this.slots;
	while(slotsToProcess.nonEmpty) {
		slotsToProcess.head.execute(value1,value2);
		slotsToProcess = slotsToProcess.tail;
	}
};
msignal.Signal2.prototype.createSlot = function(listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	return new msignal.Slot2(this,listener,once,priority);
};
msignal.Signal2.prototype.__class__ = msignal.Signal2;
msignal.Signal2.prototype.__properties__ = $extend(msignal.Signal.prototype.__properties__, {});
msignal.Slot = $hxClasses['msignal.Slot'] = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	this.signal = signal;
	this.set_listener(listener);
	this.once = once;
	this.priority = priority;
	this.enabled = true;
};
msignal.Slot.__name__ = ["msignal","Slot"];
msignal.Slot.prototype.listener = null;
msignal.Slot.prototype.once = null;
msignal.Slot.prototype.priority = null;
msignal.Slot.prototype.enabled = null;
msignal.Slot.prototype.signal = null;
msignal.Slot.prototype.remove = function() {
	this.signal.remove(this.listener);
};
msignal.Slot.prototype.set_listener = function(value) {
	if(value == null) throw new js._Boot.HaxeError("listener cannot be null");
	return this.listener = value;
};
msignal.Slot.prototype.__class__ = msignal.Slot;
msignal.Slot.prototype.__properties__ = {set_listener:"set_listener"};
msignal.Slot0 = $hxClasses['msignal.Slot0'] = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	msignal.Slot.call(this,signal,listener,once,priority);
};
msignal.Slot0.__name__ = ["msignal","Slot0"];
msignal.Slot0.__super__ = msignal.Slot;
for(var k in msignal.Slot.prototype ) msignal.Slot0.prototype[k] = msignal.Slot.prototype[k];
msignal.Slot0.prototype.execute = function() {
	if(!this.enabled) return;
	if(this.once) this.remove();
	this.listener();
};
msignal.Slot0.prototype.__class__ = msignal.Slot0;
msignal.Slot0.prototype.__properties__ = $extend(msignal.Slot.prototype.__properties__, {});
msignal.Slot1 = $hxClasses['msignal.Slot1'] = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	msignal.Slot.call(this,signal,listener,once,priority);
};
msignal.Slot1.__name__ = ["msignal","Slot1"];
msignal.Slot1.__super__ = msignal.Slot;
for(var k in msignal.Slot.prototype ) msignal.Slot1.prototype[k] = msignal.Slot.prototype[k];
msignal.Slot1.prototype.param = null;
msignal.Slot1.prototype.execute = function(value1) {
	if(!this.enabled) return;
	if(this.once) this.remove();
	if(this.param != null) value1 = this.param;
	this.listener(value1);
};
msignal.Slot1.prototype.__class__ = msignal.Slot1;
msignal.Slot1.prototype.__properties__ = $extend(msignal.Slot.prototype.__properties__, {});
msignal.Slot2 = $hxClasses['msignal.Slot2'] = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	msignal.Slot.call(this,signal,listener,once,priority);
};
msignal.Slot2.__name__ = ["msignal","Slot2"];
msignal.Slot2.__super__ = msignal.Slot;
for(var k in msignal.Slot.prototype ) msignal.Slot2.prototype[k] = msignal.Slot.prototype[k];
msignal.Slot2.prototype.param1 = null;
msignal.Slot2.prototype.param2 = null;
msignal.Slot2.prototype.execute = function(value1,value2) {
	if(!this.enabled) return;
	if(this.once) this.remove();
	if(this.param1 != null) value1 = this.param1;
	if(this.param2 != null) value2 = this.param2;
	this.listener(value1,value2);
};
msignal.Slot2.prototype.__class__ = msignal.Slot2;
msignal.Slot2.prototype.__properties__ = $extend(msignal.Slot.prototype.__properties__, {});
msignal.SlotList = $hxClasses['msignal.SlotList'] = function(head,tail) {
	this.nonEmpty = false;
	if(head == null && tail == null) {
		if(msignal.SlotList.NIL != null) throw new js._Boot.HaxeError("Parameters head and tail are null. Use the NIL element instead.");
		this.nonEmpty = false;
	} else if(head == null) throw new js._Boot.HaxeError("Parameter head cannot be null."); else {
		this.head = head;
		if(tail == null) this.tail = msignal.SlotList.NIL; else this.tail = tail;
		this.nonEmpty = true;
	}
};
msignal.SlotList.__name__ = ["msignal","SlotList"];
msignal.SlotList.NIL = null;
msignal.SlotList.prototype.head = null;
msignal.SlotList.prototype.tail = null;
msignal.SlotList.prototype.nonEmpty = null;
msignal.SlotList.prototype.length = null;
msignal.SlotList.prototype.get_length = function() {
	if(!this.nonEmpty) return 0;
	if(this.tail == msignal.SlotList.NIL) return 1;
	var result = 0;
	var p = this;
	while(p.nonEmpty) {
		++result;
		p = p.tail;
	}
	return result;
};
msignal.SlotList.prototype.prepend = function(slot) {
	return new msignal.SlotList(slot,this);
};
msignal.SlotList.prototype.append = function(slot) {
	if(slot == null) return this;
	if(!this.nonEmpty) return new msignal.SlotList(slot);
	if(this.tail == msignal.SlotList.NIL) return new msignal.SlotList(slot).prepend(this.head);
	var wholeClone = new msignal.SlotList(this.head);
	var subClone = wholeClone;
	var current = this.tail;
	while(current.nonEmpty) {
		subClone = subClone.tail = new msignal.SlotList(current.head);
		current = current.tail;
	}
	subClone.tail = new msignal.SlotList(slot);
	return wholeClone;
};
msignal.SlotList.prototype.insertWithPriority = function(slot) {
	if(!this.nonEmpty) return new msignal.SlotList(slot);
	var priority = slot.priority;
	if(priority >= this.head.priority) return this.prepend(slot);
	var wholeClone = new msignal.SlotList(this.head);
	var subClone = wholeClone;
	var current = this.tail;
	while(current.nonEmpty) {
		if(priority > current.head.priority) {
			subClone.tail = current.prepend(slot);
			return wholeClone;
		}
		subClone = subClone.tail = new msignal.SlotList(current.head);
		current = current.tail;
	}
	subClone.tail = new msignal.SlotList(slot);
	return wholeClone;
};
msignal.SlotList.prototype.filterNot = function(listener) {
	if(!this.nonEmpty || listener == null) return this;
	if(Reflect.compareMethods(this.head.listener,listener)) return this.tail;
	var wholeClone = new msignal.SlotList(this.head);
	var subClone = wholeClone;
	var current = this.tail;
	while(current.nonEmpty) {
		if(Reflect.compareMethods(current.head.listener,listener)) {
			subClone.tail = current.tail;
			return wholeClone;
		}
		subClone = subClone.tail = new msignal.SlotList(current.head);
		current = current.tail;
	}
	return this;
};
msignal.SlotList.prototype.contains = function(listener) {
	if(!this.nonEmpty) return false;
	var p = this;
	while(p.nonEmpty) {
		if(Reflect.compareMethods(p.head.listener,listener)) return true;
		p = p.tail;
	}
	return false;
};
msignal.SlotList.prototype.find = function(listener) {
	if(!this.nonEmpty) return null;
	var p = this;
	while(p.nonEmpty) {
		if(Reflect.compareMethods(p.head.listener,listener)) return p.head;
		p = p.tail;
	}
	return null;
};
msignal.SlotList.prototype.__class__ = msignal.SlotList;
msignal.SlotList.prototype.__properties__ = {get_length:"get_length"};
note.client.Main = $hxClasses['note.client.Main'] = function() { };
note.client.Main.__name__ = ["note","client","Main"];
note.client.Main = App = $hxClasses['note.client.Main'];
note.client.Main.currentView = null;
note.client.Main.htmlMain = function(view,initialData) {
	note.client.Main.currentView = view;
	var context = new note.client.platform.html.ApplicationContext(note.client.Main.currentView,initialData);
};
note.client.Main.setBaseURL = function(url) {
	note.client.platform.html.ApplicationContext.setBaseURL(url);
};
note.client.Main.getView = function(viewId) {
	return dia.js.JSView.getView(viewId);
};
note.client.Main.setToken = function(token) {
};
note.client.Main.main = function() {
};
note.client.Main.prototype.__class__ = note.client.Main;
note.client.Main.prototype.__properties__ = {};
note.client.NoteAppBase = $hxClasses['note.client.NoteAppBase'] = function(contextView) {
	dia.client.Application.call(this,contextView);
	dia.terminal.Terminal.init(this.injector);
	haxe.Log.trace = ($_=dia.terminal.Terminal.getInstance(),$bind($_,$_.debugTrace));
	this.config();
};
note.client.NoteAppBase.__name__ = ["note","client","NoteAppBase"];
note.client.NoteAppBase.__super__ = dia.client.Application;
for(var k in dia.client.Application.prototype ) note.client.NoteAppBase.prototype[k] = dia.client.Application.prototype[k];
note.client.NoteAppBase.prototype.config = function() {
	this.injector.mapSingleton(dia.util.Settings);
	this.addDebugInstructions();
};
note.client.NoteAppBase.prototype.addDebugInstructions = function() {
};
note.client.NoteAppBase.prototype.__class__ = note.client.NoteAppBase;
note.client.NoteAppBase.prototype.__properties__ = $extend(dia.client.Application.prototype.__properties__, {});
note.client.command.note.AddNoteCommand = $hxClasses['note.client.command.note.AddNoteCommand'] = function() {
	dia.client.Command.call(this);
};
note.client.command.note.AddNoteCommand.__name__ = ["note","client","command","note","AddNoteCommand"];
note.client.command.note.AddNoteCommand.__super__ = dia.client.Command;
for(var k in dia.client.Command.prototype ) note.client.command.note.AddNoteCommand.prototype[k] = dia.client.Command.prototype[k];
note.client.command.note.AddNoteCommand.prototype.settings = null;
note.client.command.note.AddNoteCommand.prototype.data = null;
note.client.command.note.AddNoteCommand.prototype.requester = null;
note.client.command.note.AddNoteCommand.prototype.execute = function() {
	var _g = this;
	var complete = function(requester) {
		var notice = dia.client.notice.Notice.AddNoteNotice(new dia.client.notice.AddNoteNoticeData(requester.response.note),new dia.client.NoticeStatus(200));
		_g.app.notify(notice);
	};
	var fail = function(requester1) {
		var notice1 = dia.client.notice.Notice.AddNoteNotice(new dia.client.notice.AddNoteNoticeData(null),new dia.client.NoticeStatus(requester1.status,requester1.error));
		_g.app.notify(notice1);
	};
	this.requester = new note.model.service.note.AddNoteRequester(this.settings.get("server.baseURL").value + this.settings.get("service.api.note.uri").value,complete,fail);
	this.requester.call({ name : this.data.name, body : this.data.body});
};
note.client.command.note.AddNoteCommand.prototype.__class__ = note.client.command.note.AddNoteCommand;
note.client.command.note.AddNoteCommand.prototype.__properties__ = $extend(dia.client.Command.prototype.__properties__, {});
note.client.command.note.DeleteNoteCommand = $hxClasses['note.client.command.note.DeleteNoteCommand'] = function() {
	dia.client.Command.call(this);
};
note.client.command.note.DeleteNoteCommand.__name__ = ["note","client","command","note","DeleteNoteCommand"];
note.client.command.note.DeleteNoteCommand.__super__ = dia.client.Command;
for(var k in dia.client.Command.prototype ) note.client.command.note.DeleteNoteCommand.prototype[k] = dia.client.Command.prototype[k];
note.client.command.note.DeleteNoteCommand.prototype.settings = null;
note.client.command.note.DeleteNoteCommand.prototype.data = null;
note.client.command.note.DeleteNoteCommand.prototype.requester = null;
note.client.command.note.DeleteNoteCommand.prototype.execute = function() {
	var _g = this;
	var complete = function(requester) {
		var notice = dia.client.notice.Notice.DeleteNoteNotice(new dia.client.notice.DeleteNoteNoticeData(requester.response.noteId),new dia.client.NoticeStatus(200));
		_g.app.notify(notice);
	};
	var fail = function(requester1) {
		var notice1 = dia.client.notice.Notice.DeleteNoteNotice(new dia.client.notice.DeleteNoteNoticeData(_g.data.noteId),new dia.client.NoticeStatus(requester1.status,requester1.error));
		_g.app.notify(notice1);
	};
	this.requester = new note.model.service.note.DeleteNoteRequester(this.settings.get("server.baseURL").value + this.settings.get("service.api.note.uri").value,complete,fail);
	this.requester.call({ noteId : this.data.noteId});
};
note.client.command.note.DeleteNoteCommand.prototype.__class__ = note.client.command.note.DeleteNoteCommand;
note.client.command.note.DeleteNoteCommand.prototype.__properties__ = $extend(dia.client.Command.prototype.__properties__, {});
note.client.command.note.UpdateNoteCommand = $hxClasses['note.client.command.note.UpdateNoteCommand'] = function() {
	dia.client.Command.call(this);
};
note.client.command.note.UpdateNoteCommand.__name__ = ["note","client","command","note","UpdateNoteCommand"];
note.client.command.note.UpdateNoteCommand.__super__ = dia.client.Command;
for(var k in dia.client.Command.prototype ) note.client.command.note.UpdateNoteCommand.prototype[k] = dia.client.Command.prototype[k];
note.client.command.note.UpdateNoteCommand.prototype.settings = null;
note.client.command.note.UpdateNoteCommand.prototype.data = null;
note.client.command.note.UpdateNoteCommand.prototype.requester = null;
note.client.command.note.UpdateNoteCommand.prototype.execute = function() {
	var _g = this;
	var complete = function(requester) {
		var notice = dia.client.notice.Notice.UpdateNoteNotice(new dia.client.notice.UpdateNoteNoticeData(requester.response.note),new dia.client.NoticeStatus(200));
		_g.app.notify(notice);
	};
	var fail = function(requester1) {
		var notice1 = dia.client.notice.Notice.UpdateNoteNotice(new dia.client.notice.UpdateNoteNoticeData(_g.data.note),new dia.client.NoticeStatus(requester1.status,requester1.error));
		_g.app.notify(notice1);
	};
	this.requester = new note.model.service.note.UpdateNoteRequester(this.settings.get("server.baseURL").value + this.settings.get("service.api.note.uri").value,complete,fail);
	this.requester.call({ note : this.data.note});
};
note.client.command.note.UpdateNoteCommand.prototype.__class__ = note.client.command.note.UpdateNoteCommand;
note.client.command.note.UpdateNoteCommand.prototype.__properties__ = $extend(dia.client.Command.prototype.__properties__, {});
note.client.platform.html.ApplicationContext = $hxClasses['note.client.platform.html.ApplicationContext'] = function(view,initialData) {
	this.initialData = initialData;
	note.client.NoteAppBase.call(this,view);
	view.startView();
	note.client.platform.html.view.note.NoteView;
};
note.client.platform.html.ApplicationContext.__name__ = ["note","client","platform","html","ApplicationContext"];
note.client.platform.html.ApplicationContext.__super__ = note.client.NoteAppBase;
for(var k in note.client.NoteAppBase.prototype ) note.client.platform.html.ApplicationContext.prototype[k] = note.client.NoteAppBase.prototype[k];
note.client.platform.html.ApplicationContext.baseURL = null;
note.client.platform.html.ApplicationContext.setBaseURL = function(url) {
	note.client.platform.html.ApplicationContext.baseURL = url;
	dia.js.JSView.BASE_URL = url;
};
note.client.platform.html.ApplicationContext.prototype.initialData = null;
note.client.platform.html.ApplicationContext.prototype.config = function() {
	dia.terminal.Terminal.init(this.injector);
	note.client.NoteAppBase.prototype.config.call(this);
	this.injector.mapSingleton(dia.net.ClientSession);
	try {
		var settings = this.injector.getInstance(dia.util.Settings);
		var settingsLoader = new note.client.platform.html.SettingsLoader();
		settingsLoader.load(settings);
		settings.add("server.baseURL",note.client.platform.html.ApplicationContext.baseURL);
		var urlMonitor = new dia.net.UrlMonitor("");
		this.injector.mapValue(dia.net.UrlMonitor,urlMonitor);
	} catch( error ) {
		haxe.CallStack.lastException = error;
		if (error instanceof js._Boot.HaxeError) error = error.val;
		if( js.Boot.__instanceof(error,String) ) {
			haxe.Log.trace(error,{ fileName : "ApplicationContext.hx", lineNumber : 59, className : "note.client.platform.html.ApplicationContext", methodName : "config"});
		} else throw(error);
	}
};
note.client.platform.html.ApplicationContext.prototype.__class__ = note.client.platform.html.ApplicationContext;
note.client.platform.html.ApplicationContext.prototype.__properties__ = $extend(note.client.NoteAppBase.prototype.__properties__, {});
note.client.platform.html.SettingsLoader = $hxClasses['note.client.platform.html.SettingsLoader'] = function() {
};
note.client.platform.html.SettingsLoader.__name__ = ["note","client","platform","html","SettingsLoader"];
note.client.platform.html.SettingsLoader.prototype.load = function(settings) {
	settings.readXMLSettings("<service>\n\t<api>\n\t\t<note>\n\t\t\t<uri>api/note</uri>\n\t\t</note>\n\t</api>\n</service>");
};
note.client.platform.html.SettingsLoader.prototype.__class__ = note.client.platform.html.SettingsLoader;
note.client.platform.html.SettingsLoader.prototype.__properties__ = {};
note.model.domain.Note = $hxClasses['note.model.domain.Note'] = function() {
	dia.model.domain.ContextDomainObject.call(this);
};
note.model.domain.Note.__name__ = ["note","model","domain","Note"];
note.model.domain.Note.__super__ = dia.model.domain.ContextDomainObject;
for(var k in dia.model.domain.ContextDomainObject.prototype ) note.model.domain.Note.prototype[k] = dia.model.domain.ContextDomainObject.prototype[k];
note.model.domain.Note.prototype.name = null;
note.model.domain.Note.prototype.body = null;
note.model.domain.Note.prototype.__class__ = note.model.domain.Note;
note.model.domain.Note.prototype.__properties__ = $extend(dia.model.domain.ContextDomainObject.prototype.__properties__, {});
note.model.service.note.AddNoteRequester = $hxClasses['note.model.service.note.AddNoteRequester'] = function(url,completeHandler,failHandler) {
	if(url == null) url = "";
	dia.model.service.HttpServiceRequester.call(this,url,completeHandler,failHandler,"POST");
};
note.model.service.note.AddNoteRequester.__name__ = ["note","model","service","note","AddNoteRequester"];
note.model.service.note.AddNoteRequester.__super__ = dia.model.service.HttpServiceRequester;
for(var k in dia.model.service.HttpServiceRequester.prototype ) note.model.service.note.AddNoteRequester.prototype[k] = dia.model.service.HttpServiceRequester.prototype[k];
note.model.service.note.AddNoteRequester.prototype.__class__ = note.model.service.note.AddNoteRequester;
note.model.service.note.AddNoteRequester.prototype.__properties__ = $extend(dia.model.service.HttpServiceRequester.prototype.__properties__, {});
note.model.service.note.DeleteNoteRequester = $hxClasses['note.model.service.note.DeleteNoteRequester'] = function(url,completeHandler,failHandler) {
	if(url == null) url = "";
	dia.model.service.HttpServiceRequester.call(this,url,completeHandler,failHandler,"DELETE");
};
note.model.service.note.DeleteNoteRequester.__name__ = ["note","model","service","note","DeleteNoteRequester"];
note.model.service.note.DeleteNoteRequester.__super__ = dia.model.service.HttpServiceRequester;
for(var k in dia.model.service.HttpServiceRequester.prototype ) note.model.service.note.DeleteNoteRequester.prototype[k] = dia.model.service.HttpServiceRequester.prototype[k];
note.model.service.note.DeleteNoteRequester.prototype.__class__ = note.model.service.note.DeleteNoteRequester;
note.model.service.note.DeleteNoteRequester.prototype.__properties__ = $extend(dia.model.service.HttpServiceRequester.prototype.__properties__, {});
note.model.service.note.UpdateNoteRequester = $hxClasses['note.model.service.note.UpdateNoteRequester'] = function(url,completeHandler,failHandler) {
	if(url == null) url = "";
	dia.model.service.HttpServiceRequester.call(this,url,completeHandler,failHandler,"PUT");
};
note.model.service.note.UpdateNoteRequester.__name__ = ["note","model","service","note","UpdateNoteRequester"];
note.model.service.note.UpdateNoteRequester.__super__ = dia.model.service.HttpServiceRequester;
for(var k in dia.model.service.HttpServiceRequester.prototype ) note.model.service.note.UpdateNoteRequester.prototype[k] = dia.model.service.HttpServiceRequester.prototype[k];
note.model.service.note.UpdateNoteRequester.prototype.__class__ = note.model.service.note.UpdateNoteRequester;
note.model.service.note.UpdateNoteRequester.prototype.__properties__ = $extend(dia.model.service.HttpServiceRequester.prototype.__properties__, {});
{
	if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
		return Array.prototype.indexOf.call(a,o,i);
	};
};
$hxClasses.Math = Math;
{
	String.prototype.__class__ = $hxClasses.String = String;
	String.__name__ = ["String"];
	$hxClasses.Array = Array;
	Array.__name__ = ["Array"];
	Date.prototype.__class__ = $hxClasses.Date = Date;
	Date.__name__ = ["Date"];
	var Int = $hxClasses.Int = { __name__ : ["Int"]};
	var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
	var Float = $hxClasses.Float = Number;
	Float.__name__ = ["Float"];
	var Bool = Boolean;
	Bool.__ename__ = ["Bool"];
	var Class = $hxClasses.Class = { __name__ : ["Class"]};
	var Enum = { };
};
var __map_reserved = {};
{
	var ArrayBuffer = (Function("return typeof ArrayBuffer != 'undefined' ? ArrayBuffer : null"))() || js.html.compat.ArrayBuffer;
	if(ArrayBuffer.prototype.slice == null) ArrayBuffer.prototype.slice = js.html.compat.ArrayBuffer.sliceImpl;
};
var DataView = (Function("return typeof DataView != 'undefined' ? DataView : null"))() || js.html.compat.DataView;
var Uint8Array = (Function("return typeof Uint8Array != 'undefined' ? Uint8Array : null"))() || js.html.compat.Uint8Array._new;
msignal.SlotList.NIL = new msignal.SlotList(null,null);
note.client.Main.main();
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; };
var $_, $fid = 0;;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; };
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {;
return Array.prototype.indexOf.call(a,o,i);;
};