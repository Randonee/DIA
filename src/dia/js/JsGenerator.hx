
package dia.js;

#if macro

import haxe.macro.Type;
import haxe.macro.Expr;
import haxe.macro.*;
using Lambda;

class JsGenerator
{
	var api : JSGenApi;
	var inits : List<TypedExpr>;

	var packages : haxe.ds.StringMap<Bool>;
	var forbidden : haxe.ds.StringMap<Bool>;

	var curBuf : StringBuf;
	var mainBuf : StringBuf;
	var external : Bool;
	var setupBuf:StringBuf;

	var statics:Map<String, String>;

	public function new(api)
	{
		this.api = api;
		mainBuf = new StringBuf();
		setupBuf = new StringBuf();

		statics = new Map();
		statics.set("statics", "");
		curBuf = mainBuf;
		inits = new List();
		packages = new haxe.ds.StringMap();
		forbidden = new haxe.ds.StringMap();
		external = false;
		for( x in ["prototype", "__proto__", "constructor"] )
			forbidden.set(x, true);
		api.setTypeAccessor(getType);
	}

	function getType( t : Type ) 
	{
		return switch(t)
		{
			case TInst(c, _): getPath(c.get());
			case TEnum(e, _): getPath(e.get());
			case TAbstract(c, _): c.get().name;
			default: throw "assert: " + t;
		};
	}

	inline function print(str){
		curBuf.add(str);
	}

	inline function newline() {
		curBuf.add(";\n");
	}

	inline function genExpr(e, buf:StringBuf) {
		buf.add(api.generateValue(e));
	}

	function field(p) {
		return api.isKeyword(p) ? '["' + p + '"]' : "." + p;
	}

	function genPackage( p : Array<String> )
	{
		var full = "";
		for( x in p )
		{
			var prev = full;
			if( full == "" ) full = x else full += "." + x;
			if( packages.exists(full) )
				continue;
			
			packages.set(full, true);
			if( prev == "" )
				setupBuf.add('if(typeof $x==\'undefined\') $x = {}');
			else
			{
				var p = prev + field(x);
				setupBuf.add('if(!$p) $p = {}');
			}
			setupBuf.add(";\n");
		}
		return full;
	}

	function getPath( t : BaseType ) {
		return (t.pack.length == 0) ? t.name : t.pack.join(".") + "." + t.name;
	}

	function checkFieldName( c : ClassType, f : ClassField )
	{
		if( forbidden.exists(f.name) )
			Context.error("The field " + f.name + " is not allowed in JS", c.pos);
	}

	function genClassField( c : ClassType, p : String, f : ClassField )
	{
		checkFieldName(c, f);
		var field = field(f.name);
		print('$p.prototype$field = ');
		var e = f.expr();
		if( e == null )
			print("null");
		else
		{
			genExpr(e, curBuf);
		}
		newline();
	}

	function genStaticField( c : ClassType, p : String, f : ClassField, packageStr:String)
	{
		checkFieldName(c, f);
		var field = field(f.name);


		var e = f.expr();
		if( e == null )
		{
			print('$p$field = null');
			newline();
		}
		else switch( f.kind )
		{
			case FMethod(_):
				print('$p$field = ');
				genExpr(e, curBuf);
				newline();
			default:
				if(external)
				{
					var data = statics.get(packageStr + "_statics");
					if(data == null) data = "";

					statics.set( packageStr + "_statics", data + p + field + ' = ' +  api.generateValue(f.expr()) + ";\n");
				}
				else
				{
					statics.set("statics", statics.get("statics") + p + field + ' = ' +  api.generateValue(f.expr()) + ";\n");
				}
		}
	}

	function findMeta(metas:Array<haxe.macro.MetadataEntry>, name:String):haxe.macro.MetadataEntry
	{
		for(meta in metas)
		{
			if(meta.name == name)
				return meta;
		}

		return null;
	}

