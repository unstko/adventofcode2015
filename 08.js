function calc(input) {
  var literals = input.split('\n');
  var total1 = 0;
  var total2 = 0;
  var total_code = 0;
  var total_memory = 0;
  var total_encoded = 0;

  literals.forEach(function(literal) {
    if (literal === "") return;

    total_code += literal.length;

    var literal1 = literal;
    literal1 = literal1.replace(/^"/g, "");
    literal1 = literal1.replace(/"$/g, "");
    literal1 = literal1.replace(/\\\\/g, "0");
    literal1 = literal1.replace(/\\"/g, "0");
    literal1 = literal1.replace(/\\x[a-f0-9]{2}/g, "0");
    total_memory += literal1.length;

    var literal2 = literal;
    literal2 = literal2.replace(/^"/g, "000"); // \"\\\"
    literal2 = literal2.replace(/"$/g, "000"); // \\\"\"
    literal2 = literal2.replace(/\\\\/g, "0000"); // \\\\\\\\
    literal2 = literal2.replace(/\\"/g, "0000"); // \\\\\\\"
    literal2 = literal2.replace(/\\x[a-f0-9]{2}/g, "00000"); // \\\\xff
    total_encoded += literal2.length;
  });

  total1 = total_code - total_memory;
  total2 = total_encoded - total_code;

  setResult(1, total1);
  setResult(2, total2);
}
