// Part 1: Floor number at end
// Part 2: Position of first -1
function calc(input) {
  var floor = 0;
  var pos = 0;
  for (var i = 0, var len = input.length; i < len; i++) {
    var char = input[i];
    switch (char) {
      case '(':
        floor++;
        break;
        case ')':
        floor--;
        break;
      default:
        break;
    }
    if (!pos && floor == -1) {
      pos = i+1;
    }
  }

  setResult(1, floor);
  setResult(2, pos);
}
