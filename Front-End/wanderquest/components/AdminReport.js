import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"; // Import the necessary parts of Chart.js
import styles from '../Styles/AdminReport.module.css'; // Create a new CSS file for styling

const AdminReport = () => {
  const [salesReport, setSalesReport] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [filters, setFilters] = useState({ product: "", date: "", month: "" });
  const [filterVisible, setFilterVisible] = useState(false);

  

  useEffect(() => {
    fetch('http://localhost:4000/admin/salesReport', {
      method: "GET",
      credentials: "include", // Include credentials (cookies) for cross-origin requests
    })
      .then((response) => response.json())
      .then((data) => setSalesReport(data.report))
      .catch((error) => console.error("Error fetching sales report:", error));
    
    fetch('http://localhost:4000/admin/userStats', {
      method: "GET",
      credentials: "include", // Include credentials for user statistics API
    })
      .then((response) => response.json())
      .then((data) => setUserStats(data))
      .catch((error) => console.error("Error fetching user stats:", error));
    
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filterSales = () => {
    if (!salesReport) return;

    return salesReport.productDetails.filter((product) => {
      return (
        (filters.product === "" || product.name.includes(filters.product)) &&
        (filters.date === "" || new Date(product.date).toLocaleDateString().includes(filters.date)) &&
        (filters.month === "" || new Date(product.date).getMonth() + 1 === parseInt(filters.month))
      );
    });
  };

  const renderSalesReport = () => {
    if (!salesReport) return <p>Loading sales report...</p>;

    const filteredProducts = filterSales();

    return (
      <>
        <h3>Total Revenue: ${salesReport.totalRevenue}</h3>
        <div className={styles.salesSummary}>
          <div>
            <h4>Product Revenue: ${salesReport.productRevenue}</h4>
            <Bar
              data={{
                labels: salesReport.productDetails.map((product) => product.name),
                datasets: [
                  {
                    label: "Product Revenue",
                    data: salesReport.productDetails.map((product) => product.price),
                    backgroundColor: "#42a5f5",
                  },
                ],
              }}
            />
          </div>
          <div>
            <h4>Activity Revenue: ${salesReport.activityRevenue}</h4>
            <Line
              data={{
                labels: salesReport.activityDetails.map((activity) => activity.title),
                datasets: [
                  {
                    label: "Activity Revenue",
                    data: salesReport.activityDetails.map((activity) => activity.price),
                    borderColor: "#66bb6a",
                    fill: false,
                  },
                ],
              }}
            />
          </div>
        </div>
        <h3>Product Sales</h3>
        <ul>
          {filteredProducts.map((product) => (
            <li key={product.name}>
              {product.name} - ${product.price} - {product.date}
            </li>
          ))}
        </ul>
      </>
    );
  };

  const renderUserStats = () => {
    if (!userStats) return <p>Loading user statistics...</p>;

    const monthlyNewUsers = userStats.newUsersPerMonth.map((monthData) => ({
      label: monthData.month,
      value: monthData.count,
    }));

    return (
      <div className={styles.userstats}>
        <h3>Total Users: {userStats.totalUsers}</h3>
        <h4>New Users Per Month</h4>
        <Bar
          data={{
            labels: monthlyNewUsers.map((data) => data.label),
            datasets: [
              {
                label: "New Users",
                data: monthlyNewUsers.map((data) => data.value),
                backgroundColor: "#ff7043",
              },
            ],
          }}
        />
      </div>
    );
  };

  return (
    <div className={styles.dashboard}>
      <h2 className={styles.h2}>Sales Report</h2>
      <div className={styles.filter}>
        <h3>Filter Sales</h3>
        <input
          className={styles.filtersinput}
          type="text"
          name="product"
          value={filters.product}
          onChange={handleFilterChange}
          placeholder="Filter by Product"
        />
        <input
        className={styles.filtersinput}
          type="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
        />
        <select className={styles.filtersselect} name="month" value={filters.month} onChange={handleFilterChange}>
          <option value="">All Months</option>
          {[...Array(12)].map((_, index) => (
            <option key={index} value={index + 1}>
              {new Date(0, index).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
      </div>

      {/* Sales Report Section */}
      {renderSalesReport()}

      {/* User Statistics Section */}
      {renderUserStats()}
    </div>
  );
};

export default AdminReport;
