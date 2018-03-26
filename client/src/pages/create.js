import React, {Component} from "react";
import history from "../history";
import API from "../utils/API.js";
import Container from "../components/container";
import UpdateForm from "../components/updateForm";

class Create extends Component {
    state = {
        maker: "",
        date: "",
        type: "",
        location: "",
        signature: "",
        pitch: "",
        dimensions: "",
        found: "",
        literature: "",
        remarks: ""
    };

    componentDidMount() {
        
    };

    handleSubmit = () => {
        API.addTrombone({...this.state})
            .then(res => {
                alert("Trombone Added!");
                history.push("/admin");
            })
            .catch(err => console.log(err));
    };

    typeChange = (event, index, type) => {
        this.setState({type: type});
    };

    pitchChange = (event, index, pitch) => {
        this.setState({pitch: pitch});
    };

    handleUpdate = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    render() {
        return (
            <Container>
                <h1>
                    Create!
                </h1>

                <UpdateForm 
                    date={this.state.date}
                    maker={this.state.maker}
                    type={this.state.type}
                    location={this.state.location}
                    signature={this.state.signature}
                    pitch={this.state.pitch}
                    dimensions={this.state.dimensions}
                    found={this.state.found}
                    literature={this.state.literature}
                    remarks={this.state.remarks}
                    typeChange={this.typeChange}
                    pitchChange={this.pitchChange}
                    onChange={this.handleUpdate}
                />
                
                <button onClick={this.handleSubmit}>Create</button>


            </Container>
        );
    };
};

export default Create;