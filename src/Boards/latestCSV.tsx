// Might not refactor

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
