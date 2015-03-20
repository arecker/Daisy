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

	var DaisyException = function(message){
		this.name = 'DaisyException';
		this.message = message;
	};

	// Privates
	var tryParse = function(i){
		var value = Number(i);
		if (isNaN(value)) {
			throw new DaisyException('\'' + i + '\' is not a valid number');
		}
		return value;
	};

	var add = function(a, b){
		return tryParse(a) + tryParse(b);
	};

	var subtract = function(a, b){
		return tryParse(a) - tryParse(b);
	};

	var multiply = function(a, b){
		return tryParse(a) * tryParse(b);
	};

	var divide = function(a, b){
		b = tryParse(b);
		a = tryParse(a);
		if (b === 0) { throw new DaisyException('divided \'' + a + '\' by zero'); }
		return a / b;
	};

	// Computation Model
	var Computation = function(initParam, options){
		this.currentVal = initParam + '';
		this.options = options || {};
	};

	Computation.prototype.equals = function(){
		var value = tryParse(this.currentVal).toFixed(2) + '';
		if (this.options.printDollarSign){ value = '$' + value; }
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

	Computation.prototype.times = function(multiplyParam){
		this.currentVal = multiply(this.currentVal, multiplyParam);
		return this;
	};

	Computation.prototype.dividedBy = function(divisiionParam){
		this.currentVal = divide(this.currentVal, divisiionParam);
		return this;
	};

	// Set model
	var NumberSet = function(initParam, options){
		this.currentSet = initParam;
		this.options = options || {};
	};

	NumberSet.prototype.sum = function(){
		if (this.currentSet.length === 0) { throw new DaisyException('cannot operate on empty set'); }
		return new Computation(this.currentSet.reduce(add));
	};

	NumberSet.prototype.average = function(){
		if (this.currentSet.length === 0) { throw new DaisyException('cannot operate on empty set'); }
		var value = this.currentSet.reduce(add) / this.currentSet.length;
		return new Computation(value);
	};

	return function(initValue, options){
		if (Array.isArray(initValue)){
			return new NumberSet(initValue, options);
		} else {
			return new Computation(initValue, options);
		}
	};

}());