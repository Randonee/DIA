package dia.util;

import dia.model.domain.IDomainObject;

class CollectionUtil
{
	public static function update<T:IDomainObject>(collection:Array<T>, obj:T):Void
	{
		for(a in 0...collection.length)
		{
			if(collection[a].uid == obj.uid)
			{
				collection[a] = obj;
			}
		}
	}
	
	/**
	 *  Add the obj at the specified index.  
	 *  Any obj that was after this index is moved out by one.  
	 * 
	 *  @param obj the obj to place at the index
	 *  @param index the index at which to place the obj
	 *  @throws RangeError if index is less than 0 or greater than the length
	 *  @throws Error if an obj with the same uid already exists in the cache
	 */
	public static function insertAt<T:IDomainObject>(collection:Array<T>, obj:T, index:Int):Void
	{
		if (index < 0 || index > collection.length) 
			throw("index is out of range");
		
		if(index == collection.length)
			collection.push(obj);
		else if(index == 0)
			collection.unshift(obj);
		else
		{
			var temp:Array<T> = collection.slice(0, index-1);
			temp.push(obj);
			collection = temp.concat(collection.slice(index));
		}
	}
	
	/**
	 * Retrieves an obj with the given uid.
	 * 
	 * @param uid the uid of the object to be retrieved.
	 * 
	 * @return the object with the geven uid or null if no object with that uid exists
	 */
	public static function getById<T:IDomainObject>(collection:Array<T>, uid:Int):T
	{
		for(obj in collection)
			if(obj.uid == uid) return obj;
			
		return null;
	}
	
	/**
	 * Retrieves the index of an item with the given uid.
	 * 
	 * @param uid the uid of the object to be retrieved.
	 * 
	 * @return the index of an object with the geven uid or -1 if no object with that uid exists
	 */
	public static function getIndexById<T:IDomainObject>(collection:Array<T>, uid:Int):Int
	{
		for(a in 0...collection.length)
		{
			var obj:T = collection[a];
			if(obj.uid == uid)
				return a;
		}
		return -1;
	}
		
	
	/**
	 * Removes an object from the cache
	 * 
	 * @param uid the uid of the object to be removed.
	 * 
	 * @return the object with the geven uid or null if no object with that uid exists
	 */
	public static function removeById<T:IDomainObject>(collection:Array<T>, uid:Int):T
	{
		var obj:T = getById(collection, uid);
		var index:Int = getIndexById(collection, uid);

		if(index >=0)
			removeItemAt(collection, index);
		
		return obj;
	}
	
	/**
	 *  Remove the obj at the specified index and return it.  
	 *  Any objs that were after this index are now one index earlier.
	 *
	 *  @param index The index from which to remove the obj.
	 *  @return The obj that was removed.
	 *  @throws RangeError if index &lt; 0 or index &gt;= length.
	 */
	public static function removeItemAt<T:IDomainObject>(collection:Array<T>, index:Int):T
	{
		if (index < 0 || index >= collection.length)
			throw ("Index is out of range");

		var obj:T = collection.splice(index, 1)[0];
		return obj;
	}
	
	
	/**
	 * Swaps two objs positions in the cache.
	 * This function does nothing if the sort property is set.
	 * 
	 * @param objA an obj to change position
	 * @param objB an obj to change position
	 * 
	 * @return true if the swap was successful false if not
	 */
	public static function swap<T:IDomainObject>(collection:Array<T>, objA:T, objB:T):Bool
	{
		var indexA:Int = getIndexById(collection, objA.uid);
		var indexB:Int = getIndexById(collection, objB.uid);
		if(indexA == -1 || indexB == -1)
			return false;
			
		var temp:T = collection[indexA];
		collection[indexA] = collection[indexB];
		collection[indexB] = temp;
		
		return true;
	}
	
}