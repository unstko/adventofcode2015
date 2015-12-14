function calc(input) {
  input = input.trim();

  var sum1 = sumNumbers(input);
  var input_masked = maskObjectsWithRed(input);
  var sum2 = sumNumbers(input_masked);

  setResult(1, sum1);
  setResult(2, sum2);
}

function sumNumbers(input) {
  var matches = input.match(/(-*\d+)/g);
  var sum = matches.reduce(function(a, b) {
    return parseInt(a) + parseInt(b);
  });
  return sum;
}

function maskObjectsWithRed(input) {
  var positions = [];
  var has_red = false;
  var level = -1;
  for (var i = 0; i < input.length; i++) {
    if (input.substr(i, 6) === ':"red"' && !has_red) {
      has_red = true;
      level = positions.length-1;
    } else if (input.charAt(i) === '{') {
      positions.push(i);
    } else if (input.charAt(i) === '}') {
      var j = positions.pop();
      if (has_red && positions.length === level) {
        input = input.replace(input.slice(j, i+1), '#'.repeat(i-j+1));
        has_red = false;
        level = -1;
      }
    }
  }
  return input;
}
