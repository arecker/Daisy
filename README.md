# Daisy

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
	format: "$n.nn"
}).plus(1).equals(); // '$4.00'

var riskyAnswer = daisy('MEH', { 
	supressInvalidNumbers: true 
}).minus('3').equals(); // '-3.00'

var roundReallyHigh = daisy(123456789, {
	format: "n00000000",
	round: "up"
}).equals(); // '200000000'

var commaFormatting = daisy(12345, {
	commas: true,
}).equals(); // '12,345.00'

var internationalSupport = daisy(1234567, {
	commas: true,
	INR: true
}).equals(); // '12,34,567.00'
```

## Contributing

To build the project, install dependencies by running ```npm install```, and run tests manually with ```grunt``` or continually by running ```grunt watch```.  If a change to daisy's source is made, please rebuild the minified source with ```grunt build```.