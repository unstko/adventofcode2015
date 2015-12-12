// Part 1: Total of wrappings and slacks
// Part 2:
function calc(input) {

  var boxes = input.split('\n');
  var total = 0;
  var ribbon = 0;

  boxes.forEach(function(box) {
    if (box === "") return;

    var dimensions = box.split('x');
    dimensions.sort(sortNumber);
    var l = dimensions[0];
    var w = dimensions[1];
    var h = dimensions[2];

    var wrapping = 2*l*w + 2*w*h + 2*h*l;
    var slack = l*w;

    total += wrapping + slack;
    ribbon += 2*l + 2*w + l*w*h;
  });

  setResult(1, total);
  setResult(2, ribbon);
}

function sortNumber(a, b) {
    return a - b;
}
