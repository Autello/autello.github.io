function calculateScore() {
    let productName = document.getElementById("productName").value;
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

    // Round down the total score to the nearest whole number
    totalScore = Math.floor(totalScore);

    // Prepare the result format
    let caloriesPerOunceFormatted = caloriesPerOunce.toFixed(0);
    let caloriesPerCentFormatted = caloriesPerCent.toFixed(0);
    let totalCaloriesFormatted = totalCalories.toLocaleString(); // Adds comma for large numbers

    // Display the result in the desired format
    document.getElementById("result").innerText = `${totalScore}/100 - ${caloriesPerOunceFormatted} cal/oz - ${caloriesPerCentFormatted} cal/¢ - ${totalCaloriesFormatted} cal`;
}
