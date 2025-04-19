// Get references to HTML elements
const priceInput = document.getElementById('price');
const weightInput = document.getElementById('weight');
const servingsInput = document.getElementById('servings');
const caloriesInput = document.getElementById('calories');
const calculateBtn = document.getElementById('calculateBtn');
const resultDiv = document.getElementById('result');

// Add event listener to the button
calculateBtn.addEventListener('click', calculateAndDisplay);

// Also allow pressing Enter in the last input field to trigger calculation
caloriesInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default form submission if it were in a form
        calculateAndDisplay();
    }
});


function calculateAndDisplay() {
    // --- 1. Get and Validate Inputs ---
    const price = parseFloat(priceInput.value);
    const weight = parseFloat(weightInput.value);
    const totalServings = parseFloat(servingsInput.value);
    const caloriesPerServing = parseFloat(caloriesInput.value);

    // Clear previous results/errors
    resultDiv.innerHTML = '';
    resultDiv.classList.remove('error');

    // Basic validation
    if (isNaN(price) || isNaN(weight) || isNaN(totalServings) || isNaN(caloriesPerServing)) {
        resultDiv.innerHTML = '<span class="error">Please enter valid numbers in all fields.</span>';
        resultDiv.classList.add('error');
        return;
    }
    if (price <= 0 || weight <= 0 || totalServings <= 0 || caloriesPerServing < 0) {
         resultDiv.innerHTML = '<span class="error">Price, Weight, and Servings must be positive. Calories cannot be negative.</span>';
         resultDiv.classList.add('error');
         return;
    }

    // --- 2. Perform Calculations ---
    const cents = price * 100;
    const totalCalories = caloriesPerServing * totalServings;

    // Avoid division by zero (cents already validated as > 0 via price)
    const caloriesPerCent = totalCalories / cents;
    // Avoid division by zero (weight already validated > 0)
    const caloriesPerOunce = totalCalories / weight;

    // --- 3. Calculate Scores ---
    // Avoid division by zero in scoring denominators implicitly handled by previous checks
    const weightScore = (caloriesPerOunce / 240) * 50;
    const priceScore = (caloriesPerCent / 30) * 50;
    let totalScore = weightScore + priceScore;

    // Cap the score at 100 if necessary (optional)
    // totalScore = Math.min(totalScore, 100);

    // --- 4. Format Output ---
    const formattedTotalScore = Math.round(totalScore); // Round to nearest whole number for XX/100
    const formattedCalPerOz = caloriesPerOunce.toFixed(0); // Round to whole number like example
    const formattedCalPerCent = caloriesPerCent.toFixed(0); // Round to whole number like example
    // Format total calories with commas for readability, but remove for final output to match example
    const formattedTotalCaloriesWithCommas = totalCalories.toLocaleString(undefined, { maximumFractionDigits: 0 });
    const formattedTotalCalories = formattedTotalCaloriesWithCommas.replace(/,/g, ''); // Use replace to remove commas

    // Construct the final output string based on the example format
    const outputString = `${formattedTotalScore}/100 - ${formattedCalPerOz} cal/oz - ${formattedCalPerCent} cal/¢ - ${formattedTotalCalories} cal`;

    // --- 5. Display Result ---
    resultDiv.textContent = outputString;
}
