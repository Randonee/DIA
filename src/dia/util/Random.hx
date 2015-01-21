/****
* Copyright (c) 2013 Jason O'Neil
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
* 
****/

package dia.util;

class Random
{
	/** Return a random boolean value (true or false) */
	public static inline function makeBool():Bool
	{
		return Math.random() < 0.5;
	}

	/** Return a random integer between 'from' and 'to', inclusive. */
	public static inline function makeInt(from:Int, to:Int):Int
	{
		return from + Math.floor(((to - from + 1) * Math.random()));
	}

	/** Return a random float between 'from' and 'to', inclusive. */
	public static inline function makeFloat(from:Float, to:Float):Float
	{
		return from + ((to - from) * Math.random());
	}

	/** Return a random string of a certain length.  You can optionally specify 
	    which characters to use, otherwise the default is (a-zA-Z0-9) */
	public static function makeString(length:Int, ?charactersToUse = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"):String
	{
		var str = "";
		for (i in 0...length)
		{
			str += charactersToUse.charAt(Random.makeInt(0, charactersToUse.length - 1));
		}
		return str;
	}

	/** Return a random date & time from within a range.  The behaviour is unspecified if either `earliest` or `latest` is null.  Earliest and Latest are inclusive */
	public static inline function makeDate(earliest:Date, latest:Date):Date
	{
		return Date.fromTime( makeFloat(earliest.getTime(), latest.getTime()) );
	}

	/** Return a random item from an array.  Will return null if the array is null or empty. */
	public static inline function fromArray<T>(arr:Array<T>):Null<T>
	{
		return (arr != null && arr.length > 0) ? arr[makeInt(0, arr.length - 1)] : null;
	}


	/** Return a random constructor from an Enum.  Will return null if the enum has no constructors. Only works with enum constructors that take no parameters. */
	public static inline function enumConstructor<T>(e:Enum<T>):Null<T>
	{
		return (e!=null) ? fromArray(Type.allEnums(e)) : null;
	}
}