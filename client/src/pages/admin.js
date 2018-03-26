import React, {Component} from "react";
import SearchBar from "../components/searchBar";
import API from "../utils/API.js";
import Container from "../components/container";
import { Link } from "react-router-dom";

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

    handleClick = (id) => {
        localStorage.setItem("id", id);
    };

    typeChange = (event, index, type) => {
        this.setState({type: type}, () => {
            this.updateSearch();
        });
    };

    pitchChange = (event, index, pitch) => {
        this.setState({pitch: pitch}, () => {
            this.updateSearch();
        });
    };

    makerChange = (event) => {
        this.setState({maker: event.target.value}, () => {
            this.updateSearch();
        });
    };

    dateChange = (event) => {
        this.setState({date: event.target.value}, () => {
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
        return (
            <Container>
                <SearchBar
                    type={this.state.type}
                    maker={this.state.maker} 
                    date={this.state.date}
                    pitch={this.state.pitch}
                    typeChange={this.typeChange}
                    makerChange={this.makerChange}
                    dateChange={this.dateChange}
                    pitchChange={this.pitchChange}
                />

                <Link to="/create">Create</Link>

                <h2>
                    Trombones:
                </h2>

                <ul>
                    {this.state.filtered.map(trombone => {
                        return (
                            <Link to="/update" key={trombone._id} >
                                <li className="trombone" onClick={() => this.handleClick(trombone._id)}>
                                    {trombone.date} {trombone.maker}
                                </li>
                            </Link>
                        );
                    })}
                </ul>
            </Container>
        );
    };
};

export default Admin;