import { useState } from "react";
import Agents from "./AgentsPageBoard";
import CSV from "../Components/uploadCSV";

enum ComponentClicked {
  LatestCSV,
  AGENTS,
  CSV,
}

// Home Page Post Successful Login
function HomePageDashBoard({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [componentClicked, setComponentClicked] = useState(
    ComponentClicked.LatestCSV,
  );
  const [displayDistributedList, setDisplayDistributedList] = useState([]);

  return (
    <div className="parent-container">
      <nav className="nav-bar-1">
        <button
          className="btn"
          onClick={() => setComponentClicked(ComponentClicked.LatestCSV)}
        >
          LatestCSV
        </button>
        <button
          className="btn"
          onClick={() => setComponentClicked(ComponentClicked.AGENTS)}
        >
          Agents
        </button>
        <button
          className="btn"
          onClick={() => setComponentClicked(ComponentClicked.CSV)}
        >
          CSV
        </button>
      </nav>

      {isLoggedIn && componentClicked === ComponentClicked.LatestCSV && (
        <LatestCSV displayDistributedList={displayDistributedList} />
      )}
      {isLoggedIn && componentClicked === ComponentClicked.AGENTS && <Agents />}
      {isLoggedIn && componentClicked === ComponentClicked.CSV && (
        <CSV
          setDisplayDistributedList={setDisplayDistributedList}
          setComponentClicked={setComponentClicked}
        />
      )}
      {/* Add Proper Log Out Functionality && Clear Cookies Both Ends */}
      {/* <button onClick={() => setIsLoggedIn(false)}>Logout</button> */}
    </div>
  );
}

// CSS styling done via chatgpt looks better than what i had made
function LatestCSV({
  displayDistributedList,
}: {
  displayDistributedList: any; // fix type
}) {
  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="mb-6 border-b border-gray-200 pb-2 text-2xl font-bold text-gray-800">
        Latest CSV Distributions
      </h1>
      {displayDistributedList.length === 0 ? (
        <div className="rounded-lg bg-gray-50 py-10 text-center">
          <p className="text-lg text-gray-500">
            No distribution lists available
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Upload a CSV file to get started
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {displayDistributedList.map((agent: any) => (
            <div
              className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
              key={agent.id}
            >
              <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {agent.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {agent.tasks.length} tasks assigned
                </p>
              </div>
              <div className="divide-y divide-gray-100">
                {agent.tasks.map((task: any, index: number) => (
                  <div
                    key={index}
                    className="p-4 transition-colors hover:bg-gray-50"
                  >
                    <div className="mb-2 flex items-center space-x-1">
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                        Task {index + 1}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-gray-500">
                          Name
                        </p>
                        <p className="text-gray-800">
                          {task.firstname || "N/A"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-gray-500">
                          Phone
                        </p>
                        <p className="text-gray-800">{task.phone || "N/A"}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-gray-500">
                          Notes
                        </p>
                        <p className="truncate text-gray-800">
                          {task.notes || "No notes"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePageDashBoard;
