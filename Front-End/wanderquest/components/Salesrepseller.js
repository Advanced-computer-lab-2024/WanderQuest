'use client'
import React, { useState, useEffect } from "react";
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
import styles from '../styles/Reportseller.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Salesrepseller = () => {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [productRevenue, setProductRevenue] = useState(0);

  // Filters state
  const [productMonthFilter, setProductMonthFilter] = useState("All");
  const [productDateFilter, setProductDateFilter] = useState("All");
  const [productFilter, setProductFilter] = useState("All");

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await fetch('http://localhost:4000/seller/salesReport', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setReport(data);
          setTotalRevenue(data.report.totalRevenue || 0);
          setProducts(data.report.productDetails || []);
          setProductRevenue(data.report.productRevenue || 0);
        } else {
          console.error('Failed to fetch report');
        }
      } catch (error) {
        console.error('Error fetching report:', error);
      }
    };

    fetchReport();
  }, []);

  // Helper functions for unique values
  const getUniqueMonths = () => {
    const months = products.map(product => {
      const date = new Date(product.date);
      return `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
    });
    return [...new Set(months)];
  };

  const getUniqueDates = () => {
    return [...new Set(products.map(product =>
      new Date(product.date).toLocaleDateString()
    ))];
  };

  const getUniqueProductNames = () => {
    return [...new Set(products.map(product => product.name))];
  };

  const blueColors = [
    'rgb(0, 123, 255)',
    'rgb(52, 152, 219)',
    'rgb(33, 97, 140)',
    'rgb(94, 186, 255)'
  ];

  const createProductRevenueData = () => {
    let filteredProducts = [...products];

    if (productDateFilter !== "All") {
      filteredProducts = filteredProducts.filter(product =>
        new Date(product.date).toLocaleDateString() === productDateFilter
      );
    }

    if (productMonthFilter !== "All") {
      filteredProducts = filteredProducts.filter(product => {
        const date = new Date(product.date);
        const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
        return monthYear === productMonthFilter;
      });
    }

    if (productFilter !== "All") {
      filteredProducts = filteredProducts.filter(product =>
        product.name === productFilter
      );
    }

    return {
      labels: filteredProducts.map(product => `${product.name} (${new Date(product.date).toLocaleDateString()})`),
      datasets: [{
        label: "Product Revenue",
        data: filteredProducts.map(product => product.price),
        backgroundColor: blueColors,
        borderColor: blueColors,
        borderWidth: 1
      }]
    };
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
        text: "Product Revenue by Date/Month",
        color: 'black',
        padding: {
          top: 30
        }
      },
      // Custom HTML for filters
      customCanvasBackgroundColor: {
        color: 'white',
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

  return (
    <div className={styles.container}>
      <h1>Sales Report</h1>
      <div className={styles.totals}>
        <div className={styles.total}>
          <p className={styles.text}>Total Revenue</p>
          <animated.span className={styles.nums}>
            ${totalRevenue.toFixed(2)}
          </animated.span>
        </div>
        <div className={styles.total}>
          <p className={styles.text}>Products Revenue</p>
          <animated.span className={styles.nums}>
            ${productRevenue}
          </animated.span>
        </div>
      </div>

      <div className={styles.graphscontainer}>
        <div className={styles.graphWrapper}>
          <div className={styles.graph}>
            <div className={styles.chartFilters}>
              <label>
                Month:
                <select
                  value={productMonthFilter}
                  onChange={(e) => setProductMonthFilter(e.target.value)}
                >
                  <option value="All">All Months</option>
                  {getUniqueMonths().map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
              </label>
              <label>
                Date:
                <select
                  value={productDateFilter}
                  onChange={(e) => setProductDateFilter(e.target.value)}
                  disabled={productMonthFilter !== "All"}
                >
                  <option value="All">All Dates</option>
                  {getUniqueDates().map(date => (
                    <option key={date} value={date}>{date}</option>
                  ))}
                </select>
              </label>
              <label>
                Product:
                <select
                  value={productFilter}
                  onChange={(e) => setProductFilter(e.target.value)}
                >
                  <option value="All">All Products</option>
                  {getUniqueProductNames().map(name => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </label>
            </div>
            <Bar
              data={createProductRevenueData()}
              options={chartOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Salesrepseller;