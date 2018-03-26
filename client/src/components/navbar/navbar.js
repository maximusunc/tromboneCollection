import React from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => 
    <nav>
        <NavLink to="/home" activeClassName="active" className="link">Home</NavLink>
        <NavLink to="/instruments" activeClassName="active" className="link">Instruments</NavLink>
        <NavLink to="/how-to-use" activeClassName="active" className="link">How To Use</NavLink>
        <NavLink to="/bibliography" activeClassName="active" className="link">Bibliography</NavLink>
        <NavLink to="/about" activeClassName="active" className="link">About</NavLink>
        <NavLink to="/admin" activeClassName="active" className="link">Admin</NavLink>
    </nav>

export default Navbar;