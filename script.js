function calculateScore() {
    let productName = document.getElementById("productName").value;
    let price = parseFloat(document.getElementById("price").value);
    let weight = parseFloat(document.getElementById("weight").value);
    let servings = parseFloat(document.getElementById("servings").value);
    let calories = parseFloat(document.getElementById("calories").value);

    // Check if all input fields have valid values
    if (isNaN(price) || isNaN(weight) || isNaN(servings) || isNaN(calories)) {
        document.getElementById("result").innerText = "Please enter all values.";
        return;
    }

    // Calculate values based on the inputs
    let cents = price * 100;
    let totalCalories = calories * servings;
    let caloriesPerCent = totalCalories / cents;
    let caloriesPerOunce = totalCalories / weight;

    // Calculate weight and price scores
    let weightScore = (caloriesPerOunce / 240) * 50;
    let priceScore = (caloriesPerCent / 30) * 50;
    let totalScore = weightScore + priceScore;

    // Round the total score down to the nearest whole number
    totalScore = Math.floor(totalScore);

    // Format the results (calories per ounce, calories per cent, total calories)
    let caloriesPerOunceFormatted = caloriesPerOunce.toFixed(0); // Remove decimals
    let caloriesPerCentFormatted = caloriesPerCent.toFixed(0);   // Remove decimals
    let totalCaloriesFormatted = totalCalories.toLocaleString(); // Add commas for large numbers

    // Display the result in the specified format
    document.getElementById("result").innerText = `${totalScore}/100 - ${caloriesPerOunceFormatted} cal/oz - ${caloriesPerCentFormatted} cal/¢ - ${totalCaloriesFormatted} cal`;

    // Store result in localStorage
    storeResult({
        score: totalScore,
        name: productName,
        caloriesPerOunce: caloriesPerOunceFormatted,
        caloriesPerCent: caloriesPerCentFormatted,
        totalCalories: totalCaloriesFormatted
    });

    // Update table with latest results
    updateResultsTable();
}

// Store result in localStorage
function storeResult(result) {
    let results = JSON.parse(localStorage.getItem("foodResults")) || [];
    results.push(result);
    localStorage.setItem("foodResults", JSON.stringify(results));
}

// Update the results table
function updateResultsTable(filteredResults = null) {
    let results = filteredResults || JSON.parse(localStorage.getItem("foodResults")) || [];
    let tableBody = document.getElementById("resultsTableBody");

    // Clear existing rows in the table
    tableBody.innerHTML = "";

    // Add rows for each result stored in localStorage
    results.forEach(result => {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${result.score}</td>
            <td>${result.name}</td>
            <td>${result.caloriesPerOunce} cal/oz</td>
            <td>${result.caloriesPerCent} cal/¢</td>
            <td>${result.totalCalories} cal</td>
        `;

        tableBody.appendChild(row);
    });
}

// Function to search through the results
function searchResults() {
    let searchQuery = document.getElementById("search").value.toLowerCase();
    let results = JSON.parse(localStorage.getItem("foodResults")) || [];
    
    // Filter results based on the search query
    let filteredResults = results.filter(result => result.name.toLowerCase().includes(searchQuery));

    // Update the table with the filtered results
    updateResultsTable(filteredResults);
}

// Function to clear all results
function clearHistory() {
    localStorage.removeItem("foodResults");
    updateResultsTable();
}

// Function to copy the result to clipboard
function copyToClipboard() {
    // Get the result text
    const resultText = document.getElementById("result").innerText;
    console.log("Attempting to copy result: " + resultText); // Debugging line

    if (resultText) {
        // Try copying the result text to clipboard
        navigator.clipboard.writeText(resultText).then(() => {
            console.log("Successfully copied the result to the clipboard!");
            alert("Result copied to clipboard!");
        }).catch(err => {
            console.error("Error copying text: ", err);
            alert("Failed to copy text: " + err);
        });
    } else {
        console.log("No result to copy.");
        alert("No result to copy.");
    }
}

// Load results from localStorage when the page loads
window.onload = function() {
    updateResultsTable();
};
