function calc(input) {
  var ingredients = [];

  var descriptions = input.split('\n');
  descriptions.forEach(function(description) {
    if (description === "") return;

    var matches = description.match(/(\w+): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)/);
    ingredients.push({
      name:matches[1],
      capacity:parseInt(matches[2]),
      durability:parseInt(matches[3]),
      flavor:parseInt(matches[4]),
      texture:parseInt(matches[5]),
      calories:parseInt(matches[6])
    });
  });

  // Brute force solution
  // Works only with knowledge that there are four ingredients!
  var max_score = 0;
  var max_score_500 = 0;
  for (var a = 0; a <= 100; a++) {
    for (var b = 0; b <= 100-a; b++) {
      for (var c = 0; c <= 100-a-b; c++) {
        var d = 100-a-b-c;
        var score = calcScore(ingredients, a, b, c, d);
        var calories = calcCalories(ingredients, a, b, c, d);
        if (score > max_score) {
          max_score = score;
        }
        if (score > max_score_500 && calories === 500) {
          max_score_500 = score;
        }
      }
    }
  }

  setResult(1, max_score);
  setResult(2, max_score_500);
}

function calcScore(ingredients, a, b, c, d) {
  var capacity = ingredients[0].capacity*a + ingredients[1].capacity*b +
                 ingredients[2].capacity*c + ingredients[3].capacity*d;
  var durability = ingredients[0].durability*a + ingredients[1].durability*b +
                   ingredients[2].durability*c + ingredients[3].durability*d;
  var flavor = ingredients[0].flavor*a + ingredients[1].flavor*b +
               ingredients[2].flavor*c + ingredients[3].flavor*d;
  var texture = ingredients[0].texture*a + ingredients[1].texture*b +
                ingredients[2].texture*c + ingredients[3].texture*d;
  if (capacity < 0 || durability < 0 || flavor < 0 || texture < 0) {
    return 0;
  }
  return capacity * durability * flavor * texture;
}

function calcCalories(ingredients, a, b, c, d) {
  return ingredients[0].calories*a + ingredients[1].calories*b +
         ingredients[2].calories*c + ingredients[3].calories*d;
}
