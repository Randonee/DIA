package dia.sys;


#if server
typedef FileInput = sys.io.FileInput;
#else

#if macro
typedef FileInput = sys.io.FileInput;
#elseif flash
typedef FileInput = air.sys.FileInput;
#elseif (cordova && !macro)
typedef FileInput = cordova.sys.FileInput;
#else
typedef FileInput = sys.io.FileInput;
#end


#end