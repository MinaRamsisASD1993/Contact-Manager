import React, { Component } from "react";
import { Consumer } from "../context";
// import uuid from "uuid";
import TextInput from "./TextInput";
import axios from "axios";
class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: ""
  };
  onChange = e => {
    // console.log("changing");
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = async (globalState, e) => {
    e.preventDefault();
    // console.log(this.state);
    const { name, email, phone } = this.state;
    const newContact = {
      name: name,
      email: email,
      phone: phone
    };
    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      newContact
    );
    globalState.dispatch({ type: "ADD_CONTACT", payload: res.data });

    // axios
    //   .post("https://jsonplaceholder.typicode.com/users", newContact)
    //   .then(res => {
    //     const { id, name, email, phone } = res.data;
    //     const newContactToAdd = {
    //       id,
    //       name,
    //       email,
    //       phone
    //     };
    //     globalState.dispatch({ type: "ADD_CONTACT", payload: newContactToAdd });
    //   });

    this.setState({ name: "", email: "", phone: "" });

    //After submission redirect to home page
    this.props.history.push("/");
  };
  render() {
    return (
      <Consumer>
        {value => {
          return (
            <div className="card my-3">
              <h5 className="card-header">Add Contact</h5>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, value)}>
                  <TextInput
                    label="Name"
                    id="name"
                    type="text"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  <TextInput
                    label="Email"
                    id="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  <TextInput
                    label="Phone"
                    id="phone"
                    type="text"
                    value={this.state.phone}
                    onChange={this.onChange}
                  />

                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Add Contact"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
