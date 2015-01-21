package note.server;

#if php
import php.Web;
import php.Lib;
#elseif neko
import neko.Web;
#else
#error "Unsupported platform"
#end


class Main
{
    public static function main() : Void
    {
        new NoteServer().dispatchURL(Web.getURI());
    }
}
