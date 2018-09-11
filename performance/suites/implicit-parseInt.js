const Benchmark = require('benchmark');

const N = 1000;

const year = '2018';
const month = '03';
const day = '09';
const hours = '12';
const minutes = '34';
const seconds = '56';

/*
 * testers
 */
function manual() {
  Date.UTC(parseInt(year), parseInt(month), parseInt(day), parseInt(hours), parseInt(minutes), parseInt(seconds));
}

function manualBase() {
  Date.UTC(parseInt(year, 10), parseInt(month, 10), parseInt(day, 10), parseInt(hours, 10), parseInt(minutes, 10), parseInt(seconds, 10));
}

function auto() {
  Date.UTC(year, month, day, hours, minutes, seconds);
}

/*
 * tests
 */
const suite = new Benchmark.Suite('Implicit vs explicit parseInt conversion');

suite.add('manual', manual)
     .add('manualBase', manualBase)
     .add('auto', auto);

module.exports = suite;
