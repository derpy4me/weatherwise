import {Chart, registerables} from 'chart.js';
import {loadHeaderFooter} from "./utils.mjs";

loadHeaderFooter();


Chart.register(...registerables);

const ctx = document.getElementById("temperatureChart").getContext("2d");
const chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [{
      label: "Temperature (°C)",
      data: [17, 19, 16, 18, 15, 20, 18],
      borderColor: "#66b3ff",
      backgroundColor: "rgba(102, 179, 255, 0.2)",
      tension: 0.4,
      borderWidth: 2
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: false,
        ticks: {color: "#e0e0e0"}
      },
      x: {
        ticks: {color: "#e0e0e0"}
      }
    },
    plugins: {
      legend: {display: false}
    }
  }
});
