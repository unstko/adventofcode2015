function calc(input) {
  var total = 150;
  var containers = input.split('\n');
  var count = [];

  findCombination(total, containers, count, 0);
  var combinations = count.reduce(function(a, b) {
    return parseInt(a) + parseInt(b);
  });
  var combinations_min = 0;
  for (var minimum in count) {
    combinations_min = minimum;
    break;
  }

  setResult(1, combinations);
  setResult(2, combinations_min);
}

function findCombination(total, containers, count, depth) {
  if (total < 0) {
    return;
  } else if (!total) {
    if (count[depth] === undefined) {
      count[depth] = 1;
    } else {
      count[depth]++;
    }
    return;
  } else {
    var container = parseInt(containers[0]);
    if (!container) return;
    findCombination(total-container, containers.slice(1), count, depth+1);
    findCombination(total, containers.slice(1), count, depth);
  }
}
