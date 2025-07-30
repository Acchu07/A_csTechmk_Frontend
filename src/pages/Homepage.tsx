import { useState } from "react";
import LoginPage from "../Components/LoginForm";

function Homepage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {isLoggedIn ? (
        <HomePageDashBoard />
      ) : (
        <LoginPage setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
}

function HomePageDashBoard() {
  return (
    <div>
      <h1>Home Page Dashboard</h1>
    </div>
  );
}

export default Homepage;
