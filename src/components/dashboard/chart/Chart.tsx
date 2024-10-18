import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { ChartOptions } from "chart.js";
import "./styles.scss";

function BarChart() {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        // Destroy the existing chart instance if it exists
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        // Create the new bar chart
        chartInstanceRef.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
            datasets: [
              {
                data: [
                  300, 500, 700, 600, 800, 400, 900, 600, 750, 850, 300, 650,
                ],
                backgroundColor: "#8576ff", 
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
            },
            // scales: {
            //   y: {
            //     beginAtZero: true,
            //     max: 1000,
            //     ticks: {
            //       stepSize: 200,
            //     },
            //     grid: {
            //       color: "#f1f5f9", // Light grid color for dotted effect
            //       borderDash: [5, 5], // Dotted line effect
            //     },
            //   },
            //   x: {
            //     grid: {
            //       color: "#f1f5f9", // Light grid color for dotted effect
            //       borderDash: [5, 5], // Dotted line effect
            //     },
            //   },
            // },

            scales: {
              x: {
                grid: {
                  color: "#f1f5f9",
                },
                border: {
                  dash: [5, 5],
                },
                
              },
              y: {
                beginAtZero: true,
                max: 1000,
                grid: {
                  color: "#f1f5f9",
                },
                border: {
                  dash: [5, 5],
                },
                ticks: {
                  stepSize: 200,
                },
              },
            },
          } as ChartOptions, 
        });
      }
    }

    // Cleanup function to destroy chart instance when component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="chart">
      <div className="chart_content">
        <canvas ref={chartRef} />
      </div>
    </div>
  );
}

export default BarChart;
