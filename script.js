function calculateScore() {
    let productName = document.getElementById("productName").value.trim();  // Get product name and trim extra spaces
    let price = parseFloat(document.getElementById("price").value);
    let weight = parseFloat(document.getElementById("weight").value);
    let servings = parseFloat(document.getElementById("servings").value);
    let calories = parseFloat(document.getElementById("calories").value);

    // Check if all values are provided, including product name
    if (isNaN(price) || isNaN(weight) || isNaN(servings) || isNaN(calories) || productName === "") {
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

    // Format the full result string (with product name)
    let fullResult = `${totalScore}/100 - ${productName} - ${caloriesPerOunce} cal/oz - ${caloriesPerCent} cal/¢ - ${totalCalories.toLocaleString()} cal`;

    // Format the second result string (without product name)
    let simplifiedResult = `${totalScore}/100 - ${caloriesPerOunce} cal/oz - ${caloriesPerCent} cal/¢ - ${totalCalories.toLocaleString()} cal`;

    // Display the results
    document.getElementById("result").innerText = fullResult;  // First result with product name
    document.getElementById("simplifiedResult").innerText = simplifiedResult;  // Second result without product name
}

// Clipboard functionality
document.getElementById("copyButton").addEventListener("click", function() {
    var simplifiedResultText = document.getElementById("simplifiedResult").innerText;
    
    if (simplifiedResultText === "") {
        alert("Please calculate the score first!");
        return;
    }

    navigator.clipboard.writeText(simplifiedResultText)
        .then(function() {
            alert("Result copied to clipboard!");
        })
        .catch(function(error) {
            console.error("Error copying text: ", error);
        });
});
