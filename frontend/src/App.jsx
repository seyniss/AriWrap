import AirChart from "../components/AirChart";
import AirTable from "../components/AirTable";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>온습도 모니터링</h1>
      <AirChart />
      <AirTable />
    </div>
  );
}

export default App;
