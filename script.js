function calculateScore() {
    // Get user inputs
    const name = document.getElementById('name').value;
    const price = parseFloat(document.getElementById('price').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const servings = parseInt(document.getElementById('servings').value);
    const caloriesPerServing = parseInt(document.getElementById('calories').value);

    // Perform the calculations
    const cents = price * 100;
    const totalCalories = caloriesPerServing * servings;
    const caloriesPerCent = totalCalories / cents;
    const caloriesPerOunce = totalCalories / weight;

    // Calculate the scores
    const weightScore = (caloriesPerOunce / 240) * 50;
    const priceScore = (caloriesPerCent / 30) * 50;
    const totalScore = weightScore + priceScore;

    // Display the results in the desired format
    document.getElementById('name-result').textContent = `Name: ${name}`;
    document.getElementById('score-result').textContent = `${Math.round(totalScore)}/100`;
    document.getElementById('calories-per-ounce').textContent = `${Math.round(caloriesPerOunce)} cal/oz`;
    document.getElementById('calories-per-cent').textContent = `${Math.round(caloriesPerCent)} cal/¢`;
    document.getElementById('total-calories').textContent = `${totalCalories} cal`;
}
