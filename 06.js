var matrix = document.getElementById('matrix');
var context = matrix.getContext('2d');

function calc(input) {
  showMatrix();

  matrix.width = 1000;
  matrix.height = 1000;

  var instructions = input.split('\n');
  var totals;
  instructions.forEach(function(instruction) {
    if (instruction === "") return;

    var regexp = /(\w+\s*\w*)\s(\d+),(\d+)\s\w+\s(\d+),(\d+)/;
    var matches = instruction.match(regexp);
    if (!matches || matches.length < 6) {
      console.log("Error matching instruction:");
      console.log(instruction);
      return;
    }
    var cmd = matches[1].replace(' ', '_');
    var x = parseInt(matches[2]);
    var y = parseInt(matches[3]);
    var width = parseInt(matches[4]) + 1 - x;
    var height = parseInt(matches[5]) + 1 - y;

    eval(cmd + "(x, y, width, height)");

    totals = count_lights(0, 0, matrix.width, matrix.height);
  });

  setResult(1, totals.total1);
  setResult(2, totals.total2);
}

function turn_on(x, y, width, height) {
  var image_data = context.getImageData(x, y, width, height);
  var data = image_data.data;

  for (var i = 0; i < data.length; i += 4) {
    data[i+0] = data[i+3] = 255;
    if (data[i+1] < 255) data[i+1]++;
    else {
      console.log("Failed to add +1 brightness");
      return;
    }
  }

  context.putImageData(image_data, x, y);
}

function turn_off(x, y, width, height) {
  var image_data = context.getImageData(x, y, width, height);
  var data = image_data.data;

  for (var i = 0; i < data.length; i += 4) {
    data[i+0] = 0;
    data[i+3] = 255;
    if (data[i+1] > 0) data[i+1]--;
  }

  context.putImageData(image_data, x, y);
}

function toggle(x, y, width, height) {
  var image_data = context.getImageData(x, y, width, height);
  var data = image_data.data;

  for (var i = 0; i < data.length; i += 4) {
    if (data[i+0]) {
      data[i+0] = 0;
    } else {
      data[i+0] = 255;
    }
    data[i+3] = 255;
    if (data[i+1] < 254) data[i+1]+=2;
    else {
      console.log("Failed to add +2 brightness");
      return;
    }
  }

  context.putImageData(image_data, x, y);
}

function count_lights(x, y, width, height) {
  var image_data = context.getImageData(x, y, width, height);
  var data = image_data.data;
  var totals = {total1:0, total2:0};

  for (var i = 0; i < data.length; i += 4) {
    if (data[i+0]) {
      totals.total1++;
    }
    totals.total2 += data[i+1] + data[i+2];
  }

  return totals;
}
