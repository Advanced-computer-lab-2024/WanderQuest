import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { useSpring, animated } from "@react-spring/web";
import styles from '../styles/Report.module.css';

// Register necessary components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  ArcElement,
  Title, 
  Tooltip, 
  Legend
);

const Salesrep = () => {
  const [productFilter, setProductFilter] = useState("All");
  const [itineraryFilter, setItineraryFilter] = useState("All");
  const [activityFilter, setActivityFilter] = useState("All");

  const blueColors = [
    'rgb(0, 123, 255)',
    'rgb(52, 152, 219)',
    'rgb(33, 97, 140)',
    'rgb(94, 186, 255)'
  ];

  const allData = {
    labels: ["A", "B", "C", "D"],
    datasets: [
      {
        label: "Revenue",
        data: [200, 300, 400, 500],
        backgroundColor: blueColors,
        borderColor: blueColors,
        borderWidth: 1
      },
    ],
  };

  const doughnutData = {
    labels: ['Products', 'Itineraries', 'Activities', 'Other'],
    datasets: [
      {
        label: 'Sales Distribution',
        data: [1200, 800, 600, 400],
        backgroundColor: [
          'rgb(0, 123, 255)',
          'rgb(52, 152, 219)',
          'rgb(33, 97, 140)',
          'rgb(94, 186, 255)'
        ],
        hoverOffset: 4
      }
    ]
  };

  const filterData = (filter) => {
    return {
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
  };

  const getTotalSales = (data) => {
    return data.datasets[0].data.reduce((sum, value) => sum + value, 0);
  };

  const { productNumber } = useSpring({
    from: { productNumber: 0 },
    to: { productNumber: getTotalSales(filterData(productFilter)) },
    config: { duration: 1000 },
  });

  const { itineraryNumber } = useSpring({
    from: { itineraryNumber: 0 },
    to: { itineraryNumber: getTotalSales(filterData(itineraryFilter)) },
    config: { duration: 1000 },
  });

  const { activityNumber } = useSpring({
    from: { activityNumber: 0 },
    to: { activityNumber: getTotalSales(filterData(activityFilter)) },
    config: { duration: 1000 },
  });

  const chartOptions = {
    responsive: true,
    color: 'black',
    plugins: {
      legend: { 
        position: "top",
        labels: { color: 'black' }
      },
      title: { 
        display: true, 
        text: "Chart",
        color: 'black'
      },
    },
    scales: {
      x: {
        ticks: { color: 'black' },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: { color: 'black' },
        grid: {
          drawBorder: false,
          drawTicks: true,
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: 'black' }
      },
      title: {
        display: true,
        text: 'Sales Distribution',
        color: 'black'
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>Sales Report </h1>
      <div className={styles.totals}>
        <div className={styles.total}>
          <p className={styles.text}>Total Revenue</p>
          <animated.span className={styles.nums}>{productNumber.to((n) => n.toFixed(0))}</animated.span>
        </div>
        <div className={styles.total}>
          <p className={styles.text}>Total users</p>
          <animated.span className={styles.nums}>{productNumber.to((n) => n.toFixed(0))}</animated.span>
        </div>
        <div className={styles.total}>
          <p className={styles.text}>New users</p>
          <animated.span className={styles.nums}>{productNumber.to((n) => n.toFixed(0))}</animated.span>
        </div>

        <div className={styles.graph}>
          <h2>Sales Distribution</h2>
          <Doughnut 
            data={doughnutData}
            options={doughnutOptions}
          />
        </div>
      </div>

      <div className={styles.graphscontainer}>
        <div>
          <label>
            Product Filter:
            <select
              value={productFilter}
              onChange={(e) => setProductFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </label>
          <div className={styles.graph}>
            <h2>Products</h2>
            <Bar
              data={filterData(productFilter)}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: { text: "Products Chart" },
                },
              }}
            />
          </div>
        </div>

        <div>
          <label>
            Itinerary Filter:
            <select
              value={itineraryFilter}
              onChange={(e) => setItineraryFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </label>
          <div className={styles.graph}>
          <h2>Itineraries</h2>
            <Bar
              data={filterData(itineraryFilter)}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: { text: "Itinerary Chart" },
                },
              }}
            />
          </div>
        </div>

        <div>
          <label>
            Activity Filter:
            <select 
              value={activityFilter}
              onChange={(e) => setActivityFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </label>
          <div className={styles.graph}>
          <h2>Activities</h2>
            <Bar
              data={filterData(activityFilter)}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: {
                     text: "Activity Chart" },
                },
              }}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Salesrep;