# Daisy

[![Built with Grunt](http://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/) [![Build Status](http://travis-ci.org/arecker/Daisy.svg?branch=master)](http://travis-ci.org/arecker/Daisy) [![Coverage Status](http://coveralls.io/repos/arecker/Daisy/badge.svg?branch=master)](https://coveralls.io/r/arecker/Daisy?branch=master) [![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/arecker/Daisy/blob/master/LICENSE)

Daisy is a *daisy-chainable* JavaScript money calculator.

```javascript
var tax = 1.45;
var total = daisy('45').plus(tax).minus(0.2).equals();

console.log('$' + total);
> '$46.25'
```

Daisy handles sets too!
```javascript
var payments = [1, 2, 3];
var totalRevenue = daisy(payments).sum().equals();
console.log('$' + totalRevenue);
> '$6.00'

var averagePayment = daisy(payments).average().equals();
console.log('$' + averageRevenue);
> '$2.00'

var fee = 0.50,
	netTotal = daisy(payments).sum().minus(fee).equals();
console.log('$' + netTotal);
> '$5.50'
```

Daisy rounds values and is flexible enough to take any number-like type

```javascript
var total = daisy('1.437').plus(1).equals();
console.log('$' + total);
> '$2.44'
```

## Building the Project

To build daisy, just clone the project and run ```npm install```.  To execute the linter and tests, just run ```grunt```.