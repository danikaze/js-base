var Benchmark = require('benchmark');

var str1 = '#c1text1 text1 #ab text 1 short';
var str2 = '#c2 text 2 long text #zzz lots of commands #bg more text #zzz#c1long'
    + 'text all cases#c2 text 2 long text #zzz lots of commands #bg more text #zzz#c1long text all case'
    + 'text all cases#c2 text 2 long text #zzz lots of commands #bg more text #zzz#c1long text all case'
    + 'text all cases#c2 text 2 long text #zzz lots of commands #bg more text #zzz#c1long text all case#fg';
var commands = ['#c1', '#c2', '#ab', '#zzz', '#fg', '#bg'];

var bigRegExpOne = new RegExp('(' + commands.join(')|(') + ')', 'g');
var listRegExpOne = commands.map(function (c) { return new RegExp(c, 'g'); });
var bigRegExpMultiple = new RegExp('(^' + commands.join(')|(^') + ')');
var listRegExpMultiple = commands.map(function (c) { return new RegExp('^' + c); });

/*
 * testers
 */
function oneBigRegExpOneShot(text) {
    var matches = [];
    var match;
    while (match = bigRegExpOne.exec(text)) {
        matches.push({ i: match.index, command: match[0] });
    }

    var m = 0;
    var i = 0;
    while (i < text.length && m < matches.length) {
        var nextMatch = matches[m].i;
        while (i < nextMatch) {
            i++;
        }
        i += matches[m].command.length;
        m++;
    }
    while (i < text.length) {
        while (i < text.length) {
            i++;
        }
    }
}

function listOfRegExpOneShot(text) {
    var matches = [];
    var match;
    for (var r = 0; r < listRegExpOne.length; r++) {
        var re = listRegExpOne[r];
        while (match = re.exec(text)) {
            matches.push({ i: match.index, command: match[0] });
        }
    }
    matches.sort(function (a, b) {
        return a.i - b.i;
    });

    var m = 0;
    var i = 0;
    while (i < text.length && m < matches.length) {
        var nextMatch = matches[m].i;
        while (i < nextMatch) {
            i++;
        }
        i += matches[m].command.length;
        m++;
    }
    while (i < text.length) {
        while (i < text.length) {
            i++;
        }
    }
}

function oneBigRegExpMultiple(text) {
    function checkCommand(text, i) {
        const match = bigRegExpMultiple.exec(text.substring(i));
        return match ? match[0].length : 0;
    }

    for (var i = 0; i < text.length; i++) {
        var length = checkCommand(text, i);
        if (length > 0) {
            i += length - 1;
        }
    }
}

function listOfRegExpMultiple(text) {
    function checkCommand(text, i) {
        for (var c = 0; c < listRegExpMultiple.length; c++) {
            if (listRegExpMultiple[c].test(text.substring(i))) {
                return commands[c].length;
            }
        }

        return 0;
    }

    for (var i = 0; i < text.length; i++) {
        var length = checkCommand(text, i);
        if (length > 0) {
            i += length - 1;
        }
    }
}

function charByChar(text) {
    function checkCommand(text, i) {
        for (var c = 0; c < commands.length; c++) {
            var command = commands[c];
            if (text.substr(i, command.length) === command) {
                return command.length;
            }
        }

        return 0;
    }

    for (var i = 0; i < text.length; i++) {
        var length = checkCommand(text, i);
        if (length > 0) {
            i += length - 1;
        }
    }
}

/*
 * tests
 */
var suite = new Benchmark.Suite('String parse');

suite.add('oneBigRegExpOneShot-short', oneBigRegExpOneShot.bind(null, str1))
     .add('listOfRegExpOneShot-short', listOfRegExpOneShot.bind(null, str1))
     .add('oneBigRegExpMultiple-short', oneBigRegExpMultiple.bind(null, str1))
     .add('listOfRegExpMultiple-short', listOfRegExpMultiple.bind(null, str1))
     .add('charByChar-short', charByChar.bind(null, str1))
     .add('oneBigRegExpOneShot-long', oneBigRegExpOneShot.bind(null, str2))
     .add('listOfRegExpOneShot-long', listOfRegExpOneShot.bind(null, str2))
     .add('oneBigRegExpMultiple-long', oneBigRegExpMultiple.bind(null, str2))
     .add('listOfRegExpMultiple-long', listOfRegExpMultiple.bind(null, str2))
     .add('charByChar-long', charByChar.bind(null, str2));

module.exports = suite;
