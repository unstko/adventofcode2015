function calc(input) {
  var part1 = calcPart1(input);
  var part2 = calcPart2(input, part1);

  setResult(1, part1);
  setResult(2, part2);
}

function calcPart1(input) {
  var instructions = input.split('\n');
  var gates = {0:0, 1:1};

  return calcGateA(instructions, gates);
}

function calcPart2(input, a) {
  var instructions = input.split('\n');
  var gates = {0:0, 1:1, b:a};

  return calcGateA(instructions, gates);
}

function calcGateA(instructions, gates) {
  while (instructions.length) {
    for (var key in instructions) {
      var instruction = instructions[key];

      // Left and right side
      var match = instruction.match(/(.*)\s->\s(\w+)/);
      if (match === null) {
        instructions.splice(key, 1);
        continue;
      }
      var left = match[1];
      var right = match[2];

      // Provide constant
      match = left.match(/^(\d+)$/);
      if (match !== null) {
        var constant = parseInt(match[1]);
        gates[right] = constant;
        instructions.splice(key, 1);
        continue;
      }
      match = left.match(/^(\w+)$/);
      if (match !== null) {
        var gate = match[1];
        if (gates[gate] !== undefined) {
          gates[right] = gates[gate];
          instructions.splice(key, 1);
          continue;
        }
      }

      // Negate
      match = left.match(/NOT\s(\w+)/);
      if (match !== null) {
        var gate = match[1];
        if (gates[gate] !== undefined) {
          gates[right] = ~gates[gate];
          instructions.splice(key, 1);
          continue;
        }
      }

      // AND, OR
      match = left.match(/(\w+)\s(AND|OR)\s(\w+)/);
      if (match !== null) {
        var gate1 = match[1];
        var op = match[2];
        var gate2 = match[3];
        if (gates[gate1] !== undefined && gates[gate2] !== undefined) {
          if (op === 'AND') {
            gates[right] = gates[gate1] & gates[gate2];
          } else {
            gates[right] = gates[gate1] | gates[gate2];
          }
          instructions.splice(key, 1);
          continue;
        }
      }

      // LSHIFT, RSHIFT
      match = left.match(/(\w+)\s(LSHIFT|RSHIFT)\s(\d+)/);
      if (match !== null) {
        var gate = match[1];
        var op = match[2];
        var value = parseInt(match[3]);
        if (gates[gate] !== undefined) {
          if (op === 'LSHIFT') {
            gates[right] = gates[gate] << value;
          } else {
            gates[right] = gates[gate] >> value;
          }
          instructions.splice(key, 1);
          continue;
        }
      }
    }
  }

  return gates.a;
}
