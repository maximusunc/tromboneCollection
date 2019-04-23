import React, {Component} from "react";
import API from "../utils/API.js";
import Container from "../components/container";
import SearchBar from "../components/searchBar";
import Trombones from "../components/trombones";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class Instruments extends Component {
    state = {
        trombones: [],
        filtered: [],
        type: "",
        maker: "",
        date: "",
        pitch: "",
        order: "asc",
        loaded: false
    };

    componentDidMount() {
        API.getTrombones()
            .then(res => {
                const trombones = this.chronSort(res.data, this.state.order);
                this.setState({trombones, filtered: trombones, loaded: true});
            })
            .catch(err => console.log(err));
    };

    chronSort(trombones) {
        trombones.sort((a, b) => (a.date > b.date) ? 1 : (a.date < b.date) ? -1 : 0);
        return trombones;
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
            trombone.pitch.toLowerCase().startsWith(this.state.pitch.toLowerCase()))});
    };

    render() {
        const trombones = this.state.filtered.map(trombone => (
            <Trombones
                key={trombone._id}
                id={trombone._id}
                maker={trombone.maker}
                date={trombone.date}
                link={"/details/" + trombone._id}
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

                <h2>
                    Instruments:
                </h2>

                {this.state.loaded ? 

                <section className="tromboneList">
                    <ul>
                        <ReactCSSTransitionGroup
                            transitionName="tromboneAnimate"
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={500}
                        >
                            {trombones}
                        </ReactCSSTransitionGroup>
                    </ul>
                </section>

                :

                <h5>
                    Loading...
                </h5>

                }

                
            </Container>
        )
    };
};

export default Instruments;