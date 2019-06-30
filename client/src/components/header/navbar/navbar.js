import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

const Navbar = () => 
    <div id="navbar">
        <NavLink to="/home" activeClassName="active" className="link">Home</NavLink>
        <NavLink to="/instruments" activeClassName="active" className="link">Instruments</NavLink>
        <NavLink to="/how-to-use" activeClassName="active" className="link">How To Use</NavLink>
        <NavLink to="/bibliography" activeClassName="active" className="link">Bibliography</NavLink>
        <NavLink to="/contact" activeClassName="active" className="link">Contact</NavLink>
        <NavLink to="/admin" activeClassName="active" className="link">Admin</NavLink>
    </div>;

export default Navbar;