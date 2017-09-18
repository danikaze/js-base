const Benchmark = require('benchmark');

function simpleReplacement(txt, data) {
  var i, d;

  for(i in data) {
    txt = txt.replace(new RegExp(i, 'g'), d);
  }

  return txt;
};

/**
 *
 *
 * @param {string}     template
 * @param {object}     [options]
 * @param {boolean}    [options.caseInsensitive]
 * @param {string}     [options.placeholderPrefix] Needs to be escaped for RegExp
 * @param {string}     [options.placeholderSuffix] Needs to be escaped for RegExp
 * @returns {string[]}
 */
function compileTemplate(template, options) {
  options = Object.assign({
    caseInsensitive: false,
    placeholderPrefix: '{{',
    placeholderSuffix: '}}',
  }, options);

  var reString = options.placeholderPrefix+ '([a-zA-z_][a-zA-z_0-9]+)' + options.placeholderSuffix;
  var re = new RegExp(reString, options.caseInsensitive ? 'gi' : 'g');
  var last = 0;
  var compiledTemplate = [];

  var match = re.exec(template);
  while(match) {
    compiledTemplate.push(template.substring(last, match.index));
    compiledTemplate.push(match[1]);
    last = match.index + match[0].length;
    match = re.exec(template);
  }

  if (last < template.length) {
    compiledTemplate.push(template.substring(last));
  }

  return compiledTemplate;
}

function applyTemplate(template, values, options) {
  if (typeof template === 'string') {
    template = compileTemplate(template, options);
  }
  var isPlaceholder = false;
  var res = template[0];
  var i;

  for (i = 1; i < template.length; i++) {
    isPlaceholder = !isPlaceholder;
    if (isPlaceholder) {
      res += values[template[i]];
    } else {
      res += template[i];
    }
  };

  return res;
}


var template = 'Basic template. foo: {{foo}} / bar: {{bar}} / hoge: {{hoge}}.';
var templateValues = { foo: 123, bar: 456, hoge: 789 };
var compiledTemplate = compileTemplate(template);
var text = applyTemplate(compiledTemplate, templateValues);

/*
 * tests
 */
const suite = new Benchmark.Suite('Template replacement');

suite.add('simple', simpleReplacement.bind(null, template, templateValues))
     .add('notCompiled', applyTemplate.bind(null, template, templateValues))
     .add('pre-compiled', applyTemplate.bind(null, compiledTemplate, templateValues));

module.exports = suite;
