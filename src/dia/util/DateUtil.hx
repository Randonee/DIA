package dia.util;

class DateUtil
{
	static public function getMondayOfCurrentWeek():Date
	{
		var date:Date = Date.now();
		var monthDay:Int = date.getDate() - date.getDay();
		var month:Int = date.getMonth();

		if(monthDay < 0)
		{
			--month;

			if(month < 0)
				month = 11;

			var monthDay = DateTools.getMonthDays(new Date(date.getFullYear(), month, 0, 0, 0, 0)) + monthDay; //monthDay is negative here
		}

		return new Date(date.getFullYear(), month, monthDay, date.getHours(), date.getMinutes(), date.getSeconds());
	}

	static public function formatTime(value:Int):String
	{
		var result:String = Std.string((value % 60));
		if (result.length == 1)
			result = Math.floor(value / 60) + ":0" + result;
		else 
			result = Math.floor(value / 60) + ":" + result;
		return result;
	}
}