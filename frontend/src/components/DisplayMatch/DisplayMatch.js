import React from "react";
import { Image } from "react-bootstrap";


const DisplayMatch = props => (
  <div>
    <p>{props.user.firstName}</p>
    <p>{props.user.role}</p>
    <Image src={props.matchImage}/>
  </div>
);

export default DisplayMatch;
