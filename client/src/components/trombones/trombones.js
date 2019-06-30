import React from "react";
import { Link } from "react-router-dom";
import "./trombones.css";

const Instruments = (props) =>  
    <Link className="tromboneLink" to={props.link} >
        <li className="trombone" onClick={props.handleClick}>
            {props.date} {props.maker}
        </li>
    </Link>;

export default Instruments;