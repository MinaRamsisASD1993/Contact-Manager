import React from "react";

function About(props) {
  return (
    <div>
      {/* For getting the parameter sent as :id along with the path */}
      {/* i mean if the path is ="/about/:id" */}
      {/* <h2>{props.match.params.id}</h2>  */}
      <h1 className="display-4">About Page</h1>
      <p className="lead">Simple App to manage contacts</p>
      <p className="text-secondary">version 1.0.0</p>
    </div>
  );
}
export default About;
