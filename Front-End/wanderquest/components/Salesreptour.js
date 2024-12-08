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
import styles from '../styles/Reporttour.module.css';

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Salesreptour = () => {
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
            display: false, // Hides vertical grid lines
          },
        },
        y: {
          ticks: { color: 'black' },
          grid: {
            drawBorder: false, // Hides the border line
            drawTicks: true,   // Keeps tick marks
          },
        },
      },
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
            <p className={styles.text}>Products sales</p>
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
          <div className={styles.total}>
            <p className={styles.text}>Itineraries Sales</p>
            <animated.span className={styles.nums}>{itineraryNumber.to((n) => n.toFixed(0))}</animated.span>
          </div>
          <div className={styles.total}>
            <p className={styles.text}>Activity Sales</p>
            <animated.span className={styles.nums}>{activityNumber.to((n) => n.toFixed(0))}</animated.span>
          </div>
        </div>
  
        <div className={styles.graphscontainer}>
  
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
            <h2>Itiniraries</h2>
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
              Activities Filter:
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
            <h2>Activities</h2>
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
  
  
        </div>
        <div className={styles.graphscontainer}>
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
            <h2>Itiniraries</h2>
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
export default Salesreptour;
