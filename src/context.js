import React, { Component } from "react";
import axios from "axios";
const Context = React.createContext();

//reducer takes in (init state, actionToDo) .. and it's called by dispatch in the state
//action is like this -> {type: "ADD_CONTACT", payload: {Entire Contact}}
const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE_CONTACT": {
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
          // action.payload is contactId
        )
      };
    }
    case "ADD_CONTACT": {
      const contacts = state.contacts;
      contacts.push(action.payload);
      return {
        ...state,
        contacts: contacts
        // You can also do this
        // contacts: [...state.contacts, action.payload] :)
      };
    }
    case "UPDATE_CONTACT": {
      const contacts = state.contacts;
      //action.payload = {name: , email: ,phone: , id: }
      const { name, email, phone, id } = action.payload;
      contacts.forEach(contact => {
        if (contact.id === id) {
          contact.name = name;
          contact.email = email;
          contact.phone = phone;
        }
      });

      return {
        ...state,
        contacts: contacts
      };
    }
    default: {
      return state;
    }
  }
};

class Provider extends Component {
  // componentDidMount() {
  //   //Good place for grabbing data from external API
  //  //Good place for setting state to new state
  //   axios
  //     .get("https://jsonplaceholder.typicode.com/users")
  //     .then(res => this.setState({ contacts: res.data }));
  // }
  async componentDidMount() {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    this.setState({ contacts: res.data });
  }

  state = {
    contacts: [],

    dispatch: action => {
      this.setState(state => reducer(state, action));
    }
  };
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
//Any component that's gonna use this Context is gonna use its Consumer
export const Consumer = Context.Consumer;
//This Provider class is gonna wrap all of you components to be a global state
export default Provider;
