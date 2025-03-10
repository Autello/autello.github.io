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
    let caloriesPerCent = Math.floor(totalCalories / cents);  // Round down here
    let caloriesPerOunce = Math.floor(totalCalories / weight); // Round down here
    let weightScore = (caloriesPerOunce / 240) * 50;
    let priceScore = (caloriesPerCent / 30) * 50;
    let totalScore = Math.floor(weightScore + priceScore); // Round down final score

    // Format the result string
    let resultText = `${totalScore}/100 - ${caloriesPerOunce} cal/oz - ${caloriesPerCent} cal/¢ - ${totalCalories.toLocaleString()} cal`;

    // Display the result
    document.getElementById("result").innerText = resultText;
}
// Clipboard functionality
document.getElementById("copyButton").addEventListener("click", function() {
    var resultText = document.getElementById("result").innerText;
    
    if (resultText === "") {
        alert("Please calculate the score first!");
        return;
    }

    navigator.clipboard.writeText(resultText)
        .then(function() {
            alert("Result copied to clipboard!");
        })
        .catch(function(error) {
            console.error("Error copying text: ", error);
        });
});
