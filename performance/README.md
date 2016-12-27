# Performance test results #

Obviously, the test results will vary depending on the environment, but here are results of each
one for that lazy people who don't want to clone the repository and run it in their own
environment.

##array-iterator##
```
┌──────────┬────────────────────────────────┐
│ Platform │ Node.js 6.2.0 on Darwin 64-bit │
└──────────┴────────────────────────────────┘

Running: Array iterators...
┌───┬────────────────────┬─────────┬───────────┐
│ # │ Test               │ Speed % │   Ops/sec │
├───┼────────────────────┼─────────┼───────────┤
│ 1 │ classicWhileCached │  100.00 │ 9,672,574 │
│ 2 │ classicFor         │   99.95 │ 9,667,644 │
│ 3 │ classicWhile       │   98.83 │ 9,559,625 │
│ 4 │ classicForCached   │   88.96 │ 8,604,408 │
│ 5 │ reverseWhile       │   67.72 │ 6,550,118 │
│ 6 │ forEach            │    6.64 │   642,645 │
└───┴────────────────────┴─────────┴───────────┘
```
```
┌──────────┬───────────────────────────────┐
│ Platform │ Node.js 6.3.0 on Win32 64-bit │
└──────────┴───────────────────────────────┘

Running: Array iterators...
┌───┬────────────────────┬─────────┬───────────┐
│ # │ Test               │ Speed % │   Ops/sec │
├───┼────────────────────┼─────────┼───────────┤
│ 1 │ classicFor         │  100.00 │ 6,074,862 │
│ 2 │ classicForCached   │   99.98 │ 6,073,408 │
│ 3 │ classicWhile       │   99.91 │ 6,069,596 │
│ 4 │ classicWhileCached │   99.85 │ 6,065,462 │
│ 5 │ reverseWhile       │   83.87 │ 5,095,000 │
│ 6 │ forEach            │    8.89 │   539,800 │
└───┴────────────────────┴─────────┴───────────┘
```

##context##
```
┌──────────┬───────────────────────────────┐
│ Platform │ Node.js 6.3.0 on Win32 64-bit │
└──────────┴───────────────────────────────┘

Running: Function context...
┌───┬─────────────────┬─────────┬────────────┐
│ # │ Test            │ Speed % │    Ops/sec │
├───┼─────────────────┼─────────┼────────────┤
│ 1 │ contextFunction │  100.00 │ 44,246,950 │
│ 2 │ contextBind     │   77.74 │ 34,395,550 │
└───┴─────────────────┴─────────┴────────────┘
```

##object-iterator##
```
┌──────────┬────────────────────────────────┐
│ Platform │ Node.js 6.2.0 on Darwin 64-bit │
└──────────┴────────────────────────────────┘

Running: Object iterators...
┌───┬────────────────┬─────────┬─────────┐
│ # │ Test           │ Speed % │ Ops/sec │
├───┼────────────────┼─────────┼─────────┤
│ 1 │ keysForEach    │  100.00 │  81,808 │
│ 2 │ keysForClassic │   95.47 │  78,105 │
│ 3 │ forInRaw       │   68.56 │  56,088 │
│ 4 │ forInCheck     │   48.35 │  39,557 │
└───┴────────────────┴─────────┴─────────┘
```

```
┌──────────┬───────────────────────────────┐
│ Platform │ Node.js 6.3.0 on Win32 64-bit │
└──────────┴───────────────────────────────┘

Running: Object iterators...
┌───┬────────────────┬─────────┬─────────┐
│ # │ Test           │ Speed % │ Ops/sec │
├───┼────────────────┼─────────┼─────────┤
│ 1 │ keysForClassic │  100.00 │  69,765 │
│ 2 │ keysForEach    │   94.08 │  65,633 │
│ 3 │ forInRaw       │   72.14 │  50,326 │
│ 4 │ forInCheck     │   53.24 │  37,146 │
└───┴────────────────┴─────────┴─────────┘
```

##string-concat##
```
┌──────────┬────────────────────────────────┐
│ Platform │ Node.js 6.2.0 on Darwin 64-bit │
└──────────┴────────────────────────────────┘

Running: String concatenation...
┌───┬───────────────────────────┬─────────┬────────────┐
│ # │ Test                      │ Speed % │    Ops/sec │
├───┼───────────────────────────┼─────────┼────────────┤
│ 1 │ doubleQuotesConcatenation │  100.00 │ 15,677,943 │
│ 2 │ singleQuotesConcatenation │   99.58 │ 15,611,977 │
│ 3 │ parsedConcatenation       │   49.70 │  7,792,467 │
│ 4 │ joinConcatenation         │    6.34 │    994,071 │
└───┴───────────────────────────┴─────────┴────────────┘
```

```
┌──────────┬───────────────────────────────┐
│ Platform │ Node.js 6.3.0 on Win32 64-bit │
└──────────┴───────────────────────────────┘

Running: String concatenation...
┌───┬───────────────────────────┬─────────┬────────────┐
│ # │ Test                      │ Speed % │    Ops/sec │
├───┼───────────────────────────┼─────────┼────────────┤
│ 1 │ doubleQuotesConcatenation │  100.00 │ 19,267,469 │
│ 2 │ singleQuotesConcatenation │   99.68 │ 19,206,046 │
│ 3 │ parsedConcatenation       │   52.13 │ 10,044,500 │
│ 4 │ joinConcatenation         │    4.38 │    844,609 │
└───┴───────────────────────────┴─────────┴────────────┘
```
