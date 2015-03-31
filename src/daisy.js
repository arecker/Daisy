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

	var addCommas = function (num, locale, currency) {
		console.log('adding commas', num, locale);
		num = num.toLocaleString(locale);
		console.log(num);
		return num.match(/[\d,\.]+/)[0];
	};

	var makeNumberString = function (options) {
		var str,
			decimals,
			formatted = +options.formatted,
			hasDollarSign = options.hasDollarSign,
			decimalPlaces = options.decimalPlaces;

		formatted = formatted.toFixed(decimalPlaces).split('.');
		str = +formatted[0];
		decimals = formatted[1] ? '.' + formatted[1] : '';

		if (options.commas) {
			str = addCommas(str, options.locale);
		}

		str = hasDollarSign ? '$' + str + decimals : str + decimals;

		return str;
	};

	// Privates
	var isValid = function(i, o){
		var value = Number(i);
		if (isNaN(value)) {
			if (o.supressInvalidNumbers){ return 0; }
			throw new DaisyException('\'' + i + '\' is not a valid number');
		}



		return value;
	};

	var add = function(a, b, option){
		a = isValid(a, option);
        b = isValid(b, option);
        if (a === 0) {
            return b;
        }
        if (b === 0) {
            return a;
        }
        if ( (Math.abs(a) === Math.abs(b) ) && ( (a < 0 && b > 0) || (b < 0 && a > 0) )  ) {
            return 0;
        }
        return a + b;
	};

	var subtract = function(a, b, option){
		a = isValid(a, option);
        b = isValid(b, option);
        if (a === 0) {
            return -b;
        }
        if (b === 0) {
            return a;
        }
        if (a === b) {
            return 0;
        }
        return a - b;
	};

	var multiply = function(a, b, option){
        a = isValid(a, option);
        b = isValid(b, option);
        if (a === 0) {
            return 0;
        }
        if (b === 0) {
            return 0;
        }
        if (a === 1) {
            return b;
        }
        if (b === 1) {
            return a;
        }
		return a * b;
	};

	var divide = function(a, b, option){
		b = isValid(b);
		a = isValid(a);
		if (b === 0 ) { 
			if (!option.supressDivideByZero) { 
				throw new DaisyException('divided \'' + a + '\' by zero');
			} else { return 0; }
		}
        if (b === 1) {
            return a;
        }
        if (a === 0) {
            return 0;
        }
        if (a === b) {
            return 1;
        }
		return a / b;
	};

	// Computation Model
	var Computation = function(initParam, options){
		this.currentVal = initParam + '';
		this.options = options || {};
	};

	Computation.prototype.format = function () {
		var formatted,
			placeValue = 1e-2,
			decimalPlaces = 0,
			num = +this.currentVal,
			format = this.options.format || 'n.nn',
			round = this.options.round || 'round',
			operation = {
				"up": "ceiling",
				"down": "floor",
				"round": "round"
			}[round] || 'round';

		// check for valid format string
		if (
			format.match(/\./g) && format.match(/\./g).length > 1
			|| /[^n\.0\$]/i.test(format)
		){
			format = 'n.nn';
		}

		// not actually replacing anything, using the callback function
		// to find out what the user actually wants.
		format.replace(/n(0*)\.?(n*)/ig, function (m, aboveOne, belowOne) {
			if (aboveOne || belowOne) {
				var isDecimal = !aboveOne && !!belowOne;
				decimalPlaces = aboveOne ? 0 : belowOne.length || 0;
				placeValue = Math.pow(10, isDecimal ? -decimalPlaces : aboveOne.length);
			}
		});

		formatted = (Math[operation](num / placeValue) * placeValue).toFixed(decimalPlaces);

		return makeNumberString({
			"formatted": formatted,
			"hasDollarSign": /\$/.test(format),
			"decimalPlaces": decimalPlaces,
			"commas": this.options.commas,
			"locale": this.options.INR ? 'hi-IN' : 'en-US'
		});
	};

	Computation.prototype.equals = function(){
		var value = isValid(this.currentVal, this.options);
		return this.format(value);
	};

	Computation.prototype.plus = function(additionParam){
		this.currentVal = add(this.currentVal, additionParam, this.options);
		return this;
	};

	Computation.prototype.minus = function(substractionParam){
		this.currentVal = subtract(this.currentVal, substractionParam, this.options);
		return this;
	};

	Computation.prototype.times = function(multiplyParam){
		this.currentVal = multiply(this.currentVal, multiplyParam, this.options);
		return this;
	};

	Computation.prototype.dividedBy = function(divisiionParam){
		this.currentVal = divide(this.currentVal, divisiionParam, this.options);
		return this;
	};

	// Set model
	var NumberSet = function(initParam, options){
		this.currentSet = initParam;
		this.options = options || {};
	};

	NumberSet.prototype.sum = function(){
		var self = this;
		if (self.currentSet.length === 0) { throw new DaisyException('cannot operate on empty set'); }
		return new Computation(self.currentSet.reduce(function(p, c){
			return add(p, c, self.options);
		}));
	};

	NumberSet.prototype.average = function(){
		var self = this;
		if (this.currentSet.length === 0) { throw new DaisyException('cannot operate on empty set'); }
		var value = this.currentSet.reduce(function(p, c){
			return add(p, c, self.options);
		}) / self.currentSet.length;
		return new Computation(value);
	};

	NumberSet.prototype.max = function(){
		var i, max, currentValue;
		if (this.currentSet.length === 0) { throw new DaisyException('cannot operate on empty set'); }
		if (!this.options.supressInvalidNumbers){
			return new Computation(Math.max.apply(null, this.currentSet));
		}
		max = isValid(this.currentSet[0], this.options);
		for (i=0 ; i < this.currentSet.length ; i++){
			currentVal = isValid(this.currentSet[i], this.options);
			if (max < currentVal){ max = currentVal; }
		}
		return new Computation(max);
	};

	NumberSet.prototype.min = function(){
		var i, min, currentValue;
		if (this.currentSet.length === 0) { throw new DaisyException('cannot operate on empty set'); }
		if (!this.options.supressInvalidNumbers){
			return new Computation(Math.min.apply(null, this.currentSet));
		}
		min = isValid(this.currentSet[0], this.options);
		for (i=0 ; i < this.currentSet.length ; i++){
			currentVal = isValid(this.currentSet[i], this.options);
			if (min > currentVal){ min = currentVal; }
		}
		return new Computation(min);
	};

	return function(initValue, options){
		if (Array.isArray(initValue)){
			return new NumberSet(initValue, options);
		} else {
			return new Computation(initValue, options);
		}
	};

}());