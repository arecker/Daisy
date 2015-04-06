![](http://i.imgur.com/9cVnhPZ.jpg)

[![Built with Grunt](http://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/) [![Build Status](http://travis-ci.org/arecker/Daisy.svg?branch=master)](http://travis-ci.org/arecker/Daisy) [![Coverage Status](http://coveralls.io/repos/arecker/Daisy/badge.svg?branch=master)](https://coveralls.io/r/arecker/Daisy?branch=master) [![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/arecker/Daisy/blob/master/LICENSE)

## Computations

Daisy can run chainable calculations

```javascript
var tax = '3.00',
	price = 23,
	discount = 4,
	total = daisy(price).plus(tax).equals(), // '26.00'
	totalAfterDiscount = daisy(total).minus(discount).equals(); // '22.00'
```

Daisy can handle number sets too

```javascript
var payments = [ 4.00, 2.0, 2.3, 6.0 ],
	processingFee = '1',
	revenue = daisy(payments).sum().minus(processingFee).equals(), // '13.30'
	averagePayment = daisy(payments).average().equals(), // 3.58
	maxPayment = daisy(payments).max().equals(), // '6.00'
	halfOfMax = daisy(payments).max().dividedBy(2).equals(); // '3.00'
```

## Options

Daisy's behavior can be configured

```javascript
var answer = daisy(3, {
	supressDivideByZero: true
}).dividedBy(0).equals(); // '0.00'

var total = daisy(3, {
	printDollarSign: true
}).plus(1).equals(); // '$4.00'

var riskyAnswer = daisy('MEH', {
	supressInvalidNumbers: true
}).minus('3').equals(); // '-3.00'
```

## Contributing

To build the project, install dependencies by running ```npm install```, and run tests manually with ```grunt``` or continually by running ```grunt watch```.  If a change to daisy's source is made, please rebuild the minified source with ```grunt build```.

To run benchmarks, ```cd``` to Daisy's root directory and run ```node ./test/benchmarks.js```
