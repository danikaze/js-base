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
 * Display numbers with locale format
 */
function formatNumber(n, min, max) {
  return n.toLocaleString('en-US', {
    minimumFractionDigits: min != null ? min : 0,
    maximumFractionDigits: max != null ? max : 2,
  });
}

/*
 * Show results for a suite tests as a table
 */
function showSuiteResult(tests, name) {
  if(!tests || !tests.length) {
    return;
  }

  tests.sort((a, b) => {
    return b.hz - a.hz;
  });

  const fastestHz = tests[0].hz;
  if(name) {
    console.log(`Test results for ${name.yellow}:`);
  }
  const table = new Table({
    chars    : {'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': ''},
    head     : ['#'.red, 'Test'.red, 'Speed %'.red, 'Hz'.red],
    colAligns: ['right', 'left', 'right', 'right'],
  });
  tests.forEach((test, i) => {
    const speed = i === 0 ? '100.00' : (100*test.hz/fastestHz).toFixed(2);
    table.push([i+1, test.name, speed, formatNumber(test.hz, 0, 0)]);
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
    const testDetails = `x ${formatNumber(test.hz, 0, 0)} ops/sec ±${test.stats.rme.toFixed(2)} (${test.stats.sample.length} runs sampled)`;
    console.log(` ${testN.cyan} ${testName.white} ${testDetails.gray}`);
    finished.push(event.target);
  }).on('complete', () => {
    showSuiteResult(finished);
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
