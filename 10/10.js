function calc(input) {
  input = input.trim();
  var part1 = input;
  var part2 = input;

  for (var i = 1; i <= 50; i++) {
    var matches = input.match(/(\d)\1*/g);
    input = '';
    matches.forEach(function(match) {
      input += match.length + match[0];
    });
    if (i == 40) {
      part1 = input;
    }
  }
  part2 = input;

  setResult(1, part1.length);
  setResult(2, part2.length);
}
