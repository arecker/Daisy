var daisy = (function(){

	var errors = (function(){
		var name = 'DaisyException: ';
		return {
			notANumber: function(culprit){
				return {
					message: '\'' + culprit + '\' is not a valid number',
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
		var newValue = add(this.currentVal, additionParam);
		return new Computation(newValue);
	};

	Computation.prototype.minus = function(substractionParam){
		var newValue = subtract(this.currentVal, substractionParam);
		return new Computation(newValue);
	};

	// Set model
	var Set = function(initParam){
		this.currentSet = initParam;
	};

	return function(initValue){
		if (Array.isArray(initValue)){
			return new Set(initValue);
		} else {
			return new Computation(initValue);
		}
	};

}());