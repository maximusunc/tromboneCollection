import React, {Component} from "react";
import API from "../utils/API.js";
import Container from "../components/container";
import SearchBar from "../components/searchBar";
import Trombones from "../components/trombones";

class Instruments extends Component {
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
                
                <Trombones
                    trombones={this.state.filtered}
                    handleClick={this.handleClick}
                />

                
            </Container>
        )
    };
};

export default Instruments;