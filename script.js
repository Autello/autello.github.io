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

    // Store the result in local storage
    let resultData = {
        score: totalScore,
        name: productName,
        calOunce: caloriesPerOunceFormatted,
        calCent: caloriesPerCentFormatted,
        totalCalories: totalCaloriesFormatted
    };

    // Get existing results from localStorage
    let storedResults = JSON.parse(localStorage.getItem("results")) || [];
    storedResults.push(resultData);

    // Save updated results back to localStorage
    localStorage.setItem("results", JSON.stringify(storedResults));

    // Update the results table
    updateResultsTable();
}

function updateResultsTable() {
    let storedResults = JSON.parse(localStorage.getItem("results")) || [];
    let searchQuery = document.getElementById("search").value.toLowerCase(); // Get the search query
    let tableBody = document.getElementById("resultsTable").getElementsByTagName('tbody')[0];

    // Clear existing table rows
    tableBody.innerHTML = "";

    // Filter the results based on the search query (case-insensitive)
    let filteredResults = storedResults.filter(result => 
        result.name.toLowerCase().includes(searchQuery)
    );

    // Populate table with filtered results
    filteredResults.forEach(result => {
        let row = tableBody.insertRow();
        
        let cell1 = row.insertCell(0);
        cell1.innerText = result.score;
        cell1.style.textAlign = 'center';

        let cell2 = row.insertCell(1);
        cell2.innerText = result.name;
        cell2.style.textAlign = 'center';

        let cell3 = row.insertCell(2);
        cell3.innerText = result.calOunce;
        cell3.style.textAlign = 'center';

        let cell4 = row.insertCell(3);
        cell4.innerText = result.calCent;
        cell4.style.textAlign = 'center';

        let cell5 = row.insertCell(4);
        cell5.innerText = result.totalCalories;
        cell5.style.textAlign = 'center';
    });
}

// Event listener for the search input field
document.getElementById("search").addEventListener("input", updateResultsTable);

// New function to copy the result to the clipboard
function copyToClipboard() {
    // Get the result text
    let resultText = document.getElementById("result").innerText;
    
    // Check if there is any result to copy
    if (resultText.trim() === "") {
        alert("No result to copy.");
        return;
    }

    // Use the Clipboard API to copy text to the clipboard
    navigator.clipboard.writeText(resultText).then(function() {
        // Show a message indicating the result has been copied
        alert("Result copied to clipboard!");
    }).catch(function(error) {
        alert("Failed to copy the result: " + error);
    });
}

// Load stored results when the page loads
window.onload = function() {
    updateResultsTable();
};
