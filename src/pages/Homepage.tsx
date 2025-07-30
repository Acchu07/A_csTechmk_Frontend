import { useState } from "react";
import LoginPage from "../Components/LoginForm";
import HomePageDashBoard from "../Boards/HomePageDashBoard";

function Homepage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {isLoggedIn ? (
        <HomePageDashBoard
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      ) : (
        <LoginPage setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
}

export default Homepage;
