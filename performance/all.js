const Benchmark = require('benchmark');
const requireAll = require('require-all');
const tableFormatter = require('table');
const colors = require('colors');
const prompt = require('prompt');

/*
 * Load all suites from ./suites
 */
function loadSuites() {
  const list = [];
  const files = requireAll({ dirname: `${__dirname}/suites` });
  Object.keys(files).forEach((fileName) => {
    list.push(files[fileName]);
  });
  return list;
}

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

  const tableOptions = {
    columns: {
      0: { alignment: 'right' },
      1: { alignment: 'left' },
      2: { alignment: 'right' },
      3: { alignment: 'right' },
    },
    drawHorizontalLine: (index, size) => index <= 1 || index === size,
    border: tableFormatter.getBorderCharacters('norc'),
  };
  const tableData = [['#'.red, 'Test'.red, 'Speed %'.red, 'Hz'.red]];
  tests.forEach((test, i) => {
    const speed = i === 0 ? '100.00' : (100*test.hz/fastestHz).toFixed(2);
    tableData.push([i+1, test.name, speed, formatNumber(test.hz, 0, 0)]);
  });
  console.log(tableFormatter.table(tableData, tableOptions));
}

/*
 * Show system information
 */
function showIntro(suites) {
  const tableOptions = { border: tableFormatter.getBorderCharacters('norc') };
  const tableData = [];

  tableData.push(['Platform'.grey, Benchmark.platform.description]);

  console.log('Run the script with '.grey + '-i' + ' to enable the interactive mode.'.grey);
  console.log(tableFormatter.table(tableData, tableOptions));
}

/*
 * Show closing information
 */
function showEnd() {
  console.log('️️✔'.green + ' All suites finished.');
  console.log('');
}

/*
 * Show message of interruption
 */
function showInterruption() {
  console.log('✗'.red + ' Exiting.');
  console.log('');
}

/*
 * Stop the execution
 */
function abortSuites(suites) {
  suites.forEach((suite) => {
    suite.abort();
  });
  showInterruption();
}

/*
 * Execute suites
 */
function executeSuites(suites) {
  function next() {
    suitesFinished++;
    if(suitesFinished === suites.length) {
      showEnd();
    } else {
      confirmSuiteExecution(suites[suitesFinished]);
    }
  }

  function runSuite(suite) {
    let finished = [];
    let i = 1;

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
      next();
    }).run();
  }

  function confirmSuiteExecution(suite) {
    if(interactiveRun) {
      prompt.get({
        name: 'run',
        message: 'Run test ' + suite.name.yellow + '? [' + 'Y'.green + 'es'.white + '|' + 'N'.white + 'o|' + 'E'.white + 'xit]',
        validator: /y(es)?|n(o)?|e(xit)?/i,
      }, (err, result) => {
        if(!result) {
          showInterruption();
          return;
        } else if(!result.run || result.run[0].toLowerCase() === 'y') {
          runSuite(suite);
        } else if(result.run[0].toLowerCase() === 'e') {
          showInterruption();
          return;
        } else {
          next();
        }
      });
    } else {
      runSuite(suite);
    }
  }

  let suitesFinished = 0;
  confirmSuiteExecution(suites[suitesFinished]);
}

/*
 * Gracefully handle exit signals
 */
process.on('SIGINT', () => {
  console.log('Exiting due to SIGINT');
  abortSuites(suites);
  process.exit();
});
process.on('SIGTERM', () => {
  console.log('Exiting due to SIGTERM');
  abortSuites(suites);
  process.exit();
});

const interactiveRun = process.argv.indexOf('-i') !== -1;
const suites = loadSuites();
showIntro(suites);
executeSuites(suites);
