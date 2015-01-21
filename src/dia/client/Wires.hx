package dia.client;

import haxe.macro.Context;
import haxe.macro.Expr;
import haxe.macro.Type;
import haxe.ds.StringMap;

class Wires
{
	static var haps:Array<Dynamic> = [];
	static var notices:Array<Dynamic> = [];
	static var viewEvents:Array<Dynamic> = [];

	macro public static function addHap(name:String, fields:Array<Array<String>>, commandPackage:String)
	{
		haps.push({name:name, fields:fields, commandPackage:commandPackage});
		return macro {};
	}

	macro public static function addNotice(name:String, fields:Array<Array<String>>)
	{
		notices.push({name:name, fields:fields});
		return macro {};
	}

	macro public static function add(name:String, hapFields:Array<Array<String>>, noticeFields:Array<Array<String>>, commandPackage:String)
	{
		haps.push({name:name, fields:hapFields, commandPackage:commandPackage});
		notices.push({name:name, fields:noticeFields});

		return macro {};
	}

	macro public static function addViewEvent(name:String, fields:Array<Array<String>>)
	{
		viewEvents.push({name:name, fields:fields});
		return macro {};
	}

	public static function create():haxe.macro.Expr
	{
		createTypes("Hap", haps, Context.currentPos(), Context.defineType);
		createTypes("Notice", notices, Context.currentPos(), Context.defineType);

		createViewEvent(Context.currentPos(), Context.defineType);
			

		//create application class
		var appClass = macro class Application extends dia.client.ApplicationBase
		{
			public function new(view:Dynamic)
			{
				super(view);
				init();
			}
			private function init():Void{
				
			}
		}

		var initFunc = switch(appClass.fields[1].kind)
		{
			case FFun(fun):
				fun;
			case _:
				null;
		}
		var block = switch(initFunc.expr.expr)
		{
			case EBlock(block):
				block;
			case _:
				null;
		}

		initFunc.expr.expr;

		//mapp haps to commands
		for(hapData in haps)
		{
			var call = {expr:EField({expr:EConst(CIdent("commandMap")), pos:Context.currentPos()}, "add"), pos:Context.currentPos()};
			
			var pack:Array<String> = hapData.commandPackage.split(".");
			var expr:Expr;
			var count:Int = 0;

			//get to the correct package
			for(dir in pack)
			{
				if(count == 0)
					expr = {expr:EConst(CIdent(dir)), pos:Context.currentPos()};
				else
					expr = {expr:EField(expr,dir), pos:Context.currentPos()};
				++count;
			}
			expr = {expr:EField(expr, hapData.name + "Command"), pos:Context.currentPos()};

			var argExpr = {expr:EConst(CIdent("dia")), pos:Context.currentPos()};
			argExpr = {expr:EField(argExpr,"client"), pos:Context.currentPos()};
			argExpr = {expr:EField(argExpr,"hap"), pos:Context.currentPos()};
			argExpr = {expr:EField(argExpr,hapData.name + "HapData"), pos:Context.currentPos()};
			var args = [argExpr, expr];
			var ecall = ECall( call, args);

			block.push({expr:ecall, pos:Context.currentPos()});

		}
		appClass.pack = ["dia", "client"];
		Context.defineType(appClass);

        return macro { };
    }

    private static function createViewEvent(pos:Dynamic, defineTypeFunc:Dynamic):Void
    {
    	var newEnum:TypeDefinition = {pos:pos,
						 params:[],
						 pack:["dia", "client", "event"],
						 name:"ViewEvent",
						 meta:[],
						 kind:TDEnum,
						 isExtern:false,
						 fields:[]};

		

		for(constroctorData in viewEvents)
		{
			var enumArg = {ret : null, args : [], params : [], expr : null };

			var props:Array<Array<String>> = constroctorData.fields;
			for(propDef in props)
			{
				if(propDef.length != 2)
					Context.error("Incorrect prop deff. Correct example: [\"fieldName\", \"fieldType\"]. Found in " + constroctorData.name, pos);

				var propName = propDef[0];
				var packstr = propDef[1];
				var classPack:Array<String> = packstr.split(".");
				var typeName = classPack.pop();

				var tpath:ComplexType = TPath({ pack : classPack, name : typeName, params : [], sub : null });
				enumArg.args.push({ name : propName, type : tpath, opt : false, value : null  });
				
			}
			var enumField = {pos : pos, name: constroctorData.name + "Event", meta : [], kind : FFun(enumArg), doc : null, access : []};
			newEnum.fields.push(enumField);
			
		}
		defineTypeFunc(newEnum);
    }

    private static function createTypes(name:String, fieldsData:Dynamic, pos:Dynamic, defineTypeFunc:Dynamic)
    {
    	var newEnum:TypeDefinition = {pos:pos,
						 params:[],
						 pack:["dia", "client", name.toLowerCase()],
						 name:name,
						 meta:[],
						 kind:TDEnum,
						 isExtern:false,
						 fields:[]};

		var fields:Array<Dynamic> = fieldsData;
		for(enumData in fields)
		{
			var classType = macro class TheTempClassWithALongNameSoItWontBeDuplicated
	    	{
	    		public function new(){}
	    	}

	    	var constructor = switch(classType.fields[0].kind)
			{
				case FFun(fun):
					fun;
				case _:
					null;
			}

			var constroctorBlock:Array<Expr> = switch(constructor.expr.expr)
			{
				case EBlock(arr):
					arr;
				case _:
					null;
			}

	    	classType.name = enumData.name + name + "Data";
	    	classType.pack = ["dia", "client", name.toLowerCase()];

	    	var enumArg = {ret : null, args : [], params : [], expr : null };
	    	var tpath:ComplexType = TPath({ pack : [], name : classType.name, params : [], sub : null });
			enumArg.args.push({ name : "data", type : tpath, opt : false, value : null  });
			

			if(name == "Notice")
			{
				var tpath:ComplexType = TPath({ pack : [], name : "NoticeStatus", params : [], sub : null });
				enumArg.args.push({ name : "status", type : tpath, opt : false, value : null  });
			}

			var enumField = {pos : pos, name: enumData.name + name, meta : [], kind : FFun(enumArg), doc : null, access : []};
			newEnum.fields.push(enumField);

			var fieldArr:Array<Array<String>> = enumData.fields;
			for(propDef in fieldArr)
			{
				if(propDef.length != 2)
					Context.error("Incorrect prop deff. Correct example: [\"fieldName\", \"fieldType\"]. Found in " + enumData.name, pos);

				var propName = propDef[0];
				var packstr = propDef[1];
				var classPack:Array<String> = packstr.split(".");
				var typeName = classPack.pop();
				var constroctorPath:ComplexType = TPath({ pack : classPack, name : typeName, params : [], sub : null });

				constructor.args.push({ name : propName, type : constroctorPath, opt : false, value : null});
				var prop:FieldType = FProp("default", "null", TPath({ name:typeName, pack:classPack, params:[] }), null);
				var propField = {kind:prop, name:propName, pos:pos, access:[APublic]};
				classType.fields.push(propField);

				var left = {expr:EField( {expr:EConst(CIdent("this")), pos:pos}, propName), pos:pos};
				var right = {expr:EConst(CIdent(propName)), pos:pos};
				constroctorBlock.push({expr:EBinop(OpAssign, left, right), pos:pos});	
			}
			defineTypeFunc(classType);
		}
		defineTypeFunc(newEnum);
    }
}