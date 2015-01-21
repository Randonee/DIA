package dia.server.db.migrate;
import haxe.macro.Expr;
import haxe.macro.Context;
import sys.FileSystem;

using StringTools;


class MigratorMacros
{
	macro public static function importMigration(dir:String, dirPackage:String) : Expr
	{
		var files:Array<String> = [];
		if(FileSystem.exists("../" + dir))
			files = FileSystem.readDirectory("../" + dir);
		else
			files = FileSystem.readDirectory(dir);
			
		var imports:Array<Expr> = [];
		for(file in files)
		{
			if(file.indexOf(".hx") > 0)
			{
				imports.push( Context.parse(dirPackage + "."+ file.substring(0,file.indexOf(".hx")) , Context.currentPos()));
			}
		}

		return {expr:EBlock(imports), pos:Context.currentPos()}; 
    } 
}