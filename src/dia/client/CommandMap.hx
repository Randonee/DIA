package dia.client;

import minject.Injector;

class CommandMap
{
	var map:Map<String, Class<Command>>;
	var injector:Injector;
	var detainedCommands:Map<Command, Bool>;

	public function new(injector:Injector)
	{
		this.injector = injector;
		map = new Map();
		detainedCommands = new Map();
	}

	public function add(dataClass:Class<Dynamic>, commandType:Class<Command>):Void
	{
		map.set(Type.getClassName(dataClass), commandType);
	}

	public function executeCommand(data:Dynamic):Void
	{
		var dataClass = Type.getClass(data);
		var cls = map.get(Type.getClassName(dataClass));

		injector.mapValue(dataClass, data);
		var cmd = injector.instantiate(cls);
		injector.unmap(dataClass);
		cmd.execute();
	}

	public function detain(command:Command)
	{
		detainedCommands.set(command, true);
	}

	public function release(command:Command)
	{
		if (detainedCommands.exists(command))
		{
			detainedCommands.remove(command);
		}
	}
}