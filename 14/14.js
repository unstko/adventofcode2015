function calc(input) {
  var reindeers = [];
  var total_time = 2503;

  var descriptions = input.split('\n');
  descriptions.forEach(function(description) {
    if (description === "") return;

    var matches = description.match(/(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds\./);
    reindeers.push({
      name:matches[1],
      speed:parseInt(matches[2]),
      fly_time:parseInt(matches[3]),
      rest_time:parseInt(matches[4])
    });
  });

  // Part 1
  var max_distance = 0;
  reindeers.forEach(function(reindeer) {
    var distance = calcDistance(reindeer, total_time);
    if (distance > max_distance) {
      max_distance = distance;
    }
  });

  // Part 2
  reindeers.forEach(function(reindeer) {
    reindeer.points = 0;
    reindeer.distance = 0;
  });
  for (var t = 1; t <= total_time; t++) {
    max_distance = 0;
    reindeers.forEach(function(reindeer) {
      reindeer.distance = calcDistance(reindeer, t);
      if (reindeer.distance > max_distance) {
        max_distance = reindeer.distance;
      }
    });
    reindeers.forEach(function(reindeer) {
      if (reindeer.distance === max_distance) {
        reindeer.points++;
      }
    });
  }
  var max_points = 0;
  reindeers.forEach(function(reindeer) {
    if (reindeer.points > max_points) {
      max_points = reindeer.points;
    }
  });

  setResult(1, max_distance);
  setResult(2, max_points);
}

function calcDistance(reindeer, time) {
  var fly_distance = reindeer.speed * reindeer.fly_time;
  var periods = Math.floor(time / (reindeer.fly_time + reindeer.rest_time));
  var tail_time = time % (reindeer.fly_time + reindeer.rest_time);
  if (tail_time > reindeer.fly_time) {
    tail_time = reindeer.fly_time;
  }
  var distance = periods * fly_distance + tail_time * reindeer.speed;
  return distance;
}
