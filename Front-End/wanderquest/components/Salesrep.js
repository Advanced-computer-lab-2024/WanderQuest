"use client"
import React, { useState, useEffect } from "react";
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

// Chart configuration constants
const chartColors = {
  primary: 'rgb(0, 123, 255)',
  hover: 'rgb(52, 152, 219)',
  distribution: ['rgb(0, 123, 255)', 'rgb(52, 152, 219)', 'rgb(33, 97, 140)']
};

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
    }
  }
};

// Helper functions
const getUniqueDates = (products) => {
  return [...new Set(products.map(product => 
    new Date(product.date).toISOString().split('T')[0]
  ))].sort();
};

const getUniqueMonths = (products) => {
  return [...new Set(products.map(product => {
    const date = new Date(product.date);
    return date.toISOString().slice(0, 7); // YYYY-MM format
  }))].sort();
};

const Salesrep = () => {
  // Filters state
  const [productFilter, setProductFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [monthFilter, setMonthFilter] = useState("All");
  const [itineraryFilter, setItineraryFilter] = useState("All");
  const [activityFilter, setActivityFilter] = useState("All");

  // Data state
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activities, setActivities] = useState([]);
  const [itineraries, setItineraries] = useState([]);
  const [products, setProducts] = useState([]); 

  // Statistics state
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [newUsers, setNewUsers] = useState(0);
  const [productRevenue, setProductRevenue] = useState(0);
  const [activityRevenue, setActivityRevenue] = useState(0);
  const [itineraryRevenue, setItineraryRevenue] = useState(0);

  // Fetch sales report data
  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:4000/admin/salesReport', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch report');
        }

        const data = await response.json();
        setReport(data);
        setProductRevenue(data.report.productRevenue || 0);
        setActivityRevenue(data.report.activityRevenue || 0); 
        setItineraryRevenue(data.report.itineraryRevenue || 0);
        setTotalRevenue(data.report.totalRevenue || 0);
        setProducts(data.report.productDetails || []);
        setItineraries(data.report.itineraryDetails || []);
        setActivities(data.report.activityDetails || []);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching report:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  // Fetch user statistics
  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await fetch('http://localhost:4000/admin/userStats', {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch user stats');
        }

        const data = await response.json();
        setTotalUsers(data.totalUsers);
        setNewUsers(data.newUsers);
      } catch (error) {
        console.error('Error fetching user stats:', error);
      }
    };

    fetchUserStats();
  }, []);

  // Data preparation functions
  const prepareProductData = () => {
    let filteredProducts = [...products];
    
    if (productFilter !== "All") {
      filteredProducts = filteredProducts.filter(product => product.name === productFilter);
    }
    if (dateFilter !== "All") {
      filteredProducts = filteredProducts.filter(product => {
        const productDate = new Date(product.date);
        const filterDate = new Date(dateFilter);
        return productDate.toISOString().split('T')[0] === filterDate.toISOString().split('T')[0];
      });
    }
    if (monthFilter !== "All") {
      filteredProducts = filteredProducts.filter(product => {
        const productDate = new Date(product.date);
        const yearMonth = productDate.toISOString().slice(0, 7);
        return yearMonth === monthFilter;
      });
    }

    return {
      labels: filteredProducts.map(product => product.name),
      datasets: [{
        label: "Revenue",
        data: filteredProducts.map(product => product.price),
        backgroundColor: chartColors.primary,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 6,
        hoverBackgroundColor: chartColors.hover,
        hoverBorderColor: 'white',
        hoverBorderWidth: 2,
      }]
    };
  };

  const prepareItineraryData = () => {
    return {
      labels: itineraries.map(itinerary => itinerary.title),
      datasets: [{
        label: "Revenue",
        data: itineraries.map(itinerary => itinerary.price),
        backgroundColor: chartColors.primary,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 6,
        hoverBackgroundColor: chartColors.hover,
        hoverBorderColor: 'white',
        hoverBorderWidth: 2,
      }]
    };
  };

  const prepareActivityData = () => {
    return {
      labels: activities.map(activity => activity.title),
      datasets: [{
        label: "Revenue",
        data: activities.map(activity => activity.price),
        backgroundColor: chartColors.primary,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 6,
        hoverBackgroundColor: chartColors.hover,
        hoverBorderColor: 'white',
        hoverBorderWidth: 2,
      }]
    };
  };

  const doughnutData = {
    labels: ['Products', 'Itineraries', 'Activities'],
    datasets: [{
      label: 'Sales Distribution',
      data: [productRevenue, itineraryRevenue, activityRevenue],
      backgroundColor: chartColors.distribution,
      borderWidth: 2,
      borderColor: 'white',
      hoverOffset: 4
    }]
  };

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Sales Report</h1>
      
      {loading ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        <>
          {/* Stats Cards Row */}
          <div className={styles.statsGrid}>
            <div className={styles.statsCard}>
              <p className={styles.statsLabel}>Total Revenue</p>
              <animated.span className={styles.statsValue}>
                ${totalRevenue}
              </animated.span>
            </div>
            
            <div className={styles.statsCard}>
              <p className={styles.statsLabel}>Total Users</p>
              <animated.span className={styles.statsValue}>
                {totalUsers}
              </animated.span>
            </div>
            
            <div className={styles.statsCard}>
              <p className={styles.statsLabel}>New Users</p>
              <animated.span className={styles.statsValue}>
                {newUsers}
              </animated.span>
            </div>
          </div>

          {/* Charts Grid */}
          <div className={styles.chartsContainer}>
            {/* Sales Distribution Chart */}
            <div className={styles.chartCard}>
              <h2 className={styles.chartTitle}>Sales Distribution</h2>
              <div className={styles.chartWrapper}>
                <Doughnut 
                  data={doughnutData}
                  options={doughnutOptions}
                />
              </div>
            </div>

            {/* Products Chart */}
            <div className={styles.chartCard}>
              <div className={styles.filterSection}>
                <label className={styles.filterLabel}>
                  Product:
                  <select
                    className={styles.filterSelect}
                    value={productFilter}
                    onChange={(e) => setProductFilter(e.target.value)}
                  >
                    <option value="All">All</option>
                    {products.map(product => (
                      <option key={product.name} value={product.name}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label className={styles.filterLabel}>
                  Date:
                  <select
                    className={styles.filterSelect}
                    value={dateFilter}
                    onChange={(e) => {
                      setDateFilter(e.target.value);
                      setMonthFilter("All");
                    }}
                  >
                    <option value="All">All Dates</option>
                    {getUniqueDates(products).map(date => (
                      <option key={date} value={date}>
                        {new Date(date).toLocaleDateString()}
                      </option>
                    ))}
                  </select>
                </label>

                <label className={styles.filterLabel}>
                  Month:
                  <select
                    className={styles.filterSelect}
                    value={monthFilter}
                    onChange={(e) => {
                      setMonthFilter(e.target.value);
                      setDateFilter("All");
                    }}
                  >
                    <option value="All">All Months</option>
                    {getUniqueMonths(products).map(month => (
                      <option key={month} value={month}>
                        {new Date(month).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              
              <h2 className={styles.chartTitle}>Products Revenue</h2>
              <div className={styles.chartWrapper}>
                <Bar
                  data={prepareProductData()}
                  options={{
                    ...chartOptions,
                    plugins: {
                      ...chartOptions.plugins,
                      title: { text: "Products Revenue" },
                    },
                  }}
                />
              </div>
            </div>

            {/* Itineraries Chart */}
            <div className={styles.chartCard}>
              <h2 className={styles.chartTitle}>Itineraries Revenue</h2>
              <div className={styles.chartWrapper}>
                <Bar
                  data={prepareItineraryData()}
                  options={{
                    ...chartOptions,
                    plugins: {
                      ...chartOptions.plugins,
                      title: { text: "Itinerary Revenue" },
                    },
                  }}
                />
              </div>
            </div>

            {/* Activities Chart */}
            <div className={styles.chartCard}>
              <h2 className={styles.chartTitle}>Activities Revenue</h2>
              <div className={styles.chartWrapper}>
                <Bar
                  data={prepareActivityData()}
                  options={{
                    ...chartOptions,
                    plugins: {
                      ...chartOptions.plugins,
                      title: { text: "Activity Revenue" },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Salesrep;