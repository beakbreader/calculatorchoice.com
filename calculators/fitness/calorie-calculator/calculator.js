document.getElementById('calorieForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const activity = parseFloat(document.getElementById('activity').value);

    if (isNaN(age) || isNaN(weight) || isNaN(height)) {
        alert("Please enter valid numbers.");
        return;
    }

    let bmr;

    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const calories = bmr * activity;

    document.getElementById('result').innerHTML = 
        `<h3>Your daily calorie needs: ${calories.toFixed(0)} kcal</h3>`;
});

// Search bar demo function
document.getElementById('search').addEventListener('input', function() {
    console.log('Search suggestion feature coming soon...');
});
