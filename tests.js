describe('daisy', function(){

	it('should not be undefined', function(){
		expect(daisy).not.toBe(undefined);
	});

	it('should be a function', function(){
		expect(typeof daisy).toBe('function');
	});

});