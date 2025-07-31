import { useState } from "react";
import LoginPage from "../Components/LoginForm";
import HomePageDashBoard from "../Boards/HomePageDashBoard";

function Homepage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {isLoggedIn ? (
        <HomePageDashBoard isLoggedIn={isLoggedIn} />
      ) : (
        <LoginPage setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
}

export default Homepage;
