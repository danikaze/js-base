const fs = require('fs');
const path = require('path');
const runner = require('./test');

const classPath = path.join(__dirname, '..');

console.log('Classes test: start');

fs.readdir(classPath, function(err, files) {
  let done = 0;
  let passed = 0;
  let failed = 0;

  if(err) {
    console.error(err);
    process.exit(1);
  }

  files.forEach(function(file) {
    if(/^Class.*js$/.exec(file)) {
      const Klass = require(path.join(classPath, file));
      try {
        runner(Klass);
        passed++;
        console.log(` - ${file}: test passed.`);
      } catch(err) {
        failed++;
        console.log(` - ${file}: test failed.`);
        console.log(err);
      }
    }

    if(++done === files.length) {
      end(passed, failed);
    }
  });
});

function end(passed, failed) {
  console.log(`Classes test: done. (${passed}/${passed+failed} tests passed)`);
  process.exit(0);
}
