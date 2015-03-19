var daisy = (function(){

	// Polyfills
	(function(){

		// Array.isArray
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
		if (!Array.isArray) {
			Array.isArray = function(arg) {
				return Object.prototype.toString.call(arg) === '[object Array]';
			};
		}

		// Array.prototype.reduce
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
		if (!Array.prototype.reduce) {
			Array.prototype.reduce = function(callback /*, initialValue*/) {
				'use strict';
				if (this == null) {
					throw new TypeError('Array.prototype.reduce called on null or undefined');
				}
				if (typeof callback !== 'function') {
					throw new TypeError(callback + ' is not a function');
				}
				var t = Object(this), len = t.length >>> 0, k = 0, value;
				if (arguments.length === 2) {
					value = arguments[1];
				} else {
					while (k < len && !(k in t)) {
						k++; 
					}
					if (k >= len) {
						throw new TypeError('Reduce of empty array with no initial value');
					}
					value = t[k++];
				}
				for (; k < len; k++) {
					if (k in t) {
						value = callback(value, t[k], k, t);
					}
				}
				return value;
			};
		}

	}());

	var errors = (function(){
		var name = 'DaisyException: ';
		return {
			notANumber: function(culprit){
				return {
					name: name,
					culprit: culprit,
					message: '\'' + culprit + '\' is not a valid number',
					toString: function(){ return name + this.message; }
				};
			},
			emptySet: function(){
				return {
					name: name,
					message: 'cannot operate on empty set',
					toString: function(){ return name + this.message; }
				};
			}
		};
	}());

	// Privates
	var tryParse = function(i){
		var value = parseFloat(i);
		if (isNaN(value)) {
			throw errors.notANumber(i);
		}
		return value;
	};

	var add = function(a, b){
		return tryParse(a) + tryParse(b);
	};

	var subtract = function(a, b){
		return tryParse(a) - tryParse(b);
	};

	// Computation Model
	var Computation = function(initParam){
		this.currentVal = initParam + '';
	};

	Computation.prototype.equals = function(){
		var value = tryParse(this.currentVal).toFixed(2) + '';
		return value;
	};

	Computation.prototype.plus = function(additionParam){
		this.currentVal = add(this.currentVal, additionParam);
		return this;
	};

	Computation.prototype.minus = function(substractionParam){
		this.currentVal = subtract(this.currentVal, substractionParam);
		return this;
	};

	// Set model
	var NumberSet = function(initParam){
		this.currentSet = initParam;
	};

	NumberSet.prototype.sum = function(){
		if (this.currentSet.length === 0) { throw errors.emptySet(); }
		return new Computation(this.currentSet.reduce(add));
	};

	NumberSet.prototype.average = function(){
		if (this.currentSet.length === 0) { throw errors.emptySet(); }
		var value = this.currentSet.reduce(add) / this.currentSet.length;
		return new Computation(value);
	};

	return function(initValue){
		if (Array.isArray(initValue)){
			return new NumberSet(initValue);
		} else {
			return new Computation(initValue);
		}
	};

}());