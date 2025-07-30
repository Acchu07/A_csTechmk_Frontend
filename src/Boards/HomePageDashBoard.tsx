import { useState } from "react";
import Agents from "./AgentsPageBoard";

enum ComponentClicked {
  DASHBOARD,
  AGENTS,
  CSV,
}

function HomePageDashBoard({
  isLoggedIn,
  setIsLoggedIn,
}: {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}) {
  const [componentClicked, setComponentClicked] = useState(
    ComponentClicked.DASHBOARD,
  );
  return (
    <div>
      <button onClick={() => setComponentClicked(ComponentClicked.DASHBOARD)}>
        Dashboard
      </button>
      <button onClick={() => setComponentClicked(ComponentClicked.AGENTS)}>
        Agents
      </button>
      <button onClick={() => setComponentClicked(ComponentClicked.CSV)}>
        CSV
      </button>
      {isLoggedIn && componentClicked === ComponentClicked.DASHBOARD && (
        <Dashboard />
      )}
      {isLoggedIn && componentClicked === ComponentClicked.AGENTS && <Agents />}
      {isLoggedIn && componentClicked === ComponentClicked.CSV && <CSV />}
      {/* Add Proper Log Out Functionality && Clear Cookies Both Ends */}
      <button onClick={() => setIsLoggedIn(false)}>Logout</button>
    </div>
  );
}

function Dashboard() {
  return <h1>Home Page Dashboard</h1>;
}

function CSV() {
  return <h1>CSV</h1>;
}

export default HomePageDashBoard;
