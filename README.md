# Daisy

Daisy is a *daisy-chainable* JavaScript money calculator.

```javascript
var tax = 1.45;
var total = daisy('45').plus(tax).minus(0.2).equals();
console.log('$' + total); // $46.25
```