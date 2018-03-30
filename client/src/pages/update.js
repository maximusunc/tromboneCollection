import React, {Component} from "react";
import { Link } from "react-router-dom";
import history from "../history";
import API from "../utils/API.js";
import Container from "../components/container";
import UpdateForm from "../components/updateForm";

class Update extends Component {
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
        API.getTrombone(localStorage.getItem("id"))
            .then(res => {
                this.setState({
                    maker: res.data.maker,
                    date: res.data.date,
                    type: res.data.type,
                    location: res.data.location,
                    signature: res.data.signature,
                    pitch: res.data.pitch,
                    dimensions: res.data.dimensions,
                    found: res.data.found,
                    literature: res.data.literature,
                    remarks: res.data.remarks
                });
            })
            .catch(err => console.log(err));
    };

    handleSubmit = () => {
        API.updateTrombone(localStorage.getItem("id"), {...this.state})
            .then(res => {
                alert("Trombone Updated");
            })
            .catch(err => console.log(err));
    };

    handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this trombone? This action cannot be undone.")) {
            API.deleteTrombone(localStorage.getItem("id"))
                .then(res => {
                    alert("Trombone Permanently Deleted");
                    history.push("/admin");
                })
                .catch(err => console.log(err));
        };
    };

    handleUpdate = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    render() {
        return (
            <Container>
                <h1>
                    Update!
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
                    onChange={this.handleUpdate}
                />
                
                <Link to="/admin">
                    <button id="update" onClick={this.handleSubmit}>Update</button>
                </Link>

                <button id="delete" onClick={this.handleDelete}>Delete</button>

            </Container>
        );
    };
};

export default Update;