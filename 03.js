var matrix = document.getElementById('matrix');
var context = matrix.getContext('2d');


function calc(input) {
  showMatrix();

  matrix.width = 200;
  matrix.height = 200;

  var total1 = calcPart1(input);
  context.clearRect(0, 0, matrix.width, matrix.height);
  var total2 = calcPart2(input);

  setResult(1, total1);
  setResult(2, total2);
}

function calcPart1(input) {
  return calcTotal(input, 1);
}

function calcPart2(input) {
  return calcTotal(input, 2);
}

function calcTotal(input, modulo) {
  var pos1 = {x:matrix.width/2, y:matrix.height/2};
  var pos2 = {x:matrix.width/2, y:matrix.height/2};
  var pos = pos1;

  setPixel(pos.x, pos.y);
  var total = 1;
  var len = input.length;
  for(var i = 0; i < len; i++) {
    dir = input[i];
    if (i % modulo === 0) {
      pos = pos1;
    } else {
      pos = pos2;
    }
    changePos(dir, pos);
    if (!checkPos(pos)) {
      return;
    }
    var isSet = getPixel(pos.x, pos.y);
    if (!isSet) {
      total++;
    }
    setPixel(pos.x, pos.y);
  }
  return total;
}

function changePos(dir, pos) {
  switch (dir) {
    case '<':
      pos.x--;
      break;
    case '>':
      pos.x++;
      break;
    case '^':
      pos.y--;
      break;
    case 'v':
      pos.y++;
      break;
  }
  return pos;
}

function setPixel(x, y) {
  var pixel = context.getImageData(x, y, 1, 1);
  pixel.data[0] = pixel.data[1] = pixel.data[2] = 0;
  pixel.data[3] = 255;
  context.putImageData(pixel, x, y);
}

function getPixel(x, y) {
  var pixel = context.getImageData(x, y, 1, 1);
  return pixel.data[3] / 255;
}

function checkPos(pos) {
  if (pos.x < 0 || pos.x >= matrix.width || pos.y < 0 || pos.y >= matrix.height) {
    console.log("Matrix not big enough!");
    console.log("Need position: x=" + pos.x + ", y=" + pos.y);
    return false;
  }
  return true;
}
