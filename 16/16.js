function calc(input) {
  var sue_gift = -1;
  var sue_real = -1;
  var mfcsam_output = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1
  };

  var descriptions = input.split('\n');
  descriptions.forEach(function(description) {
    if (description === "") return;

    var matches = description.match(/Sue (\d+): (\w+): (\d+), (\w+): (\d+), (\w+): (\d+)/);
    var sue = {name: parseInt(matches[1])};
    for (var i = 0; i < 3; i++) {
      sue[matches[2*i+2]] = parseInt(matches[2*i+3]);
    }

    if (compareSueGift(sue, mfcsam_output)) {
      sue_gift = sue.name;
    }
    if (compareSueReal(sue, mfcsam_output)) {
      sue_real = sue.name;
    }
  });

  setResult(1, sue_gift);
  setResult(2, sue_real);
}

function compareSueGift(sue, mfcsam_output) {
  for (var key in mfcsam_output) {
    if (sue.hasOwnProperty(key)) {
      if (sue[key] != mfcsam_output[key]) {
        return false;
      }
    }
  }
  return true;
}

function compareSueReal(sue, mfcsam_output) {
  for (var key in mfcsam_output) {
    if (sue.hasOwnProperty(key)) {
      switch (key) {
        case 'cats':
        case 'trees':
          if (sue[key] <= mfcsam_output[key]) {
            return false;
          }
          break;
        case 'pomeranians':
        case 'goldfish':
          if (sue[key] >= mfcsam_output[key]) {
            return false;
          }
          break;
        default:
          if (sue[key] != mfcsam_output[key]) {
            return false;
          }
          break;
      }
    }
  }
  return true;
}