	function genClass( c : ClassType )
	{
		external = false;
		if(c.meta.has(":external"))
		{
			external = true;
			curBuf = new StringBuf();
		}

		var pack = genPackage(c.pack);
		api.setCurrentClass(c);
		var p = getPath(c);
		print('$p = $$hxClasses[\'$p\'] = ');
		if( c.constructor != null )
			genExpr(c.constructor.get().expr(), curBuf);
		else
			print("function() { }");
		newline();
		var name = p.split(".").map(api.quoteString).join(",");
		print('$p.__name__ = [$name]');
		newline();


		if(c.meta.has(":expose"))
		{
			var meta = findMeta(c.meta.get(), ":expose");
			if(meta.params.length > 0)
			{
				switch(meta.params[0].expr)
				{
					case EConst(cst):
						switch(cst)
						{
							case CString(s):
								print('$p = $s = $$hxClasses[\'$p\']');
								newline();
							case _:
						}
					case _:
				}
			}
		}

		if( c.superClass != null )
		{
			var psup = getPath(c.superClass.t.get());
			print('$p.__super__ = $psup');
			newline();
			print('for(var k in $psup.prototype ) $p.prototype[k] = $psup.prototype[k]');
			newline();
		}
		for( f in c.statics.get() )
		{
			genStaticField(c, p, f, pack + "." + c.name);
		}
		var properties:Array<String> = [];
		for( f in c.fields.get() )
		{
			if(f.name.indexOf("get_") == 0 || f.name.indexOf("set_") == 0)
			{
				properties.push(f.name);
			}
			switch( f.kind )
			{
				case FVar(r, _):
					if( r == AccResolve ) continue;
				default:
			}
			genClassField(c, p, f);
		}


		var propString = '{';
		var first = true;
		for(prop in properties)
		{
			if(!first)
				propString += ", ";
			propString += prop + ':"' + prop + '"';

			first = false;
		}
		propString += "}";

		print('$p.prototype.__class__ = $p');
		newline();
		if( c.superClass != null )
		{
			var psup = getPath(c.superClass.t.get());
			propString = '$p.prototype.__properties__ = ' + "$extend(" + '$psup.prototype.__properties__, ' + propString + ")";
		}
		else
			propString = '$p.prototype.__properties__ = ' + propString;

		print(propString);
		newline();
		
		if( c.interfaces.length > 0 )
		{
			var me = this;
			var inter = c.interfaces.map(function(i) return me.getPath(i.t.get())).join(",");
			print('$p.__interfaces__ = [$inter]');
			newline();
		}

		if(external)
		{
			external = false;
			var packagePath = pack.split(".").join("/");
			var filePath = api.outputFile.substring(0, api.outputFile.lastIndexOf("/"));
			sys.FileSystem.createDirectory(filePath + "/" + packagePath);
			filePath += "/" + packagePath + "/" + c.name + ".js";
			sys.io.File.saveContent(filePath, curBuf.toString());
			curBuf = mainBuf;
		}
	}

	function genEnum( e : EnumType )
	{
		genPackage(e.pack);
		var p = getPath(e);
		var names = p.split(".").map(api.quoteString).join(",");
		var constructs = e.names.map(api.quoteString).join(",");
		print('$p = $$hxClasses[\'$p\'] = { __ename__ : [$names], __constructs__ : [$constructs] }');
		newline();
		for( c in e.constructs.keys() )
		{
			var c = e.constructs.get(c);
			var f = field(c.name);
			print('$p$f = ');
			switch( c.type )
			{
				case TFun(args, _):
					var sargs = args.map(function(a) return a.name).join(",");
					print('function($sargs) { var $$x = ["${c.name}",${c.index},$sargs]; $$x.__enum__ = $p; $$x.toString = $$estr; return $$x; }');
				default:
					print("[" + api.quoteString(c.name) + "," + c.index + "]");
					newline();
					print('$p$f.toString = $$estr');
					newline();
					print('$p$f.__enum__ = $p');
			}
			newline();
		}
		var meta = api.buildMetaData(e);
		if( meta != null )
		{
			print('$p.__meta__ = ');
			genExpr(meta, curBuf);
			newline();
		}
	}

	function genType( t : Type )
	{
		switch( t )
		{
			case TInst(c, _):
				var c = c.get();
				if( c.init != null )
					inits.add(c.init);
				if( !c.isExtern ) genClass(c);
			case TEnum(r, _):
				var e = r.get();
				if( !e.isExtern ) genEnum(e);
			default:
		}
	}

	public function generate()
	{
		setupBuf.add("var $hxClasses = $hxClasses || {}, $estr = function() { return js.Boot.__string_rec(this,''); }");
		setupBuf.add(";\n");

		setupBuf.add("function $extend(from, fields) {\n");
		setupBuf.add("function Inherit() {} Inherit.prototype = from; var proto = new Inherit();\n");
		setupBuf.add("for (var name in fields) proto[name] = fields[name];\n");
		setupBuf.add("if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;\n");
		setupBuf.add("return proto;\n");
		setupBuf.add("}\n");
		setupBuf.add("\n");
		
		for( t in api.types )
			genType(t);
		for( e in inits )
		{
			print(api.generateStatement(e));
			newline();
		}
		for( s in statics )
		{
			var keys = statics.keys();
			for(key in keys)
			{
				var packagePath = key.split(".").join("/");
				var filePath = api.outputFile.substring(0, api.outputFile.lastIndexOf("/"));
				sys.FileSystem.createDirectory(filePath + "/" + packagePath.substring(0, packagePath.lastIndexOf("/")) );
				filePath += "/" + packagePath + ".js";
				sys.io.File.saveContent(filePath, statics.get(key));
			}
		}
		if( api.main != null )
		{
			genExpr(api.main, curBuf);
			newline();
		}
		print("function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }");
		print(";\n");
		print("var $_, $fid = 0;");
		print(";\n");
		print("function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }");
		print(";\n");
		print("if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {");
		print(";\n");
		print("return Array.prototype.indexOf.call(a,o,i);");
		print(";\n");
		print("};");
		sys.io.File.saveContent(api.outputFile, mainBuf.toString());

		var filePath = api.outputFile.substring(0, api.outputFile.lastIndexOf("/"));
		filePath += "/setup.js";
		sys.io.File.saveContent(filePath, setupBuf.toString());		
	}

	#if macro
	public static function use()
	{
		Compiler.setCustomJSGenerator(function(api) new JsGenerator(api).generate());
	}
	#end

}
#end
