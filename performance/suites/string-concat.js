const Benchmark = require('benchmark');

const str = 'variable string 1';

/*
 * testers
 */
function singleQuotesConcatenation() {
  return 'Lorem ipsum dolor sit amet,' +
         ' consectetur adipiscing elit.' +
         ' Mauris rhoncus felis in tortor' +
         ' tristique posuere.' +
         ' In viverra ut nunc non fringilla.' +
         ' Nam ullamcorper venenatis pulvinar.' +
         str + str + str + str + str + str;
}

function doubleQuotesConcatenation() {
  return "Lorem ipsum dolor sit amet," +
         " consectetur adipiscing elit." +
         " Mauris rhoncus felis in tortor" +
         " tristique posuere." +
         " In viverra ut nunc non fringilla." +
         " Nam ullamcorper venenatis pulvinar." +
         str + str + str + str + str + str;
}

function joinConcatenation() {
  return ['Lorem ipsum dolor sit amet,',
         ' consectetur adipiscing elit.',
         ' Mauris rhoncus felis in tortor',
         ' tristique posuere.',
         ' In viverra ut nunc non fringilla.',
         ' Nam ullamcorper venenatis pulvinar.',
         str, str, str, str, str, str].join('');
}

function parsedConcatenation() {
  return `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rhoncus felis in tortor tristique posuere. In viverra ut nunc non fringilla. Nam ullamcorper venenatis pulvinar. ${str} ${str} ${str} ${str} ${str} ${str}`;
}

/*
 * tests
 */
const suite = new Benchmark.Suite('String concatenation');

suite.add('singleQuotesConcatenation', singleQuotesConcatenation)
     .add('doubleQuotesConcatenation', doubleQuotesConcatenation)
     .add('joinConcatenation', joinConcatenation)
     .add('parsedConcatenation', parsedConcatenation);

module.exports = suite;
