import React, { Component } from "react";
import Contacts from "./components/Contacts";
import Provider from "./context";
import Header from "./components/Header";
import AddContact from "./components/AddContact";
import About from "./components/About";
import NotFound from "./components/NotFound";
import updateContact from "./components/updateContact";
// import Test from "./components/Tests/Test";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className="App">
            <Header />
            <div className="container">
              <Switch>
                {/* <AddContact /> */}
                <Route path="/contact/add" exact component={AddContact} />
                {/* <Contacts /> */}
                <Route path="/" exact component={Contacts} />
                <Route path="/about" component={About} />
                <Route path="/contact/update/:id" component={updateContact} />
                {/* <Route path="/test" component={Test} /> */}
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
