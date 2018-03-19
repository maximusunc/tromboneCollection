import React, {Component} from "react";
import API from "../utils/API.js";
import Container from "../components/container";
import { Link } from "react-router-dom";

class Instruments extends Component {
    state = {
        trombones: []
    };

    componentDidMount() {
        API.getTrombones()
            .then(res => {
                this.setState({trombones: res.data})
            })
            .catch(err => console.log(err));
    };


    render() {
        return (
            <Container>
                <h2>
                    Trombones:
                </h2>

                <ul>
                {this.state.trombones.map(trombone => {
                    return <Link to="/details/{trombone.id}"><li key={trombone.id} className="trombone">{trombone.date} {trombone.maker}</li></Link>
                })}
                </ul>

                
            </Container>
        )
    };
};

export default Instruments;