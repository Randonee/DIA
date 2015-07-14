<?php

interface sys_db_ResultSet {
	function hasNext();
	function next();
	function results();
	//;
}
