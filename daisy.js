var daisy = (function(){
	var add = function(a, b){
		return parseFloat(a) + parseFloat(b);
	};

	var Computation = function(initParam){
		this.currentVal = initParam + '';
	};

	Computation.prototype.equals = function(){
		var value = parseFloat(this.currentVal).toFixed(2) + '';
		return value;
	};

	Computation.prototype.plus = function(additionParam){
		var newValue = add(this.currentVal, additionParam);
		return new Computation(newValue);
	};

	return function(initValue){
		return new Computation(initValue);
	};
}());