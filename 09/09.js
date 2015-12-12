function calc(input) {
  var locations = new Set();
  var distances = [];

  var routes = input.split('\n');
  routes.forEach(function(route) {
    if (route === "") return;

    var matches = route.match(/(\w+)\sto\s(\w+)\s=\s(\d+)/);
    var start = matches[1];
    var end = matches[2];
    var distance = parseInt(matches[3]);

    locations.add(start);
    locations.add(end);

    if (distances[start] === undefined) {
      distances[start] = [];
    }
    if (distances[end] === undefined) {
      distances[end] = [];
    }
    distances[start][end] = distance;
    distances[end][start] = distance;
  });

  locations = Array.from(locations);
  var extremes = calcPermutation(locations, distances);

  setResult(1, extremes.min);
  setResult(2, extremes.max);
}

function calcPermutation(locations, distances) {
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
  permute(locations, function(locations, extremes) {
    calcDistance(locations, distances, extremes);
  });
  return extremes;
}

function calcDistance(locations, distances, extremes) {
  var distance = 0;
  for (var i = 1; i < locations.length; i++) {
    var start = locations[i-1];
    var end = locations[i];
    distance += distances[start][end];
  }
  if (distance < extremes.min) {
    extremes.min = distance;
  }
  if (distance > extremes.max) {
    extremes.max = distance;
  }
}
