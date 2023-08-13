import { Chart } from "chart.js";

// const months = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

// const generateLinechart = (array) => {
//   const numMonths = 6; // temp
//   const currentMonth = new Date().getMonth();

//   let diff = 12 - numMonths;

//   const labels = [];
//   for (var i = 0; i <= numMonths; i--) {
//     labels.push(months[currentMonth - i]);
//   }

//   const data = [];
//   for (let i = 0; i < numMonths; i++) data.push(0);

//   array.forEach((item) => {
//     const itemMonth = new Date(item.created_at).getMonth();

//     const index = currentMonth - itemMonth;
//     data[index] = data[index] + item.amount;
//   });
// };

// Chart.pluginService.register("chartjs", {
//   afterDraw: function (chartobj) {
//     const { labels, datasets } = chartobj.data;

//     var template = Handlebars.compile(`<div class="chartjs-chart">
//       <canvas id="chart"></canvas>
//       <script>var chart = new Chart(document.getElementById("chart"), {
//         type: "line",
//         data: {
//           "labels": data.labels,
//           "datasets": datasets,
//           "options": {
//             "scales": {
//               "yAxes": [{
//                 "ticks": {
//                   "beginAtZero": true}
//                 }
//               }]
//             }
//           }
//         }
//       });</script>
//     </div>`);

//     var chart = new Chart(document.getElementById("chart"), {
//       type: "line",
//       data: {
//         labels: labels,
//         datasets: datasets,
//         options: {
//           scales: {
//             yAxes: [
//               {
//                 ticks: {
//                   beginAtZero: true,
//                 },
//               },
//             ],
//           },
//         },
//       },
//     });
//   },
// });

const loadIncomeChart = (array) => {
  // Sample data for income over 6 months
  const sampleData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Income",
        data: [1500, 1800, 2200, 1900, 2500, 2800],
        borderColor: "#007bff",
        fill: false,
      },
    ],
  };

  // Compile Handlebars template
  const templateSource = document.getElementById(
    "income-chart-template"
  ).innerHTML;
  const template = Handlebars.compile(templateSource);
  const renderedHtml = template();

  // Insert the rendered HTML into the chart-container
  document.getElementById("income-chart-container").innerHTML = renderedHtml;

  // Get the canvas element
  const ctx = document.getElementById("income-chart").getContext("2d");

  // Create the line chart using Chart.js
  const incomeChart = new Chart(ctx, {
    type: "line",
    data: sampleData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

export default { loadIncomeChart };
