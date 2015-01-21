package note.client.platform.html;

import dia.util.Settings;

import haxe.macro.Expr;
import haxe.macro.Context;

class SettingsLoader
{
	macro static function getFileContent( fileName : Expr )
	{
        var fileStr = null;
        switch( fileName.expr )
        {
        	case EConst(c):
            switch( c )
	            {
		            case CString(s): fileStr = s;
		            default:
	            }
        	default:
        };
        if( fileStr == null )
            Context.error("Constant string expected",fileName.pos);
        if(sys.FileSystem.exists(fileStr))
        	return Context.makeExpr(sys.io.File.getContent(fileStr),fileName.pos);
        	
        return Context.makeExpr("", fileName.pos);
    }
	

	public function new()
	{
	
	}
	
	public function load(settings:Settings):Void
	{
		settings.readXMLSettings(getFileContent("settings/shared/server/service.xml"));
	}
}