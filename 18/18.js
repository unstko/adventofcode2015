var matrix = document.getElementById('matrix');
var context = matrix.getContext('2d');
var inMemCanvas = document.createElement('canvas');
var inMemCtx = inMemCanvas.getContext('2d');
var repeat = 100;
var stuck_on = false;
var input = null;
var part = 1;

function calc(input) {
  this.input = input;
  matrix.width = 102;
  matrix.height = 102;
  inMemCanvas.width = 100;
  inMemCanvas.height = 100;

  showMatrix();
  part1();
}

function part1() {
  part = 1;
  stuck_on = false;
  init();
  window.requestAnimationFrame(draw);
}

function part2() {
  part = 2;
  stuck_on = true;
  init();
  window.requestAnimationFrame(draw);
}

function init() {
  context.clearRect(0, 0, matrix.width, matrix.height);
  var x = 0;
  var y = 0;
  var instructions = input.split('\n');
  instructions.forEach(function(instruction) {
    if (instruction === "") return;
    for (x = 0; x < instruction.length; x++) {
      var state = instruction[x];
      if (stuck_on && ((x === 0 || x === 99) && (y === 0 || y === 99))) {
        state = '#';
      }
      switch(state) {
        case '.':
          set_pixel(x, y, 0);
          break;
        case '#':
          set_pixel(x, y, 1);
          break;
      }
    }
    y++;
  });
  repeat = 100;
}

function result() {
  var total_on = count_lights(1, 1, 100, 100);
  if (!stuck_on) {
    setResult(1, total_on);
    part2();
  }
  else {
    setResult(2, total_on);
  }
}

function draw() {
  for (y = 0; y < 100; y++) {
    for (x = 0; x < 100; x++) {
      var next_state = get_next_state(x, y);
      set_pixel(x, y, next_state, inMemCtx);
    }
  }
  context.clearRect(0, 0, matrix.width, matrix.height);
  context.drawImage(inMemCanvas, 1, 1, 100, 100);
  inMemCtx.clearRect(0, 0, inMemCanvas.width, inMemCanvas.height);
  repeat--;
  var step = 100-repeat;
  setResult(part, 'Step #' + step);
  if (repeat) {
    window.requestAnimationFrame(draw);
  }
  else {
    result();
  }
}

function set_pixel(x, y, state, context) {
  var ctx = context || this.context;
  var translate = (context) ? 0 : 1;
  var image_data = ctx.createImageData(1, 1);
  var data = image_data.data;
  data[3] = (state) ? 255 : 0;
  ctx.putImageData(image_data, x+translate, y+translate);
}

function get_ring(x, y) {
  return context.getImageData(x, y, 3, 3).data;
}

function get_state(x, y) {
  var image_data = context.getImageData(x+1, y+1, 1, 1);
  return (image_data.data[3]) ? 1 : 0;
}

function get_next_state(x, y) {
  if (stuck_on && ((x === 0 || x === 99) && (y === 0 || y === 99))) {
    return 1;
  }
  var ring = get_ring(x, y);
  var count_on = 0;
  for (var i = 0; i < ring.length; i+=4) {
    if (i === 4*4) {
      // Pixel 4 is in the middle of the ring
      continue;
    }
    if (ring[i+3]) {
      count_on++;
    }
  }
  var state = ring[4*4+3]; //get_state(x, y);
  if ((state && (count_on === 2 || count_on === 3)) ||
      (!state && count_on === 3)) {
        return 1;
      }
  return 0;
}

function count_lights(x, y, width, height) {
  var image_data = context.getImageData(x, y, width, height);
  var data = image_data.data;
  var total = 0;
  for (var i = 0; i < data.length; i+=4) {
    if (data[i+3]) {
      total++;
    }
  }
  return total;
}
