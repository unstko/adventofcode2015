function calc(input) {
  var persons = new Set();
  var happiness = [];

  var neighbors = input.split('\n');
  neighbors.forEach(function(neighbor) {
    if (neighbor === "") return;

    var matches = neighbor.match(/(\w+) would (gain|lose) (\d+) happiness units by sitting next to (\w+)/);
    var person1 = matches[1];
    var direction = matches[2];
    var amount = parseInt(matches[3]);
    var person2 = matches[4];

    persons.add(person1);
    if (happiness[person1] === undefined) {
      happiness[person1] = [];
    }
    if (direction === 'lose') {
      amount *= -1;
    }
    happiness[person1][person2] = amount;
  });

  // Part 1
  persons = Array.from(persons);
  var extremes = calcPermutation(persons, happiness);
  var part1 = extremes.max;

  // Part 2
  persons.push('Me');
  extremes = calcPermutation(persons, happiness);
  var part2 = extremes.max;

  setResult(1, part1);
  setResult(2, part2);
}

function calcPermutation(persons, happiness) {
  var permutation = [];
  var extremes = {min:Number.MAX_VALUE, max:Number.MIN_VALUE};
  var permute = function(input, callback) {
    var i, ch;
    for (i = 0; i < input.length; i++) {
      ch = input.splice(i, 1)[0];
      permutation.push(ch);
      if (input.length === 0) {
        callback(permutation.slice(), extremes);
      }
      permute(input, callback);
      input.splice(i, 0, ch);
      permutation.pop();
    }
  };
  permute(persons, function(persons, extremes) {
    calcAmount(persons, happiness, extremes);
  });
  return extremes;
}

function calcAmount(persons, happiness, extremes) {
  var amount = 0;
  for (var i = 0; i < persons.length; i++) {
    var person1 = persons[i];
    var person2 = persons[(i+1) % persons.length];
    if (person1 === 'Me' || person2 === 'Me') {
      amount += 0;
    } else {
      amount += happiness[person1][person2];
      amount += happiness[person2][person1];
    }
  }
  if (amount < extremes.min) {
    extremes.min = amount;
  }
  if (amount > extremes.max) {
    extremes.max = amount;
  }
}
