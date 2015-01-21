package dia.http;

class HttpStatusCodes
{
	//1XX informationsl
	static public inline var CONTINUE:Int = 100;
	static public inline var SWITCH_PROTOCOLS:Int = 101;
	static public inline var PROCESSING:Int = 102;
	
	//2XX Success
	static public inline var OK:Int = 200;
	static public inline var CREATED:Int = 201;
	static public inline var ACCEPTED:Int = 202;
	static public inline var NON_AUTHORITATIVE_INFORMATION:Int = 203;
	static public inline var NO_CONTENT:Int = 204;
	static public inline var RESET_CONTENT:Int = 205;
	static public inline var MULTI_STATUS:Int = 206;
	static public inline var ALREADY_REPORTED:Int = 207;
	static public inline var IM_USED:Int = 226;
	
	
	//3XX Rredirection
	static public inline var MULTIPLE_CHOICE:Int = 300;
	static public inline var MOVED_PERMEANENTLY:Int = 301;
	static public inline var FOUND:Int = 302;
	static public inline var SEE_OTHER:Int = 303;
	static public inline var NOT_MODIFIED:Int = 304;
	static public inline var USE_PROXY:Int = 305;
	static public inline var SWITCH_PROXY:Int = 306;
	static public inline var TEMPORARY_REDIRECT:Int = 307;
	static public inline var PERMANENT_REDIRECT:Int = 308;
	
	
	//4XX Client Error
	static public inline var BAD_REQUEST:Int = 400;
	static public inline var UNAUTORIZED:Int = 401;
	static public inline var PAYMENT_REQUIRED:Int = 402;
	static public inline var FORBIDDEN:Int = 403;
	static public inline var NOT_FOUND:Int = 404;
	static public inline var METHOD_NOT_ALLOWED:Int = 405;
	static public inline var NOT_ACCEPTABLE:Int = 406;
	static public inline var PROXY_AUTHENTICATION_REQUIRED:Int = 407;
	static public inline var REQUEST_TIMEOUT:Int = 408;
	static public inline var CONFLICT:Int = 409;
	static public inline var GONE:Int = 410;
	static public inline var LENGTH_REQUIRED:Int = 411;
	static public inline var PRECONDITION_FAILED:Int = 412;
	static public inline var REQUEST_ENTITIY_TO_LARGE:Int = 413;
	static public inline var REQUEST_URI_TO_LONG:Int = 414;
	static public inline var UNSUPPORTED_MEDIA_TYPE:Int = 415;
	static public inline var REQUEST_RANGE_NOT_SATISFIABLE:Int = 416;
	static public inline var EXPECTATION_FAILED:Int = 417;
	static public inline var IM_A_TEAPOT:Int = 418;
	static public inline var ENHANCE_YOUR_CALM:Int = 420;
	static public inline var UNPROCESSABLE_ENTITY:Int = 421;
	static public inline var LOCKED:Int = 422;
	static public inline var FAILED_DEPENDENCY:Int = 423;
	static public inline var METHOD_FAILURE:Int = 424;
	static public inline var UNORDERED_COLLECTION:Int = 425;
	static public inline var UPGRAD_REQUIRED:Int = 426;
	static public inline var PRECONDITION_REQUIRED:Int = 428;
	static public inline var TOO_MANY_REQUESTS:Int = 429;
	static public inline var REQUEST_HEADER_FIELDS_TOO_LARGE:Int = 431;
	static public inline var NO_RESPONSE:Int = 444;
	static public inline var RETRY_WITH:Int = 449;
	static public inline var BLOCKED_BY_WINDOWS_PARENTAL_CONTROLS:Int = 450;
	static public inline var UNAVAILABLE_FOR_LEAGAL_REASONS:Int = 451;
	static public inline var REQUEST_HEADER_TOO_LARGE:Int = 494;
	static public inline var CERT_ERROR:Int = 495;
	static public inline var NO_CERT:Int = 496;
	static public inline var HTTP_TO_HTTPS:Int = 497;
	static public inline var CLIENT_CLOSED_REQUEST:Int = 499;
	
	//5XX Server Error
	static public inline var INTERNAL_SERVER_ERROR:Int = 500;
	static public inline var NOT_IMPLEMENTED:Int = 501;
	static public inline var BAD_GATEWAY:Int = 502;
	static public inline var SERVICE_UNAVAILABLE:Int = 503;
	static public inline var GATEWAY_TIMEOUT:Int = 504;
	static public inline var HTTP_VERSION_NOT_SUPPORTED:Int = 505;
	static public inline var VARIENT_ALSONEGOTIATES:Int = 506;
	static public inline var INSUFFICIENT_STORAGE:Int = 507;
	static public inline var LOOP_DETECTED:Int = 508;
	static public inline var BANDWIDTH_LIMIT_EXCEEDED:Int = 509;
	static public inline var NOT_EXTENDED:Int = 510;
	static public inline var NETWORK_AUTHENTICATION_REQUIRED:Int = 511;
	static public inline var NETWORK_READ_TIMOUT_ERROR:Int = 598;
	static public inline var NETWORK_CONNECTION_TIMOUT_ERROR:Int = 599;
}