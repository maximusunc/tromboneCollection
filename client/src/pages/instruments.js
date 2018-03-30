import React, {Component} from "react";
import API from "../utils/API.js";
import Container from "../components/container";
import SearchBar from "../components/searchBar";
import Trombones from "../components/trombones";
import { CSSTransitionGroup } from "react-transition-group";

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
                link="/details"
                handleClick={() => this.handleClick(trombone._id)}
            />
        ));
        return (
            <Container>

                <SearchBar 
                    type={this.state.type}
                    maker={this.state.maker} 
                    date={this.state.date}
                    pitch={this.state.pitch}
                    typeChange={this.searchChange}
                    makerChange={this.searchChange}
                    dateChange={this.searchChange}
                    pitchChange={this.searchChange}
                />

                <h2>
                    Instruments:
                </h2>

                <section className="tromboneList">
                    <ul>
                        <CSSTransitionGroup
                            transitionName="tromboneAnimate"
                            transitionEnterTimeout={1000}
                            transitionLeaveTimeout={1000}
                        >
                            {trombones}
                        </CSSTransitionGroup>
                    </ul>
                </section>

                
            </Container>
        )
    };
};

export default Instruments;