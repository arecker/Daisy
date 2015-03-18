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

		it('should take an array of numbers', function(){
			var result = daisy([1, 2, 3, 4, 5]);
			expect(result.currentSet.length).toBe(5);
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

		it('should round positive overflows to the nearest cent', function(){
			var actual = daisy(4.1234).equals();
			expect(actual).toBe('4.12');
		});

		it('should round negative overflows to the nearest cent', function(){
			var actual = daisy('-12.22934').equals();
			expect(actual).toBe('-12.23');
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

	describe('minus', function(){

		it('should subtract positive integers and give positive result', function(){
			var actual = daisy('8').minus(6).equals();
			expect(actual).toBe('2.00');
		});

		it('should substract three positive numbers and give positive result', function(){
			var actual = daisy('14').minus(8).minus(1).equals();
			expect(actual).toBe('5.00');
		});

		it('should subtract three positive numbers and give a negative result', function(){
			var actual = daisy('12').minus('12').minus(3.12).equals();
			expect(actual).toBe('-3.12');
		});

		it('should yield a zero just fine', function(){
			var actual = daisy('45560').minus(45560).equals();
			expect(actual).toBe('0.00');
		});

	});

	describe('exceptions', function(){

		it('should throw an error during plus with a bad value', function(){
			try {
				daisy('DJ KHALED').plus(2);
			} catch (e){
				expect(e.message).toBe('\'DJ KHALED\' is not a valid number');
			}
		});

		it('should throw an error during minus with bad value', function(){
			try {
				daisy('3').minus('baby you smart');
			} catch (e){
				expect(e.message).toBe('\'baby you smart\' is not a valid number');
			}
		});

		it('should throw an error during equals with a bad value', function(){
			try {
				daisy('say mai naaaaaame').equals();
			} catch (e){
				expect(e.message).toBe('\'say mai naaaaaame\' is not a valid number');
			}
		});

		it('should not throw an error during init with bad value', function(){
			var result = daisy('we the best');
			expect(true).toBe(true); // if you got here, you are good.
		});

	});

});