describe('daisy', function(){

	it('should not be undefined', function(){
		expect(daisy).not.toBe(undefined);
	});

	it('should be a function', function(){
		expect(typeof daisy).toBe('function');
	});

	describe('initialization', function(){

		it('should take a stringified positive integer', function(){
			var result = daisy('1');
			expect(result).not.toBe(undefined);
			expect(result._raw).toBe('1');
		});

		it('should take a stringified negative integer', function(){
			var result = daisy('-1');
			expect(result).not.toBe(undefined);
			expect(result._raw).toBe('-1');
		});

		it('should take a negative integer and convert to string', function(){
			var result = daisy(-1);
			expect(result._raw).toBe('-1');
		});

		it('should take a positive integer and convert to string', function(){
			var result = daisy(4);
			expect(result._raw).toBe('4');
		});

		it('should take a negative double and convert to string', function(){
			var result = daisy(-12.34);
			expect(result._raw).toBe('-12.34');
		});

		it('should take a positive double and convert to string', function(){
			var result = daisy(3.14);
			expect(result._raw).toBe('3.14');
		});

	});

});