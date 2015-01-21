package dia.net;

class Smtp
{
    static public function sendHtmlSSL(to:String, from:String, subject:String,  htmlMessage:String, textMessage:String, host:String, port:Int, username:String, password:String):Void
    {
        #if php
        try{
            untyped __php__('require_once "Mail.php";');
            untyped __php__('require_once "Mail/mime.php";');
            
            untyped __php__("$message = new Mail_mime()");
            untyped __php__("$message->setHTMLBody($htmlMessage);");
            untyped __php__("$message->setTXTBody($textMessage);");
            untyped __php__("$body = $message->get();");
            untyped __php__("$extraheaders = array ('From' => $from, 'Reply-To' => $from, 'To' => $to, 'Subject' => $subject);");

            untyped __php__("$headers = $message->headers($extraheaders);");
            untyped __php__("$smtp = Mail::factory('smtp', array ('timeout' => 20, 'host' => $host, 'port' => $port, 'auth' => true, 'username' => $username, 'password' => $password));");

            
            untyped __php__("$mail = $smtp->send($to, $headers, $body);");
            var isError = untyped __php__("PEAR::isError($mail)");
            if(isError)
            {
                var err = untyped __php__("$mail->getMessage()");
                trace(err);
                throw(err);
            }
        }
        catch(e:Dynamic)
        {
            trace(e);
            throw e;
        }
        #end
    }

    static public function sendSSL(to:String, from:String, subject:String,  message:String, host:String, port:Int, username:String, password:String):Void
    {
        #if php
        untyped __php__('require_once "Mail.php";');
        untyped __php__("$headers = array ('From' => $from, 'Reply-To' => $from, 'To' => $to, 'Subject' => $subject);");
        untyped __php__("$smtp = Mail::factory('smtp', array ('host' => $host, 'port' => $port, 'auth' => true, 'username' => $username, 'password' => $password));");

        untyped __php__("$mail = $smtp->send($to, $headers, $message);");
        #end
    }
}