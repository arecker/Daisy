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
			expect(result.currentVal).toBe('1');
		});

		it('should take a stringified negative integer', function(){
			var result = daisy('-1');
			expect(result).not.toBe(undefined);
			expect(result.currentVal).toBe('-1');
		});

		it('should take a negative integer and convert to string', function(){
			var result = daisy(-1);
			expect(result.currentVal).toBe('-1');
		});

		it('should take a positive integer and convert to string', function(){
			var result = daisy(4);
			expect(result.currentVal).toBe('4');
		});

		it('should take a negative double and convert to string', function(){
			var result = daisy(-12.34);
			expect(result.currentVal).toBe('-12.34');
		});

		it('should take a positive double and convert to string', function(){
			var result = daisy(3.14);
			expect(result.currentVal).toBe('3.14');
		});

		it('should return an object with an equals() function', function(){
			var result = daisy();
			expect(result.equals).not.toBe(undefined);
			expect(typeof result.equals).toBe('function');
		});

	});

	describe('equals', function(){

		it('should convert a positive integer to a dollar/cent value', function(){
			var actual = daisy(3).equals();
			expect(actual).toBe('3.00');
		});

		it('should convert a postive decimal to a dollar/cent value', function(){
			var actual = daisy(12.12).equals();
			expect(actual).toBe('12.12');
		});

		it('should convert a negative decimal to a dollar/cent value', function(){
			var actual = daisy(-453.32).equals();
			expect(actual).toBe('-453.32');
		});

		it('should convert a negative integer to a dollar/cent value', function(){
			var actual = daisy(-19).equals();
			expect(actual).toBe('-19.00');
		});

	});

	describe('plus', function(){

		it('should add two positive integers', function(){
			var actual = daisy(1).plus(1).equals();
			expect(actual).toBe('2.00');
		});

		it('should add three positive integers', function(){
			var actual = daisy(12).plus(14).plus(2).equals();
			expect(actual).toBe('28.00');
		});

	});

});