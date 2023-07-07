import React, { useCallback } from 'react';
import { Box, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const WeeklyAppointmentsChart = ({ weeklyAppointments }) => {
  const ChartComponent = useCallback(() => {
    const countByDate = weeklyAppointments.reduce((counts, date) => {
      counts[date] = (counts[date] || 0) + 1;
      return counts;
    }, {});

    const chartData = Object.entries(countByDate).map(([date, count]) => ({
      date,
      count
    }));

    let mydata = [];
    chartData.forEach((a) => {
      let arr = { "date": new Date(a.date).getDate() + "/" + new Date(a.date).getMonth(), "count": a.count }
      mydata.push(arr);
    });

    return (
      <BarChart width={400} height={300} data={mydata}>
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar style={{ width: '1px' }} dataKey="count" stroke="#8884D8" />
      </BarChart>
    );
  }, [weeklyAppointments]);

  return (
    <Box
      sx={{
        borderRadius: "10px",
        height: "100%",
        padding: "3%",
        '@media (max-width: 950px)': {
          marginBottom: "1rem",
          alignItems: "center",
          width: "100%",
          height: "auto",
        }
      }}
    >
      <Typography variant="h5">WEEKLY APPOINTMENTS</Typography>
      <br />
      <ChartComponent />
    </Box>
  );
};

export default WeeklyAppointmentsChart;