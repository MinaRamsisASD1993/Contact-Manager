import React, { Component } from "react";
import { Consumer } from "../context";
import TextInput from "./TextInput";
import axios from "axios";
class UpdateContact extends Component {
  state = {
    name: "",
    email: "",
    phone: ""
  };
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onUpdateClick = async (globalState, e) => {
    const id = this.props.match.params.id;
    console.log(id);
    e.preventDefault();
    const { name, email, phone } = this.state;
    const newContact = {
      name,
      email,
      phone
    };

    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      newContact
    );
    globalState.dispatch({ type: "UPDATE_CONTACT", payload: res.data });

    // // console.log(res.data);
    // globalState.dispatch({ type: "UPDATE_CONTACT", payload: res.data });

    this.setState({ name: "", email: "", phone: "" });

    //After submission redirect to home page
    this.props.history.push("/");
  };
  async componentDidMount() {
    //   //Good place for grabbing data from external API
    //  //Good place for setting state to new state
    const id = this.props.match.params.id;
    // console.log(id);
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    // console.log(res.data);
    const { name, email, phone } = res.data;
    this.setState({
      name,
      email,
      phone
    });
  }
  render() {
    return (
      <Consumer>
        {value => {
          //   console.log(value.contacts);

          return (
            <div className="card my-3">
              <h5 className="card-header">Update Contact</h5>
              <div className="card-body">
                <form onSubmit={this.onUpdateClick.bind(this, value)}>
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
                    value="Update Contact"
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

export default UpdateContact;
