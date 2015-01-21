package dia.sys;


#if server
typedef FileOutput = sys.io.FileOutput;
#else

#if macro
typedef FileOutput = sys.io.FileOutput;
#elseif flash
typedef FileOutput = air.sys.FileOutput;
#elseif (cordova && !macro)
typedef FileOutput = cordova.sys.FileOutput;
#else
typedef FileOutput = sys.io.FileOutput;
#end


#end