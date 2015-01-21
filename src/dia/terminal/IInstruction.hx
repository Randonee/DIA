package dia.terminal;

/**
 * Instructions can be run from the debugger terminal and can do anything the developer can imagine.
 */
interface IInstruction
{
	public var helpText(default, null):String;
	public function execute(args:Array<String>):Void;
}