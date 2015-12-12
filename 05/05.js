function calc(input) {
  var strings = input.split('\n');
  var nice1 = 0;
  var nice2 = 0;

  strings.forEach(function(string) {
    if (string === "") return;

    // Part 1
    var vowels = string.replace(/[^aeiou]/gi, "").length;
    vowels = (vowels < 3) ? false : true;

    var duplicates = string.search(/([a-z])\1+/gi);
    duplicates = (duplicates < 0) ? false : true;

    var banned = string.search(/ab|cd|pq|xy/gi);
    banned = (banned >= 0) ? false : true;

    if (vowels && duplicates && banned) nice1++;

    // Part 2
    var repeat = string.search(/([a-z][a-z])[a-z]*\1/gi);
    repeat = (repeat < 0) ? false : true;

    var between = string.search(/([a-z])[a-z]{1}\1/gi);
    between = (between < 0) ? false : true;

    if (repeat && between) nice2++;
  });

  setResult(1, nice1);
  setResult(2, nice2);
}
