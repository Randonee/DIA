<?php

class minject_point_MethodInjectionPoint extends minject_point_InjectionPoint {
	public function __construct($meta, $injector = null) {
		if(!php_Boot::$skip_constructor) {
		$this->requiredParameters = 0;
		parent::__construct($meta,$injector);
	}}
	public $methodName;
	public $_parameterInjectionConfigs;
	public $requiredParameters;
	public function applyInjection($target, $injector) {
		$parameters = $this->gatherParameterValues($target, $injector);
		$method = Reflect::field($target, $this->methodName);
		mcore_util_Reflection::callMethod($target, $method, $parameters);
		return $target;
	}
	public function initializeInjection($meta) {
		$this->methodName = $meta->name[0];
		$this->gatherParameters($meta);
	}
	public function gatherParameters($meta) {
		$nameArgs = $meta->inject;
		$args = $meta->args;
		if($nameArgs === null) {
			$nameArgs = (new _hx_array(array()));
		}
		$this->_parameterInjectionConfigs = (new _hx_array(array()));
		$i = 0;
		{
			$_g = 0;
			while($_g < $args->length) {
				$arg = $args[$_g];
				++$_g;
				$injectionName = "";
				if($i < $nameArgs->length) {
					$injectionName = $nameArgs[$i];
				}
				$parameterTypeName = $arg->type;
				if($arg->opt) {
					if($parameterTypeName === "Dynamic") {
						throw new HException("Error in method definition of injectee. Required parameters can't have non class type.");
					}
				} else {
					$this->requiredParameters++;
				}
				$this->_parameterInjectionConfigs->push(new minject_point_ParameterInjectionConfig($parameterTypeName, $injectionName));
				$i++;
				unset($parameterTypeName,$injectionName,$arg);
			}
		}
	}
	public function gatherParameterValues($target, $injector) {
		$parameters = (new _hx_array(array()));
		$length = $this->_parameterInjectionConfigs->length;
		{
			$_g = 0;
			while($_g < $length) {
				$i = $_g++;
				$parameterConfig = $this->_parameterInjectionConfigs[$i];
				$config = $injector->getMapping(Type::resolveClass($parameterConfig->typeName), $parameterConfig->injectionName);
				$injection = $config->getResponse($injector);
				if($injection === null) {
					if($i >= $this->requiredParameters) {
						break;
					}
					throw new HException("Injector is missing a rule to handle injection into target " . _hx_string_or_null(Type::getClassName(Type::getClass($target))) . ". Target dependency: " . _hx_string_or_null(Type::getClassName($config->request)) . ", method: " . _hx_string_or_null($this->methodName) . ", parameter: " . _hx_string_rec(($i + 1), "") . ", named: " . _hx_string_or_null($parameterConfig->injectionName));
				}
				$parameters[$i] = $injection;
				unset($parameterConfig,$injection,$i,$config);
			}
		}
		return $parameters;
	}
	public function __call($m, $a) {
		if(isset($this->$m) && is_callable($this->$m))
			return call_user_func_array($this->$m, $a);
		else if(isset($this->__dynamics[$m]) && is_callable($this->__dynamics[$m]))
			return call_user_func_array($this->__dynamics[$m], $a);
		else if('toString' == $m)
			return $this->__toString();
		else
			throw new HException('Unable to call <'.$m.'>');
	}
	function __toString() { return 'minject.point.MethodInjectionPoint'; }
}
