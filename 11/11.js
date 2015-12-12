function calc(input) {
  input = input.trim();
  var password = input.split('');
  var parts = [];

  for (var i = 0; i < 2; i++) {
    do {
      password = nextPasswordWithoutForbiddenLetters(password);
      password = incrementPassword(password, password.length-1);
    } while(!isValidPassword(password));
    parts[i] = password.join('');
  }

  setResult(1, parts[0]);
  setResult(2, parts[1]);
}

function incrementPassword(password, position) {
  if (position >= 0) {
    if (password[position] === 'z') {
      password[position] = 'a';
      password = incrementPassword(password, position-1);
    } else {
      password[position] = String.fromCharCode(password[position].charCodeAt(0) + 1);
    }
  }
  return password;
}

function nextPasswordWithoutForbiddenLetters(password) {
  for (var i = 0; i < password.length; i++) {
    if (password[i].match(/[iol]/)) {
      return incrementPassword(password, i);
    }
  }
  return password;
}

function isValidPassword(password) {
  var i, j;

  var increasing = false;
  for (i = 0; i < password.length-3; i++) {
    var part = password.slice(i, i+3);
    for (j = 0; j < part.length; j++) {
      part[j] = part[j].charCodeAt(0);
    }
    if (part[2] === part[1]+1 && part[2] === part[0]+2) {
      increasing = true;
    }
  }

  different_pairs = false;
  var pairs = password.join('').match(/([a-z])\1/gi);
  if (pairs !== null && pairs.length >= 2) {
    for (i = 0; i < pairs.length-1; i++) {
      for (j = i+1; j < pairs.length; j++) {
        if (pairs[i] !== pairs[j]) {
          different_pairs = true;
          break;
        }
      }
    }
  }

  return increasing && different_pairs;
}
