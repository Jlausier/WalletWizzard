document.addEventListener("DOMContentLoaded", function () {
  function displayChart() {
    const data = [1500, 1800, 2200, 1900, 2500, 2800];
    const labels = ["January", "February", "March", "April", "May", "June"];

    const ctx = document.getElementById("income-chart").getContext("2d");

    const incomeChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Income",
            data: data,
            borderColor: "#007bff",
            fill: false,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            stacked: true,
            grid: {
              display: true,
            },
          },
        },
      },
    });
  }

  async function fetchIncomeData() {
    /**
     * @TODO Get config data from the page / handlebars data
     */

    const url = "/api/income";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      displayChart();
    } else {
      // Load error message into chart container
    }
  }

  fetchIncomeData();
});
