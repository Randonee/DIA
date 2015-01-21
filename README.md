DIA framework
----------------

**Client**

Communication flow:
View -> Hap -> Command -> Notice -> View

The client framework makes heavy use of macros to create the "wiring" between the view and controller. There are 4 basic commponents:

1. Application
This is created in a macro and extends ApplicationBase

2. Haps
Haps map directly to commands. They are mostly sent from the view but can also be sent from commands.
There is one big enum called Hap. The enum constructors are created using a macro.

3. Notice
Notices come from commands and go to haps.
There is one big enum called Notice. The enum constructors are created using a macro.

4. Commands
Commands are executed using haps. They are bundles of logic to do things for the application. They have access to the model and return domain objects and other data back to the views.

**Setup**

1. create build macro that will set up the haps, notices and commands (Example: note.client.Wiring.build)
2. call the macro from the build file example: --macro note.client.Wiring.build()


**HTML Client**

Views:
Views have two parts, a template and a class file.

View classes extend dia.js.JSView. Among other things this base class includes a build macro that looks for the static property TEMPLATE on
child classes. The TEMPLATE property should point to a html template file. The macro will parse this file, do some things then include it with the final javascript file.

Template:
Templates are xml files which end up as html. Templates can contain other templates. To do this xmlns property is added to the first tag of the template. The xmlns property has two parts: a name and package.

Example xmlns:
xmlns:note="note.client.platform.html.view.note"

With the above xmlns added you could then include any view in the template from the component package.

Here is an example of how to include a view in a view template:

	<div xmlns:note="note.client.platform.html.view.note">
		<note:Header name="header" />
		</div>

If a view class has the above as its template, a header property would be automaically added to it.

Here is a sample class using the above template:

	class AdminUserReportView extends dia.js.JSView
	{
		static var TEMPLATE = "AdminUserReportView.mtt";
		public function new(?props:Dynamic)
		{
			super(TEMPLATE, props);

			header.visible = false;
		}
	}
