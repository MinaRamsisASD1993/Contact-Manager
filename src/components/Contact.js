import React, { Component } from "react";
import PropTypes from "prop-types";
import { Consumer } from "../context";
import axios from "axios";
import { Link } from "react-router-dom";
class Contact extends Component {
  state = {
    showUL: false
  };
  arrowOnClick = () => {
    this.setState({ showUL: !this.state.showUL });
  };
  async deleteRequest(contactId, state) {
    //Very good move ..
    //By default you cannot delete key 11 as it doesn't exist there
    //so we'll wrap it in a try catch
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/users/${contactId}`
      );
      state.dispatch({ type: "DELETE_CONTACT", payload: contactId });
    } catch (e) {
      state.dispatch({ type: "DELETE_CONTACT", payload: contactId });
    }
  }

  onDeleteClick = (contactId, state) => {
    this.deleteRequest(contactId, state);
    // axios
    //   .delete(`https://jsonplaceholder.typicode.com/users/${contactId}`)
    //   .then(() =>
    //     state.dispatch({ type: "DELETE_CONTACT", payload: contactId })
    //   );
  };

  render() {
    const { contact } = this.props;
    const { name, email, phone } = contact;
    const deleteIconStyle = { float: "right", color: "red", cursor: "pointer" };
    const updateIconStyle = { float: "right", cursor: "pointer" };
    let ULcontent;
    if (this.state.showUL) {
      ULcontent = (
        <ul className="list-group">
          <li className="list-group-item">Email: {email}</li>
          <li className="list-group-item">Phone: {phone}</li>
        </ul>
      );
    } else {
      ULcontent = null;
    }
    return (
      <Consumer>
        {value => {
          // console.log(value);
          return (
            <div className="card my-3">
              <div className="card-body">
                <h3 className="card-title">
                  {name}{" "}
                  <i
                    className="fa fa-caret-down"
                    style={{ fontSize: "24px", cursor: "pointer" }}
                    onClick={this.arrowOnClick}
                    //   .bind (this) -> gives the function accessibility to use this :)
                    //.. but even you can use this inside function by using an arrow function
                  />
                  <i
                    className="fa fa-trash"
                    style={deleteIconStyle}
                    onClick={this.onDeleteClick.bind(this, contact.id, value)}
                  />
                  <Link to={`/contact/update/${contact.id}`}>
                    <i className="fa fa-pencil mr-3" style={updateIconStyle} />
                    {"  "}
                  </Link>
                </h3>
                {ULcontent}
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
};
export default Contact;
