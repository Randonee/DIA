package dia.js;

#if macro
import dia.util.FileUtil;
import haxe.macro.Expr;
import haxe.macro.Context;
import sys.FileSystem;
import sys.io.File;
import sys.io.FileOutput;
import Xml;

#end

using StringTools;


class HtmlTemplate
{
	macro static public function create(): Array<Field> 
	{
		var fields = haxe.macro.Context.getBuildFields();
		for(field in fields)
		{
			if(field.name == "TEMPLATE")
			{
				switch(field.kind)
				{
					case FVar(tPath, expr):
						switch(expr.expr)
						{
							case EConst(t):
								switch(t)
								{
									case CString(str):
										var temp = includeTemplate(str, expr.pos, fields);

										field.kind = FVar(tPath, {expr:EConst(CString(temp)), pos:expr.pos});
										return fields;
									case _:
										null;
								}

							case _:
								null;
						}

					case _:
						null;

				}
			}
		}

		return fields;
	}
#if macro
	private static function includeTemplate(fileName:String, pos:Dynamic, fields:Array<Field>):String
	{
		var fileStr = fileName;
        if( fileStr == null )
            Context.error("Constant string expected",pos);
		
		var path:String = "";
		if(fileName.indexOf("/") < 0)
		{
			path = Std.string(pos);
			path = path.substring(5, path.lastIndexOf("/") + 1);

		}

		if(!FileSystem.exists(path + fileStr))
			Context.error("File Does not exist: " + path + fileStr, pos);

		var content = File.getContent(path + fileStr);

		var nameSpaces:Map<String, String> = new Map();
		var xml:Xml = null;
		try
		{
			xml = Xml.parse(content).firstElement();
		}
		catch(error:Dynamic)
			Context.error("XML is not correct: " + path + fileStr, pos);

		if(xml.attributes == null)
			trace("No attributes in: " + xml);

		for(att in xml.attributes())
		{
			if(att.indexOf("xmlns") == 0)
			{
				var parts = att.split(":");
				nameSpaces.set(parts[1], xml.get(att));
				xml.remove(att);
			}
		}

		parseTemplate(xml, nameSpaces, fields, path + fileStr, pos);

        return xml.toString();
	}

	static private function parseTemplate(xml:Xml, nameSpaces:Map<String, String>, fields:Array<Field>, filePath:String, pos:Position):Void
	{
		var index = 0;
		for(node in xml)
		{
			if(node.nodeType == Xml.Element)
			{
				if(node.firstChild() != null)
					parseTemplate(node, nameSpaces, fields, filePath, pos);
				else
				{
					if(node.nodeName.indexOf(":") > 0)
					{
						var parts = node.nodeName.split(":");
						var naPackage:String = nameSpaces.get(parts[0]);

						if(naPackage == null)
							Context.error("Namespace does not exist: " + parts[0] + ", Template: " + filePath, pos);

						var params = "{";
						for(att in node.attributes())
						{
							if(att == "name")
							{
								if(node.get(att) == "")
									Context.error("Name attribute can not be blank. Setting name for " + parts[1] + " in " + filePath, pos);

								var pack = naPackage.split(".");
								var tint = TPath({ pack : pack, name : parts[1], params : [], sub : null });
								fields.push({ name : node.get("name"), doc : null, meta : [], access : [APublic], kind : FVar(tint,null), pos : pos });
							}
							else
							{
								if(params.length > 1)
									params += "; ";

								var val = node.get(att);
								if(val.charAt(0) == "$")
								{
									var findField = function(fields:Array<Field>, name:String):Field
									{
										for(field in fields)
										{
											if(field.name == name)
												return field;
										}
										return null;
									}

									val = val.substr(1);
									var varParts = val.split(".");

									if(findField(fields, varParts[0]) == null)
										Context.error('Property not found "' + val + " not found in " + parts[0] +" Template: " + filePath, pos);

									params += '"$' + att + '":"' + 	val + '"';

								}
								else
									params += '"' + att + '":"' + 	val + '"';

							}
						}

						params += "}";
						xml.removeChild(node);
						xml.insertChild(Xml.parse("$$add(" + naPackage + "." + parts[1] + ", " + params + ", " + node.get("name") + ")"), index);
					}
				}
			}
			++index;
		}
	}
#end
}
