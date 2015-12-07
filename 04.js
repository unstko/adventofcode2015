function calc(input) {
  input = input.trim();
  var i = -1;
  var hash, string, first_five, first_six;
  var i_five = -1;
  var i_six = -1;
  do {
    i++;
    string = input + i;
    hash = md5(string);
    first_five = hash.slice(0, 5);
    first_six = hash.slice(0, 6);
    if (i_five < 0 && first_five === "00000") {
      i_five = i;
    }
    if (i_six < 0 && first_six === "000000") {
      i_six = i;
    }
  } while (i_five < 0 || i_six < 0);

  setResult(1, i_five);
  setResult(2, i_six);
}
