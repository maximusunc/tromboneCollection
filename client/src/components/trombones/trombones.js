import React from "react";
import "./trombones.css";
import { Link } from "react-router-dom";

const Instruments = (props) => 
    <div>
        <h2>
            Instruments:
        </h2>

        <ul>
            {props.trombones.map(trombone => {
                return (
                    <Link className="tromboneList" to="/details" key={trombone._id} >
                        <li className="trombone" onClick={() => props.handleClick(trombone._id)}>
                            {trombone.date} {trombone.maker}
                        </li>
                    </Link>
                );
            })}
        </ul>
    </div>;

export default Instruments;