var Benchmark = require('benchmark');

var suite = new Benchmark.Suite;
var fs = require('fs');
eval(fs.readFileSync('./src/daisy.js')+'');

suite.add('Addition Test', function(){
    daisy('123').plus(-123.00).plus(233.343).plus('12').equals();
})

.add('Subtraction Test', function(){
    daisy('123').minus(-123.00).minus(233.343).minus('12').equals();
})

.add('Multiplication Test', function(){
    daisy('32445').times(4).times('43').times(1).times(-2).equals();
})

.add('Division Test', function(){
    daisy('32445').dividedBy(4).dividedBy('43').dividedBy(1).dividedBy(-2).equals();
})

.add('Average Test', function(){
    daisy([1, 44, 33, 554, 3, 2, 3, 454, 5, 34]).average().equals();
})

.add('Sum Test', function(){
    daisy([1, 44, 33, 554, 3, 2, 3, 454, 5, 34]).sum().equals();
})

.add('Max Test', function(){
    daisy([45,1,6,54,5,5,1,212,5,8,4,54,8,78,9,87,7,78,9,89,4,54]).max().equals();
})

.add('Max Test (supress invalid)', function(){
    daisy([45,1,6,54,5, '-12.00', 'woop',5,1,212,5,8,4,54,8,78,9,87,7,78,9,89,4,54], { supressInvalidNumbers: true }).max().equals();
})

.add('Min Test', function(){
    daisy([45,1,6,54,5,5,1,212,5,8,4,54,8,78,9,87,7,78,9,89,4,54]).min().equals();
})

.add('Min Test (supress invalid)', function(){
    daisy([45,1,6,54,5, '-12.00', 'woop',5,1,212,5,8,4,54,8,78,9,87,7,78,9,89,4,54], { supressInvalidNumbers: true }).min().equals();
})

.on('cycle', function(event) {
  console.log(String(event.target));
})

.run({ 'async': true });