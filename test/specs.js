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

		describe('default behavior', function () {

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

		describe('configurable behaviors', function () {
			var options;
			beforeEach(function () {
				options = {};
			});
			afterEach(function () {
				options = null;
			});

			it('should return a number string reflective of the format param', function () {
				var input = 3456.1999,
					cents = daisy(input, {"format": "n.nn"}).equals(),
					withDollarSign = daisy(input, {"format": "$n.nn"}).equals(),
					dollars = daisy(input, {"format": "n"}).equals(),
					tens = daisy(input, {"format": "n0"}).equals(),
					hundreds = daisy(input, {"format": "n00"}).equals(),
					thousands = daisy(input, {"format": "n000"}).equals(),
					invalid = daisy(input, {"format": "stevePerry"}).equals();

				expect(cents).toBe('3456.20');
				expect(withDollarSign).toBe('$3456.20');
				expect(dollars).toBe('3456');
				expect(tens).toBe('3460');
				expect(hundreds).toBe('3500');
				expect(thousands).toBe('3000');
				expect(invalid).toBe('3456.20');
			});

			it('should return a number string grouped by commas when passed commas: true', function () {
				var actual = daisy(10000000, {"commas": true}).equals();

				// will pass in webkit/moz; fails in phantom which does not support
				// Number.prototype.toLocaleString
				// expect(actual).toBe('10,000,000.00');
			});

			it('should return a number string grouped by commas in the specified locale', function () {
				var actual = daisy(10000000, {
					"commas": true,
					"INR": true,
					"format": "n"
				}).equals();

				// will pass in webkit/moz; fails in phantom which does not support
				// Number.prototype.toLocaleString
				// expect(actual).toBe('1,00,00,000');
			});
		});

	});

	describe('plus', function(){

		it('should add two positive integers', function(){
			var actual = daisy(1).plus(1).equals();
			expect(actual).toBe('2.00');
		});
        
        it('should add zero integer to non-zero integer lazily', function(){
			var actual = daisy(0).plus(1).equals();
			expect(actual).toBe('1.00');
		});
        
        it('should add inverses', function(){
			var actual = daisy(-2).plus(2).equals();
			expect(actual).toBe('0.00');
		});
        
		it('should add three positive integers', function(){
			var actual = daisy(12).plus(14).plus(2).equals();
			expect(actual).toBe('28.00');
		});

		it('should add 0', function(){
			var actual = daisy(0).plus(1).equals();
			expect(actual).toBe('1.00');
			actual = daisy(1).plus(0).equals();
			expect(actual).toBe('1.00');
		});

	});

	describe('minus', function(){

		it('should subtract positive integers and give positive result', function(){
			var actual = daisy('8').minus(6).equals();
			expect(actual).toBe('2.00');
		});
        
        it('should subtract inverses + +', function(){
			var actual = daisy(8).minus(8).equals();
			expect(actual).toBe('0.00');
		});
        
        it('should subtract inverses - - ', function(){
			var actual = daisy(-9).minus(-9).equals();
			expect(actual).toBe('0.00');
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

		it('should subtract zero', function(){
			var actual = daisy('45').minus(0.00).equals();
			expect(actual).toBe('45.00');
		});

		it('should subtract from zero', function(){
			var actual = daisy('0').minus('12').equals();
			expect(actual).toBe('-12.00');
		});

	});

	describe('times', function(){

		it('should multiply two positive numbers', function(){
			var actual = daisy('12').times('2').equals();
			expect(actual).toBe('24.00');
			actual = daisy(12).times(1).equals();
			expect(actual).toBe('12.00');
			actual = daisy(1).times('123').equals();
			expect(actual).toBe('123.00');
		});

		it('should multiply a pos and neg number and yield a negative result', function(){
			var actual = daisy('-12').times('3').equals();
			expect(actual).toBe('-36.00');
		});

		it('should multiply in a chain', function(){
			var actual = daisy('2').plus(4).times('4').equals();
			expect(actual).toBe('24.00');
		});

		it('should multiply by zero', function(){
			var actual = daisy('3').times('0').equals();
			expect(actual).toBe('0.00');
			actual = daisy(0).times('4').equals();
			expect(actual).toBe('0.00');
		});

	});

	describe('dividedBy', function(){

		it('should divide two positve numbers', function(){
			var actual = daisy('24').dividedBy(4).equals();
			expect(actual).toBe('6.00');
			actual = daisy('24').dividedBy(1).equals();
			expect(actual).toBe('24.00');
		});

        it('should divide equal numbers', function(){
			var actual = daisy('24').dividedBy(24).equals();
			expect(actual).toBe('1.00');
		});
        
		it('should divide two negative numbers', function(){
			var actual = daisy('-12.34544').times(1.234).dividedBy('-3.44').equals();
			expect(actual).toBe('4.43');
		});

		it('should divide zero', function(){
			var actual = daisy('0').dividedBy(34234234).equals();
			expect(actual).toBe('0.00');
		});

	});

	describe('factorial', function(){

	});

	describe('NumberSet', function(){

		describe('sum', function(){

			it('should add an array of positive integers', function(){
				var actual = daisy([1, 2, 3]).sum().equals();
				expect(actual).toBe('6.00');
			});

			it('should sum an array of negative numbers and round', function(){
				var actual = daisy([
					-14.2,
					2.001,
					'-12.1'
				]).sum().equals();
				expect(actual).toBe('-24.30');
			});

		});

		describe('average', function(){

			it('should average an array of positive numbers and round', function(){
				var actual = daisy([
					'1.2',
					'4.45',
					'234.3',
					'25'
				]).average().equals();
				expect(actual).toBe('66.24');
			});

		});

		describe('max', function(){

			it('should take the max of a mixed set', function(){
				var actual = daisy([1, 2, 3, 4, -3, -1]).max().equals();
				expect(actual).toBe('4.00');
			});

			it('should take a max of invalid set with supressInvalidNumbers', function(){
				var actual = daisy([1, -10, 'baaaaaah', 10], { supressInvalidNumbers: true }).max().equals();
				expect(actual).toBe('10.00');
			});

		});

		describe('min', function(){

			it('should take the min of a mixed set', function(){
				var actual = daisy([1, 2, 3, 4, -3, -1]).min().equals();
				expect(actual).toBe('-3.00');
			});

			it('should take a min of invalid set with supressInvalidNumbers', function(){
				var actual = daisy([1, -10, 'baaaaaah'], { supressInvalidNumbers: true }).min().equals();
				expect(actual).toBe('-10.00');
			});

		});

	});

	describe('exceptions', function(){

		var passIfThrows = function(func, expectedMessage){
			var errored = false,
				actualMessage;
			try {
				func();
			} catch(e){
				errored = true;
				actualMessage = e.message;
			}
			expect(errored).toBe(true);
			expect(actualMessage).toBe(expectedMessage);
		};

		var failIfThrows = function(func){
			var errored = false;
			try { func(); } catch(e){ errored = true; }
			expect(errored).toBe(false);
		};

		it('should throw an error during plus with a bad value', function(){
			passIfThrows(function(){
				daisy('DJ KHALED').plus(2);
			}, '\'DJ KHALED\' is not a valid number');
		});

		it('should throw an error during minus with bad value', function(){
			passIfThrows(function(){
				daisy('3').minus('baby you smart');
			}, '\'baby you smart\' is not a valid number');
		});

		it('should throw an error during equals with a bad value', function(){
			passIfThrows(function(){
				daisy('say mai naaaaaame').equals();
			}, '\'say mai naaaaaame\' is not a valid number');
		});

		it('should not throw an error during init with bad value', function(){
			failIfThrows(function(){
				var result = daisy('we the best');
			});
		});

		it('should throw an error if summing an empty set', function(){
			passIfThrows(function(){
				daisy([]).sum();
			}, 'cannot operate on empty set');
		});

		it('should throw an error if averaging an empty set', function(){
			passIfThrows(function(){
				daisy([]).average();
			}, 'cannot operate on empty set');
		});

		it('should not throw an error during init with empty set', function(){
			failIfThrows(function(){
				daisy([]);
			});
		});

		it('should throw an error if summing a set with a bad value', function(){
			passIfThrows(function(){
				daisy(['2', '-2', 'ITUNES NEEDS MORE SERVERS']).sum().equals();
			}, '\'ITUNES NEEDS MORE SERVERS\' is not a valid number');
		});

		it('should throw an error if averaging a set with a bad value', function(){
			passIfThrows(function(){
				daisy([-2, -1, 0, 2, 'fishsticks', 3]).average();
			}, '\'fishsticks\' is not a valid number');
		});

		it('should throw an error if calling reduce on an empty or null array', function(){
			passIfThrows(function(){
				[].reduce(function(){});
			}, 'Reduce of empty array with no initial value');
			passIfThrows(function(){
				[1, 2].reduce('notAFunction');
			}, 'notAFunction is not a function');
		});

		it('should throw a div by zero exception', function(){
			passIfThrows(function(){
				daisy('4').dividedBy(0);
			}, 'divided \'4\' by zero');
		});

		it('should thrown exception when getting max or min of empty set', function(){
			passIfThrows(function(){
				daisy([]).max().equals();
			}, 'cannot operate on empty set');
			passIfThrows(function(){
				daisy([]).min();
			}, 'cannot operate on empty set');
		});

	});

	describe('options', function(){

		it('should assume divide by zero is zero if supressDivideByZero', function(){
			var actual = daisy('3', {
				format: '$n.nn',
				supressDivideByZero: true
			}).dividedBy(0).equals();
			expect(actual).toBe('$0.00');
		});

		it('should assume zero for invalid numbers if supressInvalidNumbers', function(){
			var actual = daisy('3', { supressInvalidNumbers: true }).plus('meh').equals();
			expect(actual).toBe('3.00');
		});

		it('should sum an invalid set if supressInvalidNumbers', function(){
			var actual = daisy([
				'not',
				'actual',
				'numbers'
			], {
				supressInvalidNumbers: true
			}).sum().equals();
			expect(actual).toBe('0.00');
		});

		it('should take the average of an invalid set if supressInvalidNumbers', function(){
			var actual = daisy([
				'1',
				'2',
				'boop'
			], {
				supressInvalidNumbers: true
			}).average().equals();
			expect(actual).toBe('1.00');
		});

	});

});