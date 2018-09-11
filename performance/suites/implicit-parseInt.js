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
  for (let i = 0; i < N; i++) {
    Date.UTC(parseInt(year), parseInt(month), parseInt(day), parseInt(hours), parseInt(minutes), parseInt(seconds));
  }
}

function manualBase() {
  for (let i = 0; i < N; i++) {
    Date.UTC(parseInt(year, 10), parseInt(month, 10), parseInt(day, 10), parseInt(hours, 10), parseInt(minutes, 10), parseInt(seconds, 10));
  }
}

function number() {
  for (let i = 0; i < N; i++) {
    Date.UTC(Number(year), Number(month), Number(day), Number(hours), Number(minutes), Number(seconds));
  }
}

function auto() {
  for (let i = 0; i < N; i++) {
    Date.UTC(year, month, day, hours, minutes, seconds);
  }
}

/*
 * tests
 */
const suite = new Benchmark.Suite('Implicit vs explicit parseInt conversion');

suite.add('parseInt(x)', manual)
     .add('parseInt(x, 10)', manualBase)
     .add('Number(x)', number)
     .add('auto', auto);

module.exports = suite;
