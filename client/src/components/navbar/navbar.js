import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => 
    <nav>
        <Link to="/home" className="link">Home</Link>
        <Link to="/instruments" className="link">Instruments</Link>
        <Link to="/how-to-use" className="link">How To Use</Link>
        <Link to="/bibliography" className="link">Bibliography</Link>
        <Link to="/about" className="link">About</Link>
    </nav>

export default Navbar;