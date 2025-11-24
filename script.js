// ===== DATA =====
let income = 0;
let categories = [];

// ===== DOM ELEMENTS =====
const incomeForm = document.getElementById("income-form");
const categoryForm = document.getElementById("category-form");
const incomeInput = document.getElementById("income-input");
const categoryNameInput = document.getElementById("category-name");
const categoryAmountInput = document.getElementById("category-amount");

const categoriesBody = document.getElementById("categories-body");
const totalSpendingEl = document.getElementById("total-spending");
const remainingEl = document.getElementById("remaining");
const ratingEl = document.getElementById("rating");

const pieChartCanvas = document.getElementById("pieChart");
const barChartCanvas = document.getElementById("barChart");

// ===== LOAD DATA FROM LOCALSTORAGE =====
window.addEventListener("load", () => {
  const storedIncome = localStorage.getItem("income");
  const storedCategories = localStorage.getItem("categories");

  if(storedIncome) income = Number(storedIncome);
  if(storedCategories) categories = JSON.parse(storedCategories);

  incomeInput.value = income;
  renderCategories();
  updateSummary();
});

// ===== SAVE INCOME =====
incomeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  income = Number(incomeInput.value);
  localStorage.setItem("income", income);
  updateSummary();
});

// ===== ADD CATEGORY =====
categoryForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const category = {
    name: categoryNameInput.value,
    amount: Number(categoryAmountInput.value),
    color: getColor(categories.length)
  };

  categories.push(category);
  localStorage.setItem("categories", JSON.stringify(categories));

  categoryNameInput.value = "";
  categoryAmountInput.value = "";

  renderCategories();
  updateSummary();
});

// ===== RENDER CATEGORY LIST =====
function renderCategories() {
  categoriesBody.innerHTML = "";

  categories.forEach((cat, index) => {
    const percent = income > 0 ? ((cat.amount / income) * 100).toFixed(1) : 0;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${cat.name}
        <div class="progress-container">
          <div class="progress-bar" style="width: ${percent}%; background-color: ${cat.color}">${percent}%</div>
        </div>
      </td>
      <td>$${cat.amount}</td>
      <td>${percent}%</td>
      <td><button class="delete-btn" onclick="removeCategory(${index})">X</button></td>
    `;
    categoriesBody.appendChild(row);
  });
}

// ===== REMOVE CATEGORY =====
function removeCategory(index) {
  categories.splice(index, 1);
  localStorage.setItem("categories", JSON.stringify(categories));
  renderCategories();
  updateSummary();
}

// ===== UPDATE SUMMARY =====
function updateSummary() {
  const totalSpending = categories.reduce((sum, cat) => sum + cat.amount, 0);
  const remaining = income - totalSpending;

  totalSpendingEl.textContent = `$${totalSpending}`;
  remainingEl.textContent = `$${remaining}`;

  // Budget rating
  let ratingText = "—";
  let percentSaved = income > 0 ? (remaining / income) * 100 : 0;

  if (percentSaved >= 20) ratingText = "Great — saving well!";
  else if (percentSaved >= 5) ratingText = "Decent — small savings.";
  else if (percentSaved > 0) ratingText = "Low savings — consider adjusting.";
  else ratingText = "Overspending — not sustainable.";

  ratingEl.textContent = ratingText;

  renderCharts();
}

// ===== RENDER CHARTS =====
let pieChart, barChart;
function renderCharts() {
  const labels = categories.map(cat => cat.name);
  const data = categories.map(cat => cat.amount);
  const colors = categories.map(cat => cat.color);

  // Pie Chart
  if(pieChart) pieChart.destroy();
  pieChart = new Chart(pieChartCanvas, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: colors
      }]
    },
    options: {
      plugins: { legend: { labels: { color: '#e0e0e0' } } }
    }
  });

  // Bar Chart
  if(barChart) barChart.destroy();
  barChart = new Chart(barChartCanvas, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Amount',
        data: data,
        backgroundColor: colors
      }]
    },
    options: {
      scales: {
        x: { ticks: { color: '#e0e0e0' } },
        y: { beginAtZero: true, ticks: { color: '#e0e0e0' } }
      },
      plugins: { legend: { labels: { color: '#e0e0e0' } } }
    }
  });
}

// ===== COLOR HELPER =====
function getColor(index) {
  const palette = ['#0bbf6a','#1f77b4','#ff7f0e','#d62728','#9467bd','#8c564b','#e377c2','#7f7f7f','#bcbd22','#17becf'];
  return palette[index % palette.length];
}
