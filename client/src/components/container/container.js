import React from "react";
import "./container.css";

const Container = props => 
    <div className="container">
        {props.children}
    </div>;

export default Container;