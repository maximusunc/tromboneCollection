import React, {Component} from "react";
import API from "../utils/API.js";
import Container from "../components/container";
import SearchBar from "../components/searchBar";
import { Link } from "react-router-dom";

class Instruments extends Component {
    state = {
        trombones: [],
        filtered: [],
        type: "",
        maker: ""
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

    makerChange = (event) => {
        this.setState({maker: event.target.value}, () => {
            this.updateSearch();
        });
    };

    updateSearch = () => {
        this.setState({filtered: this.state.trombones.filter(trombone => 
            trombone.maker.toLowerCase().indexOf(this.state.maker.toLowerCase()) !== -1 && 
            trombone.type.indexOf(this.state.type) !== -1)});
        
    };

    render() {
        return (
            <Container>
                <SearchBar
                    type={this.state.type}
                    maker={this.state.maker} 
                    typeChange={this.typeChange}
                    makerChange={this.makerChange}
                />
                <h2>
                    Trombones:
                </h2>

                <ul>
                {this.state.filtered.map(trombone => {
                    return (
                        <Link to="/details" key={trombone.id} >
                            <li className="trombone" onClick={() => this.handleClick(trombone._id)}>
                                {trombone.date} {trombone.maker} {trombone.type}
                            </li>
                        </Link>
                    );
                })}
                </ul>

                
            </Container>
        )
    };
};

export default Instruments;