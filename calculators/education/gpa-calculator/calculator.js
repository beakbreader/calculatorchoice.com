const calculators = [
  { name: "Height Predictor", slug: "height-predictor" },
  { name: "BMI Calculator", slug: "bmi-calculator" },
  { name: "Weight Converter", slug: "weight-converter" },
  { name: "Length Converter", slug: "length-converter" },
  { name: "GPA Calculator", slug: "gpa-calculator" },
];

const searchInput = document.getElementById('search');
const suggestionsList = document.getElementById('suggestions');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  suggestionsList.innerHTML = '';
  if (!query) return;
  const filtered = calculators.filter(calc => calc.name.toLowerCase().includes(query));
  filtered.forEach(calc => {
    const li = document.createElement('li');
    li.textContent = calc.name;
    li.onclick = () => window.location.href = `/calculators/${calc.slug}/`;
    suggestionsList.appendChild(li);
  });
});

const coursesContainer = document.getElementById('courses');
const addCourseBtn = document.getElementById('add-course');
const gpaResult = document.getElementById('gpa-result');

function createCourseRow() {
  const div = document.createElement('div');
  div.className = 'course-row';

  const courseInput = document.createElement('input');
  courseInput.type = 'text';
  courseInput.placeholder = 'Course Name';

  const gradeInput = document.createElement('input');
  gradeInput.type = 'number';
  gradeInput.placeholder = 'Grade (0-100)';
  gradeInput.min = 0;
  gradeInput.max = 100;

  const creditsInput = document.createElement('input');
  creditsInput.type = 'number';
  creditsInput.placeholder = 'Credits';
  creditsInput.min = 0;

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'X';
  removeBtn.onclick = () => {
    coursesContainer.removeChild(div);
    calculateGPA();
  };

  [courseInput, gradeInput, creditsInput].forEach(input => {
    input.addEventListener('input', calculateGPA);
  });

  div.append(courseInput, gradeInput, creditsInput, removeBtn);
  coursesContainer.appendChild(div);
}

function calculateGPA() {
  const rows = document.querySelectorAll('.course-row');
  let totalPoints = 0;
  let totalCredits = 0;

  rows.forEach(row => {
    const grade = parseFloat(row.children[1].value);
    const credits = parseFloat(row.children[2].value);
    if (!isNaN(grade) && !isNaN(credits)) {
      let points = 0;
      if (grade >= 90) points = 4.0;
      else if (grade >= 80) points = 3.0;
      else if (grade >= 70) points = 2.0;
      else if (grade >= 60) points = 1.0;
      else points = 0.0;
      totalPoints += points * credits;
      totalCredits += credits;
    }
  });

  const gpa = totalCredits ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  gpaResult.textContent = gpa;
}

addCourseBtn.onclick = () => {
  createCourseRow();
};

// Start with one course row
createCourseRow();