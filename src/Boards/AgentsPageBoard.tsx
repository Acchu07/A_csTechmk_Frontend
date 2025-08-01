import { useState } from "react";
import AgentForm from "../Components/AgenForm";

enum feature {
  CREATEAGENT = "Create Agent",
  FEATURETWO = "Feature 2",
}

function Agents() {
  const [featureClicked, setFeatureClicked] = useState(feature.CREATEAGENT);
  return (
    <div className="nav-bar-2">
      <div>
        <button
          className="btn"
          onClick={() => setFeatureClicked(feature.CREATEAGENT)}
        >
          {feature.CREATEAGENT}
        </button>
        <button
          className="btn"
          onClick={() => setFeatureClicked(feature.FEATURETWO)}
        >
          {feature.FEATURETWO}
        </button>
      </div>

      <div>
        {featureClicked === feature.CREATEAGENT && <Feature1 />}
        {featureClicked === feature.FEATURETWO && <Feature2 />}
      </div>
    </div>
  );
}

function Feature1() {
  return (
    <>
      <h1>Create A New Agent</h1>
      <AgentForm />
    </>
  );
}

function Feature2() {
  return <h1>Feature 2</h1>;
}

export default Agents;

//ToDo One Major Form which sends multiple agents to the backend not the current single form per agent maybe useref for storage?
