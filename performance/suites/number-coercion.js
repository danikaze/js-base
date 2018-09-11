const Benchmark = require('benchmark');

const N = 1000;
const number = "123456.7890";

/*
 * testers
 */
function useParseInt() {
  for (let i = 0; i < N; i++) {
    parseInt(number, 10);
  }
}

function useParseFloat() {
  for (let i = 0; i < N; i++) {
    parseFloat(number);
  }
}

function useNumber() {
  for (let i = 0; i < N; i++) {
    Number(number);
  }
}

function useNumberFloor() {
  for (let i = 0; i < N; i++) {
    Math.floor(Number(number));
  }
}

function useNumberBitwise() {
  for (let i = 0; i < N; i++) {
    Number(number) | 0;
  }
}

/*
 * tests
 */
const suite = new Benchmark.Suite('Number coercion');

suite.add('parseInt(x, 10)', useParseInt)
     .add('parseFloat(x)', useParseFloat)
     .add('Math.floor(Number(x))', useNumberFloor)
     .add('Number(x)', useNumber)
     .add('Number(x) | 0', useNumberBitwise);

module.exports = suite;
