import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <h2 className="logo">Hybrid Speech Emotion Recognition System</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/record">Record</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/history">History</Link>

      </div>

    </nav>
  );
}

export default Navbar;