import React, { Component } from "react";
import Contact from "../components/Contact";
import { Consumer } from "../context";
class Contacts extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { contacts } = value;
          return (
            <div>
              <h1 className="display-3 my-4">
                <span style={{ color: "red" }}>Contact</span> List
              </h1>
              {contacts.map(contact => (
                <Contact key={contact.id} contact={contact} />
              ))}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Contacts;
