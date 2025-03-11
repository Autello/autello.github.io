// Load saved entries from localStorage if any
let entries = JSON.parse(localStorage.getItem('entries')) || [];

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
    let fullResult = ${totalScore}/100 - ${productName} - ${caloriesPerOunce} cal/oz - ${caloriesPerCent} cal/¢ - ${totalCalories.toLocaleString()} cal;

    // Format the second result string (without product name)
    let simplifiedResult = ${totalScore}/100 - ${caloriesPerOunce} cal/oz - ${caloriesPerCent} cal/¢ - ${totalCalories.toLocaleString()} cal;

    // Display the results
    document.getElementById("result").innerText = fullResult;  // First result with product name
    document.getElementById("simplifiedResult").innerText = simplifiedResult;  // Second result without product name

    // Store the current result in the entries array
    entries.push({
        score: totalScore,
        productName: productName,
        caloriesPerOunce: caloriesPerOunce,
        caloriesPerCent: caloriesPerCent,
        totalCalories: totalCalories
    });

    // Update localStorage with the new entries array
    localStorage.setItem('entries', JSON.stringify(entries));

    // Update the table with new data
    updateEntriesTable();
}

// Function to update the table with previous entries
function updateEntriesTable() {
    let tableBody = document.getElementById("entriesTable").getElementsByTagName('tbody')[0];
    tableBody.innerHTML = "";  // Clear existing table rows

    // Add each entry as a new row in the table
    entries.forEach(entry => {
        let row = tableBody.insertRow();
        row.insertCell(0).textContent = entry.score + "/100";
        row.insertCell(1).textContent = entry.productName;
        row.insertCell(2).textContent = entry.caloriesPerOunce + " cal/oz";
        row.insertCell(3).textContent = entry.caloriesPerCent + " cal/¢";
        row.insertCell(4).textContent = entry.totalCalories.toLocaleString() + " cal";
    });
}

// Function to search/filter through table rows
function searchTable() {
    let input = document.getElementById("searchField");
    let filter = input.value.toUpperCase();
    let table = document.getElementById("entriesTable");
    let tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {  // Skip header row
        let td = tr[i].getElementsByTagName("td")[1];  // Search in the second column (Product Name)
        if (td) {
            let txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
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

// Initialize the table on page load (with data from localStorage)
document.addEventListener("DOMContentLoaded", function() {
    updateEntriesTable();
});
