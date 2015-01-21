<?php

class minject_Injector {
	public function __construct() {
		if(!php_Boot::$skip_constructor) {
		$this->injectionConfigs = new haxe_ds_StringMap();
		$this->injecteeDescriptions = new minject_ClassHash();
		$this->attendedToInjectees = new minject__Injector_InjecteeSet();
	}}
	public $attendedToInjectees;
	public $parentInjector;
	public $injectionConfigs;
	public $injecteeDescriptions;
	public function mapValue($whenAskedFor, $useValue, $named = null) {
		if($named === null) {
			$named = "";
		}
		$config = $this->getMapping($whenAskedFor, $named);
		$config->setResult(new minject_result_InjectValueResult($useValue));
		return $config;
	}
	public function mapClass($whenAskedFor, $instantiateClass, $named = null) {
		if($named === null) {
			$named = "";
		}
		$config = $this->getMapping($whenAskedFor, $named);
		$config->setResult(new minject_result_InjectClassResult($instantiateClass));
		return $config;
	}
	public function mapSingleton($whenAskedFor, $named = null) {
		if($named === null) {
			$named = "";
		}
		return $this->mapSingletonOf($whenAskedFor, $whenAskedFor, $named);
	}
	public function mapSingletonOf($whenAskedFor, $useSingletonOf, $named = null) {
		if($named === null) {
			$named = "";
		}
		$config = $this->getMapping($whenAskedFor, $named);
		$config->setResult(new minject_result_InjectSingletonResult($useSingletonOf));
		return $config;
	}
	public function mapRule($whenAskedFor, $useRule, $named = null) {
		if($named === null) {
			$named = "";
		}
		$config = $this->getMapping($whenAskedFor, $named);
		$config->setResult(new minject_result_InjectOtherRuleResult($useRule));
		return $useRule;
	}
	public function getMapping($forClass, $named = null) {
		if($named === null) {
			$named = "";
		}
		$requestName = _hx_string_or_null($this->getClassName($forClass)) . "#" . _hx_string_or_null($named);
		if($this->injectionConfigs->exists($requestName)) {
			return $this->injectionConfigs->get($requestName);
		}
		$config = new minject_InjectionConfig($forClass, $named);
		$this->injectionConfigs->set($requestName, $config);
		return $config;
	}
	public function injectInto($target) {
		if($this->attendedToInjectees->contains($target)) {
			return;
		}
		$this->attendedToInjectees->add($target);
		$targetClass = Type::getClass($target);
		$injecteeDescription = null;
		if($this->injecteeDescriptions->exists($targetClass)) {
			$injecteeDescription = $this->injecteeDescriptions->get($targetClass);
		} else {
			$injecteeDescription = $this->getInjectionPoints($targetClass);
		}
		if($injecteeDescription === null) {
			return;
		}
		$injectionPoints = $injecteeDescription->injectionPoints;
		$length = $injectionPoints->length;
		{
			$_g = 0;
			while($_g < $length) {
				$i = $_g++;
				$injectionPoint = $injectionPoints[$i];
				$injectionPoint->applyInjection($target, $this);
				unset($injectionPoint,$i);
			}
		}
	}
	public function instantiate($theClass) {
		$injecteeDescription = null;
		if($this->injecteeDescriptions->exists($theClass)) {
			$injecteeDescription = $this->injecteeDescriptions->get($theClass);
		} else {
			$injecteeDescription = $this->getInjectionPoints($theClass);
		}
		$injectionPoint = $injecteeDescription->ctor;
		$instance = $injectionPoint->applyInjection($theClass, $this);
		$this->injectInto($instance);
		return $instance;
	}
	public function unmap($theClass, $named = null) {
		if($named === null) {
			$named = "";
		}
		$mapping = $this->getConfigurationForRequest($theClass, $named, null);
		if($mapping === null) {
			throw new HException("Error while removing an injector mapping: No mapping defined for class " . _hx_string_or_null($this->getClassName($theClass)) . ", named \"" . _hx_string_or_null($named) . "\"");
		}
		$mapping->setResult(null);
	}
	public function hasMapping($forClass, $named = null) {
		if($named === null) {
			$named = "";
		}
		$mapping = $this->getConfigurationForRequest($forClass, $named, null);
		if($mapping === null) {
			return false;
		}
		return $mapping->hasResponse($this);
	}
	public function getInstance($ofClass, $named = null) {
		if($named === null) {
			$named = "";
		}
		$mapping = $this->getConfigurationForRequest($ofClass, $named, null);
		if($mapping === null || !$mapping->hasResponse($this)) {
			throw new HException("Error while getting mapping response: No mapping defined for class " . _hx_string_or_null($this->getClassName($ofClass)) . ", named \"" . _hx_string_or_null($named) . "\"");
		}
		return $mapping->getResponse($this);
	}
	public function createChildInjector() {
		$injector = new minject_Injector();
		$injector->set_parentInjector($this);
		return $injector;
	}
	public function getAncestorMapping($forClass, $named = null) {
		$parent = $this->parentInjector;
		while($parent !== null) {
			$parentConfig = $parent->getConfigurationForRequest($forClass, $named, false);
			if($parentConfig !== null && $parentConfig->hasOwnResponse()) {
				return $parentConfig;
			}
			$parent = $parent->parentInjector;
			unset($parentConfig);
		}
		return null;
	}
	public function getInjectionPoints($forClass) {
		$typeMeta = haxe_rtti_Meta::getType($forClass);
		if($typeMeta !== null && _hx_has_field($typeMeta, "interface")) {
			throw new HException("Interfaces can't be used as instantiatable classes.");
		}
		$fieldsMeta = $this->getFields($forClass);
		$ctorInjectionPoint = null;
		$injectionPoints = (new _hx_array(array()));
		$postConstructMethodPoints = (new _hx_array(array()));
		{
			$_g = 0;
			$_g1 = Reflect::fields($fieldsMeta);
			while($_g < $_g1->length) {
				$field = $_g1[$_g];
				++$_g;
				$fieldMeta = Reflect::field($fieldsMeta, $field);
				$inject = _hx_has_field($fieldMeta, "inject");
				$post = _hx_has_field($fieldMeta, "post");
				$type = Reflect::field($fieldMeta, "type");
				$args = Reflect::field($fieldMeta, "args");
				if($field === "_") {
					if(_hx_len($args) > 0) {
						$ctorInjectionPoint = new minject_point_ConstructorInjectionPoint($fieldMeta, $forClass, $this);
					}
				} else {
					if(_hx_has_field($fieldMeta, "args")) {
						if($inject) {
							$injectionPoint = new minject_point_MethodInjectionPoint($fieldMeta, $this);
							$injectionPoints->push($injectionPoint);
							unset($injectionPoint);
						} else {
							if($post) {
								$injectionPoint1 = new minject_point_PostConstructInjectionPoint($fieldMeta, $this);
								$postConstructMethodPoints->push($injectionPoint1);
								unset($injectionPoint1);
							}
						}
					} else {
						if($type !== null) {
							$injectionPoint2 = new minject_point_PropertyInjectionPoint($fieldMeta, $this);
							$injectionPoints->push($injectionPoint2);
							unset($injectionPoint2);
						}
					}
				}
				unset($type,$post,$inject,$fieldMeta,$field,$args);
			}
		}
		if($postConstructMethodPoints->length > 0) {
			$postConstructMethodPoints->sort(array(new _hx_lambda(array(&$ctorInjectionPoint, &$fieldsMeta, &$forClass, &$injectionPoints, &$postConstructMethodPoints, &$typeMeta), "minject_Injector_0"), 'execute'));
			{
				$_g2 = 0;
				while($_g2 < $postConstructMethodPoints->length) {
					$point = $postConstructMethodPoints[$_g2];
					++$_g2;
					$injectionPoints->push($point);
					unset($point);
				}
			}
		}
		if($ctorInjectionPoint === null) {
			$ctorInjectionPoint = new minject_point_NoParamsConstructorInjectionPoint();
		}
		$injecteeDescription = new minject_InjecteeDescription($ctorInjectionPoint, $injectionPoints);
		$this->injecteeDescriptions->set($forClass, $injecteeDescription);
		return $injecteeDescription;
	}
	public function getConfigurationForRequest($forClass, $named, $traverseAncestors = null) {
		if($traverseAncestors === null) {
			$traverseAncestors = true;
		}
		$requestName = _hx_string_or_null($this->getClassName($forClass)) . "#" . _hx_string_or_null($named);
		if(!$this->injectionConfigs->exists($requestName)) {
			if($traverseAncestors && $this->parentInjector !== null && $this->parentInjector->hasMapping($forClass, $named)) {
				return $this->getAncestorMapping($forClass, $named);
			}
			return null;
		}
		return $this->injectionConfigs->get($requestName);
	}
	public function set_parentInjector($value) {
		if($this->parentInjector !== null && $value === null) {
			$this->attendedToInjectees = new minject__Injector_InjecteeSet();
		}
		$this->parentInjector = $value;
		if($this->parentInjector !== null) {
			$this->attendedToInjectees = $this->parentInjector->attendedToInjectees;
		}
		return $this->parentInjector;
	}
	public function getClassName($forClass) {
		if($forClass === null) {
			return "Dynamic";
		} else {
			return Type::getClassName($forClass);
		}
	}
	public function getFields($type) {
		$meta = _hx_anonymous(array());
		while($type !== null) {
			$typeMeta = haxe_rtti_Meta::getFields($type);
			{
				$_g = 0;
				$_g1 = Reflect::fields($typeMeta);
				while($_g < $_g1->length) {
					$field = $_g1[$_g];
					++$_g;
					{
						$value = Reflect::field($typeMeta, $field);
						$meta->{$field} = $value;
						unset($value);
					}
					unset($field);
				}
				unset($_g1,$_g);
			}
			$type = Type::getSuperClass($type);
			unset($typeMeta);
		}
		return $meta;
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
	static $__properties__ = array("set_parentInjector" => "set_parentInjector");
	function __toString() { return 'minject.Injector'; }
}
function minject_Injector_0(&$ctorInjectionPoint, &$fieldsMeta, &$forClass, &$injectionPoints, &$postConstructMethodPoints, &$typeMeta, $a, $b) {
	{
		return $a->order - $b->order;
	}
}
