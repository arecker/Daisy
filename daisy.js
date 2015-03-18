var daisy = (function(){
	var Computation = function(raw){
		this._raw = raw + '';
	};

	return function(initValue){
		return new Computation(initValue);
	};
}());