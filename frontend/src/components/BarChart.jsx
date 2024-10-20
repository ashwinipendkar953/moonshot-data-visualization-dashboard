import { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  LineElement,
  PointElement,
  TimeScale,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  LineElement,
  PointElement,
  TimeScale,
  zoomPlugin
);
import { format, parse } from "date-fns";

const BarChart = ({ data }) => {
  const [selectedFeature, setSelectedFeature] = useState(null);
  // console.log(data);

  const totals = {
    A: data.reduce((sum, d) => sum + parseInt(d.A), 0) / 360,
    B: data.reduce((sum, d) => sum + parseInt(d.B), 0) / 360,
    C: data.reduce((sum, d) => sum + parseInt(d.C), 0) / 360,
    D: data.reduce((sum, d) => sum + parseInt(d.D), 0) / 360,
    E: data.reduce((sum, d) => sum + parseInt(d.E), 0) / 360,
    F: data.reduce((sum, d) => sum + parseInt(d.F), 0) / 360,
  };

  // console.log(totals);

  const barData = {
    labels: Object.keys(totals),
    datasets: [
      {
        label: "Total Time Spent (in hours)",
        data: Object.values(totals),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const lineData = selectedFeature
    ? {
        labels: data.map((d) =>
          format(parse(d.day, "d/M/yyyy", new Date()), "dd-MMM")
        ),
        datasets: [
          {
            label: `Trend for ${selectedFeature}`,
            data: data.map((d) => parseInt(d[selectedFeature]) / 60),
            fill: false,
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            pointRadius: 4, // Show dots on all points
            pointHoverRadius: 6,
            pointBackgroundColor: "rgba(54, 162, 235, 1)",
            pointBorderColor: "#fff",
            pointStyle: (ctx) => (ctx.dataIndex % 1 === 0 ? "circle" : "none"), // Ensures dots appear only on dates
          },
        ],
      }
    : null;

  const handleBarClick = (elements) => {
    if (elements.length > 0) {
      const index = elements[0].index;
      const feature = Object.keys(totals)[index];
      setSelectedFeature(feature);
    }
  };

  const zoomOptions = {
    pan: {
      enabled: true,
      mode: "x",
    },
    zoom: {
      pinch: {
        enabled: true,
      },
      mode: "x",
    },
  };

  return (
    <div className="bar-chart d-lg-flex gap-5">
      <Bar
        data={barData}
        options={{
          responsive: true,
          indexAxis: "y", // This line changes the axis
          onClick: (_, elements) => handleBarClick(elements),
          scales: {
            x: {
              title: {
                display: true,
                text: "Total Time Spent (in hours)", // X-axis title
              },
              beginAtZero: true,
            },
            y: {
              title: {
                display: true,
                text: "Features", // Y-axis title
              },
            },
          },
        }}
      />
      {selectedFeature && (
        <Line
          data={lineData}
          options={{
            plugins: {
              zoom: zoomOptions,
            },
          }}
        />
      )}
    </div>
  );
};

export default BarChart;
