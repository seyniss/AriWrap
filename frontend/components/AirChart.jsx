import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";
import { fetchAirData } from "../api/api";

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const AirChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const getData = async () => {
      const data = await fetchAirData();

      // 시간 라벨과 온도/습도 데이터
      const labels = data.map(item => new Date(item.createdAt).toLocaleTimeString());
      const temps = data.map(item => parseFloat(item.temp));
      const hums = data.map(item => parseFloat(item.hum));

      setChartData({
        labels,
        datasets: [
          {
            label: "온도 (℃)",
            data: temps,
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.2)",
          },
          {
            label: "습도 (%)",
            data: hums,
            borderColor: "blue",
            backgroundColor: "rgba(0, 0, 255, 0.2)",
          },
        ],
      });
    };

    getData();
  }, []);

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <h2>실시간 온습도 데이터</h2>
      <Line data={chartData} />
    </div>
  );
};

export default AirChart;
