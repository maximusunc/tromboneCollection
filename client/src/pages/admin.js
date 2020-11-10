import React, {Component} from "react";
import { Button } from "@material-ui/core";
import API from "../utils/API.js";
import SearchBar from "../components/searchBar/searchBar";
import Container from "../components/container/container";
import Trombones from "../components/trombones/trombones";

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
                const trombones = this.chronSort(res.data);
                this.setState({trombones, filtered: trombones});
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
            trombone.pitch.indexOf(this.state.pitch) !== -1)});
    };

    create = () => {
        const { history } = this.props;
        history.push("/create");
    }

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
                <Button
                    id="create"
                    variant="contained"
                    color="primary"
                    onClick={this.create}
                    disableRipple
                >
                    Create
                </Button>
                <h2 id="adminInstruments">Instruments:</h2>
                <section className="tromboneList">
                    <ul style={{ padding: 0 }}>
                        {trombones}
                    </ul>
                </section>
            </Container>
        );
    };
};

export default Admin;