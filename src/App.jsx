import "./App.css";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login from "./components/Login";
import Students from "./components/Students";
// import SignUp from "./components/signup";

function AppContent() {
  const location = useLocation();
  const showNav = location.pathname !== "/";

  return (
    <div>
      {showNav && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/signup" element={<SignUp />} /> */}
        <Route path="/student" element={<Students />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
