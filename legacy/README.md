# Legacy prototype

`Zebradoodle.java` is the original 2022 prototype: a Java CLI Wordle clone that
read 26 per-letter word lists off disk and ran in the console.

It is kept here exactly as-is for posterity. The scoring algorithm in
`src/lib/scoring.js` is a direct port of its `compare()` method - same
"each answer letter satisfies one guess tile at most, correct positions
consume first" rule for repeats.
