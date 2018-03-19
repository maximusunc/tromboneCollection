import React, {Component} from "react";
// import API from "../utils/API.js";
import Container from "../components/container";

class Home extends Component {
    state = { };

    render() {
        return (
            <Container>
                <h1>
                    Welcome!
                </h1>

                <p>
                    This database is dedicated to the cataloging of trombones made before 1800. From here, visitors can search, submit corrections, see updates, and suggest new records.
                </p>

            </Container>
        );
    };
};

export default Home;