import React, {Component} from "react";
import API from "../utils/API.js";
import Container from "../components/container/container";
import SearchBar from "../components/searchBar/searchBar";
import Trombones from "../components/trombones/trombones";

class Instruments extends Component {
    state = {
        trombones: [],
        filtered: [],
        type: "",
        maker: "",
        date: "",
        pitch: "",
        loaded: false
    };

    componentDidMount() {
        API.getTrombones()
            .then(res => {
                const trombones = this.chronSort(res.data);
                this.setState({trombones, filtered: trombones, loaded: true});
            })
            .catch(err => console.log(err));
    };

    chronSort(trombones) {
        trombones.sort((a, b) => {
            if (!a.date || !b.date) {
                return 0;
            }
            let [date1] = a.date.match(/\d{4}|\d{2}/);
            let [date2] = b.date.match(/\d{4}|\d{2}/);
            if (date1.length === 2) {
                date1 *= 100;
            }
            if (date2.length === 2) {
                date2 *= 100;
            }
            return date1 - date2;
        });
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
        return (
            <Container>
                <SearchBar 
                    type={this.state.type}
                    maker={this.state.maker} 
                    date={this.state.date}
                    pitch={this.state.pitch}
                    searchChange={this.searchChange}
                />
                <h2>Instruments:</h2>

                {this.state.loaded ? 
                    <section className="tromboneList">
                        <ul style={{ padding: 0 }}>
                            {this.state.filtered.map((trombone) => (
                                <Trombones
                                    key={trombone._id}
                                    id={trombone._id}
                                    maker={trombone.maker}
                                    date={trombone.date}
                                    link={"/details/" + trombone._id}
                                />
                            ))}
                        </ul>
                    </section>
                :
                    <h5>Loading...</h5>
                }
            </Container>
        );
    };
};

export default Instruments;