# Daisy

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/) [![Build Status](http://travis-ci.org/arecker/Daisy.svg?branch=master)](http://travis-ci.org/arecker/Daisy) [![Coverage Status](https://coveralls.io/repos/arecker/Daisy/badge.svg?branch=master)](https://coveralls.io/r/arecker/Daisy?branch=master)

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
console.log('$' + fee);
> '$5.50'
```