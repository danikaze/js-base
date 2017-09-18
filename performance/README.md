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

##templates##
```
┌──────────┬────────────────────────────────┐
│ Platform │ Node.js 8.1.4 on Darwin 64-bit │
└──────────┴────────────────────────────────┘

Running: Template replacement...
┌───┬──────────────┬─────────┬───────────┐
│ # │ Test         │ Speed % │   Ops/sec │
├───┼──────────────┼─────────┼───────────┤
│ 1 │ pre-compiled │  100.00 │ 2,314,108 │
│ 2 │ notCompiled  │   31.00 │   717,482 │
│ 3 │ simple       │   28.78 │   665,891 │
└───┴──────────────┴─────────┴───────────┘
```
