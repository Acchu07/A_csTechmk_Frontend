import { useState } from "react";
import LoginPage from "../Components/LoginForm";
import HomePageDashBoard from "../Boards/HomePageDashBoard";
import "../styles.css";

function Homepage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="parent-container">
      {isLoggedIn ? (
        <HomePageDashBoard isLoggedIn={isLoggedIn} />
      ) : (
        <LoginPage setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
}

export default Homepage;
