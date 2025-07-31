import { useState } from "react";
import Agents from "./AgentsPageBoard";
import CSV from "../Components/uploadCSV";

enum ComponentClicked {
  LatestCSV,
  AGENTS,
  CSV,
}

function HomePageDashBoard({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [componentClicked, setComponentClicked] = useState(
    ComponentClicked.LatestCSV,
  );
  const [displayDistributedList, setDisplayDistributedList] = useState([]);

  return (
    <div>
      <button onClick={() => setComponentClicked(ComponentClicked.LatestCSV)}>
        LatestCSV
      </button>
      <button onClick={() => setComponentClicked(ComponentClicked.AGENTS)}>
        Agents
      </button>
      <button onClick={() => setComponentClicked(ComponentClicked.CSV)}>
        CSV
      </button>

      {isLoggedIn && componentClicked === ComponentClicked.LatestCSV && (
        <LatestCSV displayDistributedList={displayDistributedList} />
      )}
      {isLoggedIn && componentClicked === ComponentClicked.AGENTS && <Agents />}
      {isLoggedIn && componentClicked === ComponentClicked.CSV && (
        <CSV setDisplayDistributedList={setDisplayDistributedList} />
      )}
      {/* Add Proper Log Out Functionality && Clear Cookies Both Ends */}
      {/* <button onClick={() => setIsLoggedIn(false)}>Logout</button> */}
    </div>
  );
}

function LatestCSV({
  displayDistributedList,
}: {
  displayDistributedList: any; // fix type
}) {
  return (
    <div>
      <h1>Latest CSV</h1>
      {displayDistributedList.length === 0 ? (
        <p>No Distributed List</p>
      ) : (
        displayDistributedList.map((agent: any) => (
          <div key={agent.id}>
            <h2>{agent.name}</h2>
            {agent.tasks.map((task: any, index: number) => (
              // Problematic key needs a Unique ID.
              <div key={index}>
                <h3>Tasks: {index + 1}</h3>
                <ul>
                  <li>{task.firstname}</li>
                  <li>{task.phone}</li>
                  <li>{task.notes}</li>
                </ul>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default HomePageDashBoard;
