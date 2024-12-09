import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"; // Import necessary parts of Chart.js
import styles from '../Styles/AdminReport.module.css'; // Create a new CSS file for styling

const AdminReport = () => {
  const [salesReport, setSalesReport] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [filters, setFilters] = useState({ product: "", date: "", month: "" });

  useEffect(() => {
    fetch('http://localhost:4000/admin/salesReport', {
      method: "GET",
      credentials: "include", // Include credentials (cookies) for cross-origin requests
    })
      .then((response) => response.json())
      .then((data) => setSalesReport(data.report))
      .catch((error) => console.log("Error fetching sales report:", error));
    
    fetch('http://localhost:4000/admin/userStats', {
      method: "GET",
      credentials: "include", // Include credentials for user statistics API
    })
      .then((response) => response.json())
      .then((data) => setUserStats(data))
      .catch((error) => console.log("Error fetching user stats:", error));
    
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Format date as MM/DD/YYYY
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US"); // Returns date in MM/DD/YYYY format
  };

  const filterSales = () => {
    if (!salesReport) return { filteredProducts: [], filteredActivities: [], filteredItineraries: [] };
  
    // Helper function to format dates to 'MM/DD/YYYY' for comparison
    const formatDate = (date) => {
      const d = new Date(date);
      return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`; // Month is zero-based
    };
  
    const filteredProducts = salesReport.productDetails.filter((product) => {
      const productDate = formatDate(product.date); // Format product date
      return (
        (filters.product === "" || product.name.toLowerCase().includes(filters.product.toLowerCase())) &&
        (filters.date === "" || productDate === filters.date) &&
        (filters.month === "" || new Date(product.date).getMonth() + 1 === parseInt(filters.month)) // Apply month filter
      );
    });
  
    const filteredActivities = salesReport.activityDetails.filter((activity) => {
      const activityDate = new Date(activity.date); // Get the activity date object
      const activityMonth = activityDate.getMonth() + 1; // Get the month (1-indexed)
      const activityDay = activityDate.getDate(); // Get the day
  
      return (
        (filters.date === "" || formatDate(activity.date) === filters.date) && // Filter by exact date
        (filters.month === "" || activityMonth === parseInt(filters.month)) // Filter by month
      );
    });
  
    const filteredItineraries = salesReport.itineraryDetails.filter((itinerary) => {
      // Iterate over all available dates for itineraries
      const itineraryDates = itinerary.availableDates.map((date) => new Date(date));
      const filteredItineraryDates = itineraryDates.filter((date) => {
        const itineraryMonth = date.getMonth() + 1; // Month is 1-indexed
        const itineraryDay = date.getDate(); // Day of the month
        return (
          (filters.date === "" || formatDate(date) === filters.date) && // Filter by exact date
          (filters.month === "" || itineraryMonth === parseInt(filters.month)) // Filter by month
        );
      });
  
      return filteredItineraryDates.length > 0; // Return itineraries with at least one date matching filter
    });
  
    return { filteredProducts, filteredActivities, filteredItineraries };
  };
  
  

  const renderSalesReport = () => {
    if (!salesReport) return <p>Loading sales report...</p>;

    const { filteredProducts, filteredActivities, filteredItineraries } = filterSales();

    return (
      <>
        <h3>Total Revenue: ${salesReport.totalRevenue}</h3>
        <div className={styles.salesSummary}>
          <div className={styles.chart}>
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
          <div className={styles.chart}>
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

        {/* Filter Section - moved here, before tables */}
        <div className={styles.filter}>
          <h3>Filter Sales</h3>
          <input
            className={styles.filterInput}
            type="text"
            name="product"
            value={filters.product}
            onChange={handleFilterChange}
            placeholder="Filter by Product"
          />
          <input
            className={styles.filterInput}
            type="date"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
          />
          <select
            className={styles.filterSelect}
            name="month"
            value={filters.month}
            onChange={handleFilterChange}
          >
            <option value="">All Months</option>
            {[...Array(12)].map((_, index) => (
              <option key={index} value={index + 1}>
                {new Date(0, index).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>

        {/* Product Sales Table */}
        <h3>Product Sales</h3>
        <div className={styles.tableContainer}>
          <table className={styles.productTable}>
            <thead >
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
    {filteredProducts.map((product) => (
        <tr key={product._id}>
            <td>{product.name}</td>
            <td>${product.price}</td>
            <td>{formatDate(product.date)}</td>
        </tr>
    ))}
</tbody>

          </table>
        </div>

        {/* Activity Sales Table */}
        <h3>Activity Sales</h3>
        <div className={styles.tableContainer}>
          <table className={styles.productTable}>
            <thead>
              <tr>
                <th>Activity Title</th>
                <th>Price</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.map((activity) => (
                <tr key={activity._id}>
                  <td>{activity.title}</td>
                  <td>${activity.price}</td>
                  <td>{formatDate(activity.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Itinerary Sales Table */}
        <h3>Itinerary Sales</h3>
        <div className={styles.tableContainer}>
          <table className={styles.productTable}>
            <thead>
              <tr>
                <th>Itinerary Title</th>
                <th>Price</th>
                <th>Available Dates</th>
              </tr>
            </thead>
            <tbody>
              {filteredItineraries.map((itinerary) => (
                <tr key={itinerary._id}>
                  <td>{itinerary.title}</td>
                  <td>${itinerary.price}</td>
                  <td>{itinerary.availableDates.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
      <h2 className={styles.dashboardTitle}>Admin Sales Dashboard</h2>
      {renderSalesReport()}
      {renderUserStats()}
    </div>
  );
};

export default AdminReport;
