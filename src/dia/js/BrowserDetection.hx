package dia.js;


enum BrowserType
{
    Chrome;
    Safari;
    WebKitOther;
    FireFox;
    Opera;
    IE;
    Unknown;
}


class BrowserDetection
{
	static var browserType:BrowserType;
	static var _version:String;
	public static var type(get, null):BrowserType;
	public static var version(get, null):String;

	static function get_type():BrowserType
	{
		detectIfNeeded();
		return browserType;
	}

	static function get_version():String
	{
		detectIfNeeded();
		return _version;
	}

	static function getAgent():String
	{
		#if js
		return js.Browser.window.navigator.userAgent;
		#else
		return "";
		#end
	}

	static function detectIfNeeded():Void
	{
		if(browserType != null)
			return;

		detectBrowser(getAgent());
	}

	public static function isAdobeAir():Bool
	{
		return (~/AdobeAIR/).match( getAgent());
	}

	public static function detectBrowser(agent:String):Void
	{
		if( (~/WebKit/).match( agent ) )
		{
			if((~/Chrome/).match( agent ) )
			{
                browserType = Chrome;
                _version = agent.substr(agent.indexOf("Chrome/")+7);
       			_version = version.substring(0, version.indexOf(" "));
            }
			else if( (~/Safari/).match( agent ) )
			{
                browserType = Safari;
                _version = agent.substr(agent.indexOf("Version/")+8);
       			_version = version.substring(0, version.indexOf(" "));
            }
			else
			{
                browserType = Opera;
                _version = agent.substr(agent.indexOf("Opera")+6);
            }
		}
        else if( (~/Opera/).match( agent ) )
        {
            browserType = Opera;
            if(agent.charAt(0) == "O")
            {
            	_version = agent.substr(agent.indexOf("Version/")+8);
            }
            else
            {
            	_version = agent.substr(agent.indexOf("Opera")+6);
            }
        }
        else if( (~/MSIE/).match( agent ))
        {
        	browserType = IE;
        	_version = agent.substr(agent.indexOf("MSIE")+5);
       		_version = version.substring(0, version.indexOf(";"));
        }
        else if( (~/Trident/).match( agent ))
        {
        	browserType = IE;
        }
        
        else if( (~/Mozilla/).match( agent ) )
		{
			browserType = FireFox;
		}
		else
		{
			browserType = Unknown;
		}
	}

}