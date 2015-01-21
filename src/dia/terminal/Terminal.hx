package dia.terminal;

import haxe.Timer;
import msignal.Signal;
import minject.Injector;
	
class Terminal
{
	private static var _instance:Terminal;
	static public function getInstance():Terminal
	{
		if(_instance == null)
			throw("Must call Terminal.init() before usage");
		
		return _instance;
	}

	static public function init(injector:Injector):Void
	{
		if(injector == null)
			throw("Injector can not be null");
		_instance = new Terminal(injector);
	}
	
	
	//------------------ Class Properties ------------------//
	public var log(default, null):String;
	public var out:Signal2<String, haxe.PosInfos>;
	
	
	//------------------ Class Variables ------------------//
	
	private var currIndex:Int;
	private var instructions:Map<String, Class<IInstruction>>;
	private var controlIsDown:Bool;
	private var timers:Map<Int, Float>;
	private var commandHistory:Array<String>;
	private var currentCommandHistoryIndex:Int;
	private var injector:Injector;
	
	
	//------------------ Public Methods ------------------//

	public function new(injector:Injector)
	{
		this.injector = injector;
		currIndex = 0;
		currentCommandHistoryIndex = 0;
		controlIsDown = false;
		commandHistory = [];
		timers = new Map();
		instructions = new Map();
		out = new Signal2();
		log = "";
	}
	
	/**
	 * Clears the output window and log.
	 */
	public function clear():Void
	{
		log = "";
	}
	
	/**
	 * Generic timer. This will start a timer. Call outTime to output the time since startTime was called.
	 * 
	 * @param timerID a unique id for the timer. This will be passed to outTime() to display the time.
	 */
	public function startTimer(timerID:Int):Void
	{
		timers.set(timerID, Timer.stamp());
	}
	
	/**
	 * Generic timer. Outputs a time since startTimer was called.
	 * 
	 * @param timerID a unique id for the timer. This is the same ID that was passed to startTime()
	 */
	public function outTime(timerID:Int):Float
	{
		var time:Float = Timer.stamp() - timers.get(timerID);
		print("Timer "+timerID+": " + Std.string(time) +"s, " + Std.string(time) + "ms");
		return time;
	}
	
	/**
	 * Shows the previously executed command in the command input field.
	 */
	public function gotoPreviousExecutedCommand():String
	{
		if(currentCommandHistoryIndex > 0)
		{
			--currentCommandHistoryIndex;
			return commandHistory[currentCommandHistoryIndex];
		}
		return "";
	}

	/**
	 * Shows the next executed command in the command input field. There will only be a next command if showPreviousExecutedCommand was called first.
	 */
	public function gotoNextExecutedCommand():String
	{
		if(currentCommandHistoryIndex < commandHistory.length)
		{
			++currentCommandHistoryIndex;
			
			if(currentCommandHistoryIndex == commandHistory.length)
				return "";
			else
				return commandHistory[currentCommandHistoryIndex];
		}

		return "";
	}

	public function debugTrace(v : Dynamic, ?info:haxe.PosInfos=null):Void
	{
		print(Std.string(v), true, info);
		var str:String = Std.string(v);
		if(info != null)
			str = info.fileName+"("+info.lineNumber+"): " + str;

		#if (flash9 || flash10)
			untyped __global__["trace"](str);
		#elseif flash
			flash.Lib.trace(str);
		#elseif js
			untyped console.log(str);
		#end
	}

	/**
	 * Displays text in the output window.
	 * 
	 * @param str the text to be displayed
	 * @param onNewLine if true the text will be displayed on a newline
	 * @param traceOut if true trace(str) will also be called
	 */
	public function print(str:String, onNewLine:Bool = true, info:haxe.PosInfos=null):Void
	{
		if(info != null)
			str = info.fileName+"("+ Std.string(info.lineNumber) + "): " + str;

		if(log != "" && onNewLine)
			log += "\n";
	
		log +=  str;

		out.dispatch(str, null);
	}
	
	/**
	 * Adds an instruction that can be called by entering a command in the input text area.
	 * 
	 * @param name the text that if entered will execute the command
	 * @param instruction A Class that implements IInstruction
	 */
	public function addInstrunction(name:String, instrunction:Class<IInstruction>):Void
	{
		instructions.set(name, instrunction);
	}
	
	/**
	 * Retrieves an Instruction
	 * 
	 * @param name the name of the instruction
	 */
	public function getInstrunction(name:String):Class<IInstruction>
	{
		return instructions.get(name);
	}
	
	/**
	 * Executes an instruction.
	 * 
	 * @param command a command that starts with an instruction name followd by arguments which are separated by commas. Example "debugMode,on"
	 */
	public function executeInstrunction(command:String):Void
	{
		commandHistory.push(command);
		currentCommandHistoryIndex = commandHistory.length;
		
		var parts:Array<String> = command.split(',');
		var name:String = parts[0];
		
		var args:Array<String>;
		if(parts.length > 1)
			args = parts.splice(1, parts.length);
		else
			args = new Array();
		
		if(name == "help" || name == "?")
		{
			out.dispatch("---- Command Syntax ----", null);
			out.dispatch("Enter the command name and arguments separated by commas.", null);
			out.dispatch("Example: commandName,arg1,arg2", null);
			out.dispatch(" ", null);
			out.dispatch("---- Command List ----", null);
			var keys = instructions.keys();
			for(key in keys)
			{
				out.dispatch(key, null);
				var classType = instructions.get(key);
				var instruction:IInstruction = injector.instantiate(classType);
				out.dispatch(instruction.helpText, null);
				out.dispatch(" ", null);
			}
			
			out.dispatch("----------------------", null);
			return;
		}
		
		var instructionClass:Class<IInstruction> = getInstrunction(name);
		if(instructionClass == null)
			out.dispatch(name + " Instruction Not Found\n", null);
		else
		{
			try
			{
				var instruction:IInstruction = injector.instantiate(instructionClass);
				instruction.execute(args);
			}
			catch(error:Dynamic)
			{
				out.dispatch(error, null);
			}
		}
	}
	
	public function keyUp(keyCode:Int):Void
	{
		if(keyCode == 17)
			controlIsDown = false;
		
		if(keyCode == 38)
			gotoPreviousExecutedCommand();
		
		if(keyCode == 40)
			gotoNextExecutedCommand();
	}
	
	public function keyDown(keyCode:Int):Void
	{
		if(keyCode == 17)
		{
			controlIsDown = true;
			return;
		}
	}
}