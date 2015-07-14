<?php

interface dia_server_IPrecondition {
	function get_failController();
	//;
	function canHandle($url);
	//;
}
