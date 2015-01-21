package dia.net;


class SimpleMail
{
   static public function mail(to:String, from:String, subject:String ,  message:String):Void
    {
    	#if php
    		var headers:String = 'From: ' + from;
			untyped __call__('mail', to, subject, message, headers);
    	#end
    }

    static public function mailHtml(to:String, from:String, subject:String, htmlMessage:String, textMessage:String):Void
    {
    	#if php
    		var uid = dia.util.Random.makeString(27);
    		var headers:String = 'From: ' + from + "\r\n";
    		headers += "MIME-Version: 1.0\r\n";
    		headers += 'Content-Type: multipart/alternative; charset="iso-8859-1"; boundary=' + uid + "\r\n\r\n";

    		var content = "--" + uid + "\r\n";
    		content += 'Content-Type: text/plain; charset="iso-8859-1"' + "\r\n"; 
    		content += "Content-Transfer-Encoding: quoted-printable\r\n\r\n";
    		content += textMessage + "\r\n";

    		content += "--" + uid + "\r\n";
    		content += 'Content-Type: text/html; charset="iso-8859-1"' + "\r\n"; 
    		content += "Content-Transfer-Encoding: quoted-printable\r\n\r\n";
    		content += htmlMessage;
            
			untyped __call__('mail', to, subject, content, headers);
    	#end
    }

}