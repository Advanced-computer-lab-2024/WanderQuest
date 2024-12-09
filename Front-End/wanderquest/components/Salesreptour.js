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
import styles from '../styles/Reporttour.module.css';

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Salesreptour = () => {
  const [revenueMonthFilter, setRevenueMonthFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [monthFilter, setMonthFilter] = useState("All");


  const [loading,setLoading]=useState(false);
  const[activities,setActivities]=useState([]);
  const[totalRevenue,setTotalRevenue]=useState(0);
  const[totalUsers,setTotalUsers]=useState(0);
  const[newUsers,setNewUsers]=useState(0);
  const[totalProducts,setTotalProducts]=useState([]);
  const[totalItineraries,setTotalItineraries]=useState([]);
  const[totalActivities,setTotalActivities]=useState([]);  

  const [activityRevenue, setActivityRevenue] = useState(0);
  const [itineraryRevenue, setItineraryRevenue] = useState(0);



  const [productFilter, setProductFilter] = useState("All");
  const [itineraryFilter, setItineraryFilter] = useState("All");
  const [activityFilter, setActivityFilter] = useState("All");



  const getUniqueMonths = () => {
    const months = activities.map(activity => {
      const date = new Date(activity.date);
      return `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
    });
    return [...new Set(months)];
  };

  // Helper function to get unique dates from activities
  const getUniqueDates = () => {
    return [...new Set(activities.map(activity => 
      new Date(activity.date).toLocaleDateString()
    ))];
  };


  const createActivityUsersData = () => {
    let filteredActivities = [...activities];

    if (monthFilter !== "All") {
      filteredActivities = filteredActivities.filter(activity => {
        const date = new Date(activity.date);
        const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
        return monthYear === monthFilter;
      });
    }

    // Group by activity name and sum users
    const groupedData = filteredActivities.reduce((acc, activity) => {
      if (!acc[activity.name]) {
        acc[activity.name] = 0;
      }
      acc[activity.name] += activity.numberOfUsers;
      return acc;
    }, {});

    return {
      labels: Object.keys(groupedData),
      datasets: [{
        label: "Number of Users",
        data: Object.values(groupedData),
        backgroundColor: blueColors,
        borderColor: blueColors,
        borderWidth: 1
      }]
    };
  };

  const createActivityRevenueData = () => {
    let filteredActivities = [...activities];

    // Filter by date if selected
    if (dateFilter !== "All") {
      filteredActivities = filteredActivities.filter(activity => 
        new Date(activity.date).toLocaleDateString() === dateFilter
      );
    }

    // Filter by month if selected
    if (revenueMonthFilter !== "All") {
      filteredActivities = filteredActivities.filter(activity => {
        const date = new Date(activity.date);
        const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
        return monthYear === revenueMonthFilter;
      });
    }

    return {
      labels: filteredActivities.map(activity => activity.name),
      datasets: [{
        label: "Revenue",
        data: filteredActivities.map(activity => activity.price),
        backgroundColor: blueColors,
        borderColor: blueColors,
        borderWidth: 1
      }]
    };
  };
  useEffect(() => {
    const fetchReport = async () => {
        try {
            const response = await fetch('http://localhost:4000/tourGuide/salesReport', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
               

                setActivityRevenue(data.report.activityRevenue || 0); 

                setTotalRevenue(data.report.totalRevenue || 0);
                setActivities(data.report.itineraryDetails || []);
                // setTotalUsers(data.report.totalUsers || 0);
                // setNewUsers(data.report.newUsers || 0);
          
            } else {
                console.error('Failed to fetch report');
            }
        } catch (error) {
            console.error('Error fetching report:', error);
        }
    };

    fetchReport();
}, []);



useEffect(() => {
    const fetchTouristReport = async () => {
        const response = await fetch('http://localhost:4000/tourGuide/TouristReport', {
            method: 'GET',
            credentials: 'include',
        });
        const data = await response.json();
        console.log(data);
        setTotalUsers(data.report.totalTouristsFromActivities || 0);
    }
    fetchTouristReport();
}, []); 





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

  const filterData = (filter, dataType = 'revenue') => {
    const sourceData = dataType === 'revenue' ? createActivityRevenueData() : createActivityUsersData();
    if (filter === "All") return sourceData;

    const filterIndex = sourceData.labels.findIndex(label => label.includes(filter));
    return {
      labels: [sourceData.labels[filterIndex]],
      datasets: [{
        ...sourceData.datasets[0],
        data: [sourceData.datasets[0].data[filterIndex]]
      }]
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
    <animated.span className={styles.nums}>
      ${totalRevenue.toFixed(2)}
    </animated.span>
  </div>
  <div className={styles.total}>
    <p className={styles.text}>Total users</p>
    <animated.span className={styles.nums}>
      {totalUsers}
    </animated.span>
  </div>

  <div className={styles.total}>
    <p className={styles.text}>Itinerary Revenue</p>
    <animated.span className={styles.nums}>
    ${activityRevenue}
    </animated.span>
  </div>
</div>



<div className={styles.graphscontainer}>
        <div>
          <div className={styles.filters}>
            <label>
              Filter by Month:
              <select
                value={revenueMonthFilter}
                onChange={(e) => setRevenueMonthFilter(e.target.value)}
              >
                <option value="All">All Months</option>
                {getUniqueMonths().map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </label>
            <label>
              Filter by Date:
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                disabled={revenueMonthFilter !== "All"} // Disable date filter when month is selected
              >
                <option value="All">All Dates</option>
                {getUniqueDates().map(date => (
                  <option key={date} value={date}>{date}</option>
                ))}
              </select>
            </label>
          </div>
          <div className={styles.graph}>
            <h2>Activities Revenue</h2>
            <Bar
              data={createActivityRevenueData()}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: { text: "Itinerary Revenue by Date/Month" },
                },
              }}
            />
          </div>
        </div>


        <div>
          <div className={styles.filters}>
            <label>
              Filter by Month:
              <select
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
              >
                <option value="All">All Months</option>
                {getUniqueMonths().map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </label>
          </div>
          <div className={styles.graph}>
            <h2>Itinerary Users</h2>
            <Bar
              data={createActivityUsersData()}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: { text: "Activity Users by Month" },
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
