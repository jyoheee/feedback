import { Routes, Route, Link } from "react-router-dom";
import LoginSignup from "./pages/LoginSignup";
import UserPage from "./pages/UserPage"; // later your feedback page

function App() {
  // Example login handler
  const handleLogin = (userData) => {
    // handle login logic here
    console.log("Logged in:", userData);
  };

  return (
    <div>
      <nav>
        <Link to="/">Login</Link> | <Link to="/user">Feedbacks</Link>
      </nav>

      <Routes>
        <Route path="/" element={<LoginSignup onLogin={handleLogin} />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </div>
  );
}

export default App;



