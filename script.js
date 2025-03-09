function calculateScore() {
    let price = parseFloat(document.getElementById("price").value);
    let weight = parseFloat(document.getElementById("weight").value);
    let servings = parseFloat(document.getElementById("servings").value);
    let calories = parseFloat(document.getElementById("calories").value);

    if (isNaN(price) || isNaN(weight) || isNaN(servings) || isNaN(calories)) {
        document.getElementById("result").innerText = "Please enter all values.";
        return;
    }

    let cents = price * 100;
    let totalCalories = calories * servings;
    let caloriesPerCent = totalCalories / cents;
    let caloriesPerOunce = totalCalories / weight;
    let weightScore = (caloriesPerOunce / 240) * 50;
    let priceScore = (caloriesPerCent / 30) * 50;
    let totalScore = weightScore + priceScore;

    // Round down total score, calories per ounce, and calories per cent
    let roundedScore = Math.floor(totalScore);
    let roundedCaloriesPerOunce = Math.floor(caloriesPerOunce);
    let roundedCaloriesPerCent = Math.floor(caloriesPerCent);

    // Format the result string
    let resultText = `${roundedScore}/100 - ${roundedCaloriesPerOunce} cal/oz - ${roundedCaloriesPerCent} cal/¢ - ${totalCalories.toLocaleString()} cal`;

    // Display the result
    document.getElementById("result").innerText = resultText;
}
