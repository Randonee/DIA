/*COMPILER
-D server
-cp ../src
-cp src
COMPILER*/

import easybuild.util.*;
import neko.Lib;
import sys.FileSystem;
import sys.io.File;
import sys.io.Process;
import dia.util.Settings;
import dia.util.Zip;
import haxe.Http;

using StringTools;


class Build
{

	static inline var buildPath = "build/";
	static inline var serverPath = buildPath + "server/";
	static inline var WWW = serverPath + "www/";

	static inline var settingsPrivatePath = serverPath + "settings/";
	static inline var settingsPublicPath = WWW + "settings/";
	

	public function new(){}; 

	public function build():Void
	{
		server();
	}

	public function clean():Void
	{
		FileUtil.deleteDirectoryRecursive(serverPath);
	}


	public function server():Void
	{
		trace("-- Building Server -- ");
		clean();
		FileUtil.deleteDirectoryRecursive( WWW + "lib");
		FileUtil.createDirectory(WWW + "script");
		FileUtil.createDirectory(WWW + "style");
		FileUtil.createDirectory(WWW + "bin");
		
		ProcessUtil.runCommand(Sys.getCwd(), "haxe", ["build.hxml"], true);
		
		FileUtil.copyInto("settings/server", settingsPrivatePath, null, false);
		FileUtil.copyInto("settings/shared", settingsPublicPath, null, false);
		FileUtil.copyInto("assets/html/script/", WWW + "script/", null, false, [~/.*\.js/, ~/.*\.map/]);
		FileUtil.copyInto("assets/html/style/", WWW + "style/", null, false, [~/.*\.css/]);
		FileUtil.copyInto("assets/html", WWW + "assets/", null, false, [~/.*\.swf/]);
		FileUtil.copyInto("src", WWW + "res/", null, false, [~/.*\.mtt/, ~/.*\.css/]);
		
		FileUtil.copyInto("assets/server/", serverPath, null, false);

		FileUtil.copyFile("assets/server/htaccess", WWW + ".htaccess");
	}

	

}