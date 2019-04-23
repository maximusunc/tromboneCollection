import React, {Component} from "react";
import SearchBar from "../components/searchBar";
import API from "../utils/API.js";
import Container from "../components/container";
import { Link } from "react-router-dom";
import Trombones from "../components/trombones";

class Admin extends Component {
    state = {
        trombones: [],
        filtered: [],
        type: "",
        maker: "",
        date: "",
        pitch: ""
    };

    componentDidMount() {
        API.getTrombones()
            .then(res => {
                this.setState({trombones: res.data});
                this.setState({filtered: res.data});
            })
            .catch(err => console.log(err));
    };

    searchChange = (event) => {
        var { name, value } = event.target;
        this.setState({[name]: value}, () => {
            this.updateSearch();
        });
    };

    updateSearch = () => {
        this.setState({filtered: this.state.trombones.filter(trombone => 
            trombone.maker.toLowerCase().indexOf(this.state.maker.toLowerCase()) !== -1 && 
            trombone.type.indexOf(this.state.type) !== -1 &&
            trombone.date.indexOf(this.state.date) !== -1 &&
            trombone.pitch.indexOf(this.state.pitch) !== -1)});
    };

    render() {
        const trombones = this.state.filtered.map(trombone => (
            <Trombones
                key={trombone._id}
                id={trombone._id}
                maker={trombone.maker}
                date={trombone.date}
                link={"/update/" + trombone._id}
            />
        ));
        return (
            <Container>
                <SearchBar
                    type={this.state.type}
                    maker={this.state.maker} 
                    date={this.state.date}
                    pitch={this.state.pitch}
                    searchChange={this.searchChange}
                />

                <Link id="create" to="/create">Create</Link>

                <h2 id="adminInstruments">
                    Instruments:
                </h2>

                <section className="tromboneList">
                    <ul>
                        {trombones}
                    </ul>
                </section>

            </Container>
        );
    };
};

export default Admin;