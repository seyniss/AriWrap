import { useEffect, useState } from "react";
import { fetchAirData } from "../api/api";

const AirTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAirData().then(setData);
  }, []);

  return (
    <table border="1" cellPadding="5" style={{ width: "100%", marginTop: "20px" }}>
      <thead>
        <tr>
          <th>시간</th>
          <th>온도</th>
          <th>습도</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item._id}>
            <td>{new Date(item.createdAt).toLocaleString()}</td>
            <td>{item.temp}</td>
            <td>{item.hum}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AirTable;
