import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSpring, animated } from "@react-spring/web";
import styles from '../styles/products.module.css';
// Register necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Salesrep = () => {
  const [filter, setFilter] = useState("All"); // State to track the filter

  const allData = {
    labels: ["A", "B", "C", "D"],
    datasets: [
      {
        label: "Revenue",
        data: [200, 300, 400, 500],
      },
    ],
  };

  // Calculate total sales for the default (all data)
  const defaultTotalSales = allData.datasets[0].data.reduce(
    (sum, value) => sum + value,
    0
  );

  // Filter logic
  const filteredData = {
    ...allData,
    labels:
      filter === "All"
        ? allData.labels
        : allData.labels.filter((label, index) => label === filter),
    datasets: [
      {
        ...allData.datasets[0],
        data:
          filter === "All"
            ? allData.datasets[0].data
            : allData.datasets[0].data.filter(
                (_, index) => allData.labels[index] === filter
              ),
      },
    ],
  };

  // Calculate total sales for the filtered data
  const filteredTotalSales = filteredData.datasets[0].data.reduce(
    (sum, value) => sum + value,
    0
  );

  // Spring animation for total sales
  const { number } = useSpring({
    from: { number: 0 },
    to: { number: filter === "All" ? defaultTotalSales : filteredTotalSales },
    config: { duration: 1000 },
  });

  return (
    <div>
        <div>
            <div className={styles.total}>
                <p>Totoal Revene</p> </div>
            <div className={styles.total}>
                <p>Itiniraries sales</p> </div>
            <div className={styles.total}>
                <p>Activity sales </p> </div>
            <div className={styles.total}>
                <p>products sales</p> 
            
            </div>
        </div>



      <h1>Salesrep</h1>
      <label>
        Filter by Label:
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
      </label>
      <div>
        <Bar
          data={filteredData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "top" },
              title: { display: true, text: "Filtered Revenue Chart" },
            },
          }}
        />
      </div>
      <div style={{ marginTop: "20px", fontSize: "1.5rem", fontWeight: "bold" }}>
        Total Sales:{" "}
        <animated.span>{number.to((n) => n.toFixed(0))}</animated.span>
      </div>
    </div>
  );
};

export default Salesrep;
