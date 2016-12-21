const Benchmark = require('benchmark');
const requireAll = require('require-all');
const Table = require('cli-table');
const colors = require('colors');

/*
 * Load all suites from ./suites
 */
const suites = (() => {
  const list = [];
  const files = requireAll({ dirname: `${__dirname}/suites` });
  Object.keys(files).forEach((fileName) => {
    list.push(files[fileName]);
  });
  return list;
})();

/*
 * Show results for a suite tests as a table
 */
function showSuiteResult(name, tests) {
  if(!tests || !tests.length) {
    return;
  }

  tests.sort((a, b) => {
    return b.hz - a.hz;
  });

  const fastestHz = tests[0].hz;
  //console.log(`Test results for ${name}:`);
  const table = new Table({
    chars    : {'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': ''},
    head     : ['#'.red, 'Test'.red, 'Speed %'.red, 'Hz'.red],
    colAligns: ['right', 'left', 'right', 'right'],
  });
  tests.forEach((test, i) => {
    const speed = i === 0 ? '100.00' : (100*test.hz/fastestHz).toFixed(2);
    table.push([i+1, test.name, speed, parseInt(test.hz, 10)]);
  });
  console.log(table.toString());
}

/*
 * Execute suites
 */
suites.forEach((suite) => {
  let finished = [];
  let i = 1;

  console.log('');
  console.log('Running: ' + String(suite.name).yellow + '...');
  suite.on('cycle', (event) => {
    const test = event.target;
    const testN = `[${i++}/${suite.length}]`;
    const testName = test.name;
    const testDetails = `x ${test.hz} ops/sec ±${test.stats.rme.toFixed(2)} (${test.stats.sample.length} runs sampled)`;
    console.log(` ${testN.cyan} ${testName.white} ${testDetails.gray}`);
    finished.push(event.target);
  }).on('complete', () => {
    showSuiteResult(suite.name, finished);
    process.exit(0);
  }).run();
});

/*
 * Gracefully handle exit signals
 */
process.on('SIGINT', () => {
  console.log('Exiting due to SIGINT');
});
process.on('SIGTERM', () => {
  console.log('Exiting due to SIGTERM');
});
